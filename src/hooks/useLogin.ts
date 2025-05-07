import { useState } from "react";
import { LoginBody } from "@/services/types/login";
import { login } from "@/actions/login";

type UseLoginResult = {
    error: string | null;
    loading: boolean;
    login: (body: LoginBody) => Promise<boolean | null>;
}

export const useLogin = (): UseLoginResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loginFn = async (body: LoginBody): Promise<boolean | null> => {
        setLoading(true);
        setError(null);

        try {
            const result = await login(body);
            console.log(result)
            setLoading(false);

            if (!result.success) {
                setError(result.error || "Login failed");
                return null;
            }

            // Return response data if needed
            // Note: You'll need to modify your server action to return user data
            // if you need access to it in the component
            return result.success; // Or return null if you don't need the response data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
            setError(errorMessage);
            setLoading(false);
            return null;
        }
    };

    return {
        error,
        loading,
        login: loginFn
    };
}