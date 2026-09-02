import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  X, 
  Menu, 
  Sparkles, 
  MessageCircle, 
  Video 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES_LIST, DISPLAY_WHATSAPP_NUMBER, INSTAGRAM_URL } from '../data/sarees';
import { generateGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const { 
    cartTotalCount, 
    cartFinalTotal,
    wishlistTotalCount, 
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsAiStylistOpen,
    searchQuery, 
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setIsMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#1B1B1B]/12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Header Bar: 3-Way Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-20 sm:h-24">
          
          {/* Left: Nav Links on Desktop / Menu Button on Mobile */}
          <div className="flex items-center gap-6">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-[#1B1B1B] md:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.08em] font-sans text-[#1B1B1B]">
              <a 
                href="#catalog-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#B8860B] transition-colors"
              >
                Shop
              </a>
              <a 
                href="#story-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('story-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#B8860B] transition-colors"
              >
                Story
              </a>
              <button
                id="ai-stylist-btn"
                onClick={() => setIsAiStylistOpen(true)}
                className="flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] hover:text-[#B8860B] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>AI Stylist</span>
              </button>
              <a
                href={generateGeneralInquiryWhatsAppUrl('Request 5-Min Live Video Saree Drape Preview')}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-xs uppercase tracking-[0.08em] hover:text-[#25D366] transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Video Drape</span>
              </a>
            </nav>
          </div>

          {/* Center: Majestic Kannada & English Brand Logo */}
          <div className="flex flex-col items-end md:items-center justify-center">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setSelectedCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-center group"
            >
              <h1 className="text-3xl sm:text-4xl font-serif font-normal text-[#1B1B1B] tracking-tight leading-none">
                ನೀರೇ ಸೀರೆ
              </h1>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#1B1B1B]/60 block mt-1">
                Neere Seere &bull; Handloom Silks
              </span>
            </a>
          </div>

          {/* Right: Search, Wishlist, Bag, Meta City Tag */}
          <div className="hidden md:flex items-center justify-end gap-5">
            {/* Search Input */}
            <div className="relative w-40 lg:w-48">
              <input
                id="search-sarees-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collection..."
                className="w-full bg-transparent border-b border-[#1B1B1B]/20 py-1 pl-6 pr-6 text-xs text-[#1B1B1B] placeholder-[#1B1B1B]/40 focus:outline-none focus:border-[#1B1B1B] font-sans"
              />
              <Search className="absolute left-0 top-1.5 w-3.5 h-3.5 text-[#1B1B1B]/60" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1.5 text-[#1B1B1B]/50 hover:text-[#1B1B1B]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <button
              id="wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#1B1B1B] hover:text-[#B8860B] transition-colors"
              title="Saved Sarees"
            >
              <Heart className={`w-4 h-4 ${wishlistTotalCount > 0 ? 'fill-[#1B1B1B]' : ''}`} />
              <span className="text-[11px]">({wishlistTotalCount})</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              id="cart-drawer-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 border border-[#1B1B1B] bg-[#1B1B1B] text-[#F8F7F4] hover:bg-transparent hover:text-[#1B1B1B] px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag ({cartTotalCount})</span>
            </button>
          </div>

        </div>

        {/* Mobile Search & Controls (Mobile View Only) */}
        <div className="md:hidden flex items-center justify-between pb-3 pt-1 border-t border-[#1B1B1B]/10">
          <div className="relative flex-1 mr-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kanjeevaram, Mysore silk..."
              className="w-full bg-white/70 border border-[#1B1B1B]/15 px-8 py-1.5 text-xs text-[#1B1B1B] placeholder-[#1B1B1B]/40 focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-[#1B1B1B]/50" />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2 text-[#1B1B1B]/50">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1.5 text-[#1B1B1B] relative"
            >
              <Heart className="w-4 h-4" />
              {wishlistTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1B1B1B] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistTotalCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#1B1B1B] text-white px-3 py-1.5 text-xs font-mono uppercase tracking-wider"
            >
              Bag ({cartTotalCount})
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t border-[#1B1B1B]/10 text-xs font-mono uppercase tracking-[0.15em] text-[#1B1B1B]/70">
          {CATEGORIES_LIST.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`transition-all pb-1 ${
                  isActive
                    ? 'text-[#B8860B] font-bold border-b border-[#B8860B]'
                    : 'hover:text-[#1B1B1B]'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] text-[#1B1B1B]/40 ml-1.5 font-normal lowercase tracking-normal">
                  ({cat.kannada})
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F8F7F4] border-b border-[#1B1B1B]/15 px-5 py-6 space-y-4">
          <div className="space-y-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1B1B1B]/60 mb-2">
              Categories
            </div>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`w-full text-left py-2 px-3 text-xs uppercase tracking-wider flex justify-between items-center ${
                  selectedCategory === cat.id
                    ? 'bg-[#1B1B1B] text-[#F8F7F4] font-medium'
                    : 'text-[#1B1B1B] hover:bg-black/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-60 font-serif">{cat.kannada}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1B1B1B]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsAiStylistOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3 border border-[#1B1B1B] text-[#1B1B1B] text-xs font-mono uppercase tracking-wider"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
                AI Saree Advisor
              </span>
              <span className="text-[9px] bg-[#B8860B] text-white px-1.5 py-0.5 font-bold">New</span>
            </button>

            <a
              href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1B1B1B] text-white text-xs font-mono uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Order on WA (+91 {DISPLAY_WHATSAPP_NUMBER})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

