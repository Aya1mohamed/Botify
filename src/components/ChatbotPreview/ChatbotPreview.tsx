import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import Image from "next/image";
import { ChevronDown, Paperclip } from "lucide-react";
import TabLayoutPreview from "@/components/TabLayoutPreview/TabLayoutPreview"

interface ChatbotPreviewProps {
  layout?: "chat" | "tab";
  logo?: string | null;
  botName?: string;
  primaryColor?: string;
  textColor?: string;
  welcomeMessage?: string;
  chatPlaceholder?: string;
  canSendAttachment?: boolean;
  chatBgColor?: string;
  messages?: string[];
}

export default function ChatbotPreview({
  layout = "chat",
  logo = "/home/robot-head.png",
  botName = "Botify",
  primaryColor = "#634464",
  textColor = "#FFFFFF",
  welcomeMessage = "👋 Hi there! How can I assist you today?",
  chatPlaceholder = "Ask your query...",
  canSendAttachment = true,
  chatBgColor = "#ffffff",
  messages = ["👋 Hi there! \n How can I assist you today?"],
}: ChatbotPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput("");
  };

  if (layout === "tab") {
    return (
      <TabLayoutPreview
        logo={logo}
        botName={botName}
        primaryColor={primaryColor}
        textColor={textColor}
        welcomeMessage={welcomeMessage}
        chatPlaceholder={chatPlaceholder}
        messages={messages}
      />
    );
  }

  return (
    <div className="fixed bottom-6 right-8 z-50 flex flex-col items-end">
      {!isOpen && showPopup && messages.length > 0 && (
        <div className="mb-2 relative max-w-xs text-sm bg-white border border-gray-300 rounded-lg p-3 shadow-md group">
          <button
            className="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setShowPopup(false)}
          >
            &times;
          </button>
          <p className="whitespace-pre-line text-gray-800">{messages[0]}</p>
        </div>
      )}



      {isOpen && (
        <div className="w-[360px] h-[420px] shadow-lg rounded-xl border mb-2 absolute bottom-16 right-0 flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="text-sm px-4 py-2 rounded-t-xl flex items-center justify-between gap-3"
            style={{ backgroundColor: primaryColor, color: textColor }}
          >
            <div className="flex items-center gap-2">
              <Image
                src={logo || "/home/robot-head.png"}
                alt="robot head"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="font-semibold text-base">{botName}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl font-bold"
              style={{ color: textColor }}
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div
            className="p-4 space-y-3 flex-1 overflow-y-auto"
            style={{ backgroundColor: chatBgColor, color: textColor }}
          >
            <div className="flex flex-col items-start gap-2">
              <Image
                className="border rounded-full"
                src={logo || "/home/robot-head.png"}
                alt="robot head"
                width={40}
                height={40}
                style={{ backgroundColor: primaryColor, padding: "4px" }}
              />
              <div
                className="p-3 rounded-e-lg rounded-bl-lg inline-block max-w-[80%]"
                style={{ backgroundColor: primaryColor, color: textColor }}
              >
                <p className="whitespace-pre-line">{welcomeMessage}</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="w-full border-t p-3 flex items-center gap-2 rounded-b-md"
            style={{ backgroundColor: chatBgColor }}
          >
            <input
              type="text"
              className="flex-1 outline-none text-sm placeholder:text-gray-400 bg-transparent"
              placeholder={chatPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ color: textColor }}
            />
            {canSendAttachment && (
              <button
                type="button"
                title="Attach file"
                className="text-gray-400 hover:text-gray-300"
              >
                <Paperclip className="w-5 h-5" />
              </button>
            )}
            <button
              type="submit"
              className="p-2 rounded-lg disabled:opacity-50"
              style={{ color: primaryColor }}
              disabled={!input.trim()}
            >
              <IoSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all"
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? (
          <ChevronDown color={textColor} />
        ) : (
          <Image
            src={logo || "/home/robot-head.png"}
            alt="robot head"
            width={40}
            height={40}
          />
        )}
      </button>
    </div>
  );
}
