import React from 'react';
import { Truck, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { DISPLAY_WHATSAPP_NUMBER, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../data/sarees';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#F8F7F4] text-[#1B1B1B] py-2 px-4 sm:px-8 border-b border-[#1B1B1B]/12 font-mono text-[10px] tracking-[0.18em] uppercase">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Meta tags */}
        <div className="flex items-center gap-4">
          <span className="text-[#1B1B1B]/60">
            [01] BENGALURU
          </span>
          <span className="text-[#1B1B1B]/20">/</span>
          <span className="text-[#1B1B1B]/80 flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-[#B8860B]" />
            Free shipping over ₹5,000
          </span>
          <span className="text-[#1B1B1B]/20 hidden sm:inline">/</span>
          <span className="text-[#1B1B1B]/80 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
            100% Silk Mark Authenticity
          </span>
        </div>

        {/* Center: Offer */}
        <div className="flex items-center justify-center gap-2 text-center text-[#1B1B1B]">
          <Sparkles className="w-3 h-3 text-[#B8860B]" />
          <span>
            Code <strong className="text-[#B8860B] font-bold">NEERE10</strong> for 10% Off
          </span>
        </div>

        {/* Right: WhatsApp Concierge */}
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#1B1B1B] hover:text-[#B8860B] transition-colors"
            title="WhatsApp Orders Only - No Calls Please"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366]" />
            <span>WA Orders: <strong>+91 {DISPLAY_WHATSAPP_NUMBER}</strong></span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1B1B1B]/60 hover:text-[#1B1B1B] transition-colors hidden lg:inline"
          >
            @{INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>
    </div>
  );
};

