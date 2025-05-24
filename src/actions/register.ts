'use server';

import { customFetch } from '@/services/api';
import { RegisterBody, RegisterResponse } from '@/services/types/register';

/**
 * Handles user registration.
 * @param body Registration credentials.
 * @returns Result object with success status and error message if applicable.
 */
export async function register(body: RegisterBody): Promise<RegisterResponse> {
  
  try {
    await customFetch({
      endpoint: '/auth/register/',
      body: {...body, phone_number: "+" + body.phone_number},
      method: 'POST',
      requiresAuth: false,
    });

    // If we reach here, the request was successful (no 400 error thrown)
    return {
      success: true,
      message: 'Account created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
