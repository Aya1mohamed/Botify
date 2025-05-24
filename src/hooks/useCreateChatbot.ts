import { useState } from "react";
import { createChatbot } from "@/actions/createChatbot";

type UseCreateChatbotResult = {
  error: string | null;
  loading: boolean;
  createChatbot: (formData: FormData) => Promise<boolean | null>;
};

export const useCreateChatbot = (): UseCreateChatbotResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerFn = async (formData: FormData): Promise<boolean | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await createChatbot(formData);
      if (result.success) {
        console.log(result);
        return true;
      } else {
        setError(result.error || "Failed to create chatbot");
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