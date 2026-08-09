import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Trophy, Gift } from 'lucide-react';

export const SpinWheelModal = () => {
  const { spinWheelOpen, setSpinWheelOpen, triggerWheelReward, spinWheelUsed } = useShop();
  const [spinning, setSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  if (!spinWheelOpen) return null;

  const handleSpin = () => {
    if (spinning || spinWheelUsed) return;
    setSpinning(true);
    
    // Calculate degree to land on 30% OFF segment
    const randomExtraSpins = 5 * 360;
    const targetAngle = randomExtraSpins + 240; // Lands on high discount
    setRotationDegree(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setHasWon(true);
      triggerWheelReward();
    }, 4000);
  };

  return (
    <div className="modal-overlay" onClick={() => setSpinWheelOpen(null)}>
      <div className="modal-content animate-pop-in spin-wheel-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        
        <button className="close-modal-btn" onClick={() => setSpinWheelOpen(false)}>
          <X size={20} />
        </button>

        <div style={{ display: 'inline-flex', padding: '0.4rem 0.8rem', background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.5rem', gap: '4px' }}>
          <Sparkles size={16} />
          <span>DAILY TEMU-STYLE MYSTERY WHEEL</span>
        </div>

        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', marginBottom: '0.3rem' }}>
          Spin & Win Big Savings!
        </h2>
        <p style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>
          Spin the wheel for an instant extra coupon applied directly to your Tariff Cart.
        </p>

        {/* Wheel Graphic Container */}
        <div className="wheel-graphic-wrap">
          <div className="wheel-pointer" />
          <svg 
            className="wheel-canvas" 
            viewBox="0 0 100 100"
            style={{ transform: `rotate(${rotationDegree}deg)` }}
          >
            <path d="M 50 50 L 50 0 A 50 50 0 0 1 93.3 25 Z" fill="#7C3AED" />
            <text x="65" y="24" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(30 50 50)">15% OFF</text>

            <path d="M 50 50 L 93.3 25 A 50 50 0 0 1 93.3 75 Z" fill="#F59E0B" />
            <text x="72" y="52" fill="#000" fontSize="5" fontWeight="bold" transform="rotate(90 50 50)">$50 GIFT</text>

            <path d="M 50 50 L 93.3 75 A 50 50 0 0 1 50 100 Z" fill="#10B981" />
            <text x="62" y="78" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(150 50 50)">FREE SHIP</text>

            <path d="M 50 50 L 50 100 A 50 50 0 0 1 6.7 75 Z" fill="#EF4444" />
            <text x="32" y="78" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(210 50 50)">30% OFF</text>

            <path d="M 50 50 L 6.7 75 A 50 50 0 0 1 6.7 25 Z" fill="#06B6D4" />
            <text x="20" y="52" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(270 50 50)">20% OFF</text>

            <path d="M 50 50 L 6.7 25 A 50 50 0 0 1 50 0 Z" fill="#8B5CF6" />
            <text x="32" y="24" fill="#fff" fontSize="5" fontWeight="bold" transform="rotate(330 50 50)">MYSTERY</text>

            <circle cx="50" cy="50" r="12" fill="#0B0F19" stroke="#F59E0B" strokeWidth="2" />
            <text x="50" y="52" fill="#F59E0B" fontSize="6" fontWeight="bold" textAnchor="middle">TARIFF</text>
          </svg>
        </div>

        {/* Action Controls */}
        {hasWon ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 800, fontSize: '1.1rem' }}>
              <Trophy size={20} />
              <span>CONGRATULATIONS! YOU WON 30% OFF!</span>
            </div>
            <p style={{ color: '#D1D5DB', fontSize: '0.85rem', marginTop: '0.35rem' }}>
              Code <strong style={{ color: '#F59E0B' }}>FLASH80</strong> has been applied to your checkout.
            </p>
            <button className="btn-primary-lg" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }} onClick={() => setSpinWheelOpen(false)}>
              <span>Shop With 30% Savings Now</span>
            </button>
          </div>
        ) : (
          <button 
            className="btn-spin-wheel" 
            style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }}
            onClick={handleSpin}
            disabled={spinning || spinWheelUsed}
          >
            <Gift size={20} />
            <span>{spinning ? "SPINNING WHEEL..." : spinWheelUsed ? "WHEEL USED TODAY" : "SPIN THE WHEEL NOW!"}</span>
          </button>
        )}

      </div>
    </div>
  );
};
