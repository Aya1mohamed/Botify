'use server';
import { customFetch } from '@/services/api';
import { LoginBody, LoginResponse } from '@/services/types/login';
import { storeTokens } from './tokenManager';

/**
 * Handles user sign in and storing the tokens in the cookies.
 * @param body Sign in credentials.
 * @returns Result object with success status, tokens, and error message if applicable.
 */
export async function login(body: LoginBody): Promise<{ 
    success: boolean, 
    tokens?: { 
        access: string, 
        refresh: string 
    }, 
    error?: string 
}> {
    try {
        const response = await customFetch<LoginResponse>({
            endpoint: '/auth/login/',
            body,
            method: 'POST',
            requiresAuth: false,
        });
        console.log(response);
        // Store tokens in server-side cookies
        await storeTokens(response.access, response.refresh);
        
        // Return tokens to the client for local storage
        return { 
            success: true,
            tokens: {
                access: response.access,
                refresh: response.refresh
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}