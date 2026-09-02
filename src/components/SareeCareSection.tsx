import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Wind, 
  Sun, 
  FoldVertical, 
  PackageCheck,
  Award
} from 'lucide-react';

export const SareeCareSection: React.FC = () => {
  const careTips = [
    {
      icon: <PackageCheck className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Muslin Cloth Wrap',
      kannada: 'ಮಸ್ಲಿನ್ ಬಟ್ಟೆ ಸಂರಕ್ಷಣೆ',
      desc: 'Always wrap pure Kanjeevaram and Mysore silks in breathable unbleached muslin or pure cotton cloth. Never store in airtight plastic bags.'
    },
    {
      icon: <FoldVertical className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Periodic Refolding',
      kannada: 'ನಿಯಮಿತ ಮಡಿಸುವಿಕೆ',
      desc: 'Change saree folds every 3 months along the creases to prevent zari breakage and maintain natural silk elasticity.'
    },
    {
      icon: <Wind className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Gentle Airing',
      kannada: 'ಗಾಳಿಗೆ ಒಡ್ಡುವಿಕೆ',
      desc: 'Air out your silk sarees in a shaded, well-ventilated room after each wear before storing. Avoid direct harsh sunlight.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Dry Clean Only',
      kannada: 'ಡ್ರೈ ಕ್ಲೀನ್ ಮಾತ್ರ',
      desc: 'For pure gold and silver zari sarees, always prefer professional dry cleaning. Never spray perfume or deodorants directly on zari.'
    }
  ];

  return (
    <section className="py-14 bg-white border-t border-[#D4AF37]/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#800000] flex items-center justify-center gap-1.5 font-sans">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            Heritage Preservation Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif italic font-bold text-[#2D2D2D]">
            How to Care for Your Heirloom Silks
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A5A]">
            Hand-woven pure silks are generational heirlooms. A few simple care routines keep their luster radiant for decades.
          </p>
        </div>

        {/* 4 Care Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {careTips.map((tip, idx) => (
            <div 
              key={idx}
              className="bg-[#FAF7F2] border border-[#D4AF37]/30 p-5 space-y-3 text-left shadow-xs hover:border-[#800000] transition-all"
            >
              <div className="w-10 h-10 bg-white flex items-center justify-center border border-[#D4AF37]/40 shadow-xs">
                {tip.icon}
              </div>

              <div>
                <h3 className="text-base font-bold text-[#800000] font-serif italic">
                  {tip.title}
                </h3>
                <span className="text-xs text-[#800000] font-semibold uppercase tracking-wider font-sans">
                  {tip.kannada}
                </span>
              </div>

              <p className="text-xs text-[#5A5A5A] leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Silk Mark Promise Strip */}
        <div className="bg-[#1A1A1A] text-[#FAF7F2] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#D4AF37]/40">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
              100%
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif italic text-[#D4AF37]">
                Silk Mark Certified Purity & Authenticity
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5 font-sans">
                Every pure silk saree from Neere Seere carries the government Silk Mark tag guaranteeing 100% natural silk threads.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919686611223?text=Namaskara!%20I%20have%20questions%20regarding%20Silk%20Mark%20certification%20and%20saree%20authenticity."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#c49f2e] text-[#1A1A1A] font-sans font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all shadow-xs shrink-0"
          >
            Verify with Saree Expert
          </a>
        </div>

      </div>
    </section>
  );
};
