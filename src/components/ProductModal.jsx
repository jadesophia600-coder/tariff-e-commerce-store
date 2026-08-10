import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { fallbackProductImage } from '../data/products';
import { 
  Star, 
  ShieldCheck, 
  ShoppingBag, 
  Truck, 
  Check, 
  X, 
  Store, 
  Heart, 
  MapPin, 
  MessageSquare, 
  HelpCircle, 
  ThumbsUp, 
  Zap, 
  ArrowRight,
  Plus
} from 'lucide-react';

export const ProductModal = () => {
  const { 
    productModal, 
    setProductModal, 
    formatPrice, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    openSellerStore,
    selectedState,
    setSelectedState,
    deliveryInfo,
    products,
    setBuyerProtectionModal
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'specs', 'reviews', 'qa'

  if (!productModal) return null;

  const isWishlisted = wishlist.includes(productModal.id);
  const gallery = productModal.galleryImages && productModal.galleryImages.length > 0
    ? productModal.galleryImages
    : [productModal.image, fallbackProductImage];

  const currentImage = gallery[activeImageIndex] || productModal.image;

  // Find Frequently Bought Together Complementary Item
  const bundleItem = products.find(p => p.id === productModal.frequentlyBoughtTogetherId) || products[0];

  return (
    <div className="modal-overlay" onClick={() => setProductModal(null)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '920px', padding: 0, overflow: 'hidden' }}>
        
        <button className="close-modal-btn" onClick={() => setProductModal(null)} style={{ top: '15px', right: '15px', zIndex: 10 }}>
          <X size={20} />
        </button>

        {/* Top Product Header Grid */}
        <div style={{ padding: '2rem 2rem 1.5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* Left Column: Image Gallery & Zoom Preview */}
            <div>
              <div 
                style={{ 
                  background: 'var(--bg-section-alt)', 
                  borderRadius: '16px', 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: '1px solid var(--border-color)',
                  height: '340px',
                  position: 'relative'
                }}
              >
                <img 
                  src={currentImage} 
                  alt={productModal.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackProductImage;
                  }}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem' }}>
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: activeImageIndex === idx ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: 'var(--bg-section-alt)'
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: PDP Details & Seller Panel */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge-flash">-{productModal.discountPercent}% OFF</span>
                
                <button 
                  onClick={() => openSellerStore(productModal.seller || 'Slot Electronics')}
                  style={{ 
                    color: 'var(--secondary)', 
                    fontSize: '0.78rem', 
                    fontWeight: 800, 
                    background: 'var(--secondary-light)', 
                    padding: '0.2rem 0.65rem', 
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Store size={13} />
                  <span>{productModal.seller || 'Slot Electronics'} ✓</span>
                </button>
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {productModal.title}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill={i < Math.floor(productModal.rating) ? "var(--accent-gold)" : "none"} color="var(--accent-gold)" />
                  ))}
                </div>
                <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{productModal.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({productModal.reviewsCount.toLocaleString()} Verified Reviews)</span>
              </div>

              {/* Price & Duty Box */}
              <div style={{ background: 'var(--bg-section-alt)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--secondary)', fontFamily: 'var(--font-heading)' }}>
                    {formatPrice(productModal.priceNGN)}
                  </span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {formatPrice(productModal.originalPriceNGN)}
                  </span>
                </div>
                
                <div 
                  onClick={() => setBuyerProtectionModal(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--secondary)', fontSize: '0.825rem', fontWeight: 700, marginTop: '0.4rem', cursor: 'pointer' }}
                >
                  <ShieldCheck size={16} />
                  <span>Tariff Escrow Protected • Zero Hidden Duty Fee ✓</span>
                </div>
              </div>

              {/* Color & Size Variant Selectors */}
              {productModal.colors && (
                <div style={{ marginBottom: '0.85rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>CHOOSE COLOR</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {productModal.colors.map((hex, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(hex)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: hex,
                          border: selectedColor === hex ? '3px solid var(--primary)' : '2px solid #CBD5E1',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Estimator Pill */}
              <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 0.85rem', marginBottom: '1.25rem', fontSize: '0.825rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Truck size={15} color="var(--primary)" /> Delivery to {selectedState}:
                  </span>
                  <select 
                    value={selectedState} 
                    onChange={(e) => setSelectedState(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 800, cursor: 'pointer' }}
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja">Abuja FCT</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                    <option value="Other States">Nationwide</option>
                  </select>
                </div>
                <div style={{ color: 'var(--secondary)', fontWeight: 800 }}>
                  ⚡ {deliveryInfo.days} ({deliveryInfo.fee === 0 ? 'FREE' : formatPrice(deliveryInfo.fee)})
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => {
                    addToCart(productModal, 1, selectedColor, selectedSize);
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
                    background: isWishlisted ? '#FEF2F2' : 'var(--bg-section-alt)',
                    border: isWishlisted ? '1px solid #FCA5A5' : '1px solid var(--border-color)',
                    color: isWishlisted ? '#DC2626' : 'var(--text-muted)',
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

            </div>

          </div>
        </div>

        {/* PDP Tabs: Specifications, Rating Breakdown, Q&A, Frequently Bought Together */}
        <div style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-section-alt)', padding: '0 2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '0.85rem 1rem',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: activeTab === 'overview' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'overview' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              Description & Specs
            </button>

            <button 
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '0.85rem 1rem',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: activeTab === 'reviews' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'reviews' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              Verified Reviews ({productModal.reviewsCount.toLocaleString()})
            </button>

            <button 
              onClick={() => setActiveTab('qa')}
              style={{
                padding: '0.85rem 1rem',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: activeTab === 'qa' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'qa' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              Q&A
            </button>
          </div>
        </div>

        {/* PDP Tab Body Content */}
        <div style={{ padding: '1.75rem 2rem', background: 'var(--bg-card)', maxHeight: '35vh', overflowY: 'auto' }}>
          
          {activeTab === 'overview' && (
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {productModal.description}
              </p>

              {/* Frequently Bought Together Bundle */}
              {bundleItem && (
                <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Plus size={16} color="var(--primary)" /> Frequently Bought Together
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={bundleItem.image} alt={bundleItem.title} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'contain', background: '#fff' }} />
                      <div>
                        <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)' }}>{bundleItem.title}</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--secondary)' }}>{formatPrice(bundleItem.priceNGN)}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(bundleItem)}
                      style={{ background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--border-highlight)', padding: '0.4rem 0.85rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}
                    >
                      + Add Bundle
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Rating Breakdown Bars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.25rem', background: 'var(--bg-section-alt)', padding: '1rem', borderRadius: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent-gold)', lineHeight: 1 }}>{productModal.rating}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Out of 5 Stars</div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = productModal.ratingBreakdown?.[star] || (star === 5 ? 82 : star === 4 ? 12 : 3);
                    return (
                      <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span style={{ width: '25px' }}>{star} ★</span>
                        <div style={{ flex: 1, height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent-gold)' }}></div>
                        </div>
                        <span style={{ width: '35px', textAlign: 'right', fontWeight: 700 }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sample Reviews */}
              {productModal.reviewsList && productModal.reviewsList.map(rev => (
                <div key={rev.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{rev.user}</strong>
                      {rev.verified && (
                        <span style={{ color: 'var(--secondary)', fontSize: '0.7rem', fontWeight: 800, background: 'var(--secondary-light)', padding: '0.1rem 0.4rem', borderRadius: '10px' }}>
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.date}</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{rev.comment}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    <ThumbsUp size={12} />
                    <span>{rev.helpful} customers found this helpful</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'qa' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {productModal.questionsList ? (
                productModal.questionsList.map((qa, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-section-alt)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.875rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <HelpCircle size={15} color="var(--primary)" /> Q: {qa.q}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.4, paddingLeft: '21px' }}>
                      A: {qa.a}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Have questions about this item? Ask our 24/7 support team or verified seller!
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
