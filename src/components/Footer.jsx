import React from 'react';
import { Zap, ShieldCheck, Truck, RotateCcw, Headphones, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        
        {/* Value Props Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(124, 58, 237, 0.15)', padding: '12px', borderRadius: '12px', color: '#7C3AED' }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0 }}>Express Global Shipping</h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.8rem', margin: 0 }}>Free delivery on orders over $35</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px', borderRadius: '12px', color: '#10B981' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0 }}>100% Tax Pre-Cleared</h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.8rem', margin: 0 }}>No hidden customs duty charges</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '12px', borderRadius: '12px', color: '#F59E0B' }}>
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0 }}>90-Day Free Returns</h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.8rem', margin: 0 }}>Hassle-free buyer protection</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '12px', borderRadius: '12px', color: '#06B6D4' }}>
              <Headphones size={24} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0 }}>24/7 Priority Support</h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.8rem', margin: 0 }}>Live chat & ticket support</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          
          <div>
            <div className="logo-brand" style={{ marginBottom: '1rem' }}>
              <div className="logo-icon-wrap">
                <Zap size={22} fill="#fff" />
              </div>
              <span>TARIFF</span>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Tariff Direct connects global shoppers straight to manufacturer factories. Ultra-discounted flash sales, daily price slashes, and 100% transparent customs clearance.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontSize: '0.85rem', fontWeight: 600 }}>
              <Lock size={16} />
              <span>256-Bit SSL Encrypted & Verisign Secured</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop Blitz Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Tech & Electronics</a></li>
              <li><a href="#">Smart Wearables</a></li>
              <li><a href="#">Street & Urban Fashion</a></li>
              <li><a href="#">Pro Audio & Gaming</a></li>
              <li><a href="#">Smart Home Essentials</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#">Track Order Shipment</a></li>
              <li><a href="#">Tariff Pre-Clearance Policy</a></li>
              <li><a href="#">Return & Refund Center</a></li>
              <li><a href="#">Spin Wheel Terms</a></li>
              <li><a href="#">Help & FAQs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Tariff VIP Club</h4>
            <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
              Subscribe to get secret 90% OFF flash drop alerts!
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.8rem' }}
              />
              <button style={{ background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 0.85rem', fontWeight: 700, fontSize: '0.8rem' }}>
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>© 2026 Tariff Direct Inc. All rights reserved. Jumia & Temu Inspired Global Marketplace.</div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Customs Transparency</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
