import React from 'react';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CatalogSection } from './components/CatalogSection';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { SareeCareSection } from './components/SareeCareSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AiStylistModal } from './components/AiStylistModal';

export function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#1B1B1B]">
      {/* Top Notification Announcement */}
      <AnnouncementBar />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Hero Showcase with Brand Story & WhatsApp CTA */}
      <HeroBanner />

      {/* Saree Catalog & Filtering Section */}
      <main className="flex-1">
        <CatalogSection />
        
        {/* Instagram Profile & Reels Feed */}
        <InstagramFeedSection />

        {/* Saree Care & Heritage Preservation */}
        <SareeCareSection />

        {/* Customer Reviews & Social Proof */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Concierge Buttons */}
      <FloatingWhatsAppButton />

      {/* Interactive Modals & Drawers */}
      <ProductQuickViewModal />
      <CartDrawer />
      <WhatsAppCheckoutModal />
      <WishlistDrawer />
      <AiStylistModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
