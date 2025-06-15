"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { ArrowLeft, Bell, Plus } from "lucide-react"
import { MdAccountCircle } from "react-icons/md"
import { Pencil, Trash2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useChatbots } from "@/hooks/useChatbots"
import { useRouter } from "next/navigation"
import { deleteTokens } from "@/actions/tokenManager"

export default function ChatbotsPage() {
    const { chatbots, loading, error } = useChatbots();
    const router = useRouter();

    const handleLogout = () => {
        deleteTokens();
        router.push('/');
    }

    const handleChatbotClick = (chatbotId: string) => {
        router.push(`/Chats/${chatbotId}`);
    };

    const handleAddChatbot = () => {
        router.push('/CreateChatbot2');
    };

    if (loading) {
        return (
            <div className="">
                <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-16 py-2 border-b '>
                    <div className='w-24'>
                        <Image src="/home/logoo.png" alt="Logo" width={100} height={100} />
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
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    <LogOut className="w-4 h-4 mr-2" onClick={handleLogout}/>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="p-28">
                    <div className="flex justify-between items-center mb-6">
                        <div>Loading chatbots...</div>

                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="">
                <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-16 py-2 border-b '>
                    <div className='w-24'>
                        <Image src="/home/logoo.png" alt="Logo" width={100} height={100} />
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
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                    <LogOut className="w-4 h-4 mr-2" onClick={handleLogout}/>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="p-28">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-red-500">Error loading chatbots: {error}</div>
                        <Button
                            onClick={handleAddChatbot}
                            className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-accent text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            size="lg"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Add Chatbot
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-16 py-2 border-b '>
                <div className='w-24 cursor-pointer'>
                    <Image src="/home/logoo.png" alt="Logo" width={100} height={100} onClick={() => router.push('/Dashboard')} />
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
                            <DropdownMenuItem>
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

            {/* Back button with proper spacing from fixed navbar */}
            <div className='w-full px-6 pt-20 mt-2'>
                <Button
                    variant="ghost"
                    className="mb-6 flex items-center gap-2 text-gray-400 hover:text-black"
                    onClick={() => router.push('/Dashboard')}
                >
                    <ArrowLeft className="w-4 h-4" /> Back 
                </Button>
            </div>

            <div className="px-28 py-5">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl">
                        You have {chatbots.length} {chatbots.length === 1 ? 'Chatbot' : 'Chatbots'}
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Add Chatbot Card */}
                    <Card
                        className="w-full max-w-sm shadow-sm relative group transition hover:border-brand-accent dark:bg-zinc-900 cursor-pointer border-2 border-dashed border-gray-300 hover:border-brand-accent bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 dark:from-brand-primary/20 dark:to-brand-accent/20"
                        onClick={handleAddChatbot}
                    >
                        <CardHeader className="flex flex-col items-center justify-center pb-2 h-full">
                            <div className="flex flex-col items-center gap-4 py-8">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                                    <Plus className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-center">
                                    <CardTitle className="text-lg font-semibold text-brand-primary dark:text-brand-accent group-hover:text-brand-secondary dark:group-hover:text-brand-accent transition-colors">
                                        Add New Chatbot
                                    </CardTitle>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        Create a powerful AI assistant
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Existing Chatbots */}
                    {chatbots.map((chatbot) => (
                        <Card
                            key={chatbot.id}
                            className="w-full max-w-sm shadow-sm relative group transition hover:border-black/30 dark:bg-zinc-900 cursor-pointer"
                            onClick={() => handleChatbotClick(chatbot.id)}
                        >
                            <CardHeader className="flex flex-row items-start justify-between pb-2">
                                <div className="flex flex-col items-center gap-1">
                                    {chatbot.logo ? (
                                        <Image
                                            src={chatbot.logo}
                                            alt={chatbot.name}
                                            width={60}
                                            height={60}
                                            className="rounded-full"
                                        />
                                    ) : (
                                        <Image
                                            src="/home/robot-head.png"
                                            alt="Default Chatbot"
                                            width={60}
                                            height={60}
                                            className="rounded-full"
                                        />
                                    )}
                                    <CardTitle className="text-lg font-semibold text-center">{chatbot.name}</CardTitle>
                                </div>

                                {/* Icons hidden by default, visible on hover */}
                                <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <Pencil
                                        className="w-4 h-4 text-teal-700 cursor-pointer hover:scale-105 transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Add edit functionality here
                                        }}
                                    />
                                    <Dialog>
                                        <DialogTrigger onClick={(e) => e.stopPropagation()}>
                                            <Trash2 className="w-4 h-4 text-red-600 cursor-pointer hover:scale-105 transition" />
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg [&>button]:hidden">
                                            <DialogHeader>
                                                <DialogTitle>Do you want to delete <span className="font-bold">{chatbot.name}</span> chatbot?</DialogTitle>
                                            </DialogHeader>
                                            <p className="text-sm text-muted-foreground mb-2">Please enter the chatbot name for confirmation.</p>
                                            <Input
                                                className="border-red-500 focus:border-red-600 focus:ring-0"
                                                placeholder="Chatbot Name"
                                            />
                                            <DialogFooter className="pt-4 justify-start  gap-2">
                                                <Button variant="destructive" >Confirm</Button>
                                                <DialogClose asChild>
                                                    <Button variant="secondary">Cancel</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>

                            {/* Content */}
                            <CardContent className="pt-6 flex items-center gap-2 text-sm text-muted-foreground">
                                <div
                                    className="w-4 h-4 rounded-full border"
                                    style={{ backgroundColor: chatbot.primary_color }}
                                />
                                <span>{chatbot.primary_color}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
