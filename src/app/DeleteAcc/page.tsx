// app/Dashboard/delete-feedback.tsx

"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export default function page() {
  const router = useRouter()

  return (
    <div className="bg-pink-50 w-full min-h-screen">
   <div className="max-w-xl mx-auto p-10 space-y-3 text-center ">
      <h2 className="text-2xl font-bold">Share Your Feedback</h2>
      <p className="text-gray-600 text-sm">
        Before you go, please answer a few quick questions to help us improve YourGPT
      </p>

      {/* First Select */}
      <div className="text-left py-6">
        <label className="block text-sm font-medium mb-1">WHY WOULD YOU LIKE TO DELETE YOUR ACCOUNT?</label>
        <Select >
          <SelectTrigger className="w-full bg-gray-200">
            <SelectValue placeholder="Select your reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="privacy">Privacy concerns</SelectItem>
            <SelectItem value="not-useful">Not useful</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Second Select */}
      <div className="text-left">
        <label className="block text-sm font-medium mb-1">WHY IS THAT ?</label>
        <Select>
          <SelectTrigger className="w-full bg-gray-200">
            <SelectValue placeholder="Select your reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="complex">Too complex</SelectItem>
            <SelectItem value="slow">Slow performance</SelectItem>
            <SelectItem value="missing">Missing features</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button variant="destructive">Delete my account</Button>
        <Button variant="secondary" onClick={() => router.back()}>Back</Button>
      </div>
    </div>       
    </div>
  
  )
}
