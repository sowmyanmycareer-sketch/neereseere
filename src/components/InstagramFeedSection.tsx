import React from 'react';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Grid
} from 'lucide-react';
import { 
  INSTAGRAM_POSTS, 
  INSTAGRAM_HANDLE, 
  INSTAGRAM_URL, 
  DISPLAY_WHATSAPP_NUMBER,
  SAREE_PRODUCTS 
} from '../data/sarees';
import { useCart } from '../context/CartContext';

export const InstagramFeedSection: React.FC = () => {
  const { setSelectedQuickViewProduct } = useCart();

  const handlePostClick = (sareeCode?: string) => {
    if (sareeCode) {
      const match = SAREE_PRODUCTS.find(s => s.code === sareeCode);
      if (match) {
        setSelectedQuickViewProduct(match);
        return;
      }
    }
    window.open(INSTAGRAM_URL, '_blank');
  };

  return (
    <section className="py-16 bg-[#F8F7F4] border-t border-b border-[#1B1B1B]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Instagram Profile Card Header */}
        <div className="bg-white border border-[#1B1B1B]/15 p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            
            {/* Profile Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 p-0.5 border border-[#1B1B1B]">
                <div className="w-full h-full bg-[#1B1B1B] text-[#F8F7F4] flex items-center justify-center font-serif italic text-2xl font-light">
                  NS
                </div>
              </div>
            </div>

            {/* Profile Bio & Metrics */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#1B1B1B]/60">
                    Official Instagram Desk
                  </div>
                  <h3 className="text-lg sm:text-xl font-mono text-[#1B1B1B] font-bold">
                    @{INSTAGRAM_HANDLE}
                  </h3>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#1B1B1B] text-[#F8F7F4] hover:bg-transparent hover:text-[#1B1B1B] border border-[#1B1B1B] flex items-center gap-1.5 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Follow (105K)</span>
                  </a>

                  <a
                    href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-[#F8F7F4] flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Counts: Posts, Followers, Following */}
              <div className="flex items-center justify-center sm:justify-start gap-6 font-mono text-xs text-[#1B1B1B] pt-1">
                <div>
                  <strong className="font-bold">249</strong>{' '}
                  <span className="text-[#1B1B1B]/50 uppercase tracking-wider text-[10px]">posts</span>
                </div>
                <div>
                  <strong className="font-bold">105K</strong>{' '}
                  <span className="text-[#1B1B1B]/50 uppercase tracking-wider text-[10px]">followers</span>
                </div>
                <div>
                  <strong className="font-bold">13</strong>{' '}
                  <span className="text-[#1B1B1B]/50 uppercase tracking-wider text-[10px]">following</span>
                </div>
              </div>

              {/* Bio Details */}
              <div className="text-xs text-[#1B1B1B]/75 space-y-1 pt-2 border-t border-[#1B1B1B]/10 font-sans">
                <div className="font-serif italic text-base text-[#1B1B1B]">
                  Neere Seere (ನೀರೇ ಸೀರೆ)
                </div>
                <div className="text-[#B8860B] font-mono text-[11px] uppercase tracking-wider">
                  A traditional saree destination &bull; Handloom Silk Archive
                </div>
                <div className="text-[#1B1B1B]">
                  To order, WhatsApp on <strong className="font-mono text-[#1B1B1B] font-bold">9686611223</strong> <span className="text-[#1B1B1B]/60 font-mono text-[10px]">(Strictly no calls)</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Instagram Posts Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2 text-[#1B1B1B]">
              <Grid className="w-4 h-4 text-[#B8860B]" />
              <span>Recent Instagram Visuals</span>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1B1B1B]/70 hover:text-[#B8860B] flex items-center gap-1 transition-colors"
            >
              <span>View @neereseere_2024</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.sareeCode)}
                className="group bg-white border border-[#1B1B1B]/12 hover:border-[#1B1B1B] p-3 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Image Stage */}
                <div className="relative aspect-square overflow-hidden bg-[#EAEAEA]">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-mono text-xs font-bold">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      {post.comments}
                    </span>
                  </div>

                  {post.tag && (
                    <div className="absolute top-2 right-2 bg-[#1B1B1B] text-[#F8F7F4] font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
                      #{post.tag}
                    </div>
                  )}
                </div>

                {/* Caption & Order Link */}
                <div className="pt-3 text-left space-y-2">
                  <p className="text-xs text-[#1B1B1B]/80 line-clamp-2 leading-relaxed font-sans">
                    {post.caption}
                  </p>
                  
                  <div className="flex items-center justify-between font-mono text-[10px] pt-2 border-t border-[#1B1B1B]/10 uppercase tracking-wider">
                    <span className="text-[#25D366] flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Order on WA
                    </span>
                    <span className="text-[#1B1B1B] hover:text-[#B8860B] font-bold">
                      View Saree &rarr;
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

