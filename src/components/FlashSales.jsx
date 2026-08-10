import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Zap, Clock } from 'lucide-react';

export const FlashSales = ({ flashProducts = [] }) => {
  const { timeLeft } = useShop();

  if (!flashProducts || flashProducts.length === 0) return null;

  return (
    <section id="flash-deals" style={{ marginBottom: '2.5rem' }}>
      <div className="container">
        
        {/* Flash Section Header with Live Countdown */}
        <div className="section-header-row" style={{ background: '#FEF2F2', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid #FCA5A5' }}>
          
          <div className="section-title-wrap">
            <div style={{ background: '#DC2626', color: '#fff', padding: '10px', borderRadius: '12px' }}>
              <Zap size={24} fill="#fff" />
            </div>
            <div>
              <h2 className="section-title" style={{ color: '#991B1B' }}>FLASH DEALS</h2>
              <p style={{ color: '#B91C1C', fontSize: '0.85rem', fontWeight: 600 }}>Limited time factory drop — grab before stock runs out!</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#991B1B', fontWeight: 700, fontSize: '0.85rem' }}>
              <Clock size={16} />
              <span>Ends In:</span>
            </div>

            <div className="timer-box">
              <span className="timer-num">{String(timeLeft.hours).padStart(2, '0')}</span> : 
              <span className="timer-num">{String(timeLeft.minutes).padStart(2, '0')}</span> : 
              <span className="timer-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="products-grid" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
          {flashProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
