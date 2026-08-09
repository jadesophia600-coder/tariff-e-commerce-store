import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FlashSales } from './components/FlashSales';
import { CategoryPills } from './components/CategoryPills';
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
import { ShoppingBag, Sparkles } from 'lucide-react';

import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

const MainContent = () => {
  const { products, selectedCategory, searchQuery, toasts, sortBy, priceFilterMax } = useShop();

  // Filter products by category, search query, and max price
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= priceFilterMax;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // default popular
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
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
        <HeroBanner />

        {/* Flash Sales Section */}
        <FlashSales />

        {/* Category Pills Navigation */}
        <CategoryPills />

        {/* Catalog Section with FilterBar */}
        <section id="products-grid" style={{ padding: '1rem 0 3rem 0' }}>
          <div className="container">
            
            <FilterBar totalCount={sortedProducts.length} />

            {sortedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <ShoppingBag size={48} color="#9CA3AF" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#fff', fontSize: '1.25rem' }}>No Products Match Your Filter</h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginTop: '0.35rem' }}>
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
