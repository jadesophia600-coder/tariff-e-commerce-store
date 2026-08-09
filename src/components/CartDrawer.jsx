import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShieldCheck, Tag, ArrowRight, Truck } from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    removeFromCart, 
    updateCartQty, 
    formatPrice, 
    rawSubtotal, 
    totalTariffDuty, 
    discountAmount, 
    shippingCost, 
    finalTotal, 
    activePromo, 
    applyPromoCode, 
    setCheckoutOpen 
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  const freeShippingThreshold = 35;
  const progressToFreeShipping = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  return (
    <div className={`cart-drawer-overlay ${cartOpen ? 'active' : ''}`} onClick={() => setCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* Cart Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>Your Tariff Cart</h3>
            <span style={{ background: '#7C3AED', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </div>
          <button className="close-modal-btn" style={{ position: 'static' }} onClick={() => setCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ background: 'rgba(124, 58, 237, 0.08)', padding: '0.85rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#D1D5DB', marginBottom: '0.35rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck size={14} color="#10B981" />
              {amountNeededForFreeShipping === 0 ? (
                <strong style={{ color: '#10B981' }}>You Unlocked FREE Express Shipping! 🎉</strong>
              ) : (
                <>Add <strong style={{ color: '#F59E0B' }}>{formatPrice(amountNeededForFreeShipping)}</strong> for FREE Shipping</>
              )}
            </span>
          </div>
          <div className="stock-bar-bg" style={{ height: '6px' }}>
            <div className="stock-bar-fill" style={{ width: `${progressToFreeShipping}%`, background: 'linear-gradient(90deg, #7C3AED 0%, #10B981 100%)' }}></div>
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-scroll">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9CA3AF' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
              <h4>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>Explore flash deals and save up to 90%!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <div>
                    <h4 className="cart-item-title">{item.product.title}</h4>
                    <div style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>
                      {item.selectedColor && <span>Color: {item.selectedColor} </span>}
                      {item.selectedSize && <span>| Size: {item.selectedSize}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <div className="cart-item-price">{formatPrice(item.product.price * item.quantity)}</div>

                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateCartQty(item.product.id, item.quantity - 1)}>-</button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateCartQty(item.product.id, item.quantity + 1)}>+</button>
                    </div>

                    <button onClick={() => removeFromCart(item.product.id)} style={{ color: '#EF4444' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            
            {/* Promo Code Input */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Tag size={14} color="#9CA3AF" style={{ position: 'absolute', left: '10px' }} />
                <input 
                  type="text" 
                  placeholder="Promo Code (e.g. TARIFF2026)" 
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.5rem 0.5rem 2rem',
                    color: '#fff',
                    fontSize: '0.8rem'
                  }}
                />
              </div>
              <button 
                onClick={() => {
                  if (applyPromoCode(promoInput)) setPromoInput('');
                }}
                style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 0.85rem', fontWeight: 700, fontSize: '0.8rem' }}
              >
                Apply
              </button>
            </div>

            {/* Transparent Tariff Duty Breakdown */}
            <div className="tariff-breakdown-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontWeight: 700, marginBottom: '0.5rem' }}>
                <ShieldCheck size={16} />
                <span>100% Pre-Calculated Duty Guarantee</span>
              </div>
              <div className="tariff-breakdown-row">
                <span>Items Subtotal</span>
                <span>{formatPrice(rawSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="tariff-breakdown-row" style={{ color: '#F59E0B' }}>
                  <span>Promo Discount ({activePromo?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="tariff-breakdown-row">
                <span>Customs Tariff Duty (Pre-paid)</span>
                <span>{totalTariffDuty === 0 ? 'FREE / INCLUDED' : formatPrice(totalTariffDuty)}</span>
              </div>
              <div className="tariff-breakdown-row">
                <span>Express Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>
              <div className="tariff-breakdown-row total">
                <span>Guaranteed Doorstep Total</span>
                <span style={{ color: '#10B981', fontSize: '1.15rem' }}>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button 
              className="btn-checkout"
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
            >
              <span>Proceed to Tariff Checkout</span>
              <ArrowRight size={18} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
