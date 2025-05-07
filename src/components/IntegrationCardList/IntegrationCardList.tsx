import React from 'react';
import { FaTelegramPlane, FaFacebookMessenger, FaInstagram, FaWhatsapp, FaDiscord } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import Image from 'next/image';
const cards = [
  {
    name: 'Telegram', icon: <Image src={"/integrations/telegram.svg"}alt={"logo"}width={40}height={40} className="rounded-md"/>, description: 'To access your chatbot using Telegram, connect your Telegram.'},
  { name: 'Messenger', icon: <Image src={"/integrations/messanger.svg"}alt={"logo"}width={40}height={40} className="rounded-md"/>, description: 'To access your chatbot using Messenger, connect your Messenger.' },
  { name: 'Instagram', icon: <Image src={"/integrations/instagram.svg"}alt={"logo"}width={40}height={40} className="rounded-md"/>, description: 'To access your chatbot using Instagram, connect your Instagram.' },
  { name: 'WhatsApp', icon: <Image src={"/integrations/whatsapp.svg"}alt={"logo"}width={40}height={40} className="rounded-md"/>, description: 'To access your chatbot using WhatsApp, connect your WhatsApp.' },
  { name: 'Discord', icon: <Image src={"/integrations/discord.svg"}alt={"logo"}width={40}height={40} className="rounded-md"/>, description: 'To access your chatbot using Discord, connect your Discord.' },
];

const IntegrationCardList = () => {
  return (
    <div className="mt-8">
      <div className='flex justify-between gap-1 mb-2'>
        <h3 className="text-md font-semibold mb-4">Other integrations</h3>
        <Input className='w-fit' placeholder='Search...' />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.name} className="border rounded-md p-4 bg-white shadow-sm">
            <div className="flex flex-col items-start gap-2 mb-2">
              <h4 className="font-medium text-md">{card.name}</h4>
              {card.icon}
            </div>
            <p className="text-xs text-gray-500 mb-3">{card.description}</p>
            <Button className='bg-brand-primary hover:bg-brand-secondary hover:text-white text-white' variant="outline" size="sm">Enable</Button>
          </div>
        ))}
      </div>

    </div>

  );
};

export default IntegrationCardList;