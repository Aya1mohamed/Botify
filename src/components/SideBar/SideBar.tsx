"use client"

import { Home, User } from "lucide-react"

interface SidebarProps {
  selectedTab: string
  setSelectedTab: (tab: string) => void
}

export default function Sidebar({ selectedTab, setSelectedTab }: SidebarProps) {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-64px)] bg-zinc-400 border-r px-2 py-6 w-20 sm:w-24 md:w-40 lg:w-56 transition-all duration-300">
      <nav className="space-y-2">
        <button
          onClick={() => setSelectedTab("apps")}
          className={`flex items-center gap-3 px-2 py-2 rounded-md w-full transition ${
            selectedTab === "apps"
              ? "bg-white text-[#009688] shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium hidden md:inline">All Apps</span>
        </button>

        <button
          onClick={() => setSelectedTab("account")}
          className={`flex items-center gap-3 px-2 py-2 rounded-md w-full transition ${
            selectedTab === "account"
              ? "bg-white text-[#009688] shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-sm font-medium hidden md:inline">Account</span>
        </button>
      </nav>
    </aside>
  )
}
