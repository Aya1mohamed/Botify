
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import {
    Folder, Split,Link2, FileText, MessageSquareText, Webhook, Parentheses, Search, MoveRight
} from 'lucide-react';
import { RiNotionFill, RiFileExcel2Fill } from "react-icons/ri";
import { FaConfluence, FaGoogleDrive } from "react-icons/fa";
import { BsShieldFillExclamation, BsInfoCircleFill } from "react-icons/bs";


export default function Buildsec() {
    return (
        <div className="bg-[#14141B] relative text-white py-16 px-4">
            {/* Heading */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-2 text-white">Build AI Agents on your <span className="text-brand-secondary">Data, Tools & Policies</span></h2>
                <p className="text-gray-400">AI agents are changing the way we interact with technology.</p>
            </div>

            {/* Main layout */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {/* Left section */}
                <div className="flex flex-col gap-6 text-sm w-full md:w-1/3 max-w-sm ">
                    <div className='flex flex-row gap-2 justify-between '>
                        <Card className="bg-brand-secondary text-white border-none rounded-3xl">
                            <CardContent className="px-8 py-4 space-y-2">
                                <p className="font-semibold text-lg text-center">Data</p>
                                <div className="flex gap-2 flex-wrap items-center">
                                    <Folder className='w-6 h-6' />
                                    <RiNotionFill className='w-6 h-6' />
                                    <RiFileExcel2Fill className='w-6 h-6' />
                                    <FaConfluence className='w-6 h-6' />
                                    <div className='bg-gray-300 w-10 h-4 opacity-40 rounded-2xl'></div>
                                </div>
                                <div className='flex gap-2 flex-wrap'>
                                    <Link2 className='w-6 h-6' />
                                    <FileText className='w-6 h-6' />
                                    <FaGoogleDrive className='w-6 h-6' />
                                    <MessageSquareText className='w-6 h-6' />
                                    <div className='bg-gray-300 w-10 h-4 opacity-40 rounded-2xl'></div>


                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-brand-secondary text-white border-none rounded-3xl">
                            <CardContent className="p-6">
                                <p className="font-semibold text-lg text-center">Policies</p>
                                <div className='flex flex-row justify-between py-3'>
                                    <BsShieldFillExclamation className='w-6 h-6' />
                                    <BsInfoCircleFill className='w-6 h-6' />

                                </div>
                            </CardContent>
                        </Card>
                    </div>


                    <Card className="bg-brand-secondary text-white border-none rounded-3xl">
                        <CardContent className="py-6 space-y-4">
                            <p className="font-semibold text-lg text-center">Tools</p>
                            <div className="flex flex-wrap gap-3 text-sm justify-center ">
                                <div className="bg-[#7B7B7B] flex items-center gap-2 rounded-full px-4 py-2">
                                    <Webhook className="w-4 h-4" />
                                    <p>Connecting external apis</p>
                                </div>
                                <div className="bg-[#4E4E4E] flex items-center gap-2 rounded-full px-4 py-2">
                                    <Parentheses className="w-4 h-4" />
                                    <p>Functions</p>
                                </div>
                                <div className="bg-[#646531] flex items-center gap-2 rounded-full px-4 py-2">
                                    <Split className="w-4 h-4 rotate-90" />
                                    <p>Executing Flow</p>
                                </div>
                                <div className="bg-[#5F3D52] flex items-center gap-2 rounded-full px-4 py-2">
                                    <Search className="w-4 h-4" />
                                    <p>Realtime Search</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>






                    <Card className="bg-brand-secondary text-white border-none rounded-3xl">
                        <CardContent className="p-6 space-y-4">
                            <p className="font-semibold text-lg text-center">AI Models</p>
                            <div className="grid grid-cols-3 gap-6 items-center justify-items-center">
                                <img src="/logos/deepseek.png" className="w-20 h-auto" alt="Deepseek" />
                                <img src="/logos/openai.png" className="w-20 h-auto" alt="OpenAI" />
                                <img src="/logos/googleai.png" className="w-20 h-auto" alt="Google AI" />
                                <img src="/logos/mistralai.png" className="w-20 h-auto" alt="Mistral AI" />
                                <img src="/logos/cohere.png" className="w-20 h-auto" alt="Cohere" />
                                <img src="/logos/anthropic.png" className="w-20 h-auto" alt="Anthropic" />

                            </div>
                            <div className='flex flex-wrap items-center space-x-3 '>
                                <div className='bg-gray-300 w-[50%] h-4 opacity-50 rounded-2xl '></div>
                                <div className='bg-gray-300 w-[30%] h-4 opacity-50 rounded-2xl '></div>

                            </div>


                        </CardContent>
                    </Card>
                </div>
                {/* Arrow from left to middle */}
                <div className="hidden md:block absolute left-96 translate-x-9 top-1/5 transform z-20">
                    <MoveRight className="w-52 h-8 text-black" />
                </div>

                {/* Middle engine logo with glow */}
                <div className="relative flex flex-col md:flex-row justify-center items-center p-10">



                    {/* Glow effect */}
                    <div className="absolute w-72 h-72 bg-brand-accent opacity-30 blur-3xl rounded-full z-0" />

                    {/* Logo on top */}
                    <div className="bg-[#14141B] px-7 py-4 rounded-3xl shadow-xl z-10">
                        <Image src="/home/logoo.png" alt="botify" width={80} height={80} />
                    </div>
                </div>

                {/* Arrow from middle to right */}
                <div className="hidden md:block absolute left-80 translate-x-96 top-1/5 transform z-20">
                    <MoveRight className="w-8 h-8 text-black" />
                </div>


                {/* Right Agent response */}
                <div className="w-full max-w-md md:w-1/3 flex flex-col gap-4 text-sm bg-brand-secondary rounded-3xl p-6">
                    <h3 className="font-bold text-lg px-2">Your Agent</h3>

                    {/* User message on the right */}
                    <div className="flex justify-start">
                        <div className="bg-white text-black flex flex-grow items-center space-x-2 rounded-xl shadow p-4 max-w-[70%]">
                            <img src='/home/girl.svg' className='w-7 h-7'></img>
                            <p>Can I check my lab test results?</p>
                        </div>
                    </div>

                    {/* Agent response on the left */}
                    <div className="flex justify-end">
                        <div className=" text-black rounded-xl  pt-4 max-w-[80%]">
                            <div className='flex flex-row space-x-2 bg-brand-primary  md:translate-x-5 translate-x-3 p-2 rounded-t-3xl text-white md:max-w-[70%] max-w-[80%]'>
                                <div> <Split className='rotate-90 w-5 h-5' /></div>
                                <div>
                                    <p className='text-sm'> Book Appointment Flow</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-2 p-2 bg-white rounded-2xl">
                                <img src="/home/Chatbot.svg" className=' w-8 h-8' alt="" />
                                <p className="text-sm text-gray-700">
                                    Sure! Please log in to your account and navigate to “Health Records” under the dashboard.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder gray message */}
                    <div className="flex justify-start">
                        <div className="bg-gray-300 blur-sm opacity-50 text-black rounded-xl shadow p-4 max-w-[70%] w-full h-14"></div>
                    </div>
                </div>


            </div>
        </div>
    );
}
