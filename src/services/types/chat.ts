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

export interface ChatSession {
  id: string;
  chatbot: Chatbot;
  created_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  original_text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export type GetSessionsResponse = ChatSession[];
export type GetMessagesResponse = Message[]; 