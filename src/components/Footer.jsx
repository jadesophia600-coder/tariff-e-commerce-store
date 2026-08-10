import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headset, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        
        {/* Value Proposition Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', paddingBottom: '3rem', borderBottom: '1px solid #1E293B', marginBottom: '3rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(5, 150, 105, 0.15)', padding: '12px', borderRadius: '12px', color: '#10B981' }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800 }}>100% Tax Pre-Cleared</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Zero hidden customs duty on delivery</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(124, 58, 237, 0.15)', padding: '12px', borderRadius: '12px', color: '#C084FC' }}>
              <Truck size={26} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800 }}>Express Nationwide Logistics</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>2-4 Days delivery across Nigeria</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(217, 119, 6, 0.15)', padding: '12px', borderRadius: '12px', color: '#FBBF24' }}>
              <RotateCcw size={26} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800 }}>7 Days Easy Returns</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Full money-back buyer protection</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(2, 132, 199, 0.15)', padding: '12px', borderRadius: '12px', color: '#38BDF8' }}>
              <Headset size={26} />
            </div>
            <div>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800 }}>24/7 Dedicated Support</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Live chat & phone order tracking</p>
            </div>
          </div>

        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Zap size={20} fill="#fff" />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>TARIFF MALL</span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px' }}>
              Nigeria's premier factory-direct e-commerce marketplace with pre-cleared customs duties, transparent pricing, and guaranteed genuine brand hub items.
            </p>
          </div>

          <div className="footer-col">
            <h4>Popular Departments</h4>
            <ul className="footer-links">
              <li><a href="#products-grid">Phones & Tablets</a></li>
              <li><a href="#products-grid">Laptops & Computers</a></li>
              <li><a href="#products-grid">Fashion & Sneakers</a></li>
              <li><a href="#products-grid">Home & Kitchen Appliances</a></li>
              <li><a href="#products-grid">Audio & Electronics</a></li>
              <li><a href="#products-grid">Beauty & Skincare</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Customer Support</h4>
            <ul className="footer-links">
              <li><a href="#">Tariff Pre-Cleared Guarantee</a></li>
              <li><a href="#">Order Tracking & Logistics</a></li>
              <li><a href="#">Customs Duty Calculator</a></li>
              <li><a href="#">Return & Refund Policy</a></li>
              <li><a href="#">Verified Seller Center</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Tariff VIP Club</h4>
            <ul className="footer-links">
              <li><a href="#">Jade Sophia (VIP Gold Member)</a></li>
              <li><a href="#">14,500 Tariff Loyalty Points</a></li>
              <li><a href="#">Spin Wheel ₦15,000 Voucher</a></li>
              <li><a href="#">Saved Address Book</a></li>
              <li><a href="#">Download Tariff App</a></li>
            </ul>
          </div>

        </div>

        {/* Footer Copyright */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} TARIFF MALL (NIGERIA) LTD. All Rights Reserved. Built with Transparent Customs Integration.
          </div>

          <div style={{ display: 'flex', gap: '1rem', color: '#94A3B8', fontSize: '0.8rem' }}>
            <span>🔒 256-Bit SSL Encrypted Payment</span>
            <span>✓ Verified by Slot, Apple & Samsung Hubs</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
