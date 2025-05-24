"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

interface Message {
  id: string;
  session_id: string;
  original_text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const chatbotId = searchParams.get("chatbot_id") || null;
  const sessionId = searchParams.get("session_id") || null;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setInputValue("");
    setIsLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8002/api/generate-response/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
        },
        body: JSON.stringify({
          original_text: inputValue,
          chatbot_id: chatbotId,
          session_id: sessionId
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      
      const botResponse: Message = await response.json();
      
      // If this is the first message and we got a new session_id, update the URL
      if (!sessionId && botResponse.session_id) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("session_id", botResponse.session_id);
        router.push(`/Chat?${params.toString()}`);
      }
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          session_id: sessionId || "",
          original_text: "Sorry, there was an error processing your request.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen p-4 md:p-6">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center p-8">
            <div className="max-w-md">
              <h3 className="text-xl font-semibold mb-2">Welcome to the Chat</h3>
              <p className="text-muted-foreground">
                Start a conversation by typing a message below.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card 
                className={`max-w-[80%] p-3 ${
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.original_text}</p>
                <div className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </Card>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 bg-background pt-2">
        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none min-h-[60px]"
            disabled={isLoading || !chatbotId}
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !inputValue.trim() || !chatbotId}
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        {!chatbotId && (
          <p className="text-destructive mt-2 text-sm">
            No chatbot ID provided. Please include a chatbot_id in the URL.
          </p>
        )}
      </div>
    </div>
  );
}
