import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, ShoppingBag, Heart, ShieldCheck, Zap, Globe, Sparkles, Sun, Moon, User } from 'lucide-react';

export const Header = () => {
  const { 
    cart, 
    wishlist, 
    searchQuery, 
    setSearchQuery, 
    setCartOpen, 
    currency, 
    setSpinWheelOpen,
    setTariffCalculatorOpen,
    userProfile,
    setProfileOpen,
    theme,
    toggleTheme,
    addToast,
    products
  } = useShop();

  const [headerHidden, setHeaderHidden] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 70 && currentScrollY > prevScrollY) {
        setHeaderHidden(true);
      } else {
        setHeaderHidden(false);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY]);

  // Active search execution handler
  const handleExecuteSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      addToast('Please enter a search term (e.g. iPhone, Air Fryer, Sneakers)', 'warning');
      return;
    }

    const matches = products.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );

    addToast(`Searching for "${query}" — Found ${matches.length} products!`, 'success');

    const catalogElement = document.getElementById('products-grid');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`sticky-header-container ${headerHidden ? 'header-hidden' : ''}`}>
      {/* Top Announcement Ticker */}
      <div className="top-ticker-bar">
        <div className="top-ticker-content">
          <Zap size={15} className="animate-pulse-glow" />
          <span>⚡ FLASH SALE: Up to 80% OFF Verified Factory Deals + 100% Tax Pre-Cleared Delivery!</span>
          <button onClick={() => setSpinWheelOpen(true)} className="top-ticker-link">
            Spin Wheel for ₦15,000 Voucher 🎁
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
            <span className="logo-tag">MALL</span>
          </a>

          {/* Search Omnibox Form */}
          <form className="search-container" onSubmit={handleExecuteSearch}>
            <div className="search-input-wrap">
              <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
              <input
                type="text"
                className="search-input"
                placeholder="Search iPhone 15, Samsung S24, Air Fryer, Sneakers, Laptops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn" title="Click to search catalog">
                <Search size={16} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Right Header Actions */}
          <div className="header-actions">
            
            {/* Theme Toggle Button (Light / Dark Switch) */}
            <button 
              className="action-btn"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              style={{
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '0.4rem 0.75rem',
                borderRadius: '20px',
                flexDirection: 'row',
                gap: '0.4rem',
                fontWeight: 700
              }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              <span style={{ fontSize: '0.78rem' }}>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
            </button>

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
              <Sparkles size={20} color="var(--accent-gold)" />
              <span>Spin & Win</span>
            </button>

            {/* Profile Dashboard Button */}
            <button 
              className="action-btn" 
              onClick={() => setProfileOpen(true)} 
              title="Open Profile Dashboard & Orders"
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                  }}
                  style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)', objectFit: 'cover' }} 
                />
              </div>
              <span>Profile Dashboard</span>
              <span className="action-badge" style={{ background: 'var(--accent-gold)', fontSize: '0.55rem' }}>VIP</span>
            </button>

            {/* Wishlist */}
            <button className="action-btn" onClick={() => setProfileOpen(true)} title="Saved Wishlist Items">
              <Heart size={20} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="action-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button className="action-btn" onClick={() => setCartOpen(true)} title="View Shopping Cart">
              <ShoppingBag size={20} color="var(--primary)" />
              <span>Cart</span>
              {totalCartCount > 0 && (
                <span className="action-badge" style={{ background: 'var(--primary)' }}>
                  {totalCartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </header>
    </div>
  );
};
