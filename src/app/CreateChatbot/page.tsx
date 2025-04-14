import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { MdAccountCircle } from "react-icons/md"
import Image from 'next/image'
import Link from 'next/link'
export default function page() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-16 py-2 border-b '>
                <div className='w-24'>
                    <img src="/home/logoo.png" alt="Logo" />
                </div>

                <div className=" flex gap-3 items-center text-center">

                    <Button
                        className=' bg-gradient-to-t from-gray-300 to-white text-gray-400 border hover:text-black'
                        variant="outline"
                        size="icon"
                    >
                        <Bell className="" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center gap-2 px-4 py-2 border bg-gradient-to-t from-gray-300 to-white text-gray-400 hover:text-black shadow hover:shadow-md transition">
                                <MdAccountCircle className='w-4 h-4 ' />
                                <span className="text-sm font-medium">Account</span>
                                <ChevronDown className="w-4 h-4" />

                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 mt-2">
                            <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>


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
                <Link href="/Chatbots">

                <Button className="rounded-full px-6 py-2 text-white bg-brand-primary hover:bg-brand-secondary transition">
                    Get Started
                </Button>
                </Link>
            </main>

        </div>
    )
}
