import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Grid, Search, ShoppingBag, User, Heart } from 'lucide-react';

export const MobileBottomNav = () => {
  const { 
    cart, 
    wishlist,
    setCartOpen, 
    openProfileTab, 
    setSelectedCategory 
  } = useShop();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleScrollToGrid = () => {
    setSelectedCategory('all');
    const catalogElement = document.getElementById('products-grid');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--bg-header)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0.5rem 0',
        boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.08)'
      }}
      className="mobile-bottom-nav-wrap"
    >
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--primary)', fontSize: '0.725rem', fontWeight: 700 }}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button 
        onClick={handleScrollToGrid}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--text-muted)', fontSize: '0.725rem', fontWeight: 700 }}
      >
        <Grid size={20} />
        <span>Categories</span>
      </button>

      <button 
        onClick={() => openProfileTab('wishlist')}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--text-muted)', fontSize: '0.725rem', fontWeight: 700, position: 'relative' }}
      >
        <Heart size={20} fill={wishlist.length > 0 ? "var(--primary)" : "none"} color="var(--primary)" />
        <span>Wishlist</span>
        {wishlist.length > 0 && (
          <span style={{ position: 'absolute', top: '-4px', right: '12px', background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {wishlist.length}
          </span>
        )}
      </button>

      <button 
        onClick={() => setCartOpen(true)}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--text-muted)', fontSize: '0.725rem', fontWeight: 700, position: 'relative' }}
      >
        <ShoppingBag size={20} />
        <span>Cart</span>
        {totalCartCount > 0 && (
          <span style={{ position: 'absolute', top: '-4px', right: '12px', background: 'var(--primary)', color: '#fff', fontSize: '0.6rem', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {totalCartCount}
          </span>
        )}
      </button>

      <button 
        onClick={() => openProfileTab('overview')}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: 'var(--text-muted)', fontSize: '0.725rem', fontWeight: 700 }}
      >
        <User size={20} />
        <span>Account</span>
      </button>

    </div>
  );
};
