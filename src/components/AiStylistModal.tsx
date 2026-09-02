import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  ShoppingBag, 
  MessageCircle, 
  HelpCircle, 
  Check, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SAREE_PRODUCTS, DISPLAY_WHATSAPP_NUMBER } from '../data/sarees';
import { SareeProduct } from '../types';

interface AiRecommendation {
  text: string;
  suggestedSareeIds: string[];
  stylingTips: string[];
}

export const AiStylistModal: React.FC = () => {
  const { 
    isAiStylistOpen, 
    setIsAiStylistOpen, 
    setSelectedQuickViewProduct,
    addToCart 
  } = useCart();

  const [userInput, setUserInput] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('Wedding / Bridal');
  const [selectedVibe, setSelectedVibe] = useState('Rich Traditional Zari');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AiRecommendation | null>({
    text: "Namaskara! I am your Neere Seere Saree Concierge. For grand weddings and Muhurtham rituals, we recommend heavy mulberry Kanjeevaram silks with traditional Mayil (peacock) motifs and authentic gold zari.",
    suggestedSareeIds: ['ns-101', 'ns-111', 'ns-103'],
    stylingTips: [
      "Pair Crimson Kanjeevaram with contrast bottle green or emerald blouse piece.",
      "Opt for antique matte finish temple jewelry or classic Kasu Malai.",
      "Traditional jasmine flowers (gajra) with middle-parted low bun enhances the bridal aura."
    ]
  });

  if (!isAiStylistOpen) return null;

  const handleGenerateAdvice = (customPrompt?: string) => {
    setLoading(true);
    const query = (customPrompt || userInput).toLowerCase();

    setTimeout(() => {
      let matchedIds: string[] = [];
      let adviceText = '';
      let tips: string[] = [];

      if (query.includes('blue') || query.includes('mysore') || selectedVibe.includes('Lightweight')) {
        matchedIds = ['ns-102', 'ns-110', 'ns-112'];
        adviceText = "For effortless grace and long ceremonial hours, pure Mysore Crepe Silk (68 GSM) is unmatched! It hugs the silhouette and stays wrinkle-free.";
        tips = [
          "Contrast pairing: Pair peacock blue with rich mustard yellow or maggam embroidered blouse.",
          "Jewelry: Long layered pearls or lightweight gold pendant sets.",
          "Ideal for: Varalakshmi Vratha, Satyanarayana Puja, and family housewarming."
        ];
      } else if (query.includes('pastel') || query.includes('reception') || query.includes('organza') || query.includes('modern')) {
        matchedIds = ['ns-104', 'ns-106', 'ns-107'];
        adviceText = "Pastel soft silks and sheer organzas are trending favorites on Instagram! They offer a contemporary, refreshing palette while maintaining ethnic charm.";
        tips = [
          "Pair Blush Pink soft silk with contrast magenta raw silk or silver sequined blouse.",
          "Opt for silver oxidized or uncut polki choker with chandelier earrings.",
          "Ideal for: Morning weddings, Sangeet, Cocktails, and Baby Showers (Seemantha)."
        ];
      } else if (query.includes('budget') || query.includes('daily') || query.includes('cotton') || query.includes('tussar')) {
        matchedIds = ['ns-108', 'ns-109', 'ns-112'];
        adviceText = "Handloom Gadwal silk cotton and wild Tussar silks offer exquisite artisanal textures with supreme breathability.";
        tips = [
          "Pair with boat-neck or elbow-sleeve kalamkari cotton blouses.",
          "Earthen terracotta, jute, or antique silver jewelry creates a sophisticated handloom aesthetic."
        ];
      } else {
        matchedIds = ['ns-101', 'ns-105', 'ns-103', 'ns-111'];
        adviceText = "For sacred South Indian festivities and traditional wedding occasions, nothing surpasses rich Korvai Kanjeevarams and Kadwa Banarasi weaves.";
        tips = [
          "Use the included contrast brocade blouse with heavy zari sleeve borders.",
          "Traditional temple jewelry with Kempu stones elevates the red/mustard weave."
        ];
      }

      setRecommendation({
        text: adviceText,
        suggestedSareeIds: matchedIds,
        stylingTips: tips
      });
      setLoading(false);
    }, 600);
  };

  const presetQuestions = [
    "What blouse pairs best with Peacock Blue Mysore Silk?",
    "Suggest a lightweight saree for a morning wedding function",
    "Which Kanjeevaram is ideal for a bride's Muhurtham?",
    "Show me trendy pastel sarees for Sangeet & Reception"
  ];

  const suggestedProducts = SAREE_PRODUCTS.filter((s) =>
    recommendation?.suggestedSareeIds.includes(s.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 font-sans">
      <div 
        className="relative bg-[#FAF7F2] border border-[#D4AF37]/60 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-ai-stylist-modal-btn"
          onClick={() => setIsAiStylistOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 bg-white text-[#800000] border border-[#D4AF37]/40 hover:bg-[#800000] hover:text-white transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="border-b border-[#D4AF37]/30 pb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#800000] mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              Neere Seere AI Stylist & Matchmaker
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif italic text-[#2D2D2D]">
              Personalized Saree & Blouse Styling Concierge
            </h2>
            <p className="text-xs text-[#5A5A5A] mt-1">
              Need assistance finding the ideal saree weave, contrast blouse pairing, or occasion drape? Ask our styling engine below.
            </p>
          </div>

          {/* Quick Filter Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 border border-[#D4AF37]/30">
            <div>
              <label className="block text-[10px] font-bold text-[#800000] uppercase tracking-wider mb-1">
                Occasion Type
              </label>
              <select
                value={selectedOccasion}
                onChange={(e) => {
                  setSelectedOccasion(e.target.value);
                  handleGenerateAdvice(e.target.value);
                }}
                className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 text-xs p-2 text-[#2D2D2D] font-medium"
              >
                <option value="Wedding / Bridal">Wedding / Muhurtham (ವಧು)</option>
                <option value="Festive & Puja">Varalakshmi / Diwali / Puja</option>
                <option value="Reception & Sangeet">Reception & Evening Party</option>
                <option value="Housewarming & Traditional">Housewarming (ಗೃಹಪ್ರವೇಶ)</option>
                <option value="Daily & Office Handloom">Daily & Office Handloom</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#800000] uppercase tracking-wider mb-1">
                Style / Fabric Preference
              </label>
              <select
                value={selectedVibe}
                onChange={(e) => {
                  setSelectedVibe(e.target.value);
                  handleGenerateAdvice(e.target.value);
                }}
                className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 text-xs p-2 text-[#2D2D2D] font-medium"
              >
                <option value="Rich Traditional Zari">Rich Traditional Pure Gold Zari</option>
                <option value="Lightweight Mysore Silk">Lightweight Mysore Crepe Silk</option>
                <option value="Pastel Modern Soft Silk">Trendy Pastel & Soft Silk</option>
                <option value="Sheer Organza Cutwork">Breezy Sheer Organza</option>
                <option value="Handloom Cotton Silk">Handloom Cotton Silk / Tussar</option>
              </select>
            </div>
          </div>

          {/* Custom Query Input */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateAdvice()}
                placeholder="Ask e.g. 'What jewelry goes with emerald green Banarasi?'"
                className="w-full bg-white border border-[#D4AF37]/40 py-3 pl-4 pr-12 text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
              />
              <button
                onClick={() => handleGenerateAdvice()}
                disabled={loading}
                className="absolute right-2 top-2 p-2 bg-[#800000] text-white hover:bg-[#600000] transition-colors"
                aria-label="Send advice request"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Preset quick chips */}
            <div className="flex flex-wrap gap-1.5">
              {presetQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setUserInput(q);
                    handleGenerateAdvice(q);
                  }}
                  className="text-[10px] bg-white text-[#800000] border border-[#D4AF37]/40 px-2.5 py-1 hover:bg-[#FAF7F2] transition-colors text-left font-medium"
                >
                  ⚡ {q}
                </button>
              ))}
            </div>
          </div>

          {/* AI Output Card */}
          {recommendation && (
            <div className="bg-white border border-[#D4AF37]/40 p-5 space-y-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#800000] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs text-[#2D2D2D]">
                  <h4 className="font-bold font-serif italic text-base text-[#800000]">
                    Stylist Recommendation:
                  </h4>
                  <p className="leading-relaxed text-[#5A5A5A]">
                    {recommendation.text}
                  </p>
                </div>
              </div>

              {/* Styling Tips Bullet List */}
              {recommendation.stylingTips.length > 0 && (
                <div className="bg-[#FAF7F2] p-3 border border-[#D4AF37]/30 space-y-1.5 text-xs">
                  <div className="font-bold text-[#800000] text-[10px] uppercase tracking-wider">
                    Pairing & Draping Tips:
                  </div>
                  <ul className="space-y-1 text-[#5A5A5A]">
                    {recommendation.stylingTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Sarees Grid */}
              {suggestedProducts.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-[#800000] uppercase tracking-wider">
                    Recommended Sarees from Catalog:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {suggestedProducts.map((saree) => (
                      <div 
                        key={saree.id}
                        className="bg-[#FAF7F2] border border-[#D4AF37]/30 p-2.5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
                      >
                        <div className="flex gap-2.5">
                          <img
                            src={saree.images[0]}
                            alt={saree.name}
                            className="w-14 h-18 object-cover border border-[#D4AF37]/30 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="overflow-hidden">
                            <span className="font-mono text-[9px] bg-white border border-[#D4AF37]/30 px-1 py-0.2 text-[#800000]">
                              {saree.code}
                            </span>
                            <h5 className="text-[11px] font-bold text-[#2D2D2D] font-serif italic line-clamp-2 mt-0.5 leading-snug">
                              {saree.name}
                            </h5>
                            <div className="text-xs font-bold text-[#800000] mt-1 font-sans">
                              ₹{saree.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1 mt-2 pt-2 border-t border-[#D4AF37]/20">
                          <button
                            onClick={() => {
                              setSelectedQuickViewProduct(saree);
                              setIsAiStylistOpen(false);
                            }}
                            className="py-1 px-1.5 bg-white text-[#800000] text-[10px] font-bold uppercase tracking-wider border border-[#D4AF37]/30 hover:bg-[#FAF7F2]"
                          >
                            View Saree
                          </button>
                          <a
                            href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=${encodeURIComponent(`🙏 Namaskara Neere Seere! The Saree Stylist recommended ${saree.name} (${saree.code}). I would like to order it.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-1 px-1.5 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-0.5"
                          >
                            <MessageCircle className="w-2.5 h-2.5" />
                            Order
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
