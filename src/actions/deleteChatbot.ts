'use server';
import { revalidateTag } from 'next/cache';
import { getAccessToken } from '@/actions/tokenManager';

/**
 * Handles chatbot deletion.
 * @param chatbotId The ID of the chatbot to delete.
 * @returns Result object with success status and error message if applicable.
 */
export async function deleteChatbot(chatbotId: string): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chatbots/${chatbotId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await getAccessToken()}`,
      },
    });

    if (response.status === 204) {
      revalidateTag('chatbots');
      return {
        success: true,
        message: 'Chatbot deleted successfully!',
      };
    }

    // Handle error cases
    const errorData = await response.text();
    throw new Error(errorData || 'Failed to delete chatbot');

  } catch (error) {
    console.error('Chatbot deletion error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}