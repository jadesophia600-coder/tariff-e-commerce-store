import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Percent } from 'lucide-react';

export const HeroBanner = () => {
  const { setSpinWheelOpen, setTariffCalculatorOpen } = useShop();

  return (
    <section className="hero-section">
      <div className="container hero-grid">
        
        {/* Main Banner */}
        <div className="hero-banner-main shine-effect">
          <div className="hero-content">
            <div className="hero-tag">
              <Sparkles size={16} />
              <span>TEMU & JUMIA PRICE SLASH BLITZ</span>
            </div>

            <h1 className="hero-title">
              Shop Global Direct. <br />
              <span>Zero Hidden Tariff Fees.</span>
            </h1>

            <p className="hero-desc">
              Over 1,000,000+ factory-direct products up to 90% OFF. 
              Clear, transparent customs duty pre-calculated at checkout with 100% Doorstep Guarantee.
            </p>

            <div className="hero-cta-group">
              <a href="#products-grid" className="btn-primary-lg">
                <span>Explore Blitz Deals</span>
                <ArrowRight size={18} />
              </a>

              <button className="btn-spin-wheel" onClick={() => setSpinWheelOpen(true)}>
                <Sparkles size={18} />
                <span>Spin & Win 30% OFF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Side Stack Promos */}
        <div className="hero-side-stack">
          
          <div className="side-promo-card" onClick={() => setTariffCalculatorOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="side-promo-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10B981', fontWeight: 700, fontSize: '0.8rem', marginBottom: '4px' }}>
                <ShieldCheck size={16} />
                <span>TARIFF TRANSPARENCY</span>
              </div>
              <h4>100% Tax Pre-Cleared</h4>
              <p>No unexpected customs bills at your doorstep.</p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px', borderRadius: '50%', color: '#10B981' }}>
              <Percent size={24} />
            </div>
          </div>

          <div className="side-promo-card">
            <div className="side-promo-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F59E0B', fontWeight: 700, fontSize: '0.8rem', marginBottom: '4px' }}>
                <Truck size={16} />
                <span>EXPRESS GLOBAL LOGISTICS</span>
              </div>
              <h4>Free Express Shipping</h4>
              <p>On all qualifying orders over $35.00</p>
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '12px', borderRadius: '50%', color: '#F59E0B' }}>
              <Truck size={24} />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
