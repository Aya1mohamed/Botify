import React from 'react';
import { Copy } from "lucide-react";

const IframeIntegration = () => {
  const iframeCode = `<iframe src="https://widget.botify.ai/d1e3776c-5005-47ce-9e7c-17488ac756c6" width="100%" height="700"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
  };

  return (
    <div className="bg-gray-900 dark:bg-gray-800 w-fit text-white text-xs p-4 rounded-md gap-2 flex  items-center justify-between">
      <pre>{iframeCode}</pre>
      <button
        onClick={handleCopy}
        className=" p-1 rounded hover:bg-gray-800"
      >
        <Copy className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default IframeIntegration;
