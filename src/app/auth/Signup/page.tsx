"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Github } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"
import bcrypt from 'bcryptjs'

const SignUpSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),
})

type SignUpData = z.infer<typeof SignUpSchema>

export default function Page() {
  const router = useRouter()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [phone, setPhone] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema)
  })

  const generateStrongPassword = (length = 12) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
  }

  const onSubmit = async (data: SignUpData) => {
    if (!acceptedTerms) {
      toast.error("🚫 You must accept the terms.")
      return
    }
  
    if (!phone) {
      toast.error("📱 Phone number is required.")
      return
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10)
  
    const userData = { 
      ...data, 
      phone, 
      password: hashedPassword 
    }
  
    localStorage.setItem("botify_user", JSON.stringify(userData))
  
    toast.success("🎉 Account created successfully!")
    router.push("/auth/Login")
  }
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <Card className="w-full max-w-md shadow-md rounded-2xl p-3">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <img src="/home/logoo.png" alt="logo" className="w-30 h-20" />
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <p className="text-sm text-gray-500 text-center">Sign up to continue using Botify</p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First Name" {...register("firstName")} />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last Name" {...register("lastName")} />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <PhoneInput
                  country={'eg'}
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{
                    width: '100%',
                    height: '42px',
                    borderRadius: '0.375rem',
                    borderColor: '#d1d5db',
                    fontSize: '0.875rem',
                    paddingLeft: '48px'
                  }}
                  containerStyle={{ width: '100%' }}
                  inputClass="text-sm"
                />
                {!phone && formState.isSubmitted && (
                  <p className="text-xs text-red-500 mt-1">Phone number is required</p>
                )}
              </div>

              <div>
                <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  onClick={() => toast.info(`🔐 Try this password: ${generateStrongPassword()}`)}
                  variant="outline"
                  className="text-xs"
                >
                  Generate Strong Password
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(Boolean(checked))}
                  className="data-[state=checked]:bg-brand-secondary data-[state=checked]:border-brand-primary"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the Terms of service and Privacy Policies
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-secondary hover:bg-brand-primary"
                disabled={!acceptedTerms}
              >
                Create Account
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/Login" className="text-brand-accent hover:underline">
                  Login
                </Link>
              </div>

              <div className="flex items-center gap-2 my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-sm">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Github className="w-5 h-5" />
                Continue with GitHub
              </Button>

              <p className="text-xs text-gray-400 text-center mt-4">
                <Link href="/terms" className="hover:underline">Terms and conditions</Link> •{" "}
                <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex w-1/2  relative">
        <img
          src="/home/loginrobot.jpg"
          alt="AI illustration"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute bottom-0 bg-gray-400 bg-opacity-60 text-white p-14 rounded-t-2xl w-full text-center">
          <p className="text-2xl font-semibold leading-snug">
            “Revolutionize customer interactions with the power of AI technology”
          </p>
        </div>
      </div>
    </div>
  )
}
