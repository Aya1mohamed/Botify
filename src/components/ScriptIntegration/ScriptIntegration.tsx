import React from 'react';
import { Copy } from "lucide-react";

const ScriptIntegration = () => {
  const scriptCode = `<script>
  window.BOTIFY_WIDGET_ID="d1e3776c-5005-47ce-9e7c-17488ac756c6";
  (function(){var s=document.createElement("script");s.src="https://widget.botify.ai/widget.bundle.js";s.async=true;
  document.body.appendChild(s);})();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
  };

  return (
    <div className="bg-gray-900 w-fit text-white text-xs p-4 rounded-md relative overflow-auto">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded hover:bg-gray-800"
      >
        <Copy className="w-4 h-4 text-white" />
      </button>
      <pre className="pt-2">{scriptCode}</pre> 
    </div>
  );
};

export default ScriptIntegration;
