'use client'

import { useState, useEffect, useCallback } from "react";
import { getChatMessages } from "@/actions/chat";
import { Message } from "@/services/types/chat";

export const useChatMessages = (sessionId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!sessionId) {
      setMessages([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await getChatMessages(sessionId);
      
      if (!result.success) {
        setError(result.error || 'Failed to fetch messages');
        return;
      }

      setMessages(result.messages || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    refreshMessages: fetchMessages
  };
}; 