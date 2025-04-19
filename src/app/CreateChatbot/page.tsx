import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import Navbar2 from '@/components/Navbar2/Navbar2'
export default function page() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar2 />

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center text-center py-4">
                <Image
                    src="/Party.svg"
                    alt="Celebrate Icon"
                    width={150}
                    height={150}
                    className="mb-6 animate-shake"
                />
                <h1 className="text-2xl font-bold mb-4">Create BOTIFY Chatbot</h1>
                <p className="text-gray-600 mb-6 max-w-xl">
                    Take your business to the next level with a powerful AI chatbot, just like ChatGPT
                </p>
                <Link href="/CreateChatbot2">

                    <Button className="rounded-full px-6 py-2 text-white bg-brand-primary hover:bg-brand-secondary transition">
                        Get Started
                    </Button>
                </Link>
            </main>

        </div>
    )
}
