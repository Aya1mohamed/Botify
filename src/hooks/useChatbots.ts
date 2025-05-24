import { useState, useEffect } from "react";
import { getChatbots } from "@/actions/getChatbots";
import { Chatbot } from "@/services/types/chatbots";

type UseChatbotsResult = {
  chatbots: Chatbot[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useChatbots = (): UseChatbotsResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);

  const fetchChatbots = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const result = await getChatbots();
      if (result.success && result.data) {
        setChatbots(result.data);
      } else {
        setError(result.error || "Failed to fetch chatbots");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatbots();
  }, []);

  return {
    chatbots,
    loading,
    error,
    refetch: fetchChatbots,
  };
}; 