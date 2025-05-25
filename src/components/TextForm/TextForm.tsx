"use client";

import { useState } from "react";
import { Textarea } from "../ui/textarea";

export default function TextForm() {
  const [textData, setTextData] = useState("");

  return (
    <div className="p-1 rounded-lg space-y-4 shadow-sm bg-white">
      <p className="text-sm font-medium">Add your text to train</p>
      <Textarea
        rows={6}
        maxLength={65000}
        placeholder="Paste your text here..."
        value={textData}
        onChange={(e) => setTextData(e.target.value)}
        className="w-full border border-gray-300 focus:outline-none focus:ring-0 focus:border-brand-secondary bg-gray-100 px-3 py-2 rounded-md text-sm resize-none"
      />
      <div className="text-right text-xs text-gray-500">0 / 65000 characters</div>
    </div>
  );
}