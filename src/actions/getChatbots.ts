'use server';

import { customFetch } from '@/services/api';
import { Chatbot, ChatbotsResponse } from '@/services/types/chatbots';

/**
 * Fetches all chatbots for the authenticated user.
 * @returns Result object with success status and chatbots data if successful.
 */
export async function getChatbots(): Promise<ChatbotsResponse> {
  try {
    const data = await customFetch<Chatbot[]>({
      endpoint: '/chatbots/',
      method: 'GET',
      requiresAuth: true,
      options: {
        next: {
          tags: ['chatbots'],
        },
      },
    });
    
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Fetch chatbots error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
} 