"use client"

import { Home, User } from "lucide-react"

interface SidebarProps {
  selectedTab: string
  setSelectedTab: (tab: string) => void
}

export default function Sidebar({ selectedTab, setSelectedTab }: SidebarProps) {
  return (
    <aside className="w-56 fixed top-20 left-0 h-[calc(100vh-64px)] bg-zinc-400 border-r px-6 py-6">
      <nav className="space-y-2">
        <button
          onClick={() => setSelectedTab("apps")}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
            selectedTab === "apps"
              ? "bg-white text-[#009688] shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-sm font-medium">All Apps</span>
        </button>

        <button
          onClick={() => setSelectedTab("account")}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-md ${
            selectedTab === "account"
              ? "bg-white text-[#009688] shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Account</span>
        </button>
      </nav>
    </aside>
  )
}
