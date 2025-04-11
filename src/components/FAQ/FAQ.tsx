import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Accordhome() {
    return (
        <div className='md:w-[70%] w-full p-10 mx-auto'>
            <h4 className="text-3xl md:text-4xl font-bold text-center text-brand-primary mb-2">
                Frequently Asked Questions
            </h4>
            <p className="text-center text-muted-foreground mb-8">
                Check out the most common questions and answers below
            </p>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>What is Botify?</AccordionTrigger>
                    <AccordionContent>
                        Botify is an AI-powered platform that automates customer support, sales, and business operations. It provides smart AI agents that handle customer interactions, reduce workload, and improve efficiency across multiple channels.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>What is Ai agents?</AccordionTrigger>
                    <AccordionContent>
                        AI agents are intelligent systems that perform tasks on their own or with minimal human input. They can interact with users, process information, and make decisions based on data to complete tasks efficiently                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>How can i build the Ai Agent?</AccordionTrigger>
                    <AccordionContent>
                        To build an AI agent, start by logging into yourgpt or creating an account from here.. Next, train the agent by using your business-specific data to improve its accuracy. After training, test the AI by running simulations to refine its responses and ensure it meets your needs. Finally, deploy the agent by integrating it with your website and customer service tools for smooth operation.                           </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>What are the applications of Ai agents in business?</AccordionTrigger>
                    <AccordionContent>
                        AI agents in business are making operations faster, smarter, and more efficient. They handle customer support, automate repetitive tasks, and improve decision-making with real-time data analysis. Sales teams use them for lead qualification, while businesses rely on omni channel integration they bring and AI analytics to optimize customer experience, operations and cut costs. AI automation is helping companies scale without adding complexity.                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>Can AI agents be integrated with my existing software systems ?</AccordionTrigger>
                    <AccordionContent>
                    Yes, AI agents can integrate with existing software systems through APIs, plugins, and custom integrations. They connect with CRM platforms, ISTM, helpdesk software, e-commerce systems, and other business applications to automate workflows, enhance decision-making, and improve customer interactions.                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>Can i train my AI agent on my data?</AccordionTrigger>
                    <AccordionContent>
                    Yes, you can train AI on your data to improve accuracy and relevance. Businesses can upload information from multiple sources, including documents, Google Drive, Notion, Dropbox, Confluence, YouTube videos, FAQs, past interactions, helpdesk articles, and file formats like CSV, TXT, PDF, DOCX, PPTX, and MD. This allows the AI to learn and generate more precise responses based on your business-specific data.                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>Can i control my AI agent?</AccordionTrigger>
                    <AccordionContent>
                    Yes, you can control your AI agent by using AI Studio, that allows you create conversational flow guided agents. You can also set up human-in-the-loop (HITL) to intervene when needed, ensuring the AI agent provides accurate responses and maintains high-quality interactions.                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8" className='my-3 data-[state=open]:bg-brand-secondary data-[state=open]:text-white border rounded-md p-2 '>
                    <AccordionTrigger className='text-xl text-[#25252D] data-[state=open]:text-white dark:text-white'>Is my data safe with Botify?</AccordionTrigger>
                    <AccordionContent>
                    Yes, Botify is safe and secure. We comply with industry-standard regulations like SOC 2 Type 2, ensuring data protection, privacy, and security. Botify uses encryption, access controls, and regular audits to safeguard your data from unauthorized access.                   </AccordionContent>
                </AccordionItem>
            </Accordion>


        </div>
    )
}
