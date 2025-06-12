"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HexColorPicker } from "react-colorful"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, PanelBottom, RotateCcw, Paperclip, MinusCircle } from "lucide-react"
import Navbar2 from "@/components/Navbar2/Navbar2"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner";
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import ChatbotPreview from "@/components/ChatbotPreview/ChatbotPreview"
import CreateChatbot3Component from "@/components/CreateChatbot3/CreateChatbot3Component"
export default function CreateChatbot2() {
    const router = useRouter()
    const [selectedLayout, setSelectedLayout] = useState<"chat">("chat");
    const [logo, setLogo] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [streaming, setStreaming] = useState(false)
    const [primaryColor, setPrimaryColor] = useState("#634464")
    const [textColor, setTextColor] = useState("#ffffff")
    const [welcomePopup, setWelcomePopup] = useState("👋 Hi There!\nHow can I assist you today");
    const [chatPlaceholder, setChatPlaceholder] = useState("Ask your query...");
    const [canSendAttachment, setCanSendAttachment] = useState(false);
    const [botName, setBotName] = useState("");
    const [chatBgColor, setChatBgColor] = useState("#ffffff")
    const [messages, setMessages] = useState<string[]>(["👋 Hi There!\nHow can I assist you today"]);
    const [showStep3, setShowStep3] = useState(false);

    const goToStep3 = () => {
        if (!botName.trim()) {
            toast.error("You must enter a botify name.");
            return
        }

        // Show CreateChatbot3 component instead of navigating
        setShowStep3(true);
    }

    const handleAddMessage = () => {
        setMessages([...messages, ""]);
    };

    const handleRemoveMessage = (index: number) => {
        const updated = [...messages];
        updated.splice(index, 1);
        setMessages(updated);
    };

    const handleMessageChange = (index: number, newText: string) => {
        const updated = [...messages];
        updated[index] = newText;
        setMessages(updated);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogo(imageUrl);
            setLogoFile(file);
        }
    };
    const layouts: { id: "chat"; icon: React.ComponentType<{ className?: string }>; title: string; description: string }[] = [

        {
            id: "chat",
            icon: PanelBottom,
            title: "Chat Layout",
            description: "Quick chat system with minimal elements.",
        },
    ];

    const handleReset = () => {
        setLogo(null)
        setBotName("")
        setStreaming(false)
        setPrimaryColor("#634464")
        setTextColor(selectedLayout === "chat" ? "#ffffff" : "#000000")
        setChatBgColor("#ffffff")
        setWelcomePopup("👋 Hi There!\nHow can I assist you today")
        setChatPlaceholder("Ask your query...")
        setCanSendAttachment(false)
        setMessages([])
    }


    // If we're on step 3, render CreateChatbot3 component
    if (showStep3) {
        return (
            <CreateChatbot3Component 
                name={botName}
                primaryColor={primaryColor}
                textColor={textColor}
                welcomeMessage={messages[0] || "👋 Hi There!\nHow can I assist you today"}
                welcomePopup={welcomePopup}
                chatPlaceholder={chatPlaceholder}
                logo={logoFile}
            />
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar2 />

            <div className="p-20 md:py-20 md:px-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
                {/* Left Side - Settings */}
                <div className="w-full lg:w-3/5 space-y-3">
                    <Button
                        variant="ghost"
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-black"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Button>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Create your chatbot</h2>


                        </div>

                        {/* Widget Themes */}
                        <div>
                            <h3 className="font-medium text-lg mb-2">Widget Themes</h3>
                            <div className="flex gap-6">
                                {/* Light Theme Group */}
                                <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                                    <p className="text-sm mb-2">Light</p>
                                    <div className="flex gap-2">
                                        {["#634464", "#245F61", "#1D1D1D", "#0A2647", "#1976D2", "#388E3C", "#FF5722", "#FF9800"].map((color, i) => (
                                            <div
                                                key={i}
                                                className={`w-6 h-6 rounded-full border cursor-pointer ${primaryColor === color ? 'ring-2 ring-brand-secondary' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => {
                                                    setPrimaryColor(color)
                                                    setTextColor("#ffffff")
                                                    setChatBgColor("#ffffff")
                                                }}
                                            />


                                        ))}
                                    </div>
                                </div>

                                {/* Dark Theme Group */}
                                <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg">
                                    <p className="text-sm mb-2">Dark</p>
                                    <div className="flex gap-2">
                                        {["#634465", "#245F60", "#877ea5", "#6A57AB", "#7F73FA", "#445B77", "#0387F4", "#3CA340"].map((color, i) => (
                                            <div
                                                key={i}
                                                className={`w-6 h-6 rounded-full border cursor-pointer ${primaryColor === color ? 'ring-2 ring-brand-secondary' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => {
                                                    setPrimaryColor(color)
                                                    setChatBgColor("#0f172a")
                                                    setTextColor("#ffffff")
                                                }}
                                            />


                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Layout Toggle */}
                        <div className=" dark:bg-gray-800">
                            <h3 className="font-medium text-lg mb-2">Layout</h3>
                            <div className=" p-2 ">
                                {layouts.map((layout) => {
                                    const isSelected = selectedLayout === layout.id
                                    const Icon = layout.icon

                                    return (
                                        <Card
                                            key={layout.id}
                                            onClick={() => setSelectedLayout(layout.id)}
                                            className={`cursor-pointer transition-all ${isSelected ? "border-brand-secondary shadow-md bg-gray-100 dark:bg-gray-700" : "hover:border-gray-300"
                                                }`}
                                        >
                                            <CardContent className="p-6 flex flex-col items-center justify-center gap-3 text-center">
                                                <Icon className={`w-6 h-6 ${isSelected ? "text-brand-secondary dark:text-white" : "text-muted-foreground"}`} />
                                                <div className="space-y-1">
                                                    <div className={`text-sm font-semibold ${isSelected ? "text-brand-secondary dark:text-white" : ""}`}>
                                                        {layout.title}
                                                    </div>
                                                    <div className={`text-xs leading-tight ${isSelected ? "text-brand-secondary dark:text-white" : "text-muted-foreground"}`}>
                                                        {layout.description}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        {/* General Settings Accordion */}
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-0" className="my-3 bg-gray-100 dark:bg-gray-800 data-[state=open]:bg-white border rounded-md px-2">
                                <AccordionTrigger>General Settings</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col md:flex-row gap-6 p-4">
                                        {/* Logo Section */}
                                        <div className="flex flex-col items-start gap-2">
                                            <h2 className="font-semibold text-start px-1">Logo</h2>
                                            <label htmlFor="logo-upload" className="cursor-pointer">
                                                <Image
                                                    src={logo || "/home/robot-head.png"}
                                                    alt="Logo"
                                                    width={60}
                                                    height={60}
                                                    className="rounded-lg object-cover bg-brand-primary"
                                                />
                                            </label>

                                            <Input
                                                id="logo-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <Button variant="outline" size="sm" onClick={handleReset} className="bg-gray-100 flex items-center gap-1">
                                                <RotateCcw className="w-4 h-4" /> Reset
                                            </Button>
                                        </div>

                                        {/* Chatbot Name + Stream Toggle */}
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Chatbot Name</label>
                                                <Input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={botName}
                                                    onChange={(e) => setBotName(e.target.value)}
                                                    className="bg-gray-100"
                                                />
                                            </div>

                                            {/* Stream AI Toggle */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-800">Stream AI Response</span>
                                                    <p className="text-gray-400">Enable streaming text in AI response</p>
                                                </div>
                                                <Switch
                                                    checked={streaming}
                                                    onCheckedChange={setStreaming}
                                                    className="data-[state=checked]:bg-brand-secondary bg-gray-300"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-1" className="my-3 bg-gray-100 dark:bg-gray-800 data-[state=open]:bg-white border rounded-md px-2">
                                <AccordionTrigger>Colors</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex flex-col md:flex-row gap-8 p-4">
                                        {/* Primary Color Picker */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-gray-700">Primary Color</label>
                                            <div className="flex items-center gap-1 rounded-2xl ">
                                                <Input
                                                    type="text"
                                                    value={primaryColor}
                                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                                    className="bg-gray-100"
                                                ></Input>
                                                <div
                                                    className="w-6 h-6 rounded-full border"
                                                    style={{ backgroundColor: primaryColor }}
                                                />
                                            </div>
                                            <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                                        </div>

                                        {/* Text Color Picker */}
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-gray-700">Text on Primary color</label>
                                            <div className="flex items-center gap-1 rounded-2xl">
                                                <Input
                                                    type="text"
                                                    value={textColor}
                                                    onChange={(e) => setTextColor(e.target.value)}
                                                    className="bg-gray-100"
                                                />
                                                <div
                                                    className="w-6 h-6 rounded-full border"
                                                    style={{ backgroundColor: textColor }}
                                                />
                                            </div>
                                            <HexColorPicker color={textColor} onChange={setTextColor} />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="my-3 bg-gray-100 dark:bg-gray-800 data-[state=open]:bg-white border rounded-md px-2">
                                <AccordionTrigger>Welcome Popup</AccordionTrigger>
                                <AccordionContent>
                                    <p className="mb-4">
                                        You can use markdown to format your text.{" "}
                                        <a
                                            href="https://www.markdownguide.org/"
                                            target="_blank"
                                            className="text-brand-secondary underline"
                                        >
                                            See markdown guide
                                        </a>
                                    </p>

                                    {/* Render Messages */}
                                    {messages.map((msg, index) => (
                                        <div key={index} className="flex items-center gap-2 mb-2">
                                            <Textarea
                                                value={msg}
                                                rows={2}
                                                onChange={(e) => handleMessageChange(index, e.target.value)}
                                                className="bg-gray-100 m-1 flex-1 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                                placeholder={"👋 Hi There!\nHow can I assist you today"}
                                            />
                                            <MinusCircle
                                                className="text-red-500 cursor-pointer"
                                                onClick={() => handleRemoveMessage(index)}
                                            />
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline"
                                        className="border-brand-secondary text-brand-secondary text-sm"
                                        onClick={handleAddMessage}
                                    >
                                        Add Message
                                    </Button>
                                </AccordionContent>
                            </AccordionItem>


                            <AccordionItem value="item-3" className="my-3 bg-gray-100 dark:bg-gray-800 data-[state=open]:bg-white border rounded-md px-2">
                                <AccordionTrigger>
                                    Welcome Message
                                </AccordionTrigger>
                                <AccordionContent className="px-4 py-3 space-y-3 text-sm text-gray-600">
                                    <h4 className="text-sm font-medium text-gray-800">English</h4>

                                                        <Textarea
                        value={welcomePopup}
                        onChange={(e) => setWelcomePopup(e.target.value)}
                        rows={2}
                                        className="w-full p-4 rounded-lg bg-gray-200 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                                    />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="my-3 bg-gray-100 dark:bg-gray-800 data-[state=open]:bg-white border rounded-md px-2">
                                <AccordionTrigger>Chat Input & Buttons</AccordionTrigger>
                                <AccordionContent className="p-4 space-y-4">
                                    {/* Input Placeholder */}
                                    <div>
                                        <input
                                            placeholder="Ask your query..."
                                            value={chatPlaceholder}
                                            onChange={(e) => setChatPlaceholder(e.target.value)}
                                            className="bg-gray-100 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        />
                                    </div>

                                    {/* Attachment Toggle */}
                                    <div className="flex flex-col items-start gap-2 text-sm text-gray-800">
                                        <p>Buttons</p>

                                        <div className="flex flex-row items-start gap-2">
                                            <Switch
                                                checked={canSendAttachment}
                                                onCheckedChange={setCanSendAttachment}
                                                className="data-[state=checked]:bg-brand-secondary bg-gray-300"
                                            />
                                            <Paperclip className="w-4 h-4 text-gray-500" />
                                            <span>Can send attachment</span>
                                        </div>

                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>


                        <div className="flex justify-center">
                            <Button className="bg-brand-primary hover:bg-brand-secondary dark:text-white" onClick={goToStep3}>Train Chatbot</Button>
                        </div>
                    </div>
                </div>



                <ChatbotPreview
                    key={messages.join("-")}
                    layout={selectedLayout}
                    logo={logo}
                    primaryColor={primaryColor}
                    textColor={textColor}
                    chatBgColor={chatBgColor}
                    welcomeMessage={welcomePopup}
                    chatPlaceholder={chatPlaceholder}
                    canSendAttachment={canSendAttachment}
                    botName={botName}
                    messages={messages}

                />



            </div>
        </div >
    )
}
