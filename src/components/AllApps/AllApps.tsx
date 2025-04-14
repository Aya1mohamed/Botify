import React from 'react'
import { Icon } from "@iconify/react";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaApple } from "react-icons/fa";
import Link from 'next/link';
export default function AllApps() {
  return (
    <div className="px-6">

      <h1 className="text-2xl font-bold text-brand-primary">Botify Apps</h1>
      <p className="text-gray-400">Click 'Access Now' to start using any Botify application</p>
      {/* All apps content here */}
      <Card className="w-full max-w-md bg-background text-foreground shadow-md text-center dark:bg-zinc-900 mt-6">
        <CardHeader className="flex flex-col items-center gap-1">
          <Image src="/home/robot-head.png" alt="Chatbot" width={60} height={60} />
          <CardTitle className='text-2xl'>Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">ChatGPT Chatbot for customer support</p>
          <Link href="/CreateChatbot">

            <button className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-secondary">
              Access Now
            </button>
          </Link>
        </CardContent>
      </Card>
      <hr className='mt-5' />

      <h3 className="text-lg font-semibold mb-4 pt-4">Others</h3>
      <div className="space-y-4">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src="/home/robot-head.png"
              alt="Example Image"
              width={50}
              height={50}
            />                <div>
              <p className="font-medium">Botify Chatbot Mobile App</p>
              <p className="text-sm text-gray-500">Get Botify Chatbot Mobile App for instant access.</p>
            </div>
          </div>
          <div className="flex gap-4">
            {/* Google Play */}
            <a
              href="#"
              className="flex items-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition gap-3"
            >
              <Icon icon="logos:google-play-icon" width={30} />
              <div className="text-left leading-tight text-sm">
                <p className="text-xs">Available on</p>
                <p className="font-semibold">Google Play</p>
              </div>
            </a>

            {/* App Store */}
            <a
              href="#"
              className="flex items-center bg-black text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition gap-3"
            >
              <FaApple size={30} />
              <div className="text-left leading-tight text-sm">
                <p className="text-xs">Download on</p>
                <p className="font-semibold">App Store</p>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Icon icon="logos:chrome" width="35" height="35" />
            <div>
              <p className="font-medium">Botify Chatbot Chrome Extension</p>
              <p className="text-sm text-gray-500">Access your AI Knowledgebase Agent instantly, using the Chrome browser extension.</p>
            </div>
          </div>
          <button className="bg-brand-primary text-white px-3 py-1 rounded hover:bg-brand-secondary">Get Now</button>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow-sm flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Icon icon="logos:firefox" width="35" height="35" />
            <div>
              <p className="font-medium">Botify Chatbot Firefox Extension</p>
              <p className="text-sm text-gray-500">Get one click access to your AI Knowledgebase Agent, using the Firefox browser extension.</p>
            </div>
          </div>
          <button className="bg-brand-primary text-white px-3 py-1 rounded hover:bg-brand-secondary">Get Now</button>
        </div>
      </div>
    </div>
  )
}
