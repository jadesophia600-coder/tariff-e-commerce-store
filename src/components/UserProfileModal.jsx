import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, ShoppingBag, MapPin, Award, ShieldCheck, Truck, Sparkles, Edit3, Gift } from 'lucide-react';

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
        <div style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #047857 100%)', padding: '2rem', position: 'relative' }}>
          <button className="close-modal-btn" onClick={() => setProfileOpen(false)} style={{ top: '15px', right: '15px', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                }}
                style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #FFFFFF', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }} 
              />
              <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#F59E0B', color: '#fff', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={14} />
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0 }}>{userProfile.name}</h2>
                <span style={{ background: '#F59E0B', color: '#fff', padding: '0.15rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                  {userProfile.vipTier}
                </span>
              </div>

              <p style={{ color: '#E2E8F0', fontSize: '0.85rem', marginTop: '2px' }}>{userProfile.email} • {userProfile.phone}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.8rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={14} color="#FBBF24" /> {userProfile.points.toLocaleString()} Loyalty Points (₦{userProfile.points * 10} Value)
                </span>
                <span style={{ color: '#E2E8F0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#34D399" /> Customs Tax ID: {userProfile.savedTaxId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: '#F8FAFC', padding: '0 1rem' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'overview' ? 'var(--primary)' : '#64748B',
              borderBottom: activeTab === 'overview' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <User size={16} /> Dashboard Overview
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'orders' ? 'var(--primary)' : '#64748B',
              borderBottom: activeTab === 'orders' ? '3px solid var(--primary)' : '3px solid transparent',
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
              color: activeTab === 'addresses' ? 'var(--primary)' : '#64748B',
              borderBottom: activeTab === 'addresses' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <MapPin size={16} /> Address Book
          </button>

          <button 
            onClick={() => setActiveTab('rewards')}
            style={{
              padding: '1rem 1.25rem',
              color: activeTab === 'rewards' ? 'var(--primary)' : '#64748B',
              borderBottom: activeTab === 'rewards' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Gift size={16} /> VIP Rewards Wallet
          </button>
        </div>

        {/* Tab Body Content */}
        <div style={{ padding: '1.75rem', background: '#FFFFFF', minHeight: '340px' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ color: '#0F172A', fontSize: '1.1rem', fontWeight: 800 }}>Account Profile Details</h3>
                <button 
                  onClick={() => setEditing(!editing)}
                  style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit3 size={15} /> {editing ? 'Cancel Editing' : 'Edit Information'}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#64748B', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>FULL NAME</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#0F172A', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#64748B', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#0F172A', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#64748B', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>PHONE NUMBER</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#0F172A', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#64748B', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>CUSTOMS TAX ID</label>
                    <input 
                      type="text" 
                      value={formData.savedTaxId} 
                      onChange={e => setFormData({...formData, savedTaxId: e.target.value})}
                      style={{ width: '100%', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.6rem 0.85rem', color: '#0F172A', fontWeight: 600 }}
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
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 700 }}>COMPLETED ORDERS</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>{userOrders.length} Orders</div>
                  </div>

                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 700 }}>WISHLIST ITEMS</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', marginTop: '4px' }}>{wishlist.length} Saved</div>
                  </div>

                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 700 }}>DUTY CLEARANCE</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#059669', marginTop: '4px' }}>100% Tax Free</div>
                  </div>
                </div>
              )}

              {/* Wishlist Preview */}
              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: '#0F172A', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem' }}>Saved Wishlist Preview ({wishlistedItems.length})</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                  {wishlistedItems.slice(0, 3).map(p => (
                    <div key={p.id} style={{ display: 'flex', gap: '0.6rem', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.6rem', borderRadius: '8px' }}>
                      <img src={p.image} alt={p.title} style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'contain', background: '#fff' }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A', height: '2.4em', overflow: 'hidden' }}>{p.title}</div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669' }}>{formatPrice(p.priceNGN)}</div>
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
                <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.65rem' }}>
                    <div>
                      <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>{order.orderId}</span>
                      <span style={{ color: '#64748B', fontSize: '0.8rem', marginLeft: '0.75rem' }}>Placed on {order.date}</span>
                    </div>

                    <div style={{ background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Truck size={13} /> {order.status}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      {order.items.map((item, i) => (
                        <img key={i} src={item.image} alt={item.title} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'contain', background: '#fff', border: '1px solid #E2E8F0' }} />
                      ))}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#64748B', fontSize: '0.75rem' }}>Tracking: <strong style={{ color: '#0F172A' }}>{order.trackingNumber}</strong></div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>{formatPrice(order.total)}</div>
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
                <div key={addr.id} style={{ background: '#F8FAFC', border: addr.default ? '2px solid var(--primary)' : '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <strong style={{ color: '#0F172A', fontSize: '0.95rem' }}>{addr.label}</strong>
                      {addr.default && (
                        <span style={{ background: 'var(--primary)', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800 }}>
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <p style={{ color: '#64748B', fontSize: '0.85rem' }}>{addr.street}, {addr.city}, {addr.country}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '0.8rem', fontWeight: 700 }}>
                    <ShieldCheck size={16} /> Verified Customs Address
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: REWARDS & VIP PERKS */}
          {activeTab === 'rewards' && (
            <div>
              <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #F3E8FF 100%)', border: '1px solid #FCD34D', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ color: '#D97706', fontWeight: 800, fontSize: '0.85rem' }}>TARIFF VIP LOYALTY CLUB</div>
                  <h3 style={{ fontSize: '1.5rem', color: '#0F172A', fontWeight: 900, margin: '4px 0' }}>{userProfile.points.toLocaleString()} Points Available</h3>
                  <p style={{ color: '#64748B', fontSize: '0.8rem' }}>Earn 10 points for every ₦1,000 spent on factory direct deals.</p>
                </div>
                <div style={{ background: '#D97706', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '20px', fontWeight: 900, fontSize: '0.85rem' }}>
                  GOLD TIER UNLOCKED
                </div>
              </div>

              <h4 style={{ color: '#0F172A', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem' }}>Redeem Rewards & Vouchers</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.95rem' }}>₦15,000 Tariff VIP Voucher</strong>
                    <div style={{ color: '#64748B', fontSize: '0.75rem' }}>Cost: 1,000 Points</div>
                  </div>
                  <button style={{ background: 'var(--primary)', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}>
                    Redeem
                  </button>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#0F172A', fontSize: '0.95rem' }}>Free Express Shipping</strong>
                    <div style={{ color: '#64748B', fontSize: '0.75rem' }}>Cost: 500 Points</div>
                  </div>
                  <button style={{ background: '#059669', color: '#fff', padding: '0.4rem 0.85rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}>
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
