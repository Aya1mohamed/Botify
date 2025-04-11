import {
  Facebook,
  Linkedin,
  Youtube,
  Github,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white py-6 px-3 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col gap-10 mb-10">
          {/* Logo + Social */}
          <div className="flex flex-row justify-between items-center w-full gap-4">
            <div className="">
              <img src="/home/logoo2.png" className='w-32' alt="Botify" />
            </div>
            <div className="flex gap-3">
              <IconBox  icon={<Facebook />} />
              <IconBox icon={<Linkedin  />} />
              <IconBox icon={<Youtube />} />
              <IconBox icon={<Github />} />
              <IconBox icon={<Mail />} />
            </div>
          </div>


          <div className="border-t border-white/30 pt-4 text-center text-sm text-white/70">
          </div>




          {/* Footer columns - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8 w-full">
            <FooterCol
              title="Quick Links"
              links={[
                'Documentation',
                'Status',
                'Contact Us',
                'Video Tutorials',
                'Become an Affiliate',
              ]}
            />
            <FooterCol
              title="Tools"
              links={[
                'JSON to CSV',
                'CSV to JSON',
                'AI Chatbot Name Generator',
                'AI Chatbot ROL Calculator',
                'AI Business Name Generator',
              ]}
            />
            <FooterCol
              title="Explore"
              links={[
                'Library',
                'Integrations',
                'Tutorials',
                'Blog',
                'Changelog',
              ]}
            />
            <FooterCol
              title="Trust Center"
              links={[
                'Terms and Conditions',
                'Privacy policy',
                'GDPR',
                'Refund Policy',
                'Data Processing Arguments',
              ]}
            />
          </div>


        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/30 pt-4 text-center text-sm text-white/70">
          © Copyright 2025 Windows discs , All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-3 text-white">{title}</h3>
      <ul className="space-y-2 text-white/80">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link href="#" className="hover:underline">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconBox({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-md transition">
      {icon}
    </div>
  );
}
