export interface RegisterBody extends Record<string, unknown> {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    password1: string;
    email: string;
    phone_number: string;
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
    error?: string;
}