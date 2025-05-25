'use server';

import { customFetch } from "@/services/api";
import { Message } from "@/services/types/chat";

export interface GenerateResponseRequest {
  original_text: string;
  chatbot_id: string;
  session_id?: string | null;
}

/**
 * Generates a response from the chatbot
 * @param request The request payload containing the message, chatbot ID, and optional session ID
 * @returns Result object with success status, response message, and error message if applicable
 */
export async function generateResponse(request: GenerateResponseRequest): Promise<{
  success: boolean;
  response?: Message;
  error?: string;
}> {
  try {
    const requestBody: Record<string, unknown> = {
      original_text: request.original_text,
      chatbot_id: request.chatbot_id,
      ...(request.session_id ? { session_id: request.session_id } : {session_id: null})
    };
    console.log(requestBody);
    const response = await customFetch<Message>({
      endpoint: '/generate-response/',
      method: 'POST',
      body: requestBody,
      requiresAuth: false,
    });
    console.log(response);
    return {
      success: true,
      response,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate response',
    };
  }
} 