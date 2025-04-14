import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function GetStarted() {
  return (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-5xl mx-auto my-16 transition-colors duration-300">
      {/* Left Image */}
      <div className="w-full md:w-1/2">
        <Image
          src="/home/helpyou.jpg"  
          alt="AI Chat Assistant"
          width={500}
          height={500}
          className="rounded-2xl object-cover"
        />
      </div>

      {/* Right Text */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Supercharge Your Workflow with AI
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-base font-medium">
          Experience the power of intelligent AI agents that innovate and automate your business.
          Join thousands of teams already scaling their operations with our AI solutions.
        </p>
        <div>
          <Button className="bg-brand-primary hover:bg-brand-secondary text-white text-sm md:text-base px-6 py-3">
          <Link href="/auth/Login" className='flex flex-row items-center'> Get Started <ArrowRight className="ml-2 w-4 h-4" /></Link>

           
          </Button>
        </div>
      </div>
    </div>
  )
}
