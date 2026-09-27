import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Sami-Ullah-Akram on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-black/50 hover:shadow-emerald-950/60 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121314] hover:scale-105"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        
        {/* Subtle tooltip on hover for desktop */}
        <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 hidden sm:inline-block">
          Chat on WhatsApp
        </span>

        {/* Subtle green pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none -z-10" />
      </a>
    </aside>
  );
};
