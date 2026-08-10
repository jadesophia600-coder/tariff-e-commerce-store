import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { fallbackProductImage } from '../data/products';
import { ShoppingBag, X, Plus, Minus, Trash2, ShieldCheck, Tag, ArrowRight, Truck } from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    formatPrice, 
    updateCartQty, 
    removeFromCart,
    rawSubtotal,
    totalTariffDuty,
    discountAmount,
    shippingCost,
    finalTotal,
    applyPromoCode,
    activePromo,
    setCheckoutOpen
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div className={`cart-drawer-overlay ${cartOpen ? 'active' : ''}`} onClick={() => setCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Cart Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>My Tariff Shopping Cart</h3>
            <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: '20px' }}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
            </span>
          </div>

          <button onClick={() => setCartOpen(false)} style={{ color: '#64748B' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ background: '#ECFDF5', borderBottom: '1px solid #A7F3D0', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#047857', fontSize: '0.825rem', fontWeight: 700 }}>
          <Truck size={16} />
          <span>
            {rawSubtotal >= 50000 
              ? "🎉 You unlocked FREE Nationwide Delivery across Nigeria!" 
              : `Add ${formatPrice(50000 - rawSubtotal)} more for FREE Nationwide Shipping`}
          </span>
        </div>

        {/* Scrollable Cart Items */}
        <div className="cart-items-scroll">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <ShoppingBag size={48} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ color: '#0F172A', fontSize: '1.1rem' }}>Your Cart is Empty</h4>
              <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.35rem' }}>
                Explore flash deals & popular departments to add factory direct items.
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="cart-item">
                <img 
                  src={item.product.image} 
                  alt={item.product.title} 
                  className="cart-item-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackProductImage;
                  }}
                />

                <div className="cart-item-details">
                  <div>
                    <h4 className="cart-item-title">{item.product.title}</h4>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Category: {item.product.category}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <span className="cart-item-price">{formatPrice(item.product.priceNGN)}</span>

                    <div className="qty-controls">
                      <button onClick={() => updateCartQty(item.product.id, item.quantity - 1)} className="qty-btn">
                        <Minus size={14} />
                      </button>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', padding: '0 0.3rem' }}>{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.product.id, item.quantity + 1)} className="qty-btn">
                        <Plus size={14} />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.product.id)} style={{ color: '#DC2626' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo Code Input & Summary Footer */}
        {cart.length > 0 && (
          <div className="cart-footer">
            
            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Tag size={16} color="#64748B" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Promo Code (TARIFF2026)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.5rem 0.5rem 2.2rem',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: '#0F172A',
                    outline: 'none'
                  }}
                />
              </div>
              <button 
                type="submit" 
                style={{ background: 'var(--primary)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem' }}
              >
                Apply
              </button>
            </form>

            {activePromo && (
              <div style={{ background: '#F3E8FF', border: '1px solid #C084FC', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, padding: '0.4rem 0.75rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                ✓ Code {activePromo.code} active ({activePromo.desc})
              </div>
            )}

            {/* Tariff Breakdown Box */}
            <div className="tariff-breakdown-box">
              <div className="tariff-breakdown-row">
                <span>Items Subtotal</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              
              <div className="tariff-breakdown-row">
                <span>Customs Duty & Clearance</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>
                  {totalTariffDuty === 0 ? "Pre-Cleared (FREE)" : formatPrice(totalTariffDuty)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="tariff-breakdown-row" style={{ color: '#DC2626' }}>
                  <span>Promo Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="tariff-breakdown-row">
                <span>Nationwide Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
              </div>

              <div className="tariff-breakdown-row total">
                <span>Total Payable</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              className="btn-checkout" 
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
