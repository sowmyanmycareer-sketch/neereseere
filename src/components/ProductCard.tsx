import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  MessageCircle, 
  ShieldCheck, 
  Video, 
  Check 
} from 'lucide-react';
import { SareeProduct } from '../types';
import { useCart } from '../context/CartContext';
import { generateSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: SareeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedQuickViewProduct 
  } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedQuickViewProduct(product);
  };

  const { url: whatsAppOrderUrl } = generateSingleProductWhatsAppUrl(product, 'buy');
  const { url: whatsAppVideoUrl } = generateSingleProductWhatsAppUrl(product, 'videocall');

  return (
    <div 
      id={`product-card-${product.code.toLowerCase()}`}
      className="group relative bg-white border border-[#1B1B1B]/12 hover:border-[#1B1B1B] p-4 transition-all duration-300 flex flex-col justify-between text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAEAEA] cursor-pointer"
        onClick={() => setSelectedQuickViewProduct(product)}
      >
        <img
          src={isHovered && product.images.length > 1 ? secondaryImage : primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges in Space Mono */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 font-mono text-[9px] uppercase tracking-wider">
          {product.isSilkMarkCertified && (
            <span className="inline-flex items-center gap-1 bg-[#1B1B1B] text-[#F8F7F4] px-2 py-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-[#B8860B]" />
              Silk Mark
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#B8860B] text-[#F8F7F4] px-2 py-0.5 font-bold">
              Bestseller
            </span>
          )}
        </div>

        {/* Saree Code Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="bg-white/90 text-[#1B1B1B] font-mono text-[9px] font-bold px-2 py-0.5 border border-[#1B1B1B]/15">
            {product.code}
          </span>
        </div>

        {/* Quick View & Actions Overlay on Hover */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 transition-all duration-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 font-mono text-[10px] uppercase tracking-wider">
          <button
            onClick={handleQuickView}
            className="flex-1 py-1.5 px-2 bg-white text-[#1B1B1B] border border-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white flex items-center justify-center gap-1 transition-colors"
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>

          <a
            href={whatsAppVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="py-1.5 px-2 bg-white text-[#1B1B1B] border border-[#1B1B1B] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] flex items-center justify-center gap-1 transition-colors"
            title="Book 5-min live video saree drape"
          >
            <Video className="w-3 h-3" />
            <span className="hidden sm:inline">Drape</span>
          </a>

          <button
            onClick={handleToggleWishlist}
            className={`p-1.5 border transition-colors ${
              isFavorite 
                ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]' 
                : 'bg-white text-[#1B1B1B] border-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Low Stock Callout */}
        {product.stockCount <= 3 && (
          <div className="absolute bottom-2 left-2 z-0 group-hover:hidden">
            <span className="bg-white/90 text-[#C53030] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border border-[#C53030]/30">
              Only {product.stockCount} left
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="pt-3 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Kannada Subtitle */}
          <div className="flex items-center justify-between text-xs text-[#1B1B1B]/60 mb-0.5">
            <span className="font-serif italic truncate">
              {product.kannadaName}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider shrink-0 ml-1">
              {product.categoryLabel}
            </span>
          </div>

          {/* Saree Title (Cormorant Garamond) */}
          <h4 
            onClick={() => setSelectedQuickViewProduct(product)}
            className="font-serif text-xl sm:text-2xl font-light text-[#1B1B1B] line-clamp-1 hover:text-[#B8860B] cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h4>

          {/* Fabric & Zari */}
          <p className="text-xs text-[#1B1B1B]/65 line-clamp-1 mt-0.5 font-sans">
            {product.fabric} &bull; {product.zariType}
          </p>
        </div>

        {/* Price Row (Space Mono) */}
        <div className="pt-2 border-t border-[#1B1B1B]/10 flex items-baseline justify-between">
          <div className="font-mono text-[#B8860B] font-bold text-base sm:text-lg">
            ₹{product.price.toLocaleString('en-IN')}
            <span className="text-xs text-[#1B1B1B]/40 font-normal line-through ml-2">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="font-mono text-[10px] text-[#1B1B1B]/70">
            ★ {product.rating}
          </div>
        </div>

        {/* Action Buttons: Order via WA & Add to Bag */}
        <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs uppercase tracking-wider">
          <a
            href={whatsAppOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#1B1B1B] bg-transparent text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white py-2 px-2 flex items-center justify-center gap-1 transition-colors text-[11px]"
            title="Order directly on WhatsApp"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366] shrink-0" />
            <span className="truncate">Order via WA</span>
          </a>

          <button
            onClick={handleAddToCart}
            className={`py-2 px-2 border border-[#1B1B1B] flex items-center justify-center gap-1 transition-colors text-[11px] ${
              justAdded
                ? 'bg-[#1B1B1B] text-white'
                : 'bg-[#1B1B1B] text-white hover:bg-transparent hover:text-[#1B1B1B]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3 h-3 text-[#A5D6A7]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>Add Bag</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

