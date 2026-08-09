import React from 'react';
import { useShop, currencies } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, ShieldCheck, Zap, Globe, Sparkles } from 'lucide-react';

export const Header = () => {
  const { 
    cart, 
    wishlist, 
    searchQuery, 
    setSearchQuery, 
    setCartOpen, 
    currency, 
    setCurrency, 
    setSpinWheelOpen,
    setTariffCalculatorOpen 
  } = useShop();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-ticker-bar">
        <div className="top-ticker-content">
          <Zap size={15} className="animate-pulse-glow" />
          <span>FLASH SALE: 80% OFF Blitz Deals + 100% Guaranteed Tariff Duty Paid Delivery!</span>
          <button onClick={() => setSpinWheelOpen(true)} className="top-ticker-link">
            Spin Wheel for $50 Coupon 🎁
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container header-wrapper">
          
          {/* Logo Brand */}
          <a href="#" className="logo-brand">
            <div className="logo-icon-wrap">
              <Zap size={24} fill="#fff" />
            </div>
            <span>TARIFF</span>
            <span className="logo-tag">DIRECT</span>
          </a>

          {/* Search Omnibox */}
          <div className="search-container">
            <div className="search-input-wrap">
              <Search size={18} color="#9CA3AF" style={{ marginRight: '8px' }} />
              <input
                type="text"
                className="search-input"
                placeholder="Search 1,000,000+ factory-direct items (e.g. OLED Watch, Drone, Headphones)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn">
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="header-actions">
            
            {/* Currency & Duty Selector */}
            <div 
              className="tariff-info-pill" 
              onClick={() => setTariffCalculatorOpen(true)}
              title="Click to view Transparent Duty Calculator"
            >
              <ShieldCheck size={16} />
              <span>{currency.code}</span>
              <Globe size={13} style={{ opacity: 0.7 }} />
            </div>

            {/* Spin Wheel Quick Button */}
            <button 
              className="action-btn" 
              onClick={() => setSpinWheelOpen(true)}
              title="Spin Wheel of Savings"
            >
              <Sparkles size={20} color="#F59E0B" />
              <span>Spin Wheel</span>
            </button>

            {/* Wishlist */}
            <button className="action-btn" title="Saved Items">
              <Heart size={20} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="action-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Drawer Button */}
            <button className="action-btn" onClick={() => setCartOpen(true)} title="View Shopping Cart">
              <ShoppingBag size={20} color="#7C3AED" />
              <span>Cart</span>
              {totalCartCount > 0 && (
                <span className="action-badge" style={{ background: '#7C3AED' }}>
                  {totalCartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </header>
    </>
  );
};
