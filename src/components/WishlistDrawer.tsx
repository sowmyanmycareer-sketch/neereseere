import React from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DISPLAY_WHATSAPP_NUMBER } from '../data/sarees';

export const WishlistDrawer: React.FC = () => {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart,
    setSelectedQuickViewProduct 
  } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveAllToCart = () => {
    wishlist.forEach((item) => addToCart(item, 1));
    setIsWishlistOpen(false);
  };

  const handleOrderWishlistWhatsApp = () => {
    const itemsList = wishlist.map((s, i) => `${i + 1}. ${s.name} (${s.code}) - ₹${s.price.toLocaleString('en-IN')}`).join('\n');
    const msg = `🙏 *Namaskara Neere Seere!* \nI have shortlisted these sarees in my Wishlist:\n\n${itemsList}\n\nPlease share their availability and pictures.`;
    window.open(`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsWishlistOpen(false)} 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F7F4] shadow-2xl flex flex-col justify-between border-l border-[#1B1B1B] text-left">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#F8F7F4] border-b border-[#1B1B1B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#1B1B1B] flex items-center justify-center text-white">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
              <div>
                <h2 className="text-base font-serif text-[#1B1B1B] font-light">
                  Saved Sarees (ಮೆಚ್ಚಿನ ಸೀರೆಗಳು)
                </h2>
                <p className="font-mono text-[10px] text-[#1B1B1B]/50 uppercase tracking-wider">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>

            <button
              id="close-wishlist-drawer-btn"
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-[#1B1B1B]/60 hover:text-[#1B1B1B] transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlist.length > 0 ? (
              <div className="space-y-3">
                {wishlist.map((saree) => (
                  <div 
                    key={saree.id}
                    className="bg-white border border-[#1B1B1B]/12 p-3 flex gap-3 relative group"
                  >
                    <img
                      src={saree.images[0]}
                      alt={saree.name}
                      onClick={() => {
                        setSelectedQuickViewProduct(saree);
                        setIsWishlistOpen(false);
                      }}
                      className="w-20 h-24 object-cover object-top border border-[#1B1B1B]/10 shrink-0 cursor-pointer"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 
                            onClick={() => {
                              setSelectedQuickViewProduct(saree);
                              setIsWishlistOpen(false);
                            }}
                            className="text-sm font-serif text-[#1B1B1B] line-clamp-1 cursor-pointer hover:text-[#B8860B]"
                          >
                            {saree.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(saree)}
                            className="text-[#1B1B1B]/40 hover:text-[#1B1B1B] p-1 transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[10px] text-[#1B1B1B]/60 mt-0.5 flex items-center gap-1.5 font-mono">
                          <span className="bg-[#F8F7F4] border border-[#1B1B1B]/15 px-1 py-0.2 text-[#1B1B1B]">
                            {saree.code}
                          </span>
                          <span>&bull;</span>
                          <span className="truncate">{saree.fabric}</span>
                        </div>

                        <div className="font-mono text-xs text-[#B8860B] font-bold mt-1">
                          ₹{saree.price.toLocaleString('en-IN')}
                          <span className="text-[10px] text-[#1B1B1B]/40 line-through ml-1.5 font-normal">
                            ₹{saree.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#1B1B1B]/10 font-mono">
                        <button
                          onClick={() => {
                            addToCart(saree, 1);
                            setIsWishlistOpen(false);
                          }}
                          className="flex-1 py-1.5 px-2 bg-[#1B1B1B] text-[#F8F7F4] text-[10px] uppercase tracking-wider hover:bg-black flex items-center justify-center gap-1 transition-colors"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 bg-white text-[#1B1B1B] border border-[#1B1B1B]/20 mx-auto flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-serif text-[#1B1B1B]">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-[#1B1B1B]/60 max-w-xs mx-auto font-light">
                    Click the bookmark on any saree to save it for later review or wedding gifting.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#1B1B1B]/15 space-y-2 font-mono text-xs uppercase tracking-wider">
              <button
                onClick={handleMoveAllToCart}
                className="w-full py-3 px-4 bg-[#1B1B1B] text-[#F8F7F4] hover:bg-black flex items-center justify-center gap-2 border border-[#1B1B1B] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>

              <button
                onClick={handleOrderWishlistWhatsApp}
                className="w-full py-2.5 px-4 bg-transparent border border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#F8F7F4] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Inquire on WA</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

