'use client';

import { useState } from "react";
import { sendDashboardUserMessage } from "@/actions/chat";

type UseSendDashboardMessageResult = {
  error: string | null;
  loading: boolean;
  sendMessage: (sessionId: string, message: string) => Promise<boolean>;
};

export const useSendDashboardMessage = (): UseSendDashboardMessageResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (sessionId: string, message: string): Promise<boolean> => {
    if (!sessionId || !message.trim()) {
      setError("Session ID and message are required");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await sendDashboardUserMessage(sessionId, message);
      if (result.success) {
        return true;
      } else {
        setError(result.error || "Failed to send message");
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    sendMessage,
  };
};
