"use client"

import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import {HiOutlineSparkles   } from "react-icons/hi";

const tools1 = [
    { name: "Crisp", src: "/home/connectlogo/crisp.svg" },
    { name: "Telegram", src: "/home/connectlogo/telegram.svg" },
    { name: "Intercom", src: "/home/connectlogo/intercom.svg" },
    { name: "Discord", src: "/home/connectlogo/discord.svg" },
    { name: "Crisp", src: "/home/connectlogo/crisp.svg" },
    { name: "WhatsApp", src: "/home/connectlogo/whatsapp.svg" },
    { name: "Instagram", src: "/home/connectlogo/instagram.svg" },
    { name: "Messenger", src: "/home/connectlogo/messenger.svg" },
    { name: "Slack", src: "/home/connectlogo/slack.svg" },


]
const tools2 = [
    { name: "Pabbly", src: "/home/connectlogo/pabbly-logo.svg" },
    { name: "Shopify", src: "/home/connectlogo/shopify-logo.svg" },
    { name: "Twilio", src: "/home/connectlogo/twilio.svg" },
    { name: "WebFlow", src: "/home/connectlogo/webflow-blue-bg.svg" },
    { name: "Wix", src: "/home/connectlogo/wix-logo.svg" },
    { name: "WordPress", src: "/home/connectlogo/wordpress.svg" },
    { name: "WooCommerce", src: "/home/connectlogo/woocommerce-logo.svg" },
    { name: "Zapier", src: "/home/connectlogo/zapier-logo.svg" },

]

export default function ConnectSlider() {
    const [sliderRef1, instanceRef1] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        breakpoints: {
            "(max-width: 640px)": {
                slides: { perView: 3, spacing: 10 },
            },
            "(min-width: 641px) and (max-width: 1024px)": {
                slides: { perView: 4, spacing: 15 },
            },
        },
        slides: { perView: 6, spacing: 15 },
        created(slider) {
            setInterval(() => {
                slider.next();
            }, 2000);
        },
    })

    const [sliderRef2, instanceRef2] = useKeenSlider<HTMLDivElement>({
        loop: true,
        renderMode: "performance",
        breakpoints: {
            "(max-width: 640px)": {
                slides: { perView: 3, spacing: 10 },
            },
            "(min-width: 641px) and (max-width: 1024px)": {
                slides: { perView: 4, spacing: 15 },
            },
        },
        slides: { perView: 6, spacing: 15 },
        created(slider) {
            setInterval(() => {
                slider.next();
            }, 2000);
        },
    })


    return (
        <div className="py-10">
            <div className="text-center mb-6">
                <div className="flex justify-center items-center text-center text-4xl space-x-2 text-brand-primary">
                    <h2 className="text-4xl font-bold py-4 text-brand-primary">Connect Anywhere </h2>
                    <HiOutlineSparkles />
                </div>
                <p className="text-muted-foreground">Connect your AI Agent with your favorite tools and platforms</p>
            </div>

            {/* First Row */}
            <div ref={sliderRef1} className="keen-slider px-4">
                {tools1.map((tool, idx) => (
                    <Card
                        key={idx}
                        className="keen-slider__slide flex items-center justify-center gap-2 px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 shadow-xl transition-transform duration-500 ease-in-out"
                    >
                        <Image src={tool.src} alt={tool.name} width={30} height={30} />
                        <span className="text-sm font-medium text-gray-700 dark:text-white">{tool.name}</span>
                    </Card>

                ))}
            </div>

            {/* Second Row (Reverse) */}
            <div ref={sliderRef2} className="keen-slider px-4 mt-6">
                {tools2.map((tool, idx) => (
                    <Card
                        key={`bottom-${idx}`}
                        className="keen-slider__slide flex items-center justify-center gap-2 px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 shadow-sm transition-transform duration-500 ease-in-out"
                    >
                        <Image src={tool.src} alt={tool.name} width={30} height={30} />
                        <span className="text-sm font-medium text-gray-700 dark:text-white">{tool.name}</span>
                    </Card>

                ))}
            </div>
        </div>
    )
}
