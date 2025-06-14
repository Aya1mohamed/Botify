import React from 'react';
import { Copy } from "lucide-react";

const WidgetUIDIntegration = ({ chatbotId }: { chatbotId: string }) => {
  const widgetUID = `${window.location.origin}/Chat?chatbot_id=${chatbotId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetUID);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md w-fit gap-2 flex items-center justify-between">
        <a href={widgetUID} className="text-xs text-blue-600 underline break-all">
          {widgetUID}
        </a>      <button onClick={handleCopy} className="p-1 rounded hover:bg-gray-200">
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );
};

export default WidgetUIDIntegration;
