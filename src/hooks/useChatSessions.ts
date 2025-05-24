'use client'

import { useState, useEffect } from "react";
import { getChatSessions } from "@/actions/chat";
import { ChatSession } from "@/services/types/chat";

export const useChatSessions = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getChatSessions();
      
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
    fetchSessions();
  }, []);

  return {
    sessions,
    loading,
    error,
    refreshSessions: fetchSessions
  };
}; 