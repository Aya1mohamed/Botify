
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function FeatureCards() {
    return (
        <section className="py-16 px-4 max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-primary dark:text-white mb-10">
                Explore the Complete Stack of Future-Ready<br />and Innovative AI Suite
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 auto-rows-[minmax(180px,_1fr)] gap-6 text-left">

                <div className="grid col-span-6 auto-rows-[minmax(180px,_1fr)] gap-3">

                    {/* Big Card – row span 2 */}
                    <Card className="relative p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition row-span-2">
                        <div className="w-12 h-12 mb-4">
                            <Image src="/features/chatbot.svg" alt="Chatbot" width={48} height={48} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No-Code AI Chatbot Builder
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Build a AI chatbot for your business within minutes with our No-Code AI Chatbot Builder.
                        </p>
                        <div className="absolute bottom-4 right-4 text-brand-primary">
                            <ArrowRight size={18} className="hover:cursor-pointer"/>
                        </div>
                    </Card>

                    {/* Card 2 */}
                    <Card className="relative p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-12 h-12 mb-4">
                            <Image src="/features/studio.svg" alt="AI Studio" width={48} height={48} />
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


                <div className="grid col-span-6 auto-rows-[minmax(180px,_1fr)] gap-3">
                    {/* Card 3 */}
                    <Card className="relative p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-12 h-12 mb-4">
                            <Image src="/features/helpdesk.svg" alt="Helpdesk" width={48} height={48} />
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
                    <Card className="relative p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-12 h-12 mb-4">
                            <Image src="/features/hitl.svg" alt="HITL" width={48} height={48} />
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
                    <Card className="relative p-6 rounded-2xl shadow-md bg-white dark:bg-gray-900 border hover:shadow-lg transition">
                        <div className="w-12 h-12 mb-4">
                            <Image src="/features/more.svg" alt="Explore More" width={48} height={48} />
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

            <div className="mt-10">
                <a href="#" className="text-sm text-brand-primary font-medium hover:underline">
                    Explore All Features →
                </a>
            </div>
        </section>
    )
}
