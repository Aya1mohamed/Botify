import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LogoSlider from '@/components/LogoSlider/LogoSlider'
import Buildsec from '@/components/Buildsec/Buildsec'
import FAQ from '@/components/FAQ/FAQ'
import Footer from '@/components/Footer/Footer'
import GetStarted from '@/components/GetStarted/GetStarted'
import ConnectSlider from '@/components/ConnectSlider/ConnectSlider'
import FeatureCards from '@/components/FeatureCards/FeatureCards'
export default function HomePage() {
  return (
    <div className='relative'>
      <Navbar />
      <div className='grid grid-cols-1 md:grid-cols-12 min-h-screen py-28 md:py-14 '>
        {/* left side */}
        <div className='md:col-span-8 relative flex justify-center items-center'>
          <div className='flex-col justify-center lg:px-28 px-5'>
            <h1 className="text-3xl md:text-5xl font-semibold text-brand-secondary leading-tight mb-6 ">
              Develop, Automate & Take
              Your Business to New Heights with AI
            </h1>
            <p className="text-gray-500 mb-6 font-semibold ">
              Elevate your Customer Support, Boost Sales, and Streamline Operations
              with Intelligent AI Agents
            </p>
            <Button asChild className='bg-brand-primary hover:bg-brand-secondary text-lg p-6'>
              <Link href="/auth/Login">Get Started</Link>
            </Button>
          </div>

        </div>
        {/* right side  */}
        <div className='relative md:col-span-4 md:flex justify-end items-center h-full hidden '>
          <Image
            src="/home/robot-hand.png"
            alt="Robot hands"
            width={450}
            height={450}
            className="z-10 "
          />
          <Image
            src="/home/robot-head.png"
            alt="Robot head"
            width={220}
            height={220}
            className="spin-y absolute z-20 top-[230px] right-[130px] translate-y-[-50%]"
          />

        </div>
      </div>
      <LogoSlider />
      <Buildsec />
      <FeatureCards/>
      <ConnectSlider/>
      <FAQ />
      <GetStarted/>
      <Footer />




    </div>
  )
}
