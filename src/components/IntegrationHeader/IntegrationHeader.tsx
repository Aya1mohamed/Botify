"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LinkIntegration from "../LinkIntegration/LinkIntegration"
import ScriptIntegration from "../ScriptIntegration/ScriptIntegration"
import IframeIntegration from "../IframeIntegration/IframeIntegration"
import WidgetUIDIntegration from "../WidgetUIDIntegration/WidgetUIDIntegration"
import QRCodeIntegration from "../QRCodeIntegration/QRCodeIntegration"

const sources = ["link", "script", "iframe", "widget UID","QR Code"] as const
type SourceType = typeof sources[number]

export default function IntegrationHeader() {
  const [source, setSource] = useState<SourceType>("link")
  const router = useRouter()

  const renderSourceComponent = () => {
    switch (source) {
      case "link":
        return <LinkIntegration />
      case "script":
        return <ScriptIntegration />
      case "iframe":
        return <IframeIntegration />
      case "widget UID":
        return <WidgetUIDIntegration />
        case "QR Code":
            return <QRCodeIntegration />
        
    }
  }

  return (
    <div className=" space-y-4">
      <div className="space-y-2">
        <div className="flex flex-col justify-between">
        <h2 className="text-lg font-semibold">Integrate Chatbot Widget</h2>
        <p className="text-sm text-gray-500">You can integrate your chatbot widget in your website using the following methods.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg space-y-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-md w-fit">
          {sources.map((s) => {
            return (
              <button
                key={s}
                onClick={() => setSource(s)}
                className={`flex gap-1 text-sm px-3 py-1.5 rounded-md capitalize transition-all ${
                  source === s ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
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
