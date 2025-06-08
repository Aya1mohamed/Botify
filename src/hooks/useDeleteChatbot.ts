import { useState } from 'react';
import { deleteChatbot } from '@/actions/deleteChatbot';

type UseDeleteChatbotResult = {
  error: string | null;
  loading: boolean;
  deleteChatbot: (chatbotId: string) => Promise<boolean | null>;
};

export const useDeleteChatbot = (): UseDeleteChatbotResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFn = async (chatbotId: string): Promise<boolean | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await deleteChatbot(chatbotId);
      if (result.success) {
        console.log(result);
        return true;
      } else {
        setError(result.error || 'Failed to delete chatbot');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    deleteChatbot: deleteFn,
  };
};