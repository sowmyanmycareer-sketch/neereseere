import React from 'react';
import { Star, CheckCircle2, Quote, MessageCircle } from 'lucide-react';
import { CUSTOMER_TESTIMONIALS } from '../data/testimonials';
import { DISPLAY_WHATSAPP_NUMBER } from '../data/sarees';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-14 bg-[#FAF7F2] border-t border-[#D4AF37]/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A0522D] font-sans">
            Client Love & Trust • ಗ್ರಾಹಕರ ಪ್ರೀತಿ
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#2D2D2D]">
            Cherished by Saree Connoisseurs
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A5A]">
            Read what our community across Karnataka and India have to say about their Neere Seere shopping experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#D4AF37]/30 p-5 flex flex-col justify-between space-y-4 shadow-xs hover:border-[#800000] transition-all text-left"
            >
              <div className="space-y-3">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#D4AF37]/40" />
                </div>

                <p className="text-xs text-[#2D2D2D] leading-relaxed font-serif italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center gap-3">
                {item.avatarUrl && (
                  <img
                    src={item.avatarUrl}
                    alt={item.customerName}
                    className="w-10 h-10 object-cover border border-[#D4AF37]"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <div className="text-xs font-bold text-[#2D2D2D] flex items-center gap-1">
                    <span>{item.customerName}</span>
                    {item.verifiedPurchase && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32] fill-[#E8F5E9]" title="Verified Buyer" />
                    )}
                  </div>
                  <div className="text-[10px] text-[#6B7280]">
                    {item.city}
                  </div>
                  <div className="text-[10px] text-[#800000] font-semibold truncate max-w-[170px] uppercase tracking-wider">
                    {item.sareePurchased}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* WhatsApp Review Submission CTA */}
        <div className="text-center pt-2 font-sans">
          <a
            href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=${encodeURIComponent('🙏 Namaskara Neere Seere! I would like to share my review / feedback regarding my recent saree purchase.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#5A5A5A] hover:text-[#25D366] font-semibold uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Have a Neere Seere saree photo? Share your review on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
