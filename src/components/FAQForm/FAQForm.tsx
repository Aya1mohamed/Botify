"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface FAQFormProps {
  onData: (data: string[]) => void; // Accepts training data
}

export default function FAQForm({ onData }: FAQFormProps) {
  const [faqs, setFaqs] = useState([""]);

  const handleAddFAQ = () => {
    setFaqs([...faqs, ""]);
  };

  const handleRemoveFAQ = (index: number) => {
    const updated = [...faqs];
    updated.splice(index, 1);
    setFaqs(updated);
  };

  const handleMessageChange = (index: number, newText: string) => {
    const updated = [...faqs];
    updated[index] = newText;
    setFaqs(updated);
  };

  return (
    <div className="p-1 rounded-lg space-y-4 shadow-sm bg-white">
      <p className="text-sm font-medium">Add FAQs</p>
      {faqs.map((faq, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <Input
            value={faq}
            onChange={(e) => handleMessageChange(index, e.target.value)}
            className="bg-gray-100 m-1 flex-1 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary"
            placeholder={`FAQ #${index + 1}`}
          />
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => handleRemoveFAQ(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <Button
        variant="outline"
        className="border-brand-secondary  text-brand-secondary text-sm"
        onClick={handleAddFAQ}
      >
        Add FAQ
      </Button>
    </div>
  );
}