'use client';

import { useState } from "react";
import { customFetch } from '@/services/api';

type UseCreateChatbotResult = {
  error: string | null;
  loading: boolean;
  createChatbot: (formData: FormData) => Promise<boolean | null>;
};

type CreateChatbotResponse = {
  id: string;
  name: string;
  primary_color: string;
  text_color: string;
  welcome_message: string;
  welcome_popup: string;
  chat_input: string;
  logo: string;
};

export const useCreateChatbot = (): UseCreateChatbotResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerFn = async (formData: FormData): Promise<boolean | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await customFetch<CreateChatbotResponse>({
        endpoint: '/chatbots/',
        body: formData,
        method: 'POST',
        requiresAuth: true,
        shouldStringify: false,
        addContentType: false,
      });

      if (result.id) {
        return true;
      } else {
        setError("Failed to create chatbot");
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    createChatbot: registerFn,
  };
};