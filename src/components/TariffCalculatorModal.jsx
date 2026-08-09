import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, DollarSign, AlertTriangle, CheckCircle, Globe } from 'lucide-react';

export const TariffCalculatorModal = () => {
  const { tariffCalculatorOpen, setTariffCalculatorOpen } = useShop();

  if (!tariffCalculatorOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setTariffCalculatorOpen(false)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        
        <button className="close-modal-btn" onClick={() => setTariffCalculatorOpen(false)}>
          <X size={20} />
        </button>

        <div style={{ display: 'inline-flex', padding: '0.4rem 0.8rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem', gap: '4px' }}>
          <ShieldCheck size={16} />
          <span>TRANSPARENT TARIFF GUARANTEE</span>
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', marginBottom: '0.4rem' }}>
          Why Tariff Direct is Different
        </h2>
        <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Traditional cross-border shopping sites (like Temu, AliExpress, or international Jumia sellers) often leave shoppers surprised by unexpected customs, import VAT, and brokerage fees at delivery.
        </p>

        {/* Comparison Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          
          {/* Traditional Sites */}
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ color: '#EF4444', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={18} />
              <span>Other Marketplaces</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem', color: '#D1D5DB' }}>
              <li>❌ Hidden customs tax at delivery</li>
              <li>❌ Unpredictable brokerage fees</li>
              <li>❌ Packages held at local post offices</li>
              <li>❌ Risk of surprise 30%+ tariff bills</li>
            </ul>
          </div>

          {/* Tariff Direct */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ color: '#10B981', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={18} />
              <span>Tariff Direct</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem', color: '#fff' }}>
              <li>✅ 100% Tax pre-calculated in cart</li>
              <li>✅ Pre-cleared priority customs lane</li>
              <li>✅ Direct doorstep delivery with zero fees</li>
              <li>✅ 100% Refund guarantee if charged</li>
            </ul>
          </div>

        </div>

        <button className="btn-primary-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setTariffCalculatorOpen(false)}>
          <span>Got It, Back to Shopping</span>
        </button>

      </div>
    </div>
  );
};
