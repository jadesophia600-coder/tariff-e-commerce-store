import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SearchAutocomplete } from './SearchAutocomplete';
import { ShoppingBag, Heart, ShieldCheck, Zap, Globe, Sparkles, Sun, Moon, Bell, Store } from 'lucide-react';

export const Header = () => {
  const { 
    cart, 
    wishlist, 
    setCartOpen, 
    currency, 
    setSpinWheelOpen,
    setTariffCalculatorOpen,
    userProfile,
    setProfileOpen,
    theme,
    toggleTheme,
    unreadNotificationsCount,
    setNotificationCenterOpen,
    setBuyerProtectionModal,
    selectedState,
    setSelectedState
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

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`sticky-header-container ${headerHidden ? 'header-hidden' : ''}`}>
      {/* Top Announcement Ticker */}
      <div className="top-ticker-bar">
        <div className="top-ticker-content">
          <Zap size={15} className="animate-pulse-glow" />
          <span>⚡ FLASH SALE: Up to 80% OFF Verified Factory Deals + 100% Tax Pre-Cleared Delivery!</span>
          
          <button onClick={() => setBuyerProtectionModal(true)} className="top-ticker-link" style={{ textDecoration: 'none' }}>
            <ShieldCheck size={13} style={{ display: 'inline', marginRight: '3px' }} />
            Tariff Escrow Protection ✓
          </button>

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

          {/* Location State Selector (Lagos, Abuja, Port Harcourt) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-section-alt)', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Deliver to:</span>
            <select 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 800, fontSize: '0.78rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="Lagos">Lagos State (1-2 Days)</option>
              <option value="Abuja">Abuja FCT (2-4 Days)</option>
              <option value="Ibadan">Ibadan (1-3 Days)</option>
              <option value="Port Harcourt">Port Harcourt (2-4 Days)</option>
              <option value="Kano">Kano (3-5 Days)</option>
              <option value="Enugu">Enugu (2-4 Days)</option>
              <option value="Other States">Nationwide (3-5 Days)</option>
            </select>
          </div>

          {/* Search Omnibox with Autocomplete & Recent Searches */}
          <SearchAutocomplete />

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
              <span style={{ fontSize: '0.78rem' }}>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>

            {/* Notification Center Bell 🔔 */}
            <button 
              className="action-btn"
              onClick={() => setNotificationCenterOpen(true)}
              title="Notification Center & Alerts"
            >
              <Bell size={20} />
              <span>Alerts</span>
              {unreadNotificationsCount > 0 && (
                <span className="action-badge" style={{ background: '#DC2626' }}>
                  {unreadNotificationsCount}
                </span>
              )}
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
              <span>Profile</span>
              <span className="action-badge" style={{ background: 'var(--accent-gold)', fontSize: '0.55rem' }}>VIP</span>
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
