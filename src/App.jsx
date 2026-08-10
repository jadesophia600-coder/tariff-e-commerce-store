import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FlashSales } from './components/FlashSales';
import { CategoryShowcase } from './components/CategoryShowcase';
import { CategoryPills } from './components/CategoryPills';
import { ProductSection } from './components/ProductSection';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SpinWheelModal } from './components/SpinWheelModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { TariffCalculatorModal } from './components/TariffCalculatorModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SellerStorefrontModal } from './components/SellerStorefrontModal';
import { BuyerProtectionModal } from './components/BuyerProtectionModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Store, 
  ShoppingBag, 
  Grid,
  Sun,
  Moon,
  ShieldCheck
} from 'lucide-react';

import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

const MainContent = () => {
  const { 
    products = [], 
    selectedCategory = 'all', 
    searchQuery = '', 
    toasts = [], 
    sortBy = 'popular', 
    priceFilterMax = 2000000,
    theme = 'light',
    toggleTheme,
    setBuyerProtectionModal
  } = useShop();

  // --- PROGRAMMATIC PRODUCT DEDUPLICATION ENGINE (20 ITEMS PER SECTION) ---
  
  // 1. Flash Deals (20 Items)
  const flashProducts = (products || []).filter(p => p && (p.isFlashSale || p.sectionTag === 'flashDeals')).slice(0, 20);
  const flashIds = new Set(flashProducts.map(p => p.id));

  // 2. Best Sellers (20 Items deduplicated against Flash)
  const bestSellersProducts = (products || [])
    .filter(p => p && !flashIds.has(p.id) && (p.sectionTag === 'bestSellers' || (p.reviewsCount || 0) > 2000))
    .slice(0, 20);
  const bestSellerIds = new Set(bestSellersProducts.map(p => p.id));

  // 3. Trending Now (20 Items deduplicated against Flash & Best Sellers)
  const trendingProducts = (products || [])
    .filter(p => p && !flashIds.has(p.id) && !bestSellerIds.has(p.id) && (p.sectionTag === 'trending' || (p.rating || 0) >= 4.8))
    .slice(0, 20);
  const trendingIds = new Set(trendingProducts.map(p => p.id));

  // 4. New Arrivals (20 Items deduplicated against prior sections)
  const newArrivalsProducts = (products || [])
    .filter(p => p && !flashIds.has(p.id) && !bestSellerIds.has(p.id) && !trendingIds.has(p.id) && (p.sectionTag === 'newArrivals' || (p.id && (p.id.startsWith('ph-5') || p.id.startsWith('lap-4')))))
    .slice(0, 20);
  const newArrivalIds = new Set(newArrivalsProducts.map(p => p.id));

  // 5. Verified Tariff Mall Stores (20 Items deduplicated)
  const featuredStoreProducts = (products || [])
    .filter(p => p && !flashIds.has(p.id) && !bestSellerIds.has(p.id) && !trendingIds.has(p.id) && !newArrivalIds.has(p.id))
    .slice(0, 20);

  // --- Filtered Catalog for Recommended For You & Category Selection ---
  const filteredProducts = (products || []).filter((product) => {
    if (!product) return false;
    const cat = product.category || '';
    const matchesCategory = selectedCategory === 'all' || cat === selectedCategory;
    const title = product.title || '';
    const seller = product.seller || '';
    const query = (searchQuery || '').toLowerCase();
    const matchesSearch = title.toLowerCase().includes(query) ||
                          cat.toLowerCase().includes(query) ||
                          seller.toLowerCase().includes(query);
    const matchesPrice = (product.priceNGN || 0) <= priceFilterMax;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
    if (sortBy === 'price-low') return (a.priceNGN || 0) - (b.priceNGN || 0);
    if (sortBy === 'price-high') return (b.priceNGN || 0) - (a.priceNGN || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.reviewsCount || 0) - (a.reviewsCount || 0); // default popular
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      
      {/* Toast Notifications Overlay */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <Sparkles size={16} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Floating Theme Switcher Button */}
      <button
        onClick={toggleTheme}
        title={`Click to switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 999,
          background: theme === 'light' ? '#0F172A' : '#F8FAFC',
          color: theme === 'light' ? '#F8FAFC' : '#0F172A',
          border: '2px solid var(--primary)',
          borderRadius: '50px',
          padding: '0.6rem 1.15rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 800,
          fontSize: '0.825rem',
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)',
          cursor: 'pointer',
          transition: 'all 0.25s ease'
        }}
      >
        {theme === 'light' ? <Moon size={16} color="#C084FC" /> : <Sun size={16} color="#F59E0B" />}
        <span>{theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
      </button>

      <Header />

      <main style={{ flex: 1 }}>
        
        {/* Hero Banner */}
        <HeroBanner />

        {/* SECTION 1: Flash Sales (20 Dedicated Unique Items) */}
        <FlashSales flashProducts={flashProducts} />

        {/* SECTION 2: Popular Departments Showcase */}
        <CategoryShowcase />

        {/* SECTION 3: Best Sellers (20 Dedicated Unique Items) */}
        <ProductSection
          title="BEST SELLERS"
          subtitle="20 Top-purchased items across Nigeria with thousands of 5-star reviews"
          icon={Flame}
          products={bestSellersProducts}
          badgeText="20 Verified Top Ratings"
          bgAlt={true}
        />

        {/* SECTION 4: Trending Now (20 Dedicated Unique Items) */}
        <ProductSection
          title="TRENDING NOW"
          subtitle="20 High-demand gadgets, smartphones & fashion trending this week"
          icon={TrendingUp}
          products={trendingProducts}
          badgeText="20 Fast Shipping"
        />

        {/* SECTION 5: New Arrivals (20 Dedicated Unique Items) */}
        <ProductSection
          title="NEW ARRIVALS"
          subtitle="20 Fresh factory releases imported with pre-cleared customs clearance"
          icon={Sparkles}
          products={newArrivalsProducts}
          badgeText="20 Fresh Stock"
          bgAlt={true}
        />

        {/* SECTION 6: Verified Tariff Mall Stores (20 Dedicated Unique Items) */}
        <ProductSection
          title="VERIFIED BRAND STORES"
          subtitle="20 Direct items from Nike, Apple, Samsung, Sony, CeraVe & Dyson official hubs"
          icon={Store}
          products={featuredStoreProducts}
          badgeText="20 Authentic Brands"
        />

        {/* SECTION 7: Category Pills Navigation */}
        <CategoryPills />

        {/* SECTION 8: Filterable Catalog Grid (Recommended For You) */}
        <section id="products-grid" style={{ padding: '1rem 0 3.5rem 0' }}>
          <div className="container">
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--primary-light)', padding: '10px', borderRadius: '12px', color: 'var(--primary)' }}>
                <Grid size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.55rem', fontWeight: 800 }}>RECOMMENDED FOR YOU</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Explore 20+ products available in each department with interactive filters</p>
              </div>
            </div>

            <FilterBar totalCount={sortedProducts.length} />

            {sortedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem' }}>No Products Match Your Filter</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                  Try adjusting the price slider or clearing your search term.
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* SECTION 9: TARIFF BUYER PROTECTION TRUST BANNER */}
        <section style={{ background: 'var(--bg-section-alt)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '3.5rem 0' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <div style={{ background: 'var(--secondary-light)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--secondary)' }}>
              <ShieldCheck size={32} />
            </div>
            <span style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              100% ESCROW SAFEGUARD
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '0.35rem' }}>
              TARIFF BUYER PROTECTION GUARANTEE
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
              Your payment is held 100% safe in Tariff Escrow until your order is delivered, inspected & verified. 
              Enjoy 7-day money-back refunds, zero customs tax surprises, and instant dispute resolution.
            </p>

            <button 
              onClick={() => setBuyerProtectionModal(true)}
              className="btn-checkout"
              style={{ display: 'inline-flex', width: 'auto', padding: '0.75rem 2rem', marginTop: '1.5rem' }}
            >
              Learn More About Tariff Escrow Guarantee
            </button>
          </div>
        </section>

      </main>

      <Footer />

      {/* Sticky Mobile Bottom Navigation (Visible on mobile screens only) */}
      <MobileBottomNav />

      {/* Interactive Modals */}
      <ProductModal />
      <CartDrawer />
      <SpinWheelModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <TariffCalculatorModal />
      <UserProfileModal />
      <SellerStorefrontModal />
      <BuyerProtectionModal />
      <NotificationCenterModal />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
