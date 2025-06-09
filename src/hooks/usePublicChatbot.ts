import { useState, useEffect } from "react";
import { customFetch } from "@/services/api";
import { Chatbot } from "@/services/types/chatbots";

type UsePublicChatbotResult = {
  chatbot: Chatbot | null;
  loading: boolean;
  error: string | null;
};

export const usePublicChatbot = (chatbotId: string | null): UsePublicChatbotResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);

  useEffect(() => {
    if (!chatbotId) {
      setLoading(false);
      setChatbot(null);
      setError(null);
      return;
    }

    const fetchChatbot = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await customFetch<Chatbot>({
          endpoint: `/chatbots/${chatbotId}/`,
          method: 'GET',
          requiresAuth: false, // Public endpoint for iframe usage
        });
        setChatbot(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load chatbot configuration";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchChatbot();
  }, [chatbotId]);

  return {
    chatbot,
    loading,
    error,
  };
}; 