"use client";

import React, { useState, useEffect } from "react";
import SideBar2 from "@/components/SideBar2/SideBar2";
import IntegrationHeader from "@/components/IntegrationHeader/IntegrationHeader";
import IntegrationCardList from "@/components/IntegrationCardList/IntegrationCardList";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useChatSessionsByChatbot } from "@/hooks/useChatSessionsByChatbot";
import { useChatMessages } from "@/hooks/useChatMessages";
import { Message } from "@/services/types/chat";
import { useParams } from "next/navigation";

export default function BotifyPage() {
  const params = useParams();
  const chatbotId = params.id as string;
  const [activeTab, setActiveTab] = useState("conversations");

  // Chat sessions functionality - now fetching only for this chatbot
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const { sessions, loading: sessionsLoading, error: sessionsError } = useChatSessionsByChatbot(chatbotId);
  const { messages: initialMessages, loading: messagesLoading, error: messagesError } = useChatMessages(selectedSession);
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Update messages when initialMessages changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Handle WebSocket connection
  useEffect(() => {
    if (!selectedSession) {
      if (socket) {
        socket.close();
        setSocket(null);
      }
      return;
    }

    const ws = new WebSocket(`wss://botify-production.up.railway.app/ws/chat/${selectedSession}/`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.content) {
        setMessages(prevMessages => [...prevMessages, data.content]);
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
  }, [selectedSession]);

  const renderContent = () => {
    switch (activeTab) {
      case "conversations":
        if (sessionsError) {
          return <div className="p-4 text-red-500">Error loading sessions: {sessionsError}</div>;
        }

        if (sessionsLoading) {
          return <div className="p-4">Loading sessions...</div>;
        }

        return (
          <div className="flex h-screen max-h-screen">
            {/* Sessions List */}
            <div className="w-1/3 border-r border-border bg-muted/30">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Chat Sessions</h2>
              </div>
              <ScrollArea className="h-[calc(100vh-5rem)]">
                <div className="p-2 space-y-2">
                  {sessions.map((session) => (
                    <Card
                      key={session.id}
                      className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                        selectedSession === session.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedSession(session.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span className="font-medium">{session.chatbot.name}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(session.created_at), "MMM d, yyyy HH:mm")}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">
                  {selectedSession 
                    ? `Chat History - ${sessions.find(s => s.id === selectedSession)?.chatbot.name}`
                    : "Select a session to view messages"}
                </h2>
              </div>
              <ScrollArea className="flex-1 p-4">
                {messagesError && (
                  <div className="text-red-500 mb-4">Error loading messages: {messagesError}</div>
                )}
                {messagesLoading ? (
                  <div>Loading messages...</div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <Card 
                          className={`max-w-[70%] p-3 ${
                            message.sender === "user" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words">{message.original_text}</p>
                          <div className="text-xs opacity-70 mt-1">
                            {format(new Date(message.timestamp), "HH:mm:ss")}
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        );
      case "integrations":
        return (
          <>
            <IntegrationHeader />
            <IntegrationCardList />
          </>
        );
      case "settings":
        return <div>Settings content goes here</div>;
      default:
        return <div>Conversations content goes here</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar2
        selected={activeTab}
        onSelect={(key: string) => setActiveTab(key)}
      />
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
} 