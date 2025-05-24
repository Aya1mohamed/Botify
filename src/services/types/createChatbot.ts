export interface CreateChatbotBody {
  name: string;
  documents: string[];
}

export interface CreateChatbotResponse {
  success: boolean;
  message?: string;
  error?: string;
}
