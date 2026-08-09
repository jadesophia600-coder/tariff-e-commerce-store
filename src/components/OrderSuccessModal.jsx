import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, Package, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export const OrderSuccessModal = () => {
  const { orderSuccess, setOrderSuccess, formatPrice } = useShop();

  if (!orderSuccess) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop-in" style={{ maxWidth: '580px', textAlign: 'center' }}>
        
        <div style={{ width: '70px', height: '70px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <CheckCircle size={42} />
        </div>

        <span className="badge-tariff-free" style={{ marginBottom: '0.5rem' }}>
          100% PRE-CLEARED CUSTOMS CONFIRMED
        </span>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginBottom: '0.25rem' }}>
          Order Confirmed! 🎉
        </h2>

        <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Thank you for shopping on Tariff. Your order ID is <strong style={{ color: '#F59E0B' }}>{orderSuccess.orderId}</strong>.
        </p>

        {/* Order Details Grid */}
        <div style={{ background: '#0B0F19', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
            <span style={{ color: '#9CA3AF' }}>Date Placed:</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{orderSuccess.date}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
            <span style={{ color: '#9CA3AF' }}>Shipping Address:</span>
            <span style={{ color: '#fff', fontWeight: 600 }}>{orderSuccess.shippingInfo.address}, {orderSuccess.shippingInfo.city}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 800, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem' }}>
            <span style={{ color: '#fff' }}>Total Paid:</span>
            <span style={{ color: '#10B981' }}>{formatPrice(orderSuccess.total)}</span>
          </div>
        </div>

        {/* Shipment Tracker Visualization */}
        <div style={{ background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A78BFA', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            <Truck size={18} />
            <span>Tariff Express Tracking Timeline</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', margin: '0 auto 4px' }}></div>
              <div style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 700 }}>Order Placed</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B', margin: '0 auto 4px' }}></div>
              <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Customs Clearance</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#374151', margin: '0 auto 4px' }}></div>
              <div style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>Doorstep Delivery</div>
            </div>
          </div>
        </div>

        <button className="btn-primary-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setOrderSuccess(null)}>
          <span>Continue Shopping Deals</span>
          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
};
