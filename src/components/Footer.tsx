import React from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Video,
  ArrowUp
} from 'lucide-react';
import { 
  DISPLAY_WHATSAPP_NUMBER, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL, 
  CATEGORIES_LIST 
} from '../data/sarees';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsAiStylistOpen } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1B1B1B] text-[#F8F7F4] border-t border-[#1B1B1B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Top Quick Access Strip */}
        <div className="flex flex-col lg:flex-row items-center justify-between border-b border-white/10 pb-10 gap-6">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 justify-center lg:justify-start font-mono text-xs">
            <div>
              <div className="text-[10px] tracking-[0.25em] text-[#B8860B] uppercase mb-1">
                WhatsApp Desk
              </div>
              <a 
                href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}`} 
                className="text-white hover:text-[#B8860B] transition-colors"
              >
                +91 {DISPLAY_WHATSAPP_NUMBER}
              </a>
            </div>
            
            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

            <div>
              <div className="text-[10px] tracking-[0.25em] text-[#B8860B] uppercase mb-1">
                Instagram
              </div>
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[#B8860B] transition-colors"
              >
                @{INSTAGRAM_HANDLE} (105K)
              </a>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />

            <div>
              <div className="text-[10px] tracking-[0.25em] text-[#B8860B] uppercase mb-1">
                Authenticity
              </div>
              <div className="text-white/80">
                100% Silk Mark Certified
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <a
            href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=${encodeURIComponent('🙏 Namaskara Neere Seere! I would like to place an inquiry / order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#F8F7F4] bg-transparent text-[#F8F7F4] hover:bg-[#F8F7F4] hover:text-[#1B1B1B] font-mono text-xs uppercase tracking-widest px-6 py-3 flex items-center gap-2 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Order On WhatsApp</span>
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-left">
          
          {/* Brand Info (col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col">
              <div className="text-3xl font-light text-[#F8F7F4] font-serif tracking-tight">
                ನೀರೇ ಸೀರೆ
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#B8860B] mt-1">
                Neere Seere &bull; Handloom Silk Destination
              </div>
            </div>

            <p className="text-xs text-[#F8F7F4]/70 leading-relaxed font-sans font-light">
              Direct weaver handloom sarees from artisan clusters across Karnataka, Tamil Nadu, and Varanasi. Preserving indigenous textile mastery with absolute Silk Mark authenticity.
            </p>

            {/* Direct WhatsApp Notice */}
            <div className="p-3.5 border border-white/10 bg-white/[0.03] space-y-1 font-mono">
              <div className="text-[10px] text-[#B8860B] uppercase tracking-wider flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                Customer Support:
              </div>
              <div className="text-xs text-white">
                WhatsApp: <a href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}`} className="text-[#25D366] hover:underline">9686611223</a>
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-wider">
                Strictly no calls &bull; Text / voice messages only
              </div>
            </div>

            {/* Social handles */}
            <div className="flex items-center gap-3 pt-1 font-mono text-xs">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 hover:border-white text-white flex items-center justify-center transition-colors"
                title="Instagram: @neereseere_2024"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 hover:border-white text-white flex items-center justify-center transition-colors"
                title="WhatsApp Direct: 9686611223"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Quick Saree Collections (col 3) */}
          <div className="lg:col-span-3 space-y-3 font-mono">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B8860B]">
              [01] Collections
            </div>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                  >
                    <span>&bull; {cat.label}</span>
                    <span className="text-[10px] opacity-50">({cat.kannada})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Boutique Services (col 2) */}
          <div className="lg:col-span-2 space-y-3 font-mono">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B8860B]">
              [02] Concierge
            </div>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              <li>
                <a
                  href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=Namaskara!%20I%20would%20like%20to%20book%20a%20Live%20Video%20Drape%20Preview.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Video className="w-3 h-3 text-[#25D366]" />
                  <span>Live Video Drape</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsAiStylistOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-left"
                >
                  <Sparkles className="w-3 h-3 text-[#B8860B]" />
                  <span>AI Saree Stylist</span>
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=Namaskara!%20I%20need%20custom%20Bridal%20bulk%20orders%20and%20wedding%20gifting%20sarees.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Bridal Trousseau
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=Namaskara!%20I%20would%20like%20Fall%20and%20Pico%20stitching%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Fall & Pico Service
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram (105K)
                </a>
              </li>
            </ul>
          </div>

          {/* Boutique Hours & Assurance (col 3) */}
          <div className="lg:col-span-3 space-y-3 font-mono">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#B8860B]">
              [03] Dispatch & Trust
            </div>
            
            <div className="space-y-3 text-xs text-white/70 font-sans">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Order Desk:</div>
                  <div className="text-[11px] text-white/60">10:00 AM – 8:30 PM (Mon – Sun)</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Truck className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Pan-India Express:</div>
                  <div className="text-[11px] text-white/60">2-4 Business Days with Tracking</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Quality Assurance:</div>
                  <div className="text-[11px] text-white/60">100% Silk Mark Certified</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Neere Seere (ನೀರೇ ಸೀರೆ) &bull; All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Bengaluru, Karnataka</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 border border-white/20 hover:border-white text-white transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

