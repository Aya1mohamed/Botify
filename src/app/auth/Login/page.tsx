"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Github } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { toast } from 'sonner'
import bcrypt from 'bcryptjs'

export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const storedUser = localStorage.getItem("botify_user")
    if (!storedUser) {
      toast.error("No account found. Please sign up first.")
      return
    }

    const user = JSON.parse(storedUser)

    const isEmailMatch = user.email === email
    const isPasswordMatch = bcrypt.compareSync(password, user.password)

    if (isEmailMatch && isPasswordMatch) {
      const token = btoa(
        JSON.stringify({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          phone: user.phone,
          createdAt: new Date().toISOString()
        })
      )

      localStorage.setItem("botify_token", token)
      toast.success("🎉 Welcome back!")
      router.push("/Dashboard")
    } else {
      toast.error("Invalid email or password")
    }
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="shadow-md rounded-2xl w-full max-w-md space-y-3 p-4">
          <CardHeader>
            <div className="flex flex-col items-start gap-2 pt-10">
              <img src="/home/logoo.png" alt="logo" className="w-32 h-20" />
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <p className="text-sm text-gray-500">Sign in to continue using Botify</p>
            </div>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <div className="flex justify-between items-center text-sm">
                <div className='flex items-center space-x-2'>
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Link href="/forgot-password" className="text-brand-accent hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-brand-secondary hover:bg-brand-primary">
                Sign in
              </Button>

              <div className="flex items-center gap-2">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-sm">Or log in with</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Github className="w-5 h-5" />
                Continue with Github
              </Button>

              <div className="text-center font-bold text-sm">
                Don’t have an account?{" "}
                <Link href="/auth/Signup" className="text-brand-accent hover:underline">
                  Create a new account
                </Link>
              </div>

              <p className="text-xs text-gray-400 text-center p-3">
                <Link href="/terms" className="hover:underline">Terms and conditions</Link> •{" "}
                <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex w-1/2 relative">
        <img src="/home/loginrobot.jpg" alt="AI illustration" className="object-cover object-center w-full h-full" />
        <div className="absolute bottom-0 bg-gray-400 bg-opacity-60 text-white p-14 rounded-t-2xl w-full text-center">
          <p className="text-2xl font-semibold leading-snug">
            “Revolutionize customer interactions with the power of AI technology”
          </p>
        </div>
      </div>
    </div>
  )
}