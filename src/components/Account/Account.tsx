"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

type UserData = {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
}

export default function Account() {
  const [user, setUser] = useState<UserData | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  useEffect(() => {
    const storedUser = localStorage.getItem("botify_user")
    if (storedUser) {
      const parsedUser: UserData = JSON.parse(storedUser)
      setUser(parsedUser)
      setFirstName(parsedUser.firstName)
      setLastName(parsedUser.lastName)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const updatedUser = {
      ...user,
      firstName,
      lastName,
    }

    localStorage.setItem("botify_user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    toast.success("Name updated successfully")
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading account info...
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4 text-center space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-2">
        <div className="bg-purple-400 text-white w-16 h-16 flex items-center justify-center rounded-full text-xl font-semibold">
          {firstName.charAt(0)}
        </div>
        <div className="flex items-center gap-2 justify-center">
          <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
          <Pencil className="w-4 h-4 text-gray-500 hover:text-black cursor-pointer" />
        </div>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Edit Name Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
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
