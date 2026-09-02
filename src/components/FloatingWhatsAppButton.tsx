import React, { useState } from 'react';
import { MessageCircle, Video, X, Sparkles, ShoppingBag } from 'lucide-react';
import { DISPLAY_WHATSAPP_NUMBER } from '../data/sarees';
import { generateGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
      
      {/* Quick Menu Popup */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white border border-[#1B1B1B] shadow-2xl p-4 space-y-3 text-left">
          
          <div className="flex items-center justify-between border-b border-[#1B1B1B]/10 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#1B1B1B] text-white flex items-center justify-center">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              </div>
              <div>
                <h4 className="font-mono text-[11px] font-bold text-[#1B1B1B] uppercase tracking-wider">
                  WhatsApp Concierge
                </h4>
                <span className="font-mono text-[9px] text-[#25D366] flex items-center gap-1 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                  Active Desk
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#1B1B1B]/60 hover:text-[#1B1B1B] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#1B1B1B]/75 font-sans leading-relaxed">
            Namaskara! Connect directly with our saree master on WhatsApp.
          </p>

          <div className="space-y-1.5 pt-1 font-mono text-xs">
            <a
              href={generateGeneralInquiryWhatsAppUrl('Order Saree via WhatsApp Catalog')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 bg-[#F8F7F4] hover:bg-[#1B1B1B] hover:text-white border border-[#1B1B1B]/20 text-[#1B1B1B] flex items-center gap-2 transition-colors uppercase tracking-wider text-[10px]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Order Saree on WA</span>
            </a>

            <a
              href={generateGeneralInquiryWhatsAppUrl('Request 5-Min Live Video Saree Drape Preview')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 bg-[#F8F7F4] hover:bg-[#1B1B1B] hover:text-white border border-[#1B1B1B]/20 text-[#1B1B1B] flex items-center gap-2 transition-colors uppercase tracking-wider text-[10px]"
            >
              <Video className="w-3.5 h-3.5 text-[#25D366]" />
              <span>5-Min Video Drape</span>
            </a>

            <a
              href={generateGeneralInquiryWhatsAppUrl('Custom Bridal / Bulk Gifting Requirement')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 bg-[#F8F7F4] hover:bg-[#1B1B1B] hover:text-white border border-[#1B1B1B]/20 text-[#1B1B1B] flex items-center gap-2 transition-colors uppercase tracking-wider text-[10px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Bridal / Trousseau</span>
            </a>
          </div>

          <div className="font-mono text-[9px] text-center text-[#1B1B1B]/60 pt-1 uppercase tracking-wider">
            WA: +91 <strong>{DISPLAY_WHATSAPP_NUMBER}</strong> (No calls)
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-3 bg-[#1B1B1B] text-[#F8F7F4] hover:bg-black border border-[#1B1B1B] shadow-2xl transition-all font-mono text-xs uppercase tracking-wider"
        aria-label="Contact Neere Seere on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
        <span className="hidden sm:inline">
          Order via WA (9686611223)
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
      </button>

    </div>
  );
};

