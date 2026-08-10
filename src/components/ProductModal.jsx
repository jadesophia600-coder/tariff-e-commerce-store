import React from 'react';
import { useShop } from '../context/ShopContext';
import { fallbackProductImage } from '../data/products';
import { Star, ShieldCheck, ShoppingBag, Truck, Check, X, Store, Heart } from 'lucide-react';

export const ProductModal = () => {
  const { 
    productModal, 
    setProductModal, 
    formatPrice, 
    addToCart, 
    wishlist, 
    toggleWishlist 
  } = useShop();

  if (!productModal) return null;

  const isWishlisted = wishlist.includes(productModal.id);

  return (
    <div className="modal-overlay" onClick={() => setProductModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        
        <button className="close-modal-btn" onClick={() => setProductModal(null)}>
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* Left Column: Product Image */}
          <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E2E8F0' }}>
            <img 
              src={productModal.image} 
              alt={productModal.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackProductImage;
              }}
              style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }}
            />
          </div>

          {/* Right Column: Details & Order CTA */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge-flash">-{productModal.discountPercent}% OFF</span>
              <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, background: '#ECFDF5', padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                <Store size={12} style={{ display: 'inline', marginRight: '3px' }} />
                {productModal.seller || 'Tariff Verified Merchant'}
              </span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {productModal.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', color: '#D97706' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(productModal.rating) ? "#D97706" : "none"} />
                ))}
              </div>
              <span style={{ fontWeight: 800, color: '#0F172A' }}>{productModal.rating}</span>
              <span style={{ color: '#64748B', fontSize: '0.85rem' }}>({productModal.reviewsCount.toLocaleString()} Customer Reviews)</span>
            </div>

            {/* Price Box */}
            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', fontFamily: 'var(--font-heading)' }}>
                  {formatPrice(productModal.priceNGN)}
                </span>
                <span style={{ fontSize: '1rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  {formatPrice(productModal.originalPriceNGN)}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.825rem', fontWeight: 700, marginTop: '0.4rem' }}>
                <ShieldCheck size={16} />
                <span>Customs duty & VAT pre-cleared for Nigeria delivery</span>
              </div>
            </div>

            <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              {productModal.description}
            </p>

            {/* Key Feature Bullets */}
            {productModal.features && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.5rem' }}>Key Highlights</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {productModal.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: '#0F172A', fontWeight: 600 }}>
                      <Check size={14} color="#059669" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => {
                  addToCart(productModal);
                  setProductModal(null);
                }}
                className="btn-checkout"
                style={{ flex: 1 }}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart — {formatPrice(productModal.priceNGN)}</span>
              </button>

              <button 
                onClick={() => toggleWishlist(productModal.id)}
                style={{
                  background: isWishlisted ? '#FEF2F2' : '#F1F5F9',
                  border: isWishlisted ? '1px solid #FCA5A5' : '1px solid #CBD5E1',
                  color: isWishlisted ? '#DC2626' : '#475569',
                  width: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Heart size={20} fill={isWishlisted ? "#DC2626" : "none"} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.8rem', marginTop: '1rem' }}>
              <Truck size={15} color="#7C3AED" />
              <span>Guaranteed Delivery: {productModal.guaranteedDeliveryDays || '2-4 Days Nationwide'}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
