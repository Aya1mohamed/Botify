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
      method: 'GET'
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

/**
 * Sends a dashboard user message to a specific chat session
 * @param sessionId The ID of the chat session
 * @param message The message content to send
 * @returns Result object with success status and error message if applicable
 */
export async function sendDashboardUserMessage(sessionId: string, message: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await customFetch({
      endpoint: `/chat-sessions/${sessionId}/dashboard-user-message/`,
      body: { message },
      method: 'POST',
      requiresAuth: true,
    });

    return {
      success: true,
    };
  } catch (error) {
    // Handle the specific case of empty JSON response
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
    
    // If the error is about JSON parsing but we got here, it might mean the request was successful
    // but the response was empty (which is expected for this endpoint)
    if (errorMessage.includes('Unexpected end of JSON input')) {
      // The request was likely successful, just no JSON to parse
      return {
        success: true,
      };
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
} 