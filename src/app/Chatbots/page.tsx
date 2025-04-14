import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Bell } from "lucide-react"
import { MdAccountCircle } from "react-icons/md"
import { Pencil, Trash2, FileText } from "lucide-react"
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
import { User, LogOut, Settings , ChevronDown} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function page() {
    return (
        <div className="">
            <div className='fixed top-0 w-full bg-white dark:bg-transparent backdrop-blur z-50 flex justify-between items-center px-16 py-2 border-b '>
                <div className='w-24'>
                    <img src="/home/logoo.png" alt="Logo" />
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
                            <ChevronDown className="w-4 h-4"/>

                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 mt-2">
                            <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>



            <div className="p-28">
                <h1 className="text-xl  mb-4">You have 1 Chatbot</h1>

                <Card className="w-full max-w-sm shadow-sm relative group transition hover:border-black/30 dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                        <div className="flex flex-col items-center gap-1">
                            <Image
                                src="/home/robot-head.png"
                                alt="Chatbot"
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                            <CardTitle className="text-lg font-semibold">Botify Chatbot</CardTitle>
                        </div>

                        {/* Icons hidden by default, visible on hover */}
                        <div className="flex gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Pencil className="w-4 h-4 text-teal-700 cursor-pointer hover:scale-105 transition" />
                            <Dialog>
                                <DialogTrigger>
                                    <Trash2 className="w-4 h-4 text-red-600 cursor-pointer hover:scale-105 transition" />
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg [&>button]:hidden">
                                    <DialogHeader>
                                        <DialogTitle>Do you want to delete <span className="font-bold">Botify Chatbot</span> chatbot?</DialogTitle>
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
                        <FileText className="w-4 h-4" />
                        <span>Default</span>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
