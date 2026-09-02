import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Check, 
  Video, 
  Sparkles, 
  Share2, 
  Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DISPLAY_WHATSAPP_NUMBER } from '../data/sarees';
import { generateSingleProductWhatsAppUrl } from '../utils/whatsapp';

export const ProductQuickViewModal: React.FC = () => {
  const { 
    selectedQuickViewProduct, 
    setSelectedQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!selectedQuickViewProduct) return null;

  const product = selectedQuickViewProduct;
  const isFavorite = isInWishlist(product.id);

  const { url: whatsAppOrderUrl } = generateSingleProductWhatsAppUrl(product, 'buy');
  const { url: whatsAppVideoUrl } = generateSingleProductWhatsAppUrl(product, 'videocall');

  const handleAddToCart = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleShare = async () => {
    const shareText = `Check out this exquisite ${product.name} (Code: ${product.code}) from Neere Seere (ನೀರೆ ಸೀರೆ) for ₹${product.price.toLocaleString('en-IN')}: https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: window.location.href,
        });
      } catch (e) {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="relative bg-[#F8F7F4] border border-[#1B1B1B] shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto overflow-x-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-quickview-btn"
          onClick={() => setSelectedQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-white text-[#1B1B1B] border border-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-3">
            
            {/* Main Stage Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#EAEAEA] border border-[#1B1B1B]/15">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Silk Mark Overlay */}
              {product.isSilkMarkCertified && (
                <div className="absolute top-3 left-3 bg-[#1B1B1B] text-[#F8F7F4] font-mono text-[10px] px-2.5 py-1 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
                  Silk Mark Certified
                </div>
              )}

              {/* Saree Code Badge */}
              <div className="absolute top-3 right-3 bg-white text-[#1B1B1B] font-mono text-[10px] font-bold px-2 py-0.5 border border-[#1B1B1B]/20">
                {product.code}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 overflow-hidden border transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#1B1B1B] ring-1 ring-[#1B1B1B]'
                        : 'border-[#1B1B1B]/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Live Video Call Assistance */}
            <div className="p-3 bg-white border border-[#1B1B1B]/15 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#1B1B1B] text-white flex items-center justify-center shrink-0">
                  <Video className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <div>
                  <div className="font-mono text-[10px] font-bold text-[#1B1B1B] uppercase tracking-wider">5-Min Live Video Drape</div>
                  <div className="text-[11px] text-[#1B1B1B]/60">Inspect weave & shine before purchase</div>
                </div>
              </div>

              <a
                href={whatsAppVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white font-mono text-[10px] uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1"
              >
                Book Call
              </a>
            </div>

          </div>

          {/* Right Column: Saree Specifications & WhatsApp Orders */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            
            {/* Header & Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#1B1B1B]/60">
                <span className="font-serif italic text-sm text-[#B8860B]">
                  {product.kannadaName}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#1B1B1B]/70">
                  {product.categoryLabel}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-light font-serif text-[#1B1B1B] leading-tight">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#B8860B] font-mono">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#1B1B1B]/40 line-through font-mono">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-mono bg-[#1B1B1B] text-white px-2 py-0.5 uppercase tracking-wider">
                    {product.discountPercentage}% OFF
                  </span>
                </div>

                <div className="font-mono text-xs text-[#1B1B1B]/70 ml-auto">
                  ★ {product.rating} ({product.reviewsCount})
                </div>
              </div>

              <p className="text-xs text-[#1B1B1B]/75 leading-relaxed pt-1 font-light">
                {product.description}
              </p>
            </div>

            {/* Key Specifications Grid */}
            <div className="bg-white border border-[#1B1B1B]/12 p-4 space-y-2 text-xs">
              <div className="font-mono text-[10px] text-[#1B1B1B]/60 uppercase tracking-[0.2em] border-b border-[#1B1B1B]/10 pb-1.5 flex items-center gap-1.5">
                <Info className="w-3 h-3 text-[#B8860B]" />
                [SPECS] Saree Details & Fabric
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left font-sans text-xs">
                <div>
                  <span className="text-[#1B1B1B]/50 block font-mono text-[9px] uppercase tracking-wider">Fabric:</span>
                  <span className="font-medium text-[#1B1B1B]">{product.fabric}</span>
                </div>

                <div>
                  <span className="text-[#1B1B1B]/50 block font-mono text-[9px] uppercase tracking-wider">Zari Type:</span>
                  <span className="font-medium text-[#1B1B1B]">{product.zariType}</span>
                </div>

                <div>
                  <span className="text-[#1B1B1B]/50 block font-mono text-[9px] uppercase tracking-wider">Blouse Piece:</span>
                  <span className="font-medium text-[#1B1B1B]">{product.blousePiece}</span>
                </div>

                <div>
                  <span className="text-[#1B1B1B]/50 block font-mono text-[9px] uppercase tracking-wider">Length & Cut:</span>
                  <span className="font-medium text-[#1B1B1B]">{product.length}</span>
                </div>

                <div>
                  <span className="text-[#1B1B1B]/50 block font-mono text-[9px] uppercase tracking-wider">Weave Origin:</span>
                  <span className="font-medium text-[#1B1B1B]">{product.weaveOrigin}</span>
                </div>

                <div>
                  <span className="text-[#1B1B1B]/50 block font-mono text-[9px] uppercase tracking-wider">Wash Care:</span>
                  <span className="font-medium text-[#1B1B1B]">{product.washCare}</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-1 font-mono text-xs">
              <span className="text-[10px] text-[#1B1B1B]/60 uppercase tracking-wider">
                Weave Highlights:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#1B1B1B]/80 font-sans">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-[#B8860B] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2 pt-2">
              
              {/* WhatsApp Buy Button */}
              <a
                href={whatsAppOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 border border-[#1B1B1B] bg-[#1B1B1B] text-[#F8F7F4] hover:bg-transparent hover:text-[#1B1B1B] font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order on WhatsApp (9686611223)</span>
              </a>

              {/* Secondary Actions Row */}
              <div className="grid grid-cols-12 gap-2 font-mono text-xs uppercase tracking-wider">
                <button
                  onClick={handleAddToCart}
                  className={`col-span-8 py-3 px-4 border border-[#1B1B1B] flex items-center justify-center gap-2 transition-colors ${
                    justAdded
                      ? 'bg-[#1B1B1B] text-white'
                      : 'bg-transparent text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#A5D6A7]" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`col-span-2 py-3 border border-[#1B1B1B] flex items-center justify-center transition-colors ${
                    isFavorite
                      ? 'bg-[#1B1B1B] text-white'
                      : 'bg-white text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="col-span-2 py-3 bg-white text-[#1B1B1B] border border-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white flex items-center justify-center transition-colors relative"
                  title="Share Saree"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copySuccess && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1B1B1B] text-white text-[9px] px-2 py-0.5 whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

