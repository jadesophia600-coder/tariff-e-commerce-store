import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FlashSales } from './components/FlashSales';
import { CategoryPills } from './components/CategoryPills';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SpinWheelModal } from './components/SpinWheelModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { TariffCalculatorModal } from './components/TariffCalculatorModal';
import { Footer } from './components/Footer';
import { ShoppingBag, Sparkles, Filter } from 'lucide-react';

import './styles/index.css';
import './styles/components.css';
import './styles/animations.css';

const MainContent = () => {
  const { products, selectedCategory, searchQuery, toasts } = useShop();

  // Filter products by category & search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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

        {/* Catalog Section */}
        <section id="products-grid" style={{ padding: '1rem 0 3rem 0' }}>
          <div className="container">
            
            <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
              <div>
                <h2 className="section-title">ALL FACTORY DIRECT DEALS</h2>
                <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
                  Showing {filteredProducts.length} items with 100% Tax Pre-Cleared Guarantee
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9CA3AF', fontSize: '0.85rem' }}>
                <Filter size={16} />
                <span>Sorted by: <strong>Popularity & Discount Rate</strong></span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <ShoppingBag size={48} color="#9CA3AF" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#fff', fontSize: '1.25rem' }}>No Products Found</h3>
                <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                  Try searching for another keyword like "Watch", "Audio", or "Sneakers".
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
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
