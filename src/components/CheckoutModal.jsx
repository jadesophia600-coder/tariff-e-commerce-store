import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Lock, CreditCard, Building, Smartphone, Truck, ArrowRight, X, CheckCircle2 } from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    checkoutOpen, 
    setCheckoutOpen, 
    cart, 
    rawSubtotal, 
    totalTariffDuty, 
    discountAmount, 
    shippingCost, 
    finalTotal, 
    formatPrice, 
    completeOrder,
    userProfile,
    selectedState,
    setSelectedState,
    deliveryInfo
  } = useShop();

  const [step, setStep] = useState(1); // 1: Delivery Address, 2: Payment Method, 3: Order Review
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'transfer', 'ussd', 'paystack', 'pod'
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.addresses[0]?.street || '14 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    state: selectedState
  });

  if (!checkoutOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOrder({ ...shippingInfo, paymentMethod });
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setCheckoutOpen(false)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', padding: '2rem' }}>
        
        <button className="close-modal-btn" onClick={() => setCheckoutOpen(false)}>
          <X size={20} />
        </button>

        {/* Checkout Header */}
        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 800 }}>
            <ShieldCheck size={16} /> TARIFF ESCROW PROTECTED CHECKOUT
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '2px' }}>
            Complete Your Factory Direct Purchase
          </h2>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', background: 'var(--bg-section-alt)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontWeight: 800, color: step >= 1 ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
            1. Delivery Address
          </div>
          <div style={{ fontWeight: 800, color: step >= 2 ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
            2. Payment Method
          </div>
          <div style={{ fontWeight: 800, color: step >= 3 ? 'var(--primary)' : 'var(--text-muted)', fontSize: '0.85rem' }}>
            3. Final Order Confirmation
          </div>
        </div>

        <form onSubmit={handleNextStep}>
          
          {/* STEP 1: Delivery Info */}
          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>FULL NAME</label>
                <input
                  type="text"
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>PHONE NUMBER</label>
                <input
                  type="text"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>STREET ADDRESS</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>DELIVERY STATE (NIGERIA)</label>
                <select
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setShippingInfo({...shippingInfo, state: e.target.value});
                  }}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 700 }}
                >
                  <option value="Lagos">Lagos State (1-2 Days • ₦1,500)</option>
                  <option value="Abuja">Abuja FCT (2-4 Days • ₦2,500)</option>
                  <option value="Ibadan">Ibadan (1-3 Days • ₦2,000)</option>
                  <option value="Port Harcourt">Port Harcourt (2-4 Days • ₦3,000)</option>
                  <option value="Kano">Kano (3-5 Days • ₦3,500)</option>
                  <option value="Enugu">Enugu (2-4 Days • ₦2,800)</option>
                  <option value="Other States">Nationwide (3-5 Days • ₦3,500)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>CITY / TOWN</label>
                <input
                  type="text"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                />
              </div>
            </div>
          )}

          {/* STEP 2: Nigerian Payment Methods */}
          {step === 2 && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1rem' }}>SELECT NIGERIAN PAYMENT METHOD</label>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div 
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    border: paymentMethod === 'card' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: paymentMethod === 'card' ? 'var(--primary-light)' : 'var(--bg-section-alt)',
                    padding: '1rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CreditCard size={22} color="var(--primary)" />
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Debit / Credit Card (Visa, Mastercard, Verve)</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Secured 256-Bit SSL checkout via Paystack / Flutterwave</p>
                    </div>
                  </div>
                  <CheckCircle2 size={18} color={paymentMethod === 'card' ? "var(--primary)" : "#CBD5E1"} />
                </div>

                <div 
                  onClick={() => setPaymentMethod('transfer')}
                  style={{
                    border: paymentMethod === 'transfer' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: paymentMethod === 'transfer' ? 'var(--primary-light)' : 'var(--bg-section-alt)',
                    padding: '1rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Building size={22} color="var(--secondary)" />
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Instant Bank Transfer</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Transfer to temporary GTBank / Zenith / Kuda Escrow Account</p>
                    </div>
                  </div>
                  <CheckCircle2 size={18} color={paymentMethod === 'transfer' ? "var(--primary)" : "#CBD5E1"} />
                </div>

                <div 
                  onClick={() => setPaymentMethod('ussd')}
                  style={{
                    border: paymentMethod === 'ussd' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: paymentMethod === 'ussd' ? 'var(--primary-light)' : 'var(--bg-section-alt)',
                    padding: '1rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Smartphone size={22} color="var(--accent-gold)" />
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>USSD Banking (*737#, *919#, *901#)</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quick 1-tap dial code from your Nigerian bank line</p>
                    </div>
                  </div>
                  <CheckCircle2 size={18} color={paymentMethod === 'ussd' ? "var(--primary)" : "#CBD5E1"} />
                </div>

                <div 
                  onClick={() => setPaymentMethod('pod')}
                  style={{
                    border: paymentMethod === 'pod' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: paymentMethod === 'pod' ? 'var(--primary-light)' : 'var(--bg-section-alt)',
                    padding: '1rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Truck size={22} color="var(--accent-cyan)" />
                    <div>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>Pay on Delivery (Lagos, Abuja & Ibadan Only)</strong>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Pay cash or POS upon inspecting your package</p>
                    </div>
                  </div>
                  <CheckCircle2 size={18} color={paymentMethod === 'pod' ? "var(--primary)" : "#CBD5E1"} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Summary & Order Submit */}
          {step === 3 && (
            <div>
              <div style={{ background: 'var(--bg-section-alt)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Order Summary ({cart.length} Items)</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Items Total</span>
                    <span>{formatPrice(rawSubtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Customs Pre-Cleared Duty</span>
                    <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>FREE (Pre-Paid)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping to {selectedState}</span>
                    <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 900, color: 'var(--text-main)', fontSize: '1.15rem' }}>
                    <span>Total Amount Payable</span>
                    <span style={{ color: 'var(--secondary)' }}>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--secondary-light)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '0.85rem', borderRadius: '10px', color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={16} />
                <span>Protected by Tariff Escrow Guarantee. Payment released to seller only after delivery.</span>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                style={{ padding: '0.75rem 1.5rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '30px', fontWeight: 700 }}
              >
                Back
              </button>
            ) : <div />}

            <button type="submit" className="btn-checkout">
              <span>{step === 3 ? `Pay & Confirm Order (${formatPrice(finalTotal)})` : 'Continue to Payment'}</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
