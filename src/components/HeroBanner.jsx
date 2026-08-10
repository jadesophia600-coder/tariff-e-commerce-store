import React from 'react';
import { useShop } from '../context/ShopContext';
import { Zap, ShieldCheck, Sparkles, Truck, Gift } from 'lucide-react';

export const HeroBanner = () => {
  const { setSpinWheelOpen, setTariffCalculatorOpen } = useShop();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          
          {/* Main Hero Banner */}
          <div className="hero-banner-main">
            <div className="hero-content">
              
              <div className="hero-tag">
                <Zap size={16} />
                <span>100% TRANSPARENT MARKETPLACE DEALS</span>
              </div>

              <h1 className="hero-title">
                Shop Global Brands. <span>Zero Hidden Tax.</span>
              </h1>

              <p className="hero-desc">
                Verified factory direct smartphones, laptops, fashion & appliances delivered to your doorstep across Nigeria with pre-cleared customs duties.
              </p>

              <div className="hero-cta-group">
                <a href="#flash-deals" className="btn-primary-lg">
                  <span>Explore Flash Deals</span>
                  <Zap size={18} fill="#fff" />
                </a>

                <button onClick={() => setSpinWheelOpen(true)} className="btn-spin-wheel">
                  <Gift size={18} />
                  <span>Spin for ₦15,000 Voucher</span>
                </button>
              </div>

            </div>
          </div>

          {/* Side Stack Promo Cards */}
          <div className="hero-side-stack">
            
            <div className="side-promo-card" onClick={() => setTariffCalculatorOpen(true)} style={{ cursor: 'pointer' }}>
              <div className="side-promo-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                  <ShieldCheck size={16} />
                  <span>TARIFF GUARANTEE</span>
                </div>
                <h4>No Surprise Duties</h4>
                <p>Customs tax & clearance included upfront in ₦ Naira</p>
              </div>
            </div>

            <div className="side-promo-card">
              <div className="side-promo-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7C3AED', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                  <Truck size={16} />
                  <span>EXPRESS NIGERIA LOGISTICS</span>
                </div>
                <h4>2-4 Days Nationwide</h4>
                <p>Doorstep delivery to Lagos, Abuja, Port Harcourt & more</p>
              </div>
            </div>

            <div className="side-promo-card" onClick={() => setSpinWheelOpen(true)} style={{ cursor: 'pointer' }}>
              <div className="side-promo-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#D97706', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.2rem' }}>
                  <Sparkles size={16} />
                  <span>VIP MEMBER CLUB</span>
                </div>
                <h4>Earn 10x Tariff Points</h4>
                <p>Redeem points for instant cash discounts on checkout</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
