import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Truck, 
  MessageCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartTotalCount, 
    cartSubtotal, 
    cartFinalTotal,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    setIsCheckoutModalOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs font-sans">
      <div 
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F7F4] shadow-2xl flex flex-col justify-between border-l border-[#1B1B1B] text-left">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#F8F7F4] border-b border-[#1B1B1B]/15 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#1B1B1B] flex items-center justify-center text-white">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <div>
                <h2 className="text-base font-serif text-[#1B1B1B] font-light">
                  Shopping Bag (ಬುಟ್ಟಿಯಲ್ಲಿರುವ ಸೀರೆಗಳು)
                </h2>
                <p className="font-mono text-[10px] text-[#1B1B1B]/50 uppercase tracking-wider">
                  {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'} in bag
                </p>
              </div>
            </div>

            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#1B1B1B]/60 hover:text-[#1B1B1B] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length > 0 ? (
              <>
                {/* Free Delivery Bar */}
                <div className="p-2.5 bg-white border border-[#1B1B1B]/15 flex items-center gap-2 font-mono text-[11px] text-[#1B1B1B]">
                  <Truck className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                  <span>
                    <strong>Free Pan-India Express Shipping</strong> applied
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="bg-white border border-[#1B1B1B]/12 p-3 flex gap-3 relative group"
                    >
                      {/* Saree Thumbnail */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover object-top border border-[#1B1B1B]/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-sm font-serif text-[#1B1B1B] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[#1B1B1B]/40 hover:text-black p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[10px] text-[#1B1B1B]/60 mt-0.5 flex items-center gap-1.5 font-mono">
                            <span className="bg-[#F8F7F4] border border-[#1B1B1B]/15 px-1 py-0.2 text-[#1B1B1B]">
                              {item.product.code}
                            </span>
                            <span>&bull;</span>
                            <span className="truncate">{item.product.color}</span>
                          </div>

                          <div className="font-mono text-xs text-[#B8860B] font-bold mt-1">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            {item.quantity > 1 && (
                              <span className="text-[10px] text-[#1B1B1B]/50 font-normal ml-1">
                                (₹{item.product.price.toLocaleString('en-IN')} ea)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#1B1B1B]/10 font-mono">
                          <div className="flex items-center border border-[#1B1B1B]/20 bg-[#F8F7F4]">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-[#1B1B1B] hover:bg-[#1B1B1B]/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-[#1B1B1B]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-[#1B1B1B] hover:bg-[#1B1B1B]/10"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-[9px] text-[#1B1B1B]/60 uppercase tracking-wider">
                            In Stock ({item.product.stockCount})
                          </span>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="bg-white border border-[#1B1B1B]/12 p-3.5 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#1B1B1B] uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#B8860B]" />
                      Promo Code
                    </span>
                    {couponCode && (
                      <button
                        onClick={removeCoupon}
                        className="text-[#B8860B] hover:underline"
                      >
                        Remove ({couponCode})
                      </button>
                    )}
                  </div>

                  {!couponCode ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2 font-mono">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="NEERE10 / SILK500"
                        className="flex-1 bg-[#F8F7F4] border border-[#1B1B1B]/20 text-xs uppercase px-2.5 py-1.5 text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#1B1B1B] text-[#F8F7F4] text-[10px] font-mono uppercase tracking-wider hover:bg-black"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="p-2 bg-[#F8F7F4] border border-[#1B1B1B]/15 text-xs flex items-center justify-between font-mono text-[#1B1B1B]">
                      <span>✓ '{couponCode}' applied</span>
                      <span className="text-[#B8860B]">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {couponFeedback && !couponCode && (
                    <div className={`text-[10px] font-mono ${couponFeedback.success ? 'text-green-700' : 'text-red-700'}`}>
                      {couponFeedback.message}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center font-mono text-[10px] text-[#1B1B1B]/60">
                  <button
                    onClick={clearCart}
                    className="text-[#1B1B1B] hover:underline uppercase tracking-wider"
                  >
                    Clear All Items
                  </button>
                  <span className="flex items-center gap-1 uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
                    Silk Mark Certified
                  </span>
                </div>
              </>
            ) : (
              /* Empty Cart State */
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 bg-white text-[#1B1B1B] border border-[#1B1B1B]/20 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-serif text-[#1B1B1B]">
                    Your Saree Bag is Empty
                  </h3>
                  <p className="text-xs text-[#1B1B1B]/60 max-w-xs mx-auto font-light">
                    Explore our handpicked curation of pure silk weaves and heritage handlooms.
                  </p>
                </div>
                <button
                  onClick={handleContinueShopping}
                  className="px-6 py-2.5 border border-[#1B1B1B] bg-[#1B1B1B] text-[#F8F7F4] hover:bg-transparent hover:text-[#1B1B1B] font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#1B1B1B]/15 space-y-3 font-mono">
              <div className="space-y-1 text-xs text-[#1B1B1B]/75">
                <div className="flex justify-between">
                  <span>Subtotal ({cartTotalCount} items):</span>
                  <span className="font-bold text-[#1B1B1B]">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#B8860B]">
                    <span>Discount ({couponCode}):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-[#1B1B1B] font-bold">FREE</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#1B1B1B] pt-2 border-t border-[#1B1B1B]/10">
                  <span className="font-serif">Total Payable:</span>
                  <span className="text-lg text-[#B8860B]">₹{cartFinalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Primary WhatsApp Checkout Button */}
              <button
                id="proceed-to-whatsapp-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#1B1B1B] text-[#F8F7F4] hover:bg-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-[#1B1B1B] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[9px] text-center text-[#1B1B1B]/50 uppercase tracking-wider">
                Confirmed via WhatsApp (9686611223) &bull; Strictly no calls
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

