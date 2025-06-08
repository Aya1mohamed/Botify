import React from 'react';
import { Copy } from "lucide-react";

const LinkIntegration = () => {
  const widgetUrl = "https://widget.Botify.ai/d1e3776c-5005-47ce-9e7c-17488ac756c6";

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetUrl);
  };

  return (
    <div className="space-y-4">


      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-md w-fit gap-2 flex  items-center justify-between">
        <a href={widgetUrl} className="text-xs text-blue-600 underline break-all">
          {widgetUrl}
        </a>
        <button onClick={handleCopy} className="top-1 p-1 rounded hover:bg-gray-200">
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LinkIntegration;

