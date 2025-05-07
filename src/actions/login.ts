'use server';
import { customFetch } from '@/services/api';
import { LoginBody, LoginResponse } from '@/services/types/login';
import { storeTokens } from './tokenManager';

/**
 * Handles user sign in and storing the tokens in the cookies.
 * @param body Sign in credentials.
 * @returns Result object with success status and error message if applicable.
 */
export async function login(body: LoginBody): Promise<{ success: boolean, error?: string }> {
    try {
        const response = await customFetch<LoginResponse>({
            endpoint: '/auth/login/',
            body,
            method: 'POST',
            requiresAuth: false,
        });

        await storeTokens(response.access, response.refresh);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}