import { useState, useEffect } from "react";
import { LoginBody } from "@/services/types/login";
import { login } from "@/actions/login";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/tokens";
import { useRouter, useSearchParams } from "next/navigation";

type UseLoginResult = {
    error: string | null;
    loading: boolean;
    login: (body: LoginBody) => Promise<boolean | null>;
    isAuthenticated: boolean;
}

export const useLogin = (): UseLoginResult => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Check if user is already authenticated
    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            setIsAuthenticated(true);
            
            // If user is already authenticated and on the login page, redirect
            if (window.location.pathname.includes('/auth/Login')) {
                const callbackUrl = searchParams.get('callbackUrl') || '/Dashboard';
                router.push(callbackUrl);
            }
        }
    }, [router, searchParams]);

    const loginFn = async (body: LoginBody): Promise<boolean | null> => {
        setLoading(true);
        setError(null);
        console.log(body);
        try {
            const result = await login(body);
            setLoading(false);

            if (!result.success) {
                setError(result.error || "Login failed");
                return null;
            }
            
            // Check if tokens were returned in the response
            if (result.tokens) {
                // Store tokens in localStorage for client-side access
                localStorage.setItem(ACCESS_TOKEN, result.tokens.access);
                if (result.tokens.refresh) {
                    localStorage.setItem(REFRESH_TOKEN, result.tokens.refresh);
                }
                
                setIsAuthenticated(true);
                
                // Redirect to the callback URL if it exists
                const callbackUrl = searchParams.get('callbackUrl') || '/Dashboard';
                router.push(callbackUrl);
            }

            return result.success;
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
        login: loginFn,
        isAuthenticated
    };
}