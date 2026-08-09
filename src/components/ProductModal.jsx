import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ShieldCheck, Truck, ShoppingBag, Heart, CheckCircle } from 'lucide-react';

export const ProductModal = () => {
  const { 
    productModal, 
    setProductModal, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    wishlist 
  } = useShop();

  if (!productModal) return null;

  const [selectedColor, setSelectedColor] = useState(productModal.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(productModal.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.includes(productModal.id);

  return (
    <div className="modal-overlay" onClick={() => setProductModal(null)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        
        <button className="close-modal-btn" onClick={() => setProductModal(null)}>
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          {/* Product Media Column */}
          <div>
            <div style={{ width: '100%', height: '340px', background: '#060911', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img 
                src={productModal.image} 
                alt={productModal.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Delivery Guarantee Badge */}
            <div style={{ marginTop: '1.25rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Truck size={24} color="#10B981" />
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>Guaranteed {productModal.guaranteedDeliveryDays} Delivery</div>
                <div style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>Fulfilled by Tariff Global Express Logistics</div>
              </div>
            </div>
          </div>

          {/* Product Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <span style={{ color: '#7C3AED', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase' }}>
              {productModal.category}
            </span>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0.4rem 0 0.6rem 0', lineHeight: 1.25 }}>
              {productModal.title}
            </h2>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(productModal.rating) ? "#F59E0B" : "none"} color="#F59E0B" />
                ))}
              </div>
              <span style={{ fontWeight: 700, color: '#fff' }}>{productModal.rating}</span>
              <span style={{ color: '#9CA3AF' }}>({productModal.reviewsCount} verified reviews)</span>
            </div>

            {/* Price Box */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.85rem 1.25rem', borderRadius: '12px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                {formatPrice(productModal.price)}
              </span>
              <span style={{ fontSize: '1rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                {formatPrice(productModal.originalPrice)}
              </span>
              <span className="badge-flash" style={{ marginLeft: 'auto' }}>
                SAVE {productModal.discountPercent}%
              </span>
            </div>

            {/* Transparent Tariff Duty Info */}
            <div style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px dashed rgba(124, 58, 237, 0.4)', padding: '0.85rem', borderRadius: '12px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A78BFA', fontWeight: 700, marginBottom: '0.35rem' }}>
                <ShieldCheck size={18} />
                <span>Tariff Customs Clearance Guarantee</span>
              </div>
              <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                Base Price: {formatPrice(productModal.price)} | Pre-calculated Customs Fee: 
                <strong style={{ color: '#10B981', marginLeft: '4px' }}>
                  {productModal.tariffDutyAmount === 0 ? '$0.00 (Duty-Free Blitz)' : `$${productModal.tariffDutyAmount.toFixed(2)}`}
                </strong>
              </div>
            </div>

            {/* Description & Features */}
            <p style={{ color: '#D1D5DB', fontSize: '0.875rem', marginBottom: '1rem' }}>
              {productModal.description}
            </p>

            {/* Variants */}
            {productModal.colors && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: 600, marginBottom: '0.4rem' }}>SELECT COLOR:</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {productModal.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: color,
                        border: selectedColor === color ? '3px solid #7C3AED' : '1px solid #4B5563',
                        cursor: 'pointer',
                        transform: selectedColor === color ? 'scale(1.15)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.85rem', marginTop: 'auto' }}>
              <button 
                className="btn-checkout" 
                style={{ flex: 1 }}
                onClick={() => {
                  addToCart(productModal, quantity, selectedColor, selectedSize);
                  setProductModal(null);
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Tariff Cart</span>
              </button>

              <button 
                className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                style={{ width: '48px', height: '48px', position: 'static' }}
                onClick={() => toggleWishlist(productModal.id)}
              >
                <Heart size={20} fill={isWishlisted ? "#fff" : "none"} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
