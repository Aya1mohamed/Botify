"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN } from "@/constants/tokens"
import { useRouter } from "next/navigation"

type UserData = {
  email: string
  first_name: string
  last_name: string
  phone_number: string
  username: string
}

export default function Account() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) {
      router.push("/auth/Login")
      return
    }

    try {
      const decodedToken = jwtDecode<UserData>(token)
      setUser(decodedToken)
      setFirstName(decodedToken.first_name || decodedToken.username || "")
      setLastName(decodedToken.last_name || "")
    } catch (error) {
      console.error("Error decoding token:", error)
      router.push("/auth/Login")
    }
  }, [router])

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading account info...
      </div>
    )
  }
  const avatarChar = firstName.charAt(0) || user.username?.charAt(0) || "?"

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4 text-center space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2">
        <div className="bg-purple-400 text-white w-16 h-16 flex items-center justify-center rounded-full text-xl font-semibold">
          {avatarChar}
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h2 className="text-xl font-bold">
            {firstName || user.username} {lastName}
          </h2>
          <Pencil className="w-4 h-4 text-gray-500 hover:text-black cursor-pointer" />
        </div>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Edit Name Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-left text-sm font-medium mb-1" htmlFor="firstName">
            First Name
          </label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-left text-sm font-medium mb-1" htmlFor="lastName">
            Last Name
          </label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
