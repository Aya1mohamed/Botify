"use client"
import React, { useEffect, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import Link from 'next/link';
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='flex fixed top-0 w-full bg-transparent backdrop-blur z-50 md:justify-evenly justify-between items-center px-4 py-2 border'>
      {/* Logo */}
      <div className='w-24'>
        <img src="/home/logoo.png" alt="Logo" />
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex'>
        <NavigationMenu>
          <NavigationMenuList>
            {
              ["Features", "Solutions", "Resourses", "Partner"].map((item, idx) => (
                <NavigationMenuItem key={idx}>
                  <NavigationMenuTrigger className={`${item === "Features" ? "text-brand-secondary" : "text-gray-400"}`}>
                    {item}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4">
                      <li>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Overview
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Pricing
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))
            }

            <NavigationMenuItem>
              <NavigationMenuLink className="p-2 hover:cursor-pointer hover:text-black font-semibold text-gray-400">
                Demo
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Navigation Menu */}
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <ul className="flex flex-col gap-4 mt-4">
              {["Features", "Solutions", "Resourses", "Partner", "Demo"].map((item, idx) => (
                <li key={idx} className="text-gray-700 hover:text-brand-secondary font-semibold cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 mt-6 md:hidden">
              <Button asChild variant="outline" className="bg-gradient-to-t from-gray-300 to-white text-gray-400 border hover:text-black">
                <Link href="/auth/Login">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-secondary hover:to-brand-accent">
                <Link href="/auth/Signup">Create account</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Right side buttons */}
      <div className='hidden md:flex items-center space-x-2'>
        <Button
          className='bg-gradient-to-t from-gray-300 to-white text-gray-400 border hover:text-black'
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
        </Button>
        <Button asChild className='hidden md:inline-flex bg-gradient-to-t from-gray-300 to-white text-gray-400 border hover:text-black'>
          <Link href="/auth/Login">Login</Link>
        </Button>
        <Button asChild className='hidden md:inline-flex bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-secondary hover:to-brand-accent'>
          <Link href="/auth/Signup">Create account</Link>
        </Button>
      </div>
    </div>
  )
}
