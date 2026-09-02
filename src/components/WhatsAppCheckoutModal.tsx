import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Truck, 
  ShieldCheck, 
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { DISPLAY_WHATSAPP_NUMBER } from '../data/sarees';
import { generateCartWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppCheckoutModal: React.FC = () => {
  const { 
    cart, 
    cartFinalTotal, 
    cartSubtotal,
    discountAmount,
    couponCode,
    customerDetails, 
    setCustomerDetails, 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen,
    clearCart
  } = useCart();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  if (!isCheckoutModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerDetails.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!customerDetails.phoneNumber.trim()) errors.phoneNumber = 'Please enter your WhatsApp contact number';
    if (!customerDetails.addressLine1.trim()) errors.addressLine1 = 'Please enter your delivery street address';
    if (!customerDetails.city.trim()) errors.city = 'Please enter your city';
    if (!customerDetails.pincode.trim() || customerDetails.pincode.length < 6) errors.pincode = 'Please enter a valid 6-digit Pincode';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const { url: whatsAppUrl, rawMessage } = generateCartWhatsAppUrl(
    cart,
    customerDetails,
    cartSubtotal,
    couponCode,
    discountAmount
  );

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Trigger subtle Festive Confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B8860B', '#1B1B1B', '#25D366']
      });
    } catch (err) {
      // ignore
    }

    // Open WhatsApp
    window.open(whatsAppUrl, '_blank');
    setIsOrderPlaced(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleFinishAndClear = () => {
    clearCart();
    setIsOrderPlaced(false);
    setIsCheckoutModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 font-sans">
      <div 
        className="relative bg-[#F8F7F4] border border-[#1B1B1B] shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-checkout-modal-btn"
          onClick={() => setIsCheckoutModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 bg-white text-[#1B1B1B] border border-[#1B1B1B]/20 hover:bg-[#1B1B1B] hover:text-[#F8F7F4] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!isOrderPlaced ? (
          /* Step 1: Delivery Details & WhatsApp Order Trigger */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="border-b border-[#1B1B1B]/15 pb-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#B8860B] mb-1">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp Direct Order
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#1B1B1B]">
                Complete Your Order (ಆರ್ಡರ್ ವಿವರಗಳು)
              </h2>
              <p className="text-xs text-[#1B1B1B]/60 mt-1 font-light">
                Fill in your delivery address. Your order will be formatted and sent directly to our official WhatsApp (<strong>{DISPLAY_WHATSAPP_NUMBER}</strong>).
              </p>
            </div>

            {/* Order Items Summary Strip */}
            <div className="bg-white border border-[#1B1B1B]/12 p-4">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider mb-2 pb-2 border-b border-[#1B1B1B]/10">
                <span className="text-[#1B1B1B]">Summary ({cart.length} {cart.length === 1 ? 'saree' : 'sarees'})</span>
                <span className="text-sm font-bold text-[#B8860B]">
                  Total: ₹{cartFinalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="max-h-28 overflow-y-auto space-y-2 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between text-xs text-[#1B1B1B]/80 font-mono">
                    <div className="flex items-center gap-2 truncate">
                      <span className="bg-[#F8F7F4] border border-[#1B1B1B]/15 px-1 py-0.2 text-[9px] text-[#1B1B1B]">
                        {item.product.code}
                      </span>
                      <span className="truncate font-serif text-[#1B1B1B]">{item.product.name}</span>
                      <span className="text-[10px] text-[#1B1B1B]/50">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#1B1B1B] shrink-0 ml-2">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {discountAmount > 0 && (
                <div className="pt-2 mt-2 border-t border-[#1B1B1B]/10 flex justify-between text-xs text-[#B8860B] font-mono">
                  <span>Discount Applied ({couponCode}):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            {/* Customer Shipping Form */}
            <form onSubmit={handleSendToWhatsApp} className="space-y-4">
              <div className="font-mono text-xs text-[#1B1B1B] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                Shipping Details (ತಲುಪಿಸಬೇಕಾದ ವಿಳಾಸ)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={customerDetails.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sowmya N. Gowda"
                    className={`w-full bg-white border text-xs p-2.5 text-[#1B1B1B] focus:outline-none ${
                      validationErrors.fullName ? 'border-red-500' : 'border-[#1B1B1B]/20 focus:border-[#1B1B1B]'
                    }`}
                  />
                  {validationErrors.fullName && (
                    <span className="font-mono text-[9px] text-red-600 mt-0.5 block">{validationErrors.fullName}</span>
                  )}
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    WhatsApp Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={customerDetails.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full bg-white border text-xs p-2.5 text-[#1B1B1B] focus:outline-none ${
                      validationErrors.phoneNumber ? 'border-red-500' : 'border-[#1B1B1B]/20 focus:border-[#1B1B1B]'
                    }`}
                  />
                  {validationErrors.phoneNumber && (
                    <span className="font-mono text-[9px] text-red-600 mt-0.5 block">{validationErrors.phoneNumber}</span>
                  )}
                </div>

                {/* Street Address Line 1 */}
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    House/Flat, Street Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={customerDetails.addressLine1}
                    onChange={handleInputChange}
                    placeholder="e.g. Flat 302, Heritage Residency, 4th Main, Malleshwaram"
                    className={`w-full bg-white border text-xs p-2.5 text-[#1B1B1B] focus:outline-none ${
                      validationErrors.addressLine1 ? 'border-red-500' : 'border-[#1B1B1B]/20 focus:border-[#1B1B1B]'
                    }`}
                  />
                  {validationErrors.addressLine1 && (
                    <span className="font-mono text-[9px] text-red-600 mt-0.5 block">{validationErrors.addressLine1}</span>
                  )}
                </div>

                {/* Landmark */}
                <div>
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={customerDetails.landmark}
                    onChange={handleInputChange}
                    placeholder="Near Kadu Malleshwara Temple"
                    className="w-full bg-white border border-[#1B1B1B]/20 text-xs p-2.5 text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B]"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    City / Town <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customerDetails.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Bengaluru, Mysuru"
                    className={`w-full bg-white border text-xs p-2.5 text-[#1B1B1B] focus:outline-none ${
                      validationErrors.city ? 'border-red-500' : 'border-[#1B1B1B]/20 focus:border-[#1B1B1B]'
                    }`}
                  />
                  {validationErrors.city && (
                    <span className="font-mono text-[9px] text-red-600 mt-0.5 block">{validationErrors.city}</span>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    State
                  </label>
                  <select
                    name="state"
                    value={customerDetails.state}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#1B1B1B]/20 text-xs p-2.5 text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B]"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Other State / Pan-India">Other State / Pan-India</option>
                  </select>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    6-Digit Pincode <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    name="pincode"
                    value={customerDetails.pincode}
                    onChange={handleInputChange}
                    placeholder="e.g. 560003"
                    className={`w-full bg-white border text-xs p-2.5 text-[#1B1B1B] focus:outline-none ${
                      validationErrors.pincode ? 'border-red-500' : 'border-[#1B1B1B]/20 focus:border-[#1B1B1B]'
                    }`}
                  />
                  {validationErrors.pincode && (
                    <span className="font-mono text-[9px] text-red-600 mt-0.5 block">{validationErrors.pincode}</span>
                  )}
                </div>

                {/* Order Notes */}
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[10px] text-[#1B1B1B]/80 uppercase tracking-wider mb-1">
                    Notes / Fall & Pico / Urgent Date
                  </label>
                  <textarea
                    rows={2}
                    name="orderNotes"
                    value={customerDetails.orderNotes}
                    onChange={handleInputChange}
                    placeholder="e.g. Fall & Pico requested / Urgent delivery before Friday"
                    className="w-full bg-white border border-[#1B1B1B]/20 text-xs p-2.5 text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#1B1B1B] hover:bg-black text-[#F8F7F4] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-[#1B1B1B] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Send Order to WhatsApp ({DISPLAY_WHATSAPP_NUMBER})</span>
                </button>

                <div className="flex items-center justify-between font-mono text-[10px] text-[#1B1B1B]/60 px-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-[#B8860B]" />
                    Free Express Delivery Included
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#B8860B]" />
                    Silk Mark Certified
                  </span>
                </div>
              </div>
            </form>

          </div>
        ) : (
          /* Step 2: Order Placed Screen */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-14 h-14 bg-white text-[#1B1B1B] border border-[#1B1B1B] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#B8860B]" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8860B]">
                Order Formatted & Sent
              </span>
              <h2 className="text-3xl font-serif font-light text-[#1B1B1B]">
                Thank You for Choosing Neere Seere
              </h2>
              <p className="text-xs text-[#1B1B1B]/60 max-w-md mx-auto font-light">
                Your order message was sent to WhatsApp. Our team will verify silk stock and reply with your UPI payment details within minutes.
              </p>
            </div>

            {/* Order Recap Box */}
            <div className="bg-white border border-[#1B1B1B]/15 p-4 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#1B1B1B]/10 pb-2 uppercase tracking-wider text-[11px]">
                <span className="text-[#1B1B1B]">Order Desk</span>
                <span className="text-[#B8860B] font-bold">+91 {DISPLAY_WHATSAPP_NUMBER}</span>
              </div>

              <div className="space-y-1 text-[#1B1B1B]/80">
                <div><strong>Customer:</strong> {customerDetails.fullName} ({customerDetails.phoneNumber})</div>
                <div><strong>Address:</strong> {customerDetails.addressLine1}, {customerDetails.city}, {customerDetails.pincode}</div>
                <div><strong>Total:</strong> ₹{cartFinalTotal.toLocaleString('en-IN')}</div>
              </div>

              {/* Copy Message Fallback Button */}
              <div className="pt-2 border-t border-[#1B1B1B]/10 flex flex-col gap-2">
                <button
                  onClick={handleCopyMessage}
                  className="w-full py-2 px-3 bg-[#F8F7F4] border border-[#1B1B1B]/20 hover:bg-[#1B1B1B]/10 text-xs font-mono uppercase tracking-wider text-[#1B1B1B] flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-700" />
                      <span>Copied Order Summary!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#1B1B1B]" />
                      <span>Copy WhatsApp Order Text</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-[#1B1B1B] hover:bg-black text-[#F8F7F4] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  Re-open WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Next Steps Guide */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto font-mono text-[11px] text-[#1B1B1B]/75">
              <div className="p-3 bg-white border border-[#1B1B1B]/15">
                <div className="font-serif text-sm text-[#1B1B1B] mb-0.5">1. Verification</div>
                <span>We inspect loom stock & send live drape image.</span>
              </div>
              <div className="p-3 bg-white border border-[#1B1B1B]/15">
                <div className="font-serif text-sm text-[#1B1B1B] mb-0.5">2. Secure UPI</div>
                <span>Pay via GPay, PhonePe, or Bank Transfer.</span>
              </div>
              <div className="p-3 bg-white border border-[#1B1B1B]/15">
                <div className="font-serif text-sm text-[#1B1B1B] mb-0.5">3. Dispatch</div>
                <span>Express courier with tracking ID & Silk Mark.</span>
              </div>
            </div>

            <button
              onClick={handleFinishAndClear}
              className="px-8 py-3 bg-[#1B1B1B] text-[#F8F7F4] hover:bg-black font-mono text-xs uppercase tracking-wider"
            >
              Done & Return to Boutique
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

