/**
 * General purpose string sanitization to avoid injection issues
 * @param input string to be sanitized
 * @returns sanitized string
 */
export const sanitizeString = (input?: string): string => {
    if (!input) return '';

    if (input.startsWith('https://')) {
        return input;
    }

    return input
        .replace(/(\+\+|--|['";\\<>])/g, '')
        .replace(/[^a-zA-Z0-9\s.,!?@#()_\-+]/g, '');
};

/**
 * Sanitizer allowing only numeric characters in a string for ID/number purposes (nothing but 0-9)
 * @param input string to be sanitized
 * @returns  sanitized string
 */
export const sanitizeNumericString = (input?: string): string => {
    if (!input) return '';

    return input
        .replace(/(\+\+|--|['";\\<>])/g, '')
        .replace(/\D/g, '');
}
