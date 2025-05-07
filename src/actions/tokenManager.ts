'use server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/tokens';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

class TokenManager {
    private static instance: TokenManager;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    private constructor() { }

    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    private getTokenFromCookies() {
        const cookieStore = cookies();
        this.accessToken = cookieStore.get(ACCESS_TOKEN)?.value ?? null;
        this.refreshToken = cookieStore.get(REFRESH_TOKEN)?.value ?? null;
    }

    public setTokensToCookies(accessToken: string, refreshToken?: string) {
        const cookieStore = cookies();
        cookieStore.set(ACCESS_TOKEN, accessToken, {
            httpOnly: true,
            secure: true,
        });
        this.accessToken = accessToken;

        if (refreshToken) {
            cookieStore.set(REFRESH_TOKEN, refreshToken, {
                httpOnly: true,
                secure: false,
            });
            this.refreshToken = refreshToken;
        }
    }

    public deleteTokens() {
        const cookieStore = cookies();
        cookieStore.delete(ACCESS_TOKEN);
        cookieStore.delete(REFRESH_TOKEN);
        this.accessToken = null;
        this.refreshToken = null;
    }

    private isTokenExpired(token: string): boolean {
        try {
            const decodedAccessToken = jwtDecode(token);
            const bufferTime = 60 * 1000;
            return Date.now() + bufferTime >= Number(decodedAccessToken.exp) * 1000;
        } catch (error) {
            console.error('Error in isTokenExpired:', error);
            return true;
        }
    }

    private async refreshAccessToken(): Promise<void> {
        if (!this.refreshToken) {
            return;
        }

        try {
            const baseurl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(
                `${baseurl}/auth/refresh-token`,
                {
                    method: 'POST',
                    body: JSON.stringify({ refreshToken: this.refreshToken }),
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            if (response.ok) {
                const { accessToken, refreshToken } = await response.json();
                this.setTokensToCookies(accessToken, refreshToken);
            } else {
                // Clear tokens if refresh failed
                this.deleteTokens();
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Clear tokens on error
            this.deleteTokens();
        }
    }

    public async getAccessToken(): Promise<string | null> {
        try {
            this.getTokenFromCookies();

            if (!this.accessToken) {
                return null;
            }

            if (this.isTokenExpired(this.accessToken)) {
                if (this.refreshToken && !this.isTokenExpired(this.refreshToken)) {
                    await this.refreshAccessToken();
                } else {
                    return null;
                }
            }

            // After refresh, if we still don't have a valid token, return null
            if (!this.accessToken || this.isTokenExpired(this.accessToken)) {
                return null;
            }

            return this.accessToken;
        } catch (error) {
            console.error('Error in getAccessToken:', error);
            return null;
        }
    }

    public async getCurrentUserID() {
        const accessToken = await this.getAccessToken();
        if (!accessToken) {
            return null;
        }
        const decodedAccessToken = jwtDecode(accessToken);
        return decodedAccessToken.sub;
    }
}

/**
 * Attempts to get the access token from the cookies and refresh it if expired.
 * @returns The access token if available, otherwise null.
 */
export async function getAccessToken(): Promise<string | null> {
    const tokenManager = TokenManager.getInstance();
    return await tokenManager.getAccessToken();
}

/**
 * A function to store the tokens in the cookies.
 * @param accessToken
 * @param refreshToken
 */
export async function storeTokens(
    accessToken: string,
    refreshToken?: string,
): Promise<void> {
    const tokenManager = TokenManager.getInstance();
    tokenManager.setTokensToCookies(accessToken, refreshToken);
}

/**
 * A function to remove access & refresh tokens from the cookies
 */
export async function deleteTokens(): Promise<void> {
    const tokenManager = TokenManager.getInstance();
    tokenManager.deleteTokens();
}

/**
 * Extracts user ID from the token and returns it.
 * @returns Promise to return user ID
 */
export async function getCurrentUserID(): Promise<string | null | undefined> {
    const tokenManager = TokenManager.getInstance();
    return await tokenManager.getCurrentUserID();
}