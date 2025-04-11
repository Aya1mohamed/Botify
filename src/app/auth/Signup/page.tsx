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

export default function Page() {
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <Card className="w-full max-w-md shadow-md rounded-2xl p-3">
          <CardHeader>
            <div className="flex flex-col items-center gap-2">
              <img src="/home/logoo.png" alt="logo" className="w-30 h-20" />
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <p className="text-sm text-gray-500 text-center">
                Sign up to continue using Botify
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First Name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last Name" />
                </div>
              </div>

              <div>
                <PhoneInput
                  country={'eg'}
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
              </div>

              <div>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Input id="password" type="password" placeholder="Enter your password" />
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

      {/* Right: Image + Text Section */}
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
