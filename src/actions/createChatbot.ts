'use server';

import { revalidateTag } from 'next/cache';
import { customFetch } from '@/services/api';
import { CreateChatbotResponse } from '@/services/types/createChatbot';

/**
 * Handles chatbot creation.
 * @param body Chatbot creation details in FormData
 * @returns Result object with success status and error message if applicable.
 */
export async function createChatbot(formData: FormData): Promise<CreateChatbotResponse> {
  console.log(formData);
  try {
    await customFetch<CreateChatbotResponse>({
      endpoint: '/chatbots/',
      body: formData,
      method: 'POST',
      requiresAuth: true,
      shouldStringify: false, // ⛔ Important for FormData
      addContentType: false,  // ⛔ Let browser set it automatically
    });

    revalidateTag('chatbots');

    return {
      success: true,
      message: 'Chatbot created successfully!',
    };
  } catch (error) {
    console.error('Chatbot creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
