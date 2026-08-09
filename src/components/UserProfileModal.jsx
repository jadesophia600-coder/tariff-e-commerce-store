import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, ShoppingBag, MapPin, Award, ShieldCheck, Truck, Sparkles, CheckCircle2, Edit3, Gift, Star } from 'lucide-react';

export const UserProfileModal = () => {
  const { 
    profileOpen, 
    setProfileOpen, 
    userProfile, 
    updateUserProfile, 
    userOrders, 
    formatPrice, 
    wishlist, 
    products 
  } = useShop();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'orders', 'addresses', 'rewards'
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    savedTaxId: userProfile.savedTaxId
  });

  if (!profileOpen) return null;

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setProfileOpen(false)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px', padding: '0', overflow: 'hidden' }}>
        
        {/* Profile Banner Top */}
        <div style={{ background: 'linear-gradient(135deg, #4C1D95 0%, #1E1B4B 50%, #064E3B 100%)', padding: '2rem', position: 'relative' }}>
          <button className="close-modal-btn" onClick={() => setProfileOpen(false)} style={{ top: '15px', right: '15px' }}>
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #7C3AED', objectFit: 'cover', boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' }} 
              />
              <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#F59E0B', color: '#000', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={14} />
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0 }}>{userProfile.name}</h2>
                <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                  {userProfile.vipTier}
                </span>
              </div>

              <p style={{ color: '#D1D5DB', fontSize: '0.85rem', marginTop: '2px' }}>{userProfile.email} • {userProfile.phone}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.8rem' }}>
                <span style={{ color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={14} /> {userProfile.points.toLocaleString()} Tariff Points ($14.50 Value)
                </span>
                <span style={{ color: '#A78BFA', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Customs Tax ID: {userProfile.savedTaxId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: '#0B0F19', padding: '0 1rem' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'overview' ? '#7C3AED' : '#9CA3AF',
              borderBottom: activeTab === 'overview' ? '3px solid #7C3AED' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <User size={16} /> Overview
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'orders' ? '#7C3AED' : '#9CA3AF',
              borderBottom: activeTab === 'orders' ? '3px solid #7C3AED' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShoppingBag size={16} /> My Orders ({userOrders.length})
          </button>

          <button 
            onClick={() => setActiveTab('addresses')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'addresses' ? '#7C3AED' : '#9CA3AF',
              borderBottom: activeTab === 'addresses' ? '3px solid #7C3AED' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <MapPin size={16} /> Saved Addresses
          </button>

          <button 
            onClick={() => setActiveTab('rewards')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'rewards' ? '#7C3AED' : '#9CA3AF',
              borderBottom: activeTab === 'rewards' ? '3px solid #7C3AED' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Gift size={16} /> VIP Club Perks
          </button>
        </div>

        {/* Tab Body Content */}
        <div style={{ padding: '1.75rem', background: '#111726', minHeight: '340px' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: '#fff', fontSize: '1.1rem' }}>Personal Profile Information</h3>
                <button 
                  onClick={() => setEditing(!editing)}
                  style={{ color: '#7C3AED', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit3 size={15} /> {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.75rem', marginBottom: '4px' }}>FULL NAME</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.75rem', marginBottom: '4px' }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.75rem', marginBottom: '4px' }}>PHONE NUMBER</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#9CA3AF', fontSize: '0.75rem', marginBottom: '4px' }}>CUSTOMS TAX ID</label>
                    <input 
                      type="text" 
                      value={formData.savedTaxId} 
                      onChange={e => setFormData({...formData, savedTaxId: e.target.value})}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#fff' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>
                    <button type="submit" className="btn-primary-lg" style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}>
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>TOTAL ORDERS PLACED</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{userOrders.length} Orders</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>SAVED WISHLIST ITEMS</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7C3AED', marginTop: '4px' }}>{wishlist.length} Items</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>DUTY SAVINGS GUARANTEED</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10B981', marginTop: '4px' }}>100% Tax Free</div>
                  </div>
                </div>
              )}

              {/* Wishlist Preview */}
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.85rem' }}>Saved Wishlist Preview ({wishlistedItems.length})</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                  {wishlistedItems.slice(0, 3).map(p => (
                    <div key={p.id} style={{ display: 'flex', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '0.6rem', borderRadius: '8px' }}>
                      <img src={p.image} alt={p.title} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', height: '2.4em', overflow: 'hidden' }}>{p.title}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981' }}>{formatPrice(p.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userOrders.map((order, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.65rem' }}>
                    <div>
                      <span style={{ fontWeight: 800, color: '#F59E0B', fontSize: '0.95rem' }}>{order.orderId}</span>
                      <span style={{ color: '#9CA3AF', fontSize: '0.8rem', marginLeft: '0.75rem' }}>Placed on {order.date}</span>
                    </div>

                    <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Truck size={13} /> {order.status}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      {order.items.map((item, i) => (
                        <img key={i} src={item.image} alt={item.title} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                      ))}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>Tracking: <strong style={{ color: '#fff' }}>{order.trackingNumber}</strong></div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff', marginTop: '2px' }}>{formatPrice(order.total)}</div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {userProfile.addresses.map((addr) => (
                <div key={addr.id} style={{ background: 'rgba(255,255,255,0.03)', border: addr.default ? '1px solid #7C3AED' : '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{addr.label}</strong>
                      {addr.default && (
                        <span style={{ background: '#7C3AED', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800 }}>
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>{addr.street}, {addr.city}, {addr.country}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontSize: '0.8rem', fontWeight: 700 }}>
                    <ShieldCheck size={16} /> Verified Customs Clearance Hub
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: REWARDS & VIP PERKS */}
          {activeTab === 'rewards' && (
            <div>
              <div style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ color: '#F59E0B', fontWeight: 800, fontSize: '0.85rem' }}>TARIFF VIP LOYALTY CLUB</div>
                  <h3 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 900, margin: '4px 0' }}>{userProfile.points.toLocaleString()} Points Available</h3>
                  <p style={{ color: '#D1D5DB', fontSize: '0.8rem' }}>Earn 10 points for every $1 spent on factory direct deals.</p>
                </div>
                <div style={{ background: '#F59E0B', color: '#000', padding: '0.6rem 1.25rem', borderRadius: '20px', fontWeight: 900, fontSize: '0.85rem' }}>
                  GOLD TIER UNLOCKED
                </div>
              </div>

              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.85rem' }}>Redeem Rewards & Vouchers</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>$15 Tariff VIP Voucher</strong>
                    <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>Cost: 1,000 Points</div>
                  </div>
                  <button style={{ background: '#7C3AED', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}>
                    Redeem
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Free Express Shipping</strong>
                    <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>Cost: 500 Points</div>
                  </div>
                  <button style={{ background: '#10B981', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}>
                    Redeem
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
