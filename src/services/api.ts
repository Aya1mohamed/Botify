import { getAccessToken } from '@/actions/tokenManager';
import { UNAUTHORIZED } from '@/constants/statusCodes';

/**
 * Check if the code is being run on the browser then replaces the location to /.
 * @param error
 */
// export const isClientSide = (): boolean => typeof window !== 'undefined';

// export const handleReLogin = async (error?: unknown) => {
//     await deleteTokens();
//     await deleteProfile();
//     isClientSide() && window?.location?.replace('/login');
//     throw error;
// };

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
    body?: Record<string, unknown>;
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

    if (requiresAuth) {
        try {
            accessToken = await getAccessToken();
            if (!accessToken) {
                throw new Error('No access token');
            } else {
                accessToken = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.error('Error in customFetch:', error);
            // return handleReLogin(error);
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

    if (body && method !== 'GET' && shouldStringify) {
        fetchOptions.body = JSON.stringify(body);
    } else if (body && method !== 'GET') {
        fetchOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(fullUrl, fetchOptions);
        console.log(response);
        if (!response.ok) {
            if (response.status === UNAUTHORIZED) {
                // handleReLogin();
                console.error('Unauthorized');
            }
            if (preventThrow) {
                return await response.json();
            } else {
                const errorMessage = (await response.json()) as {
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
