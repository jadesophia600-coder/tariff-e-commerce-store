import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Zap, Flame } from 'lucide-react';

export const FlashSales = () => {
  const { products, timeLeft } = useShop();

  const flashProducts = products.filter(p => p.isFlashSale);

  const padZero = (n) => String(n).padStart(2, '0');

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div className="container">
        
        {/* Flash Sale Header Row */}
        <div className="section-header-row" style={{ background: 'rgba(239, 68, 68, 0.06)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div className="section-title-wrap">
            <Flame size={28} color="#EF4444" className="animate-pulse-glow" />
            <div>
              <h2 className="section-title">DAILY BLITZ FLASH DROPS</h2>
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Limited quantities at 70%–90% off factory rates</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#9CA3AF', fontWeight: 600 }}>ENDS IN:</span>
            <div className="timer-box">
              <span className="timer-num">{padZero(timeLeft.hours)}</span>:
              <span className="timer-num">{padZero(timeLeft.minutes)}</span>:
              <span className="timer-num">{padZero(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        {/* Flash Products Row */}
        <div className="products-grid" style={{ marginTop: '1.5rem' }}>
          {flashProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
