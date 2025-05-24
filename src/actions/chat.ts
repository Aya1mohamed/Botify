'use server';

import { customFetch } from "@/services/api";
import { GetSessionsResponse, GetMessagesResponse } from "@/services/types/chat";

/**
 * Fetches all chat sessions for the authenticated user
 * @returns Result object with success status, sessions data, and error message if applicable
 */
export async function getChatSessions(): Promise<{
  success: boolean;
  sessions?: GetSessionsResponse;
  error?: string;
}> {
  try {
    const sessions = await customFetch<GetSessionsResponse>({
      endpoint: '/chat-sessions/',
      requiresAuth: true,
      method: 'GET',
    });

    return {
      success: true,
      sessions,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch chat sessions',
    };
  }
}

/**
 * Fetches chat sessions for a specific chatbot
 * @param chatbotId The ID of the chatbot
 * @returns Result object with success status, sessions data, and error message if applicable
 */
export async function getChatSessionsByChatbot(chatbotId: string): Promise<{
  success: boolean;
  sessions?: GetSessionsResponse;
  error?: string;
}> {
  try {
    const sessions = await customFetch<GetSessionsResponse>({
      endpoint: `/chat-sessions/${chatbotId}`,
      requiresAuth: true,
      method: 'GET',
    });

    return {
      success: true,
      sessions,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch chat sessions for chatbot',
    };
  }
}

/**
 * Fetches messages for a specific chat session
 * @param sessionId The ID of the chat session
 * @returns Result object with success status, messages data, and error message if applicable
 */
export async function getChatMessages(sessionId: string): Promise<{
  success: boolean;
  messages?: GetMessagesResponse;
  error?: string;
}> {
  try {
    const messages = await customFetch<GetMessagesResponse>({
      endpoint: `/chat-sessions/${sessionId}/messages/`,
      requiresAuth: true,
      method: 'GET',
      options: {
        next: {
          revalidate: 500,
        },
      },
    });

    // Sort messages by timestamp
    const sortedMessages = messages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return {
      success: true,
      messages: sortedMessages,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch chat messages',
    };
  }
} 