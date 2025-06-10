"use client";

import { useState } from "react";
import WebsiteForm from "@/components/WebsiteForm/WebsiteForm";
import DocumentForm from "@/components/DocumentForm/DocumentForm";
import FAQForm from "@/components/FAQForm/FAQForm";
import TextForm from "@/components/TextForm/TextForm";
import { ChevronRight, PanelTop, File, MessageCircleQuestion, AlignLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateChatbot } from '@/hooks/useCreateChatbot';
import { getAccessToken } from "@/actions/tokenManager";

const sources = ["website", "document", "faq", "text"] as const;
type SourceType = typeof sources[number];

const sourceIcons = {
  website: PanelTop,
  document: File,
  faq: MessageCircleQuestion,
  text: AlignLeft,
};

interface CreateChatbot3Props {
  name?: string;
  primaryColor?: string;
  textColor?: string;
  welcomeMessage?: string;
  welcomePopup?: string;
  chatPlaceholder?: string;
  logo?: File | null;
}

export default function CreateChatbot3(props?: CreateChatbot3Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Use props if provided, otherwise fall back to URL params (for backward compatibility)
  const botName = props?.name || searchParams.get("name") || "";

  const [selectedSource, setSelectedSource] = useState<SourceType>("website");
  const [trainingData, setTrainingData] = useState<string | string[] | File[] | null>(null);
  const { createChatbot, loading, error } = useCreateChatbot();

  const handleSourceChange = (source: SourceType) => {
    setSelectedSource(source);
  };

  const handleSubmit = async () => {
    console.log(trainingData);
    if (!trainingData || !botName.trim()) {
      toast.error("Please provide a chatbot name and training data.");
      return;
    }

    const formData = new FormData();
    formData.append("name", botName);
    
    if (props?.primaryColor) {
      formData.append("primary_color", props.primaryColor);
    }
    if (props?.textColor) {
      formData.append("text_color", props.textColor);
    }
    if (props?.welcomeMessage) {
      formData.append("welcome_message", props.welcomeMessage);
    }
    if (props?.welcomePopup) {
      formData.append("welcome_popup", props.welcomePopup);
    }
    if (props?.chatPlaceholder) {
      formData.append("chat_input", props.chatPlaceholder);
    }
    if (props?.logo) {
      formData.append("logo", props.logo);
    }
    
    if (Array.isArray(trainingData)) {
      trainingData.forEach(doc => formData.append("documents", doc));
    } else {
      formData.append("documents", trainingData as string);
    }

    // Check if user is authenticated
    const accessToken = await getAccessToken();
    if (!accessToken) {
      toast.error("You must be logged in to create a chatbot.");
      router.push("/auth/Login");
      return;
    }

    const success = await createChatbot(formData);
    if (success) {
      toast.success("Chatbot created successfully!");
      router.push("/Chats");
    } else {
      toast.error(error || "Failed to create chatbot.");
    }
  };

  const renderSourceComponent = () => {
    switch (selectedSource) {
      case "website":
        return <WebsiteForm />;
      case "document":
        return <DocumentForm onData={(data) => setTrainingData(data)} />;
      case "faq":
        return <FAQForm />;
      case "text":
        return <TextForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-semibold">
              2
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Train your chatbot</h2>
          </div>
          <button
            onClick={() => router.push("/Chats")}
            className="text-sm text-gray-600 bg-gray-100 p-2 rounded-md hover:text-black flex items-center gap-1 transition"
          >
            Skip for now
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-gray-500 px-8">
          Select a data source to help your chatbot learn and provide better responses.
        </p>
      </div>
      <div className="bg-white border rounded-lg p-4 space-y-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-md w-fit">
          {sources.map((s) => {
            const Icon = sourceIcons[s];
            return (
              <button
                key={s}
                onClick={() => handleSourceChange(s)}
                className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-md capitalize transition-all ${selectedSource === s
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {s}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {renderSourceComponent()}
          <Button
            onClick={handleSubmit}
            className="bg-brand-primary hover:bg-brand-secondary text-white w-fit rounded-md text-sm"
            disabled={loading}
          >
            {loading ? "Training..." : "Start Training"}
          </Button>
        </div>
      </div>

    </div>
  );
}
