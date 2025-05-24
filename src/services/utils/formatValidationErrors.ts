/**
 * Type for backend validation error response structure
 */
export type ValidationErrorResponse = Record<string, string[] | Record<string, string[]>>;

/**
 * Formats backend validation errors into a readable string.
 * Takes the error response from 400 Bad Request and converts it to a user-friendly message.
 * 
 * @param errors - The validation error object from the backend
 * @returns A formatted error message string
 * 
 * @example
 * // Simple format:
 * {
 *   "email": ["Email already exists"],
 *   "username": ["A user with that username already exists."],
 *   "phone_number": ["User with this Phone Number already exists."]
 * }
 * 
 * // Output:
 * "Email: Email already exists. Username: A user with that username already exists. Phone Number: User with this Phone Number already exists."
 * 
 * @example
 * // Nested format:
 * {
 *   "documents": {
 *     "0": ["File type not allowed. Only PDF, TXT, and DOCX files are accepted."]
 *   },
 *   "logo": ["The submitted data was not a file. Check the encoding type on the form."]
 * }
 * 
 * // Output:
 * "Documents 0: File type not allowed. Only PDF, TXT, and DOCX files are accepted. Logo: The submitted data was not a file. Check the encoding type on the form."
 */
export function formatValidationErrors(errors: ValidationErrorResponse): string {
  if (!errors || typeof errors !== 'object') {
    return 'Validation failed';
  }

  const errorMessages = Object.entries(errors)
    .map(([field, value]) => {
      // Handle simple case: field -> array of messages
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return null;
        }
        
        // Format field name: convert snake_case to Title Case
        const formattedField = field
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Join multiple messages for the same field
        const messageText = value.join(', ');
        
        return `${formattedField}: ${messageText}`;
      }
      
      // Handle nested case: field -> object -> sub-field -> array of messages
      if (typeof value === 'object' && value !== null) {
        const nestedMessages = Object.entries(value)
          .map(([subField, messages]) => {
            if (!Array.isArray(messages) || messages.length === 0) {
              return null;
            }
            
            // Format main field name: convert snake_case to Title Case
            const formattedField = field
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            // Join multiple messages for the same sub-field
            const messageText = messages.join(', ');
            
            return `${formattedField} ${subField}: ${messageText}`;
          })
          .filter(Boolean); // Remove null entries
        
        return nestedMessages.length > 0 ? nestedMessages.join('. ') : null;
      }
      
      return null;
    })
    .filter(Boolean) // Remove null entries
    .join('. ');

  return errorMessages || 'Validation failed';
} 