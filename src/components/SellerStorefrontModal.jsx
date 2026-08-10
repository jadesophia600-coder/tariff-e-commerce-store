import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { X, Store, ShieldCheck, Star, Users, CheckCircle2, MapPin, Clock, ArrowRight } from 'lucide-react';

export const SellerStorefrontModal = () => {
  const { 
    sellerStoreModal, 
    setSellerStoreModal, 
    products 
  } = useShop();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'reviews', 'about'

  if (!sellerStoreModal) return null;

  const sellerProducts = products.filter(p => 
    p.seller && p.seller.toLowerCase().includes(sellerStoreModal.name.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={() => setSellerStoreModal(null)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', padding: 0, overflow: 'hidden' }}>
        
        {/* Seller Banner Header */}
        <div 
          style={{
            background: `linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.95) 100%), url(${sellerStoreModal.banner}) center/cover`,
            padding: '2.5rem 2rem 1.75rem 2rem',
            position: 'relative',
            color: '#FFFFFF'
          }}
        >
          <button className="close-modal-btn" onClick={() => setSellerStoreModal(null)} style={{ top: '15px', right: '15px', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img 
              src={sellerStoreModal.logo} 
              alt={sellerStoreModal.name}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '16px',
                objectFit: 'cover',
                border: '3px solid #FFFFFF',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                background: '#fff'
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: 0 }}>{sellerStoreModal.name}</h2>
                <span style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Verified Seller ✓
                </span>
              </div>

              <p style={{ color: '#E2E8F0', fontSize: '0.875rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#34D399" /> {sellerStoreModal.location}
              </p>

              {/* Trust Metrics Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.85rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FBBF24', fontWeight: 800 }}>
                  <Star size={14} fill="#FBBF24" /> {sellerStoreModal.rating} ({sellerStoreModal.reviewsCount.toLocaleString()} Reviews)
                </span>

                <span style={{ color: '#E2E8F0', fontWeight: 700 }}>
                  📦 {sellerStoreModal.completedOrders.toLocaleString()} Orders Completed
                </span>

                <span style={{ color: '#34D399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> Response Rate: {sellerStoreModal.responseRate} ({sellerStoreModal.responseTime})
                </span>

                <span style={{ color: '#C084FC', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} /> {sellerStoreModal.followersCount.toLocaleString()} Followers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-section-alt)', padding: '0 1.5rem' }}>
          <button 
            onClick={() => setActiveTab('products')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'products' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'products' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Store size={16} /> Store Catalog ({sellerProducts.length} Items)
          </button>

          <button 
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'reviews' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'reviews' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Star size={16} /> Seller Reviews & Ratings
          </button>

          <button 
            onClick={() => setActiveTab('about')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'about' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'about' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShieldCheck size={16} /> Verification & Policy
          </button>
        </div>

        {/* Modal Body Content */}
        <div style={{ padding: '1.75rem', background: 'var(--bg-card)', maxHeight: '60vh', overflowY: 'auto' }}>
          
          {activeTab === 'products' && (
            <div>
              <div className="products-grid" style={{ marginBottom: 0 }}>
                {sellerProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-section-alt)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Overall Seller Rating</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Based on {sellerStoreModal.reviewsCount.toLocaleString()} customer ratings across Nigeria</p>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
                  {sellerStoreModal.rating} ★
                </div>
              </div>

              <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.85rem' }}>Bamidele A. (Lagos)</strong>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>5.0 ★</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ordered an iPhone 15 Pro Max from Slot Electronics. Original sealed box delivered in 24 hours with pre-cleared customs receipt!</p>
              </div>

              <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.85rem' }}>Nneka O. (Abuja)</strong>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>5.0 ★</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Seller responds in less than 5 minutes! Super authentic products and smooth dispatch.</p>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>About {sellerStoreModal.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {sellerStoreModal.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'var(--secondary-light)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '1rem', borderRadius: '12px', color: 'var(--secondary)' }}>
                  <ShieldCheck size={20} />
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.35rem' }}>Tariff Escrow Protected</h5>
                  <p style={{ fontSize: '0.8rem', marginTop: '2px' }}>Payments are held in Tariff Escrow until delivery is confirmed.</p>
                </div>

                <div style={{ background: 'var(--primary-light)', border: '1px solid var(--border-highlight)', padding: '1rem', borderRadius: '12px', color: 'var(--primary)' }}>
                  <CheckCircle2 size={20} />
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '0.35rem' }}>Official Brand Partner</h5>
                  <p style={{ fontSize: '0.8rem', marginTop: '2px' }}>100% Genuine factory-direct stock backed by nationwide warranty.</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
