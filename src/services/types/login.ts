export interface LoginBody extends Record<string, unknown> {
    username: string;
    password: string
}

export interface LoginResponse {
    access: string;
    refresh: string;
}