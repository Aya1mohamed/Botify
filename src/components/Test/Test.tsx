// src/components/Navbar.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Test() {
  return (
    <nav className="w-full border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">MyLogo</div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            {/* Big Dropdown for Products */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="w-[600px] p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">AI Tools</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/products/ai/assistant" legacyBehavior passHref>
                          <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                            AI Assistant
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/ai/chatbot" legacyBehavior passHref>
                          <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                            Chatbot Creator
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Dev Tools</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/products/dev/editor" legacyBehavior passHref>
                          <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                            Code Editor
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/dev/api" legacyBehavior passHref>
                          <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                            API Tester
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Another Menu Item */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent className="p-4">
                <ul className="grid gap-2 w-48">
                  <li>
                    <Link href="/services/consulting" legacyBehavior passHref>
                      <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                        Consulting
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/training" legacyBehavior passHref>
                      <NavigationMenuLink className="block p-2 hover:bg-gray-100 rounded">
                        Training
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* About Link */}
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="p-2 font-medium hover:text-primary">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
