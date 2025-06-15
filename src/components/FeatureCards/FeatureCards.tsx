import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function FeatureCards() {
    return (
        <section className="py-12 px-4 max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-white mb-8">
                Explore the Complete Stack of Future-Ready<br />and Innovative AI Suite
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 auto-rows-[minmax(280px,_1fr)] gap-4 text-left">

                <div className="grid col-span-6 auto-rows-[minmax(280px,_1fr)] gap-4">

                    {/* Big Card – row span 2 */}
                    <Card className="relative p-0 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition row-span-2 flex flex-col overflow-hidden">
                        <div className="w-full h-[85%] relative">
                            <Image 
                                src="/home/image1.png" 
                                alt="Chatbot" 
                                fill
                                className="object-contain"
                                priority
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 border-t">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        No-Code AI Customized Chatbot Builder
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Build a AI chatbot for your business within minutes
                                    </p>
                                </div>
                                <div className="text-brand-primary">
                                    <ArrowRight size={20} className="hover:cursor-pointer"/>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 2 */}
                    <Card className="relative p-4 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-full h-48 mb-3 relative">
                            <Image 
                                src="/home/image2.webp" 
                                alt="AI Studio" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            AI Studio
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Build and deploy powerful AI agents with full control for your production use cases.
                        </p>
                        <div className="absolute bottom-4 right-4 text-brand-primary">
                            <ArrowRight size={18} className="hover:cursor-pointer" />
                        </div>
                    </Card>
                </div>


                <div className="grid col-span-6 auto-rows-[minmax(280px,_1fr)] gap-4">
                    {/* Card 3 */}
                    <Card className="relative p-4 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-full h-48 mb-3 relative">
                            <Image 
                                src="/home/image3.webp" 
                                alt="Helpdesk" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Self-Service AI Helpdesk
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Organize your information and integrate with your AI Chatbot.
                        </p>
                        <div className="absolute bottom-4 right-4 text-brand-primary">
                            <ArrowRight size={18} className="hover:cursor-pointer"/>
                        </div>
                    </Card>

                    {/* Card 4 */}
                    <Card className="relative p-4 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-full h-48 mb-3 relative">
                            <Image 
                                src="/home/image3.png" 
                                alt="HITL" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Human-in-the-Loop (HITL)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Keep humans in the loop to ensure accuracy and performance.
                        </p>
                        <div className="absolute bottom-4 right-4 text-brand-primary">
                            <ArrowRight size={18} className="hover:cursor-pointer"/>
                        </div>
                    </Card>

                    {/* Card 5 */}
                    <Card className="relative p-4 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-full h-48 mb-3 relative">
                            <Image 
                                src="/home/image4.png" 
                                alt="Explore More" 
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Explore More Features
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Explore the complete suite of tools and discover their full potential.
                        </p>
                        <div className="absolute bottom-4 right-4 text-brand-primary">
                            <ArrowRight size={18} className="hover:cursor-pointer"/>
                        </div>
                    </Card>

                </div>

            </div>

            <div className="mt-8">
                <a href="#" className="text-sm text-brand-primary font-medium hover:underline">
                    Explore All Features →
                </a>
            </div>
        </section>
    )
}
