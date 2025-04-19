"use client"

import { useState } from "react"
import WebsiteForm from "@/components/WebsiteForm/WebsiteForm"
import DocumentForm from "@/components/DocumentForm/DocumentForm"
import FAQForm from "@/components/FAQForm/FAQForm"
import TextForm from "@/components/TextForm/TextForm"
import { ChevronRight, PanelTop, File, MessageCircleQuestion, AlignLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const sources = ["website", "document", "FAQ", "text"] as const
type SourceType = typeof sources[number]

const sourceIcons = {
  website: PanelTop,
  document: File,
  FAQ: MessageCircleQuestion,
  text: AlignLeft,
}

export default function CreateChatbot3() {
  const [source, setSource] = useState<SourceType>("website")
  const router = useRouter()

  const renderSourceComponent = () => {
    switch (source) {
      case "website":
        return <WebsiteForm />
      case "document":
        return <DocumentForm />
      case "FAQ":
        return <FAQForm />
      case "text":
        return <TextForm />
    }
  }

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
            onClick={() => router.push("/CreateChatbot4")}
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
            const Icon = sourceIcons[s]
            return (
              <button
                key={s}
                onClick={() => setSource(s)}
                className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-md capitalize transition-all ${
                  source === s ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {s}
              </button>
            )
          })}
        </div>

        <div>{renderSourceComponent()}</div>
      </div>
    </div>
  )
}
