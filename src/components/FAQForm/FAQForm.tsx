"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQForm() {
  const router = useRouter();

  const handleTraining = () => {
    router.push("/Botify");
  };

  return (
    <div className="p-1 rounded-lg space-y-4 shadow-sm bg-white">
      <p className="text-sm font-medium">Add FAQs</p>
      <Input
        type="text"
        placeholder="Add new FAQ"
        className="w-full border border-gray-300 focus:outline-none focus:ring-0 focus:border-brand-secondary bg-gray-100 text-center px-3 py-2 rounded-md text-sm"
      />
      <Button
        onClick={handleTraining}
        className="bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-md text-sm"
      >
        Start training
      </Button>
    </div>
  );
}
