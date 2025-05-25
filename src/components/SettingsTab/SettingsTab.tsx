import React from 'react'
import { Settings } from "lucide-react";
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
export default function SettingsTab() {
    return (
        <div className="p-4 flex flex-col gap-3">
            <div className='flex items-center gap-2 p-2'>
                <Settings />
                Settings
            </div>
            <hr />
            <div className="flex flex-col gap-2">
                <h2 className='font-bold'>Delete Chatbot</h2>
                <p className='text-gray-500'>Your Chatbot will be permanently deleted.</p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className=' mt-2 bg-red-400 hover:bg-red-600 w-fit'>Delete Chatbot</Button>
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

        </div>
    )
}
