// src/hooks/useRegister.ts
import { useState } from "react";
import { register } from "@/actions/register";
import { RegisterBody } from "@/services/types/register";

type UseRegisterResult = {
  error: string | null;
  loading: boolean;
  registerUser: (body: RegisterBody) => Promise<boolean | null>;
};

export const useRegister = (): UseRegisterResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (body: RegisterBody): Promise<boolean | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await register(body);

      if (!result.success) {
        setError(result.error || "Registration failed");
        return null;
      }
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    registerUser,
  };
};