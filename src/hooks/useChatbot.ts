import { useState, useEffect } from "react";
import { customFetch } from "@/services/api";
import { Chatbot } from "@/services/types/chatbots";

type UseChatbotResult = {
  chatbot: Chatbot | null;
  loading: boolean;
  error: string | null;
};

export const useChatbot = (chatbotId: string): UseChatbotResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);

  useEffect(() => {
    const fetchChatbot = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await customFetch<Chatbot>({
          endpoint: `/chatbots/${chatbotId}/`,
          method: 'GET',
          requiresAuth: true,
        });
        setChatbot(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
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