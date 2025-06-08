"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, LogOut, ChevronDown } from "lucide-react"
import { Bell } from "lucide-react"
import { MdAccountCircle } from "react-icons/md"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function Navbar2() {
      const router = useRouter()
    
      const handleLogout = () => {
        localStorage.removeItem("botify_token")
        toast.success("Logged out successfully")
        setTimeout(() => {
          router.push("/")
        }, 1500)    
      }
    return (
        <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-2 md:px-16 py-1 border-b '>
            <div className='w-16 cursor-pointer'>
                <img src="/home/logoo.png" onClick={() => router.push('/Dashboard')} alt="Logo" />
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

                        <DropdownMenuItem onClick={() => router.push("/Dashboard?tab=account")}>
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>

    )
}
