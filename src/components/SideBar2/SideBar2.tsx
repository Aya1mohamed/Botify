"use client";

import React, { useEffect, useState } from 'react';
import { MessagesSquare, Settings, ChevronLeft, ArrowLeft } from "lucide-react";
import Image from 'next/image';
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN } from "@/constants/tokens"

type Props = {
  selected: string;
  onSelect: (key: string) => void;
};

type UserData = {
  sub: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

const SideBar2 = ({ selected, onSelect }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const links = [
    { key: "conversations", icon: <MessagesSquare className="w-5 h-5" />, label: "Conversations" },
    { key: "integrations", icon: <IoExtensionPuzzleOutline className="w-5 h-5" />, label: "Integrations" },
    { key: "settings", icon: <Settings className="w-5 h-5" />, label: "General" },
  ];

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      router.push("/auth/Login");
      return;
    }

    try {
      const decodedToken = jwtDecode<UserData>(token);
      setUser(decodedToken);
      setFirstName(decodedToken.firstName || decodedToken.username || "");
      setLastName(decodedToken.lastName || "");
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/auth/Login");
    }
  }, [router]);

  const userInitial = firstName.charAt(0) || user?.username?.charAt(0) || "?";
  const userFullName = user ? `${firstName || user.username} ${lastName}`.trim() : "User";

  return (
    <>
      {/* Sidebar for large screens */}
      <aside
        className={`h-screen bg-white dark:bg-gray-900 border-r px-3 py-1 flex-col justify-between transition-all duration-300
          hidden sm:flex ${collapsed ? "w-14 items-center" : "w-48"}`}
      >
        <div className="flex flex-col gap-6">
          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 p-1 rounded hover:bg-gray-100 self-end"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </button>

          {/* Logo */}
          {!collapsed ? (
            <div className='flex flex-col gap-2 px-2'>
              <Image
                src="/home/logoo.png"
                alt="logo"
                width={100}
                height={100}
                onClick={() => router.push('/')}
                className='text-center cursor-pointer' 
              />
              <p className='text-gray-500 text-sm'>Main Menu</p>
            </div>
          ) : (
            <Image
              src="/home/Croppedlogo.png"
              alt="logo"
              width={80}
              height={80}
              onClick={() => router.push('/')}
              className="cursor-pointer"
            />
          )}

          {/* Navigation Tabs */}
          <nav className="flex flex-col gap-2 w-full">
            {links.map(({ key, icon, label }) => {
              const isSelected = selected === key;
              return (
                <button
                  key={key}
                  onClick={() => onSelect(key)}
                  className={`flex items-center gap-2 text-sm p-2 rounded w-full justify-start transition
                    ${isSelected ? "bg-brand-primary text-white font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >
                  {icon}
                  {!collapsed && <span>{label}</span>}
                </button>
              );
            })}
          </nav>
        </div>
        {/* Back Button */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 mt-2 text-gray-400 hover:text-black w-full justify-start"
          onClick={() => router.push('/Chatbots')}
        >
          <ArrowLeft className="w-4 h-4" />
          {!collapsed && "Back"}
        </Button>

        {/* User Info */}
        <div className="mt-auto flex items-center gap-2 p-2 rounded bg-brand-primary hover:bg-brand-secondary w-full transition-colors duration-200">
          <div className="bg-purple-400 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold">
            {userInitial}
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-white truncate">{userFullName}</span>
              <span className="text-xs text-white/80 truncate">{user?.email}</span>
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar for small screens (icons only) */}
      <aside className="sm:hidden fixed z-50 left-0 top-0 h-screen bg-white border-r w-16 flex flex-col items-center py-4 justify-between">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/home/Croppedlogo.png"
            alt="logo"
            width={60}
            height={60}
            onClick={() => router.push('/')}
            className="cursor-pointer"
          />
          {links.map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`p-2 rounded hover:bg-gray-100 ${selected === key ? "bg-gray-200" : ""
                }`}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Only Avatar */}
        <div className="bg-[#9B789D] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold mb-4">
          {userInitial}
        </div>
      </aside>
    </>
  );
};

export default SideBar2;
