import React, { useMemo, useState } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SAREE_PRODUCTS, CATEGORIES_LIST, DISPLAY_WHATSAPP_NUMBER } from '../data/sarees';
import { ProductCard } from './ProductCard';

export const CatalogSection: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery,
    selectedCategory, 
    setSelectedCategory,
    selectedOccasion,
    setSelectedOccasion,
    selectedZari,
    setSelectedZari,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
  } = useCart();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const occasions: { id: string; label: string }[] = [
    { id: 'all', label: 'All Occasions' },
    { id: 'Bridal', label: 'Bridal (ವಧು)' },
    { id: 'Festive & Puja', label: 'Festive & Puja' },
    { id: 'Reception & Party', label: 'Reception & Party' },
    { id: 'Traditional', label: 'Traditional Weaves' },
    { id: 'Office & Daily', label: 'Daily & Office' },
  ];

  const zariTypes: { id: string; label: string }[] = [
    { id: 'all', label: 'All Zari Types' },
    { id: 'Pure Gold Zari', label: 'Pure Gold Zari' },
    { id: 'Tested Zari', label: 'Tested Gold Zari' },
    { id: 'Antique Silver Zari', label: 'Antique Silver' },
    { id: 'Copper Zari', label: 'Copper Zari' },
    { id: 'Thread Work / No Zari', label: 'Thread Work / Pure Silk' },
  ];

  // Filtering & Sorting
  const filteredSarees = useMemo(() => {
    let result = [...SAREE_PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (selectedOccasion !== 'all') {
      result = result.filter((item) => item.occasion === selectedOccasion);
    }

    if (selectedZari !== 'all') {
      result = result.filter((item) => item.zariType === selectedZari);
    }

    result = result.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.kannadaName.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.fabric.toLowerCase().includes(q) ||
          item.color.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'bestseller') {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedOccasion, selectedZari, priceRange, searchQuery, sortBy]);

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedOccasion !== 'all' || 
    selectedZari !== 'all' || 
    searchQuery.trim() !== '' ||
    priceRange[0] > 1000 ||
    priceRange[1] < 30000;

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setSelectedZari('all');
    setSearchQuery('');
    setPriceRange([1000, 30000]);
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-8">
      
      {/* Editorial Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex flex-col gap-8 pr-8 border-r border-[#1B1B1B]/12 text-left">
          
          {/* Category Filter */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1B1B1B]/60 mb-3">
              [01] Category
            </div>
            <div className="flex flex-col gap-2 font-sans text-sm">
              {CATEGORIES_LIST.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left transition-colors flex items-baseline justify-between ${
                      isActive
                        ? 'text-[#B8860B] font-semibold'
                        : 'text-[#1B1B1B] hover:text-[#B8860B]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="font-mono text-[10px] opacity-40">
                      {cat.id === 'all' 
                        ? SAREE_PRODUCTS.length 
                        : SAREE_PRODUCTS.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Occasion Filter */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1B1B1B]/60 mb-3">
              [02] Occasion
            </div>
            <div className="flex flex-col gap-1.5 font-sans text-xs">
              {occasions.map((occ) => {
                const isActive = selectedOccasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`text-left py-1 transition-colors ${
                      isActive
                        ? 'text-[#B8860B] font-semibold'
                        : 'text-[#1B1B1B]/80 hover:text-[#1B1B1B]'
                    }`}
                  >
                    {occ.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zari Type */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1B1B1B]/60 mb-3">
              [03] Zari & Weave
            </div>
            <div className="flex flex-col gap-1.5 font-sans text-xs">
              {zariTypes.map((zari) => {
                const isActive = selectedZari === zari.id;
                return (
                  <button
                    key={zari.id}
                    onClick={() => setSelectedZari(zari.id)}
                    className={`text-left py-1 transition-colors ${
                      isActive
                        ? 'text-[#B8860B] font-semibold'
                        : 'text-[#1B1B1B]/80 hover:text-[#1B1B1B]'
                    }`}
                  >
                    {zari.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Slider */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1B1B1B]/60 mb-2 flex justify-between">
              <span>[04] Max Price</span>
              <span className="text-[#B8860B] font-bold">₹{priceRange[1].toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="30000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#1B1B1B]"
            />
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#1B1B1B] hover:text-[#B8860B] pt-2"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}

          {/* Meta Policy Box */}
          <div className="pt-6 border-t border-[#1B1B1B]/12 font-mono text-[10px] uppercase tracking-[0.15em] text-[#1B1B1B]/60 space-y-3">
            <div>Free shipping on all orders over ₹5,000</div>
            <div>Strictly WhatsApp Concierge Ordering</div>
            <div>Silk Mark Certified Direct From Weavers</div>
          </div>

        </aside>

        {/* Main Content Gallery */}
        <main className="flex-1">
          
          {/* Top Bar: Title & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[#1B1B1B]/12 gap-4 text-left">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1B1B1B]/60 mb-1">
                Handloom Catalog // {selectedCategory === 'all' ? 'All Silks' : selectedCategory}
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#1B1B1B]">
                Curated Silks ({filteredSarees.length})
              </h3>
            </div>

            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 border border-[#1B1B1B] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#1B1B1B]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#1B1B1B]/60 hidden sm:inline">
                  Sort:
                </span>
                <select
                  id="sort-sarees-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border border-[#1B1B1B]/20 py-1.5 px-3 font-mono text-xs uppercase tracking-wider text-[#1B1B1B] focus:outline-none focus:border-[#1B1B1B]"
                >
                  <option value="featured">Curated First</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {showMobileFilters && (
            <div className="lg:hidden border border-[#1B1B1B]/15 p-4 mb-6 bg-white space-y-4 text-left font-sans">
              <div className="flex items-center justify-between border-b border-[#1B1B1B]/10 pb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1B1B1B]">
                  Filter Catalog
                </span>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider block mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border border-[#1B1B1B]/20 p-2 text-xs"
                >
                  {CATEGORIES_LIST.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider block mb-1">Occasion</label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full border border-[#1B1B1B]/20 p-2 text-xs"
                >
                  {occasions.map((occ) => (
                    <option key={occ.id} value={occ.id}>{occ.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider block mb-1">Zari Type</label>
                <select
                  value={selectedZari}
                  onChange={(e) => setSelectedZari(e.target.value)}
                  className="w-full border border-[#1B1B1B]/20 p-2 text-xs"
                >
                  {zariTypes.map((zari) => (
                    <option key={zari.id} value={zari.id}>{zari.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2 font-mono text-xs uppercase tracking-wider">
                <button
                  onClick={resetAllFilters}
                  className="flex-1 border border-[#1B1B1B]/30 py-2 text-[#1B1B1B]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-[#1B1B1B] text-white py-2"
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* Saree Grid */}
          {filteredSarees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
              {filteredSarees.map((saree) => (
                <ProductCard key={saree.id} product={saree} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="border border-[#1B1B1B]/15 p-12 text-center max-w-md mx-auto space-y-4 font-sans bg-white">
              <div className="font-serif text-3xl text-[#1B1B1B]">
                ನೀರೇ ಸೀರೆ
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-xl text-[#1B1B1B]">
                  No matching sarees found
                </h4>
                <p className="text-xs text-[#1B1B1B]/60">
                  Try adjusting your category or occasion filters.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center font-mono text-xs uppercase tracking-wider">
                <button
                  onClick={resetAllFilters}
                  className="px-4 py-2 border border-[#1B1B1B] text-[#1B1B1B] hover:bg-[#1B1B1B] hover:text-white transition-colors"
                >
                  Reset Filters
                </button>

                <a
                  href={`https://wa.me/91${DISPLAY_WHATSAPP_NUMBER}?text=${encodeURIComponent(`🙏 Namaskara! I am inquiring about a saree style: ${searchQuery || 'Custom Handloom'}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#1B1B1B] text-white flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          )}

        </main>
      </div>

    </section>
  );
};

