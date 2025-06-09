"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, X } from "lucide-react";
import { useGenerateResponse } from "@/hooks/useGenerateResponse";
import { usePublicChatbot } from "@/hooks/usePublicChatbot";

interface Message {
  id: string;
  session_id: string;
  original_text: string;
  sender: "user" | "bot" | "admin";
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isWelcomeShown, setIsWelcomeShown] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { sendMessage: generateBotResponse, loading: isLoading, error: responseError } = useGenerateResponse();
  
  const chatbotId = searchParams.get("chatbot_id") || null;
  const sessionId = searchParams.get("session_id") || null;
  
  const { chatbot, loading: chatbotLoading, error: chatbotError } = usePublicChatbot(chatbotId);

  // Detect if we're in an iframe
  useEffect(() => {
    const inIframe = window.self !== window.top;
    setIsInIframe(inIframe);
    
    // If in iframe, automatically open the chat and load iframe styles
    if (inIframe) {
      setIsOpen(true);
      
      // Load iframe-specific CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/chat-widget-iframe.css';
      document.head.appendChild(link);
      
      // Add iframe class to body
      document.body.classList.add('chat-widget-iframe');
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message when chat opens and chatbot data is available
  useEffect(() => {
    if (isOpen && chatbot && !isWelcomeShown && chatbot.welcome_popup) {
      const welcomeMessage: Message = {
        id: "welcome-" + Date.now(),
        session_id: sessionId || "",
        original_text: chatbot.welcome_popup,
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
      setIsWelcomeShown(true);
    }
  }, [isOpen, chatbot, isWelcomeShown, sessionId]);

  // Handle WebSocket connection
  useEffect(() => {
    if (!sessionId) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      return;
    }

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/chat/${sessionId}/`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.content && data.content.sender === "admin") {
        const adminMessage: Message = {
          id: data.content.id,
          session_id: data.content.session_id,
          original_text: data.content.original_text,
          sender: data.content.sender,
          timestamp: data.content.timestamp,
        };
        setMessages(prevMessages => [...prevMessages, adminMessage]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !chatbotId) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      session_id: sessionId || "",
      original_text: inputValue,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    
      const botResponse = await generateBotResponse({
      original_text: currentInput,
      chatbot_id: chatbotId,
      session_id: sessionId
    });
    
    if (botResponse && botResponse.original_text && botResponse.original_text.length > 0) {
      // If this is the first message and we got a new session_id, update the URL
      if (!sessionId && botResponse.session_id) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("session_id", botResponse.session_id);
        router.push(`/Chat?${params.toString()}`);
      }
      
      setMessages(prev => [...prev, botResponse]);
    } else if (responseError) {
      // Add error message if the response failed
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          session_id: sessionId || "",
          original_text: `Sorry, there was an error processing your request: ${responseError}`,
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Show loading state while fetching chatbot data
  if (chatbotLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-full p-4 shadow-lg border animate-pulse">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Show error state if chatbot loading failed
  if (chatbotError || !chatbot) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-red-100 text-red-800 rounded-lg p-4 shadow-lg border max-w-xs">
          <p className="text-sm">Failed to load chat widget</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-widget ${isInIframe ? 'w-full h-full fixed inset-0' : 'fixed bottom-4 right-4'} z-50 chat-widget-container`}>
      {/* Chat Toggle Button */}
      {!isOpen && !isInIframe && (
        <div className="relative">
          <Button
            onClick={toggleChat}
            className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-200 sm:w-16 sm:h-16"
            style={{ 
              backgroundColor: chatbot.primary_color,
              color: chatbot.text_color 
            }}
          >
            {chatbot.logo ? (
              <img 
                src={chatbot.logo} 
                alt={chatbot.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <MessageCircle className="h-8 w-8" />
            )}
          </Button>
          
          {chatbot.welcome_message && (
            <div 
              className="absolute bottom-20 right-0 p-3 rounded-lg shadow-lg border animate-bounce hidden sm:block w-64 max-w-xs"
              style={{ 
                backgroundColor: chatbot.primary_color,
                color: chatbot.text_color 
              }}
            >
              <p className="text-sm whitespace-pre-wrap">{chatbot.welcome_message}</p>
              <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent" 
                   style={{ borderTopColor: chatbot.primary_color }}></div>
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white ${isInIframe ? 'w-full h-full rounded-none' : 'rounded-lg w-80 h-96 sm:w-80 sm:h-96 max-sm:chat-window-mobile'} shadow-2xl border flex flex-col chat-slide-up`}>
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 rounded-t-lg"
            style={{ 
              backgroundColor: chatbot.primary_color,
              color: chatbot.text_color 
            }}
          >
            <div className="flex items-center gap-2">
              {chatbot.logo ? (
                <img 
                  src={chatbot.logo} 
                  alt={chatbot.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <MessageCircle className="h-6 w-6" />
              )}
              <h3 className="font-semibold">{chatbot.name}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="h-6 w-6 p-0 hover:bg-white/20"
              style={{ color: chatbot.text_color }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <p className="text-gray-500 text-sm">Start a conversation...</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] p-2 rounded-lg text-sm ${
                      message.sender === "user" 
                        ? "rounded-br-none" 
                        : message.sender === "admin"
                        ? "bg-orange-100 border-orange-200 text-orange-900 rounded-bl-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                    style={message.sender === "user" ? {
                      backgroundColor: chatbot.primary_color,
                      color: chatbot.text_color
                    } : {}}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.original_text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={chatbot.chat_input || "Type your message..."}
                className="resize-none min-h-[40px] text-black text-sm"
                disabled={isLoading || !chatbotId}
                rows={1}
              />
              <Button 
                onClick={sendMessage} 
                disabled={isLoading || !inputValue.trim() || !chatbotId}
                size="sm"
                style={{ 
                  backgroundColor: chatbot.primary_color,
                  color: chatbot.text_color 
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
