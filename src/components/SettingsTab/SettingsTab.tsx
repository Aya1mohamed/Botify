import React, { useState } from 'react'
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
import { useDeleteChatbot } from '@/hooks/useDeleteChatbot';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SettingsTabProps {
    chatbotId: string;
    chatbotName: string;
}

export default function SettingsTab({ chatbotId, chatbotName }: SettingsTabProps) {
    const [confirmationName, setConfirmationName] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { deleteChatbot, loading, error } = useDeleteChatbot();
    const router = useRouter();

    const handleDelete = async () => {
        if (confirmationName !== chatbotName) {
            toast.error("Please enter the exact chatbot name to confirm deletion");
            return;
        }

        try {
            const success = await deleteChatbot(chatbotId);
            if (success) {
                toast.success("Chatbot deleted successfully!");
                setIsDialogOpen(false);
                router.push('/Chatbots');
            } else {
                toast.error(error || "Failed to delete chatbot. Please try again.");
            }
        } catch (err) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className='flex items-center gap-2 p-2'>
                <Settings />
                Settings
            </div>
            <hr />
            <div className="flex flex-col gap-2">
                <h2 className='font-bold'>Delete Chatbot</h2>
                <p className='text-gray-500'>Your Chatbot will be permanently deleted.</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className='mt-2 bg-red-400 hover:bg-red-600 w-fit'>Delete Chatbot</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg [&>button]:hidden">
                        <DialogHeader>
                            <DialogTitle>Do you want to delete <span className="font-bold">{chatbotName}</span>?</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-muted-foreground mb-2">
                            This action cannot be undone.
                        </p>
                        <Input
                            className={`border-red-500 focus:border-red-600 focus:ring-0 ${error ? 'border-red-600' : ''}`}
                            placeholder={`Type "${chatbotName}" to confirm`}
                            value={confirmationName}
                            onChange={(e) => setConfirmationName(e.target.value)}
                            disabled={loading}
                        />
                        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
                        <DialogFooter className="pt-4 justify-start gap-2">
                            <Button 
                                variant="destructive" 
                                onClick={handleDelete}
                                disabled={loading || confirmationName !== chatbotName}
                            >
                                {loading ? "Deleting..." : "Delete Permanently"}
                            </Button>
                            <DialogClose asChild>
                                <Button variant="secondary" disabled={loading}>Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
