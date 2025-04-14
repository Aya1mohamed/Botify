"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"
import Link from "next/link"

export default function Account() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("botify_token")
    if (token) {
      try {
        const decoded = JSON.parse(atob(token))
        setUser({
          name: decoded.name || "",
          email: decoded.email || ""
        })
      } catch (error) {
        console.error("Failed to decode token:", error)
      }
    }
  }, [])

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading account info...
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 text-center space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2">
        <div className="bg-purple-400 text-white w-16 h-16 flex items-center justify-center rounded-full text-xl font-semibold">
          {user.name.charAt(0)}
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <Pencil className="w-4 h-4 text-gray-500 hover:text-black cursor-pointer" />
        </div>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Name Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-left text-sm font-medium mb-1" htmlFor="firstName">
            First Name
          </label>
          <Input id="firstName" defaultValue={user.name.split(" ")[0]} />
        </div>
        <div>
          <label className="block text-left text-sm font-medium mb-1" htmlFor="lastName">
            Last Name
          </label>
          <Input id="lastName" defaultValue={user.name.split(" ")[1] || ""} />
        </div>
        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
          Save
        </Button>
      </form>

      {/* Separator */}
      <div className="relative flex items-center justify-center my-6">
        <Separator className="absolute w-full" />
        <span className="bg-white dark:bg-black px-4 text-sm text-gray-500 z-10">More</span>
      </div>

      {/* Delete Account */}
      <Link
        href="/DeleteAcc"
        className="text-red-500 hover:underline mt-4 inline-block"
      >
        Delete my account
      </Link>
    </div>
  )
}
