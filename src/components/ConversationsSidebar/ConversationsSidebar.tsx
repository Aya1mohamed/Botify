import React from 'react';
import { Search, Pencil, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ConversationsSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Sidebar for large screens */}
      <aside
        className={`h-screen bg-gray-100 border-r border-gray-300 relative px-3 py-2 flex-col justify-between transition-all duration-300
          hidden sm:flex ${collapsed ? "w-14 items-center" : "w-64"}`}
      >
        <div className="flex flex-col gap-2">
          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className=" p-1 rounded bg-gray-50 hover:bg-gray-100 self-end absolute top-2 -right-4"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </button>

          {/* Logo */}
          {!collapsed ? (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Image
                  alt={"botify"}
                  src={"/home/robot-head.png"}
                  width={40}
                  height={40}
                />
                <span className="text-lg font-semibold text-brand-secondary">Botify</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Search className="w-4 h-4 cursor-pointer" />
                <Pencil className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Image
                  alt={"botify"}
                  src={"/home/robot-head.png"}
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Search className="w-4 h-4 cursor-pointer" />
                <Pencil className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          )}





          {!collapsed && (
            <div className="h-full flex flex-col  px-4 py-3 w-full">

              {/* Today Section */}
              <div>
                <h3 className="text-sm text-gray-700 font-medium mb-2">Today</h3>
                <button className="bg-brand-accent/75 text-brand-primary px-3 py-1 rounded-md text-sm mb-6">
                  New chat
                </button>
              </div>

              {/* Previous Section */}
              <div className="text-sm text-gray-800 space-y-2">
                <h3 className="text-sm text-gray-700 font-medium mb-1">
                  Previous 7 Days
                </h3>
                <p className=" text-brand-primary px-3 py-1 rounded-md text-sm mb-6">Lorem ipsum</p>
                <p className=" text-brand-primary px-3 py-1 rounded-md text-sm mb-6">Lorem ipsum</p>
              </div>
            </div>

          )}
        </div>
      </aside>

      {/* Sidebar for small screens (icons only) */}
      <aside className="sm:hidden fixed h-screen bg-white border-r w-16 flex flex-col items-center py-4 justify-between">
            <div className="flex flex-col items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Image
                  alt={"botify"}
                  src={"/home/robot-head.png"}
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <Search className="w-4 h-4 cursor-pointer" />
                <Pencil className="w-4 h-4 cursor-pointer" />
              </div>
            </div>


      </aside>
    </>
  );
}
