'use client'

import { useState, useEffect } from "react";
import { getChatSessionsByChatbot } from "@/actions/chat";
import { ChatSession } from "@/services/types/chat";

export const useChatSessionsByChatbot = (chatbotId: string | null) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getChatSessionsByChatbot(id);
      
      if (!result.success) {
        setError(result.error || 'Failed to fetch sessions');
        return;
      }

      setSessions(result.sessions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sessions');
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatbotId) {
      fetchSessions(chatbotId);
    } else {
      setSessions([]);
      setError(null);
      setLoading(false);
    }
  }, [chatbotId]);

  return {
    sessions,
    loading,
    error,
    refreshSessions: () => chatbotId ? fetchSessions(chatbotId) : Promise.resolve()
  };
}; 