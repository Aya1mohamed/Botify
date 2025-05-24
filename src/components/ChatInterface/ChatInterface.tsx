import React from 'react';
import { Send } from 'lucide-react';
import Image from 'next/image';
import { CiMenuKebab } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Button } from '../ui/button';
export default function ChatInterface() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-brand-secondary text-white px-6 py-3 flex justify-between items-center gap-1 font-semibold">
        <div className='flex items-center gap-2'>
          <Image
            alt={"botify"}
            src={"/home/robot-head.png"}
            width={40}
            height={40}
            className='bg-brand-secondary rounded-full'
          />
          Botify
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <CiMenuKebab className="w-6 h-6 rotate-90 text-black" />

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mt-2">

              <DropdownMenuItem onClick={() => router.push("/Dashboard?tab=account")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" >
                delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="flex flex-col items-start gap-2 mb-4">
          <Image
            alt={"botify"}
            src={"/home/robot-head.png"}
            width={40}
            height={40}
            className='bg-brand-secondary rounded-full'
          />
          <div className="bg-brand-secondary text-white px-4 py-2 rounded-e-lg rounded-b-lg text-sm">
            <div>👋 Hi There!</div>
            <div>How can I assist you today</div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask your query"
          className="flex-1 text-sm focus:outline-none"
        />
        <Button className="bg-transparent hover:bg-transparent border-0 text-brand-primary hover:text-brand-secondary  rounded-full p-2">
          <Send className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}