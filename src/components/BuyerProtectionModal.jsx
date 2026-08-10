import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Lock, RotateCcw, AlertTriangle, CheckCircle2, X, FileText, ArrowRight } from 'lucide-react';

export const BuyerProtectionModal = () => {
  const { 
    buyerProtectionModal, 
    setBuyerProtectionModal, 
    addToast 
  } = useShop();

  const [activeTab, setActiveTab] = useState('policy'); // 'policy', 'dispute'
  const [disputeType, setDisputeType] = useState('not-received');
  const [orderNumber, setOrderNumber] = useState('TRF-984210');
  const [disputeReason, setDisputeReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!buyerProtectionModal) return null;

  const handleSubmitDispute = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Dispute Ticket Submitted! Tariff Escrow Team is reviewing.', 'success');
  };

  return (
    <div className="modal-overlay" onClick={() => setBuyerProtectionModal(false)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', padding: 0, overflow: 'hidden' }}>
        
        {/* Banner Top */}
        <div style={{ background: 'linear-gradient(135deg, #047857 0%, #059669 50%, #065F46 100%)', padding: '2rem', color: '#fff', position: 'relative' }}>
          <button className="close-modal-btn" onClick={() => setBuyerProtectionModal(false)} style={{ top: '15px', right: '15px', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '14px', borderRadius: '16px' }}>
              <ShieldCheck size={36} color="#fff" />
            </div>

            <div>
              <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '0.725rem', fontWeight: 800, padding: '0.15rem 0.6rem', borderRadius: '20px', textTransform: 'uppercase' }}>
                100% ESCROW SAFEGUARD
              </span>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#fff', margin: '4px 0 0 0' }}>
                TARIFF BUYER PROTECTION GUARANTEE
              </h2>
              <p style={{ color: '#D1FAE5', fontSize: '0.85rem', marginTop: '2px' }}>
                Your payment is held safe in Tariff Escrow until your order is delivered & verified.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-section-alt)', padding: '0 1.5rem' }}>
          <button 
            onClick={() => setActiveTab('policy')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'policy' ? 'var(--secondary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'policy' ? '3px solid var(--secondary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShieldCheck size={16} /> Protection Policy
          </button>

          <button 
            onClick={() => setActiveTab('dispute')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'dispute' ? 'var(--secondary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'dispute' ? '3px solid var(--secondary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <AlertTriangle size={16} /> Open Dispute / Refund Ticket
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', background: 'var(--bg-card)', maxHeight: '60vh', overflowY: 'auto' }}>
          
          {activeTab === 'policy' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                
                <div style={{ background: 'var(--secondary-light)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '1.15rem', borderRadius: '12px' }}>
                  <Lock size={24} color="var(--secondary)" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>1. Tariff Escrow Protection</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Sellers do not receive your money until you inspect and confirm your package is in perfect condition.
                  </p>
                </div>

                <div style={{ background: 'var(--primary-light)', border: '1px solid var(--border-highlight)', padding: '1.15rem', borderRadius: '12px' }}>
                  <RotateCcw size={24} color="var(--primary)" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>2. 7 Days Free Returns</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Wrong size or damaged item? Request a free doorstep pickup and 100% full refund within 7 days.
                  </p>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.15rem', borderRadius: '12px' }}>
                  <CheckCircle2 size={24} color="var(--accent-gold)" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>3. Zero Customs Duty Tax</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    If a courier asks for additional tax money, Tariff refunds 100% of the difference immediately.
                  </p>
                </div>

                <div style={{ background: 'rgba(2, 132, 199, 0.15)', border: '1px solid rgba(2, 132, 199, 0.3)', padding: '1.15rem', borderRadius: '12px' }}>
                  <FileText size={24} color="var(--accent-cyan)" />
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.5rem' }}>4. Instant Dispute Resolution</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Our dedicated Nigerian resolution team resolves claims within 24–48 hours guaranteed.
                  </p>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'dispute' && (
            <div>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={54} color="var(--secondary)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>Dispute Ticket #DSP-8841 Received</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem', maxWidth: '480px', margin: '0.35rem auto 1.5rem' }}>
                    Your payment for Order <strong>{orderNumber}</strong> remains locked in Tariff Escrow. A resolution agent will contact you within 2 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setBuyerProtectionModal(false);
                    }}
                    className="btn-checkout"
                    style={{ display: 'inline-flex', width: 'auto', padding: '0.75rem 1.75rem' }}
                  >
                    Return to Store
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitDispute} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>SELECT ORDER NUMBER</label>
                    <select
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 700 }}
                    >
                      <option value="TRF-984210">TRF-984210 — iPhone 15 Pro Max (In Transit)</option>
                      <option value="TRF-774102">TRF-774102 — Nike Air Max 270 (Delivered)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>DISPUTE CATEGORY</label>
                    <select
                      value={disputeType}
                      onChange={(e) => setDisputeType(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 700 }}
                    >
                      <option value="not-received">Item Not Received / Delivery Delayed</option>
                      <option value="wrong-item">Received Wrong Item or Color</option>
                      <option value="damaged">Item Arrived Damaged or Defective</option>
                      <option value="refund-request">7-Day Money Back Refund Request</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>EXPLAIN WHAT HAPPENED</label>
                    <textarea
                      rows={4}
                      placeholder="Describe the issue with your order..."
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', outline: 'none' }}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-checkout" style={{ width: '100%' }}>
                    <span>Submit Dispute & Hold Payment in Escrow</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
