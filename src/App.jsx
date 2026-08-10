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
import { Footer } from './components/Footer';
import { 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Store, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck,
  Grid
} from 'lucide-react';

import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

const MainContent = () => {
  const { 
    products, 
    selectedCategory, 
    searchQuery, 
    toasts, 
    sortBy, 
    priceFilterMax
  } = useShop();

  // --- PROGRAMMATIC PRODUCT DEDUPLICATION ENGINE ---
  // Ensure homepage sections contain 100% unique items with ZERO repetitions
  
  // 1. Flash Deals (isFlashSale = true)
  const flashProducts = products.filter(p => p.isFlashSale || p.sectionTag === 'flashDeals').slice(0, 6);
  const flashIds = new Set(flashProducts.map(p => p.id));

  // 2. Best Sellers (deduplicated against Flash)
  const bestSellersProducts = products
    .filter(p => !flashIds.has(p.id) && (p.sectionTag === 'bestSellers' || p.reviewsCount > 2000))
    .slice(0, 6);
  const bestSellerIds = new Set(bestSellersProducts.map(p => p.id));

  // 3. Trending Now (deduplicated against Flash & Best Sellers)
  const trendingProducts = products
    .filter(p => !flashIds.has(p.id) && !bestSellerIds.has(p.id) && (p.sectionTag === 'trending' || p.rating >= 4.8))
    .slice(0, 6);
  const trendingIds = new Set(trendingProducts.map(p => p.id));

  // 4. New Arrivals (deduplicated against prior sections)
  const newArrivalsProducts = products
    .filter(p => !flashIds.has(p.id) && !bestSellerIds.has(p.id) && !trendingIds.has(p.id) && (p.sectionTag === 'newArrivals' || p.id.startsWith('ph-5') || p.id.startsWith('lap-4')))
    .slice(0, 6);
  const newArrivalIds = new Set(newArrivalsProducts.map(p => p.id));

  // 5. Verified Tariff Mall Stores (deduplicated)
  const featuredStoreProducts = products
    .filter(p => !flashIds.has(p.id) && !bestSellerIds.has(p.id) && !trendingIds.has(p.id) && !newArrivalIds.has(p.id))
    .slice(0, 6);

  // --- Filtered Catalog for "All Products" exploration ---
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.seller && product.seller.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPrice = product.priceNGN <= priceFilterMax;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    if (sortBy === 'price-low') return a.priceNGN - b.priceNGN;
    if (sortBy === 'price-high') return b.priceNGN - a.priceNGN;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // default popular
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

      <Header />

      <main style={{ flex: 1 }}>
        
        {/* Hero Banner with Spin-to-Win Trigger */}
        <HeroBanner />

        {/* SECTION 1: Flash Sales (Dedicated Unique Items) */}
        <FlashSales flashProducts={flashProducts} />

        {/* SECTION 2: Popular Departments Showcase */}
        <CategoryShowcase />

        {/* SECTION 3: Best Sellers (Deduplicated Unique Items) */}
        <ProductSection
          title="BEST SELLERS"
          subtitle="Top-purchased items across Nigeria with thousands of 5-star reviews"
          icon={Flame}
          products={bestSellersProducts}
          badgeText="Verified Top Ratings"
          bgAlt={true}
        />

        {/* SECTION 4: Trending Now (Deduplicated Unique Items) */}
        <ProductSection
          title="TRENDING NOW"
          subtitle="High-demand gadgets, smartphones & fashion trending this week"
          icon={TrendingUp}
          products={trendingProducts}
          badgeText="Fast Shipping"
        />

        {/* SECTION 5: New Arrivals (Deduplicated Unique Items) */}
        <ProductSection
          title="NEW ARRIVALS"
          subtitle="Fresh factory releases imported with pre-cleared customs clearance"
          icon={Sparkles}
          products={newArrivalsProducts}
          badgeText="Fresh Stock"
          bgAlt={true}
        />

        {/* SECTION 6: Verified Tariff Mall Stores */}
        <ProductSection
          title="VERIFIED BRAND STORES"
          subtitle="Direct items from Nike, Apple, Samsung, Sony, CeraVe & Dyson official hubs"
          icon={Store}
          products={featuredStoreProducts}
          badgeText="100% Authentic"
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
                <h2 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#0F172A' }}>RECOMMENDED FOR YOU</h2>
                <p style={{ color: '#64748B', fontSize: '0.85rem' }}>Full catalog with interactive price filters and department selection</p>
              </div>
            </div>

            <FilterBar totalCount={sortedProducts.length} />

            {sortedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <ShoppingBag size={48} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#0F172A', fontSize: '1.25rem' }}>No Products Match Your Filter</h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '0.35rem' }}>
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

      </main>

      <Footer />

      {/* Interactive Modals */}
      <ProductModal />
      <CartDrawer />
      <SpinWheelModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <TariffCalculatorModal />
      <UserProfileModal />

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
