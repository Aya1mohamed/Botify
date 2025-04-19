"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function Page() {
  const router = useRouter()

  const [reason1, setReason1] = useState("")
  const [reason2, setReason2] = useState("")

  const handleDelete = () => {
    localStorage.removeItem("botify_token")
    localStorage.removeItem("botify_user")
    toast.success("Your account has been deleted successfully.")
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="bg-pink-50 w-full min-h-screen">
      <div className="max-w-xl mx-auto p-10 space-y-3 text-center">
        <h2 className="text-2xl font-bold">Share Your Feedback</h2>
        <p className="text-gray-600 text-sm">
          Before you go, please answer a few quick questions to help us improve Botify
        </p>

        {/* First Select */}
        <div className="text-left py-6">
          <label className="block text-sm font-medium mb-1">
            WHY WOULD YOU LIKE TO DELETE YOUR ACCOUNT?
          </label>
          <Select onValueChange={(value) => setReason1(value)}>
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
          <label className="block text-sm font-medium mb-1">WHY IS THAT?</label>
          <Select onValueChange={(value) => setReason2(value)}>
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
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!reason1 || !reason2}
          >
            Delete my account
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}
