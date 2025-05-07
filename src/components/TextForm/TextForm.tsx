"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function TextForm() {
  const router = useRouter();

  const handleTraining = () => {
    router.push("/Botify");
  };

  return (
    <div className="p-1 rounded-lg space-y-4 shadow-sm bg-white">
      <p className="text-sm font-medium">Add your text to train</p>
      <textarea
        rows={6}
        maxLength={65000}
        placeholder="Paste your text here..."
        className="w-full border border-gray-300 focus:outline-none focus:ring-0 focus:border-brand-secondary bg-gray-100 px-3 py-2 rounded-md text-sm resize-none"
      />
      <div className="text-right text-xs text-muted-foreground">0/65000</div>
      <Button
        onClick={handleTraining}
        className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-md text-sm"
      >
        Start training
      </Button>
      <Input
        type="text"
        placeholder="Add new Text"
        className="w-full border border-gray-300 bg-gray-100 text-center px-3 py-2 rounded-md text-sm"
      />
    </div>
  );
}
