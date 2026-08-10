import React from 'react';
import { useShop } from '../context/ShopContext';
import { Bell, X, Check, Truck, Tag, Zap, ShieldCheck } from 'lucide-react';

export const NotificationCenterModal = () => {
  const { 
    notifications, 
    markNotificationRead, 
    notificationCenterOpen, 
    setNotificationCenterOpen 
  } = useShop();

  if (!notificationCenterOpen) return null;

  return (
    <div className="cart-drawer-overlay active" onClick={() => setNotificationCenterOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
        
        {/* Header */}
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Bell size={22} color="var(--primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Notification Center</h3>
          </div>

          <button onClick={() => setNotificationCenterOpen(false)} style={{ color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* List */}
        <div className="cart-items-scroll">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              style={{
                background: notif.read ? 'var(--bg-section-alt)' : 'var(--primary-light)',
                border: notif.read ? '1px solid var(--border-color)' : '1px solid var(--border-highlight)',
                borderRadius: '12px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>{notif.title}</h4>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{notif.time}</span>
              </div>
              
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {notif.message}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
