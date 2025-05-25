"use client";

import React, { useEffect, useState } from 'react';
import { MessagesSquare, Settings, ChevronLeft } from "lucide-react";
import Image from 'next/image';
import { IoExtensionPuzzleOutline } from "react-icons/io5";

type Props = {
  selected: string;
  onSelect: (key: string) => void;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

const SideBar2 = ({ selected, onSelect }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const links = [
    { key: "conversations", icon: <MessagesSquare className="w-5 h-5" />, label: "Conversations" },
    { key: "integrations", icon:  <IoExtensionPuzzleOutline className="w-5 h-5"/> , label: "Integrations" },
    { key: "settings", icon: <Settings className="w-5 h-5" />, label: "General" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("botify_user");
    if (storedUser) {
      const parsedUser: UserData = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const userInitial = user?.firstName?.charAt(0).toUpperCase() || "U";
  const userFullName = user ? `${user.firstName} ${user.lastName}` : "User";

  return (
    <>
      {/* Sidebar for large screens */}
      <aside
        className={`h-screen bg-white border-r px-3 py-1 flex-col justify-between transition-all duration-300
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
                className='text-center'
              />
              <p className='text-gray-500 text-sm'>Main Menu</p>
            </div>
          ) : (
            <Image
              src="/home/Croppedlogo.png"
              alt="logo"
              width={80}
              height={80}
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
                    ${isSelected ? "bg-brand-primary text-white font-semibold" : "hover:bg-gray-100"}`}
                >
                  {icon}
                  {!collapsed && <span>{label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info */}
        <div className="mt-auto flex items-center gap-2 p-2 rounded bg-brand-primary hover:bg-brand-secondary w-full">
          <div className="bg-[#9B789D] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold">
            {userInitial}
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{userFullName}</span>
              <span className="text-xs text-white">{user?.email}</span>
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
          />
          {links.map(({ key, icon }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`p-2 rounded hover:bg-gray-100 ${
                selected === key ? "bg-gray-200" : ""
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
