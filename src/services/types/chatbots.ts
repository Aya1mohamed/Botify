export interface Chatbot {
  id: string;
  name: string;
  primary_color: string;
  logo: string | null;
  text_color: string;
  welcome_message: string | null;
  welcome_popup: string | null;
  chat_input: string | null;
}

export interface ChatbotsResponse {
  success: boolean;
  data?: Chatbot[];
  error?: string;
} 