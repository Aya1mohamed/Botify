"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MdAccountCircle } from "react-icons/md"
import Sidebar from '@/components/SideBar/SideBar'
import Account from "@/components/Account/Account"
import AllApps from "@/components/AllApps/AllApps"
import { toast } from "sonner"

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("apps")
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("botify_token")
    toast.success("Logged out successfully")
    setTimeout(() => {
      router.push("/")
    }, 1500)    
  }

  return (
    <div>
      {/* Navbar */}
      <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-16 py-2 border-b '>
        <div className='w-24'>
          <img src="/home/logoo.png" alt="Logo" />
        </div>
        <Popover>
          <PopoverTrigger>
            <MdAccountCircle className='w-8 h-8 cursor-pointer' />
          </PopoverTrigger>
          <PopoverContent className='hover:cursor-pointer p-0 font-bold'>
            <h4 className='p-2 hover:bg-gray-100'>Profile</h4>
            <hr />
            <h4
              className='text-red-500 p-2 hover:bg-red-100'
              onClick={handleLogout}
            >
              Logout
            </h4>
          </PopoverContent>
        </Popover>
      </div>

      {/* Sidebar */}
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Main content */}
      <main className="pt-24 pl-60 p-6 w-full bg-gray-100 dark:bg-black">
        {selectedTab === "apps" && <AllApps />}
        {selectedTab === "account" && <Account />}
      </main>
    </div>
  )
}
