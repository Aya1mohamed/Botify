"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface WebsiteFormProps {
  onData: (data: string) => void; // Accepts training data
}

export default function WebsiteForm({ onData }: WebsiteFormProps) {
  const [url, setUrl] = useState("");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div className="w-full">
      <h2 className="text-sm font-medium mb-2">Enter website URL</h2>
      <Input
        type="url"
        placeholder="https://example.com "
        value={url}
        onChange={handleUrlChange}
        className="bg-gray-100 flex-grow focus:outline-none focus:ring-0 focus:border-brand-secondary"
      />
    </div>
  );
}