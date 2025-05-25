import { getAccessToken, deleteTokens } from '@/actions/tokenManager';
import { UNAUTHORIZED, BAD_REQUEST } from '@/constants/statusCodes';
import { formatValidationErrors, ValidationErrorResponse } from './utils/formatValidationErrors';

/**
 * Check if the code is being run on the browser.
 */
export const isClientSide = (): boolean => typeof window !== 'undefined';

/**
 * Handle re-login by removing tokens and redirecting to login page.
 * @param error The error that triggered re-login.
 */
export const handleReLogin = async (callbackUrl?: string, error?: unknown) => {
    await deleteTokens();
    
    if (isClientSide()) {
        const loginUrl = callbackUrl 
            ? `/auth/Login?callbackUrl=${encodeURIComponent(callbackUrl)}`
            : '/auth/Login';
        window.location.href = loginUrl;
    }
    
    if (error) throw error;
};

/**
 * Fetch data from an API endpoint with optional configuration.
 *
 * @param url - The base URL for the API request. Must be explicitly provided.
 * @param endpoint - The specific API endpoint to request.
 * @param body - The body to send with the request (for methods like POST, PUT). Optional.
 * @param method - The HTTP method to use for the request. Defaults to 'GET'.
 * @param options - Additional options to configure the fetch request.
 * @param headers - Custom headers to include in the request. Optional.
 * @param shouldStringify - Whether to stringify the body for non-GET methods. Defaults to true.
 * @param requiredAuth - The type of auth that should be set for the request, including no auth
 * @param addContentType - Whether to include the content type in the request
 * @param preventThrow - Whether to return a non-200 status response directly instead of throwing simplified exception
 * @returns - A promise that resolves to the data of type T from the response.
 * @throws - Throws an error if the request fails or the response is not ok.
 */
export async function customFetch<T>({
    endpoint,
    body,
    method = 'GET',
    options,
    headers = {},
    shouldStringify = true,
    requiresAuth = false,
    addContentType = true,
    preventThrow = false,
}: {
    endpoint: string;
    body?: Record<string, unknown> | FormData;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    options?: RequestInit & { next?: { revalidate?: number } };
    headers?: Record<string, string>;
    shouldStringify?: boolean;
    requiresAuth?: boolean;
    addContentType?: boolean;
    preventThrow?: boolean;
}): Promise<T> {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    let accessToken;
    console.log(fullUrl);
    if (requiresAuth) {
        try {
            accessToken = await getAccessToken();
            if (!accessToken) {
                handleReLogin(isClientSide() ? window.location.href : undefined);
                throw new Error('No access token');
            } else {
                accessToken = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.error('Error in customFetch:', error);
            handleReLogin(isClientSide() ? window.location.href : undefined, error);
        }
    }

    const requestHeaders = {
        ...(accessToken && { Authorization: accessToken }),
        ...(addContentType && { 'Content-Type': 'application/json' }),
        ...headers,
    };

    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
        method,
        headers: requestHeaders,
        ...options,
    };

    if (body && method !== 'GET') {
        if (body instanceof FormData) {
            // For FormData, don't stringify and let the browser set the content-type
            fetchOptions.body = body;
        } else if (shouldStringify) {
            fetchOptions.body = JSON.stringify(body);
        } else {
            fetchOptions.body = JSON.stringify(body);
        }
    }

    try {
        const response = await fetch(fullUrl, fetchOptions);
        // const responseData = await response.json();
        // console.log(responseData);
        if (!response.ok) {
            if (response.status === UNAUTHORIZED) {
                handleReLogin(isClientSide() ? window.location.href : undefined);
                throw new Error('Unauthorized access');
            }
            
            if (preventThrow) {
                return await response.json();
            } else {
                const errorData = await response.json();
                
                // Handle 400 Bad Request with field validation errors
                if (response.status === BAD_REQUEST) {
                    // Check if the error response matches the validation error structure
                    if (errorData && typeof errorData === 'object' && !errorData.message && !errorData.details) {
                        const formattedError = formatValidationErrors(errorData as ValidationErrorResponse);
                        throw new Error(formattedError);
                    }
                }
                
                // Handle other error formats (existing logic)
                const errorMessage = errorData as {
                    message: string;
                    details: string;
                };
                throw new Error(
                    `${errorMessage.message}. ${errorMessage.details ? errorMessage.details : ''}` ||
                    'Failed to fetch data',
                );
            }
        }
        
        return response.headers.get('content-type')?.includes('text/plain')
            ? (response.text() as Promise<T>)
            : (response.json() as Promise<T>);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}
