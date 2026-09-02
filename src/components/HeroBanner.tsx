import React from 'react';
import { 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Video,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { 
  DISPLAY_WHATSAPP_NUMBER, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL, 
  SAREE_PRODUCTS 
} from '../data/sarees';
import { generateGeneralInquiryWhatsAppUrl, generateSingleProductWhatsAppUrl } from '../utils/whatsapp';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, setSelectedQuickViewProduct } = useCart();

  const scrollToCatalog = (categoryId = 'all') => {
    setSelectedCategory(categoryId);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredSaree = SAREE_PRODUCTS[0]; // Royal Crimson Kanjeevaram
  const { url: whatsAppOrderUrl } = generateSingleProductWhatsAppUrl(featuredSaree, 'buy');

  return (
    <section id="story-section" className="relative bg-[#F8F7F4] text-[#1B1B1B] py-14 sm:py-20 border-b border-[#1B1B1B]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Minimalist Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Space Mono Meta Tag */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#1B1B1B]/60 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                Collection 2026 // Heirloom Handlooms
              </span>
              <span className="text-[#1B1B1B]/20">/</span>
              <span className="font-serif italic text-xs text-[#B8860B]">
                ಸಾಂಪ್ರದಾಯಿಕ ನೇಯ್ಗೆ
              </span>
            </div>

            {/* Giant Cormorant Garamond Heading */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-[#1B1B1B] leading-[0.95] tracking-tight">
              Heirloom Silks,<br />
              <span className="font-normal italic">Authentically Yours.</span>
            </h2>

            {/* Subtitle / Narrative */}
            <p className="text-[#1B1B1B]/75 text-sm sm:text-base max-w-xl font-sans font-light leading-relaxed">
              Direct weaver-crafted pure silk sarees from Karnataka & Tamil Nadu — featuring authentic pure Kanjeevarams, featherweight Mysore silks, and artisanal Banarasi weaves. Verified with genuine Silk Mark certification.
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-catalog-btn"
                onClick={() => scrollToCatalog('all')}
                className="px-7 py-3.5 bg-[#1B1B1B] text-[#F8F7F4] border border-[#1B1B1B] font-mono text-xs uppercase tracking-[0.15em] hover:bg-transparent hover:text-[#1B1B1B] flex items-center gap-2.5 transition-all"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                id="hero-wa-order-btn"
                href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=${encodeURIComponent('🙏 Namaskara Neere Seere! I would like to see your latest collection of handloom sarees.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-[#1B1B1B] text-[#1B1B1B] font-mono text-xs uppercase tracking-[0.15em] hover:bg-[#1B1B1B] hover:text-[#F8F7F4] flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Order via WA</span>
              </a>

              <a
                id="hero-video-call-btn"
                href={generateGeneralInquiryWhatsAppUrl('Request 5-Minute Live Video Saree Drape Preview')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-[0.15em] text-[#1B1B1B]/80 hover:text-[#B8860B] py-2 flex items-center gap-1.5 transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Video Drape Call</span>
              </a>
            </div>

            {/* Metadata Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#1B1B1B]/10 font-mono text-[10px] uppercase tracking-[0.15em] text-[#1B1B1B]/60">
              <div>
                <span className="block text-[#1B1B1B] font-bold">SILK MARK</span>
                100% Certified
              </div>
              <div>
                <span className="block text-[#1B1B1B] font-bold">WEAVERS</span>
                Direct Sourced
              </div>
              <div>
                <span className="block text-[#1B1B1B] font-bold">SHIPPING</span>
                Free Over ₹5,000
              </div>
              <div>
                <span className="block text-[#1B1B1B] font-bold">COMMUNITY</span>
                105K on Instagram
              </div>
            </div>

          </div>

          {/* Right Column: Hero Saree Card Spotlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm flex flex-col gap-4 border border-[#1B1B1B]/15 p-4 bg-white">
              
              {/* Image Box */}
              <div 
                className="relative aspect-[3/4] w-full bg-[#EAEAEA] overflow-hidden cursor-pointer group"
                onClick={() => setSelectedQuickViewProduct(featuredSaree)}
              >
                <img
                  src={featuredSaree.images[0]}
                  alt={featuredSaree.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* SKU & Silk Mark in Space Mono */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-[#1B1B1B] text-[#F8F7F4] font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-0.5">
                    {featuredSaree.code}
                  </span>
                  <span className="bg-white/95 text-[#1B1B1B] font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border border-[#1B1B1B]/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
                    Silk Mark
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="font-serif italic text-xs text-white/90 drop-shadow-sm block">
                    {featuredSaree.kannadaName}
                  </span>
                </div>
              </div>

              {/* Title & Price Row */}
              <div className="space-y-1 text-left">
                <h4 className="font-serif text-2xl font-normal text-[#1B1B1B] leading-tight truncate">
                  {featuredSaree.name}
                </h4>
                <div className="flex items-baseline justify-between pt-1">
                  <div className="font-mono text-[#B8860B] font-bold text-lg">
                    ₹{featuredSaree.price.toLocaleString('en-IN')}
                    <span className="text-xs text-[#1B1B1B]/40 font-normal line-through ml-2">
                      ₹{featuredSaree.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#1B1B1B]/60 uppercase tracking-wider">
                    {featuredSaree.fabric}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs uppercase tracking-wider">
                <a
                  href={whatsAppOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#1B1B1B] bg-[#1B1B1B] text-[#F8F7F4] hover:bg-transparent hover:text-[#1B1B1B] p-2.5 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Order via WA</span>
                </a>

                <button
                  onClick={() => setSelectedQuickViewProduct(featuredSaree)}
                  className="border border-[#1B1B1B] bg-transparent text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#F8F7F4] p-2.5 transition-colors"
                >
                  Quick View
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

