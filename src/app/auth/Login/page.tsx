"use client"
import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Github } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { toast } from 'sonner'
import { useSanitizedForm } from '@/hooks/useSanitizedForm'
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '@/services/validationSchemas/loginSchema'
import { useLogin } from '@/hooks/useLogin'
import { ACCESS_TOKEN } from '@/constants/tokens'
import Image from 'next/image'

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, loading, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSanitizedForm<LoginFormInputs>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema()),
  })

  // Check if user is already authenticated
  useEffect(() => {
    // We can directly check localStorage since we're on the client
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      const callbackUrl = searchParams.get('callbackUrl') || '/Dashboard'
      toast.success('Already logged in')
      router.push(decodeURIComponent(callbackUrl))
    }
  }, [router, searchParams])

  const handleLogin = async (data: LoginFormInputs) => {
    const isLoggedIn = await login({
      username: data.username,
      password: data.password,
    })
    
    if (isLoggedIn) {
      toast.success('Login successful')
    } else {
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="shadow-md rounded-2xl w-full max-w-md space-y-3 p-4">
          <CardHeader>
            <div className="flex flex-col items-start gap-2 pt-10">
              <Image src="/logoo.png" alt="logo" width={60} height={60}/>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <p className="text-sm text-gray-500">Sign in to continue using Botify</p>
            </div>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <Label htmlFor="email">Username</Label>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  {...register("username")}
                />
              </div>
              {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}

              <div className="flex justify-between items-center text-sm">
                <div className='flex items-center space-x-2'>
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Link href="/forgot-password" className="text-brand-accent hover:underline">
                  Forgot password?
                </Link>
              </div>

              {loading ? <Button type="submit" disabled className="w-full bg-brand-secondary hover:bg-brand-primary">
                Sign in
              </Button> : <Button type="submit" className="w-full bg-brand-secondary hover:bg-brand-primary">
                Sign in
              </Button>}

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
                Don&apos;t have an account?{" "}
                <Link href="/auth/Signup" className="text-brand-accent hover:underline">
                  Create a new account
                </Link>
              </div>

              <p className="text-xs text-gray-400 text-center p-3">
                <Link href="/terms" className="hover:underline">Terms and conditions</Link> •{" "}
                <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              </p>
              {error && <p className="text-xs text-red-500">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex w-1/2 relative">
        <img src="/home/loginrobot.jpg" alt="AI illustration" className="object-cover object-center w-full h-full" />
        
        <div className="absolute bottom-0 bg-gray-400 bg-opacity-60 text-white p-14 rounded-t-2xl w-full text-center">
          <p className="text-2xl font-semibold leading-snug">
            &quot;Revolutionize customer interactions with the power of AI technology&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
