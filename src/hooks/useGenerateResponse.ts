'use client'

import { useState, useCallback } from "react";
import { generateResponse, GenerateResponseRequest } from "@/actions/generateResponse";
import { Message } from "@/services/types/chat";

export const useGenerateResponse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (request: GenerateResponseRequest): Promise<Message | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateResponse(request);
      console.log(result);
      if (!result.success) {
        setError(result.error || 'Failed to generate response');
        return null;
      }

      return result.response || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate response';
      setError(errorMessage);
      console.error('Error generating response:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sendMessage,
    loading,
    error,
    clearError: () => setError(null)
  };
}; 