"use client";

import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'
import Navbar2 from '@/components/Navbar2/Navbar2'
import { useChatbots } from '@/hooks/useChatbots'
import { useRouter } from 'next/navigation'

export default function CreateChatbotPage() {
    const { chatbots, loading, error } = useChatbots();
    const router = useRouter();

    useEffect(() => {
        // If not loading and user has chatbots, redirect to Chatbots page
        if (!loading && !error && chatbots.length > 0) {
            router.push('/Chatbots');
        }
    }, [loading, error, chatbots.length, router]);

    // Show loading state while checking chatbots
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar2 />
                <main className="flex-grow flex flex-col items-center justify-center text-center py-4">
                    <div>Loading...</div>
                </main>
            </div>
        );
    }

    // Show error state if there's an error fetching chatbots
    if (error) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar2 />
                <main className="flex-grow flex flex-col items-center justify-center text-center py-4">
                    <div className="text-red-500">Error loading chatbots: {error}</div>
                </main>
            </div>
        );
    }

    // If user has chatbots, this component will redirect (handled in useEffect)
    // This return is just a fallback while redirecting
    if (chatbots.length > 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar2 />
                <main className="flex-grow flex flex-col items-center justify-center text-center py-4">
                    <div>Redirecting to your chatbots...</div>
                </main>
            </div>
        );
    }

    // Only render the create chatbot page if user has no chatbots
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
