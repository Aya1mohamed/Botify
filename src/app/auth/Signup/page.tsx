"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Github } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import Link from "next/link"
import { useState } from "react"
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from "next/navigation"
import { toast } from "sonner";
import { useRegister } from "@/hooks/useRegister";
import { RegisterBody } from "@/services/types/register";
import { RegisterSchema } from '@/services/validationSchemas/registerSchema'
import { Controller } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useSanitizedForm } from "@/hooks/useSanitizedForm"
import Image from "next/image"

export default function Page() {
  const router = useRouter()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const { registerUser, loading, error } = useRegister()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useSanitizedForm<{
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    password1: string;
    email: string;
    phone_number: string;
  }>({
    resolver: yupResolver(RegisterSchema()),
  })

  const generateStrongPassword = (length = 12) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let password = ""
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
  }

  const onSubmit = async (data: RegisterBody) => {
    console.log(data);
    console.log("SUBMITTTTTTING");
    if (!acceptedTerms) {
      toast.error("🚫 You must accept the terms.");
      return;
    }

    try {
      const result = await registerUser(data);

      if (result) {
        toast.success("🎉 Account created successfully!");
        router.push("/auth/Login");
      } else {
        throw new Error("Registration failed.");
      }
    } catch {
      const errorMessage = error || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <Card className="w-full max-w-md shadow-md rounded-2xl p-3">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <Image src="/home/logoo.png" alt="logo" width={80} height={60} className="object-contain" />
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <p className="text-sm text-gray-500 text-center">Sign up to continue using Botify</p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>


              <div className="flex gap-2">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input id="first_name" placeholder="Enter your first name" {...register("first_name")} />
                {errors.first_name && <p className="text-xs text-red-500 mt-1">{errors.first_name.message}</p>}
              </div>

              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input id="last_name" placeholder="Enter your last name" {...register("last_name")} />
                {errors.last_name && <p className="text-xs text-red-500 mt-1">{errors.last_name.message}</p>}
              </div>
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" {...register("username")} />
                {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
              </div>

              {/* phone number */}
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Controller
                  name="phone_number"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    
                    <PhoneInput
                      country={'eg'}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      inputProps={{
                        name: field.name,
                        required: true,
                      }}
                      countryCodeEditable={false}
                      containerStyle={{ width: '100%' }}
                      inputStyle={{ width: '100%', height: '42px' }}
                    />
                  )}
                />
                {errors.phone_number && (
                  <p className="text-xs text-red-500">{errors.phone_number.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>
              <div className="relative">
                <Input
                  id="password1"
                  type="password"
                  placeholder="Confirm your password"
                  {...register("password1")}
                />
                {errors.password1 && <p className="text-xs text-red-500 mt-1">{errors.password1.message}</p>}
              </div>
              {/* Generate Password Button */}
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

              {/* Terms */}
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

              {/* Global Error */}
              {error && <p className="text-xs text-red-500">{error}</p>}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-brand-secondary hover:bg-brand-primary"
                disabled={loading || !acceptedTerms}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/Login" className="text-brand-accent hover:underline">
                  Login
                </Link>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-2 my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="text-gray-400 text-sm">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Social Logins */}
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Github className="w-5 h-5" />
                Continue with GitHub
              </Button>

              {/* Footer Links */}
              <p className="text-xs text-gray-400 text-center mt-4">
                <Link href="/terms" className="hover:underline">Terms and conditions</Link> •{" "}
                <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="hidden md:flex w-1/2 relative h-screen">
        <Image
          src="/home/loginrobot.jpg"
          alt="AI illustration"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
        <div className="absolute bottom-0 bg-gray-400 bg-opacity-60 text-white p-14 rounded-t-2xl w-full text-center">
          <p className="text-2xl font-semibold leading-snug">
            &quot;Revolutionize customer interactions with the power of AI technology&quot;
          </p>
        </div>
      </div>
    </div>
  )
}