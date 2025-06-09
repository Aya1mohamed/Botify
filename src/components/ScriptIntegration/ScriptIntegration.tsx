import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScriptIntegrationProps {
  chatbotId?: string;
}

const ScriptIntegration = ({ chatbotId }: ScriptIntegrationProps) => {
  const [copied, setCopied] = useState(false);
  
  // Use current domain for baseUrl in production, fallback for development
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://yourdomain.com';

  const scriptCode = `<!-- Chat Widget Configuration -->
<script>
  window.ChatWidgetConfig = {
    chatbotId: '${chatbotId || 'your-chatbot-id'}',
    baseUrl: '${baseUrl}'
  };
</script>

<!-- Load Chat Widget -->
<script src="${baseUrl}/chat-widget.js"></script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Integration Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">How to integrate the chat widget</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
              1
            </div>
            <div>
              <p className="font-medium">Copy the script code below</p>
              <p className="text-gray-600">This script will load the chat widget on your website</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
              2
            </div>
            <div>
              <p className="font-medium">Paste it before the closing &lt;/body&gt; tag</p>
              <p className="text-gray-600">Add the script to any HTML page where you want the chat widget to appear</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
              3
            </div>
            <div>
              <p className="font-medium">The widget will appear automatically</p>
              <p className="text-gray-600">A chat button will appear in the bottom-right corner of your website</p>
            </div>
          </div>
        </div>
      </div>

      {/* Script Code */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Script Code</h4>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs p-4 rounded-md overflow-x-auto">
          <pre className="whitespace-pre-wrap">{scriptCode}</pre>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <h4 className="font-medium">Features included:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Responsive design (mobile & desktop)
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            No external dependencies required
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Customizable position and styling
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Cross-browser compatible
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Secure iframe sandboxing
          </li>
        </ul>
      </div>

      {/* Test Button */}
      <div className="border-t pt-4">
        <Button
          onClick={() => {
            const testUrl = chatbotId 
              ? `${baseUrl}/test-integration.html?chatbot_id=${chatbotId}`
              : `${baseUrl}/test-integration.html`;
            window.open(testUrl, '_blank');
          }}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Test Integration
        </Button>
        <p className="text-xs text-gray-500 mt-1">
          Opens a demo page to test the chat widget integration
        </p>
      </div>
    </div>
  );
};

export default ScriptIntegration;
