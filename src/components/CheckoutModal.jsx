import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, Truck, ArrowRight, Smartphone } from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    checkoutOpen, 
    setCheckoutOpen, 
    cart, 
    formatPrice, 
    rawSubtotal, 
    totalTariffDuty, 
    discountAmount, 
    shippingCost, 
    finalTotal,
    completeOrder 
  } = useShop();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    country: 'United States',
    customsTaxId: 'TX-9874-TRF',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242'
  });

  if (!checkoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOrder(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setCheckoutOpen(false)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px' }}>
        
        <button className="close-modal-btn" onClick={() => setCheckoutOpen(false)}>
          <X size={20} />
        </button>

        {/* Step Indicator Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>Tariff Doorstep Clearance Checkout</h2>
            <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>100% Tax Pre-Paid • Guaranteed Zero Surprise Delivery Fees</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: step >= 1 ? '#7C3AED' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>
              1. Address
            </span>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: step >= 2 ? '#7C3AED' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>
              2. Duty Review
            </span>
            <span style={{ padding: '0.3rem 0.75rem', borderRadius: '20px', background: step >= 3 ? '#7C3AED' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>
              3. Payment
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>FULL NAME</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.fullName} 
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>STREET ADDRESS</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>CITY</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.city} 
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} 
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>CUSTOMS / TAX IDENTIFIER (OPTIONAL FOR FAST-TRACK CLEARANCE)</label>
                <input 
                  type="text" 
                  value={formData.customsTaxId} 
                  onChange={e => setFormData({...formData, customsTaxId: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} 
                />
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.85rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10B981', fontSize: '0.85rem' }}>
                <ShieldCheck size={20} />
                <span>Your address is verified for Tariff Priority Clearance Express Shipping.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Duty Breakdown Review */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ background: '#0B0F19', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="#10B981" />
                  Itemized Tariff & Duty Breakdown
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                    <span>Factory Direct Merchandise Subtotal</span>
                    <span style={{ color: '#fff' }}>{formatPrice(rawSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F59E0B' }}>
                      <span>Discount Coupon Applied</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                    <span>Pre-Cleared Customs Import Duty</span>
                    <span style={{ color: '#10B981' }}>{totalTariffDuty === 0 ? 'DUTY FREE' : formatPrice(totalTariffDuty)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9CA3AF' }}>
                    <span>Express International Logistics</span>
                    <span style={{ color: '#10B981' }}>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                  </div>

                  <div style={{ borderTop: '1px dashed rgba(255,255,255,0.15)', paddingTop: '0.75rem', marginTop: '0.35rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                    <span>Total Guaranteed Payment</span>
                    <span style={{ color: '#10B981' }}>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div style={{ color: '#9CA3AF', fontSize: '0.8rem', background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '8px' }}>
                🔒 <strong>Tariff Protection Promise:</strong> If your local courier requests any additional duties or customs handling fees at your door, Tariff will automatically refund 100% of the charge within 24 hours.
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                <div 
                  onClick={() => setFormData({...formData, paymentMethod: 'card'})}
                  style={{
                    background: formData.paymentMethod === 'card' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: formData.paymentMethod === 'card' ? '2px solid #7C3AED' : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <CreditCard size={24} color="#7C3AED" style={{ margin: '0 auto 0.4rem' }} />
                  <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>Credit Card</div>
                </div>

                <div 
                  onClick={() => setFormData({...formData, paymentMethod: 'paylater'})}
                  style={{
                    background: formData.paymentMethod === 'paylater' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: formData.paymentMethod === 'paylater' ? '2px solid #7C3AED' : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Smartphone size={24} color="#F59E0B" style={{ margin: '0 auto 0.4rem' }} />
                  <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>Tariff Pay Later</div>
                </div>

                <div 
                  onClick={() => setFormData({...formData, paymentMethod: 'crypto'})}
                  style={{
                    background: formData.paymentMethod === 'crypto' ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: formData.paymentMethod === 'crypto' ? '2px solid #7C3AED' : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '1rem',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Lock size={24} color="#10B981" style={{ margin: '0 auto 0.4rem' }} />
                  <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>Mobile / Crypto</div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>CARD NUMBER</label>
                <input 
                  type="text" 
                  value={formData.cardNumber} 
                  onChange={e => setFormData({...formData, cardNumber: e.target.value})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>EXPIRY</label>
                  <input type="text" defaultValue="08 / 28" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.8rem', marginBottom: '0.35rem' }}>CVC</label>
                  <input type="text" defaultValue="888" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#fff' }} />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} style={{ color: '#9CA3AF', fontWeight: 600 }}>
                ← Back
              </button>
            ) : <div />}

            <button type="submit" className="btn-primary-lg">
              <span>{step === 3 ? `Pay ${formatPrice(finalTotal)} & Complete Order` : 'Continue to Next Step'}</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
