import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { fallbackProductImage } from '../data/products';
import { 
  X, 
  User, 
  ShoppingBag, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Edit3, 
  Gift, 
  Wallet, 
  CheckCircle2, 
  ArrowRight,
  Heart,
  Trash2,
  Plus,
  Star,
  Store,
  Clock,
  Eye,
  Check
} from 'lucide-react';

export const UserProfileModal = () => {
  const { 
    profileOpen, 
    setProfileOpen, 
    profileInitialTab,
    userProfile, 
    updateUserProfile, 
    currentVipTier,
    userOrders, 
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    walletTransactions,
    redeemReward,
    formatPrice, 
    wishlist, 
    toggleWishlist,
    addToCart,
    products,
    setProductModal,
    addToast
  } = useShop();

  const [activeTab, setActiveTab] = useState(profileInitialTab || 'overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [selectedOrderModal, setSelectedOrderModal] = useState(null);

  // Sync initial tab when modal opens
  useEffect(() => {
    if (profileInitialTab) {
      setActiveTab(profileInitialTab);
    }
  }, [profileInitialTab, profileOpen]);

  // Profile Form Data
  const [profileForm, setProfileForm] = useState({
    firstName: userProfile.firstName || 'Jade',
    lastName: userProfile.lastName || 'Sophia',
    email: userProfile.email || 'jadesophia600@gmail.com',
    phone: userProfile.phone || '+234 812 345 6789',
    avatar: userProfile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    savedTaxId: userProfile.savedTaxId || 'NG-88941-TRF'
  });

  // Address Form Data
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    label: 'Home Address',
    street: '',
    apartment: '',
    city: '',
    state: 'Lagos',
    country: 'Nigeria',
    postalCode: '',
    deliveryInstructions: '',
    default: false
  });

  if (!profileOpen) return null;

  // Real Wishlisted Products List
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileForm.firstName.trim() || !profileForm.email.trim()) {
      addToast('First name and email are required.', 'warning');
      return;
    }
    updateUserProfile(profileForm);
    setEditingProfile(false);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.street.trim() || !addressForm.city.trim()) {
      addToast('Street address and city are required.', 'warning');
      return;
    }

    if (editingAddressId) {
      updateAddress({ ...addressForm, id: editingAddressId });
      setEditingAddressId(null);
    } else {
      addAddress(addressForm);
      setAddingAddress(false);
    }

    setAddressForm({
      fullName: '',
      phone: '',
      label: 'Home Address',
      street: '',
      apartment: '',
      city: '',
      state: 'Lagos',
      country: 'Nigeria',
      postalCode: '',
      deliveryInstructions: '',
      default: false
    });
  };

  const startEditAddress = (addr) => {
    setAddressForm(addr);
    setEditingAddressId(addr.id);
    setAddingAddress(true);
  };

  return (
    <div className="modal-overlay" onClick={() => setProfileOpen(false)}>
      <div className="modal-content animate-pop-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '920px', padding: 0, overflow: 'hidden' }}>
        
        {/* Profile Banner Header */}
        <div style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #047857 100%)', padding: '2rem', position: 'relative', color: '#fff' }}>
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
                style={{ width: '85px', height: '85px', borderRadius: '50%', border: '3px solid #FFFFFF', objectFit: 'cover', boxShadow: '0 4px 15px rgba(0,0,0,0.25)', background: '#fff' }} 
              />
              <span style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: '#F59E0B', color: '#fff', borderRadius: '50%', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={14} />
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#fff', margin: 0 }}>{userProfile.name}</h2>
                <span style={{ background: '#F59E0B', color: '#fff', padding: '0.15rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                  {currentVipTier}
                </span>
              </div>

              <p style={{ color: '#E2E8F0', fontSize: '0.85rem', marginTop: '3px' }}>{userProfile.email} • {userProfile.phone}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '0.75rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Wallet size={14} color="#34D399" /> Tariff Wallet: ₦{userProfile.walletBalanceNGN?.toLocaleString()}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={14} color="#FBBF24" /> {userProfile.points.toLocaleString()} Points (₦{userProfile.points.toLocaleString()} Value)
                </span>
                <span style={{ color: '#E2E8F0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#34D399" /> Customs Tax ID: {userProfile.savedTaxId}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-section-alt)', padding: '0 1rem', overflowX: 'auto' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '1rem 1.15rem',
              color: activeTab === 'overview' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'overview' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
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
              padding: '1rem 1.15rem',
              color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'orders' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ShoppingBag size={16} /> My Orders ({userOrders.length})
          </button>

          <button 
            onClick={() => setActiveTab('wishlist')}
            style={{
              padding: '1rem 1.15rem',
              color: activeTab === 'wishlist' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'wishlist' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Heart size={16} fill={wishlist.length > 0 ? "var(--primary)" : "none"} /> Saved Wishlist ({wishlist.length})
          </button>

          <button 
            onClick={() => setActiveTab('wallet')}
            style={{
              padding: '1rem 1.15rem',
              color: activeTab === 'wallet' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'wallet' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Wallet size={16} /> Tariff Wallet
          </button>

          <button 
            onClick={() => setActiveTab('addresses')}
            style={{
              padding: '1rem 1.15rem',
              color: activeTab === 'addresses' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'addresses' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <MapPin size={16} /> Address Book ({addresses.length})
          </button>

          <button 
            onClick={() => setActiveTab('rewards')}
            style={{
              padding: '1rem 1.15rem',
              color: activeTab === 'rewards' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'rewards' ? '3px solid var(--primary)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Gift size={16} /> VIP Rewards
          </button>
        </div>

        {/* Tab Body Content */}
        <div style={{ padding: '1.75rem', background: 'var(--bg-card)', minHeight: '360px', maxHeight: '60vh', overflowY: 'auto' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Account Profile Details</h3>
                <button 
                  onClick={() => setEditingProfile(!editingProfile)}
                  style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Edit3 size={15} /> {editingProfile ? 'Cancel Editing' : 'Edit Profile'}
                </button>
              </div>

              {editingProfile ? (
                <form onSubmit={handleSaveProfile} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-section-alt)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>FIRST NAME</label>
                    <input 
                      type="text" 
                      value={profileForm.firstName} 
                      onChange={e => setProfileForm({...profileForm, firstName: e.target.value})}
                      required
                      style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>LAST NAME</label>
                    <input 
                      type="text" 
                      value={profileForm.lastName} 
                      onChange={e => setProfileForm({...profileForm, lastName: e.target.value})}
                      required
                      style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      value={profileForm.email} 
                      onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                      required
                      style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>PHONE NUMBER</label>
                    <input 
                      type="text" 
                      value={profileForm.phone} 
                      onChange={e => setProfileForm({...profileForm, phone: e.target.value})}
                      required
                      style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>AVATAR IMAGE URL</label>
                    <input 
                      type="text" 
                      value={profileForm.avatar} 
                      onChange={e => setProfileForm({...profileForm, avatar: e.target.value})}
                      style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '4px' }}>CUSTOMS TAX ID</label>
                    <input 
                      type="text" 
                      value={profileForm.savedTaxId} 
                      onChange={e => setProfileForm({...profileForm, savedTaxId: e.target.value})}
                      style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.6rem 0.85rem', color: 'var(--text-main)', fontWeight: 600 }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setEditingProfile(false)}
                      style={{ padding: '0.6rem 1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: 700 }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary-lg" style={{ padding: '0.6rem 1.5rem', fontSize: '0.875rem' }}>
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', padding: '1.15rem', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>COMPLETED ORDERS</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '4px' }}>{userOrders.length} Orders</div>
                  </div>

                  <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', padding: '1.15rem', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>WISHLIST ITEMS</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary)', marginTop: '4px' }}>{wishlistedProducts.length} Saved</div>
                  </div>

                  <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', padding: '1.15rem', borderRadius: '12px' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>DUTY CLEARANCE</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--secondary)', marginTop: '4px' }}>100% Tax Free</div>
                  </div>
                </div>
              )}

              {/* Saved Wishlist Preview (Max 4 items) */}
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Saved Wishlist Preview ({wishlistedProducts.length})</h4>
                  <button 
                    onClick={() => setActiveTab('wishlist')}
                    style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>View All Wishlist ({wishlistedProducts.length})</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div style={{ background: 'var(--bg-section-alt)', padding: '2rem', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                    <Heart size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem' }} />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Your wishlist is currently empty.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
                    {wishlistedProducts.slice(0, 4).map(p => (
                      <div 
                        key={p.id} 
                        style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                      >
                        <div>
                          <img src={p.image} alt={p.title} style={{ width: '100%', height: '80px', objectFit: 'contain', background: '#fff', borderRadius: '6px', marginBottom: '0.5rem' }} />
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', height: '2.4em', overflow: 'hidden' }}>{p.title}</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--secondary)', marginTop: '2px' }}>{formatPrice(p.priceNGN)}</div>
                        </div>

                        <button 
                          onClick={() => setProductModal(p)}
                          style={{ marginTop: '0.5rem', width: '100%', background: 'var(--primary-light)', color: 'var(--primary)', border: '1px solid var(--border-highlight)', padding: '0.3rem', borderRadius: '6px', fontSize: '0.725rem', fontWeight: 700 }}
                        >
                          View Item
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: MY ORDERS */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {userOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <ShoppingBag size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>You haven't placed any orders yet.</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Start browsing 160+ factory direct deals across Nigeria!</p>
                </div>
              ) : (
                userOrders.map((order, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
                      <div>
                        <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>{order.orderId}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.75rem' }}>Placed on {order.date}</span>
                      </div>

                      <div style={{ background: 'var(--secondary-light)', color: 'var(--secondary)', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Truck size={13} /> {order.status}
                      </div>
                    </div>

                    {/* Step-by-step Visual Timeline */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.85rem 0', background: 'var(--bg-card)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '0.725rem', fontWeight: 800 }}>
                      <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '2px' }}><CheckCircle2 size={13} /> Placed</div>
                      <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '2px' }}><CheckCircle2 size={13} /> Paid</div>
                      <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '2px' }}><CheckCircle2 size={13} /> Processing</div>
                      <div style={{ color: order.status === 'Delivered' ? 'var(--secondary)' : 'var(--primary)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Truck size={13} /> {order.status === 'Delivered' ? 'Delivered' : 'In Transit'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        {order.items.map((item, i) => (
                          <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                            <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'contain', background: '#fff', border: '1px solid var(--border-color)' }} />
                            <div>
                              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', width: '220px', height: '1.3em', overflow: 'hidden' }}>{item.title}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity || 1} • {order.seller}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Tracking: <strong style={{ color: 'var(--text-main)' }}>{order.trackingNumber}</strong></div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--secondary)', marginTop: '2px' }}>{formatPrice(order.total)}</div>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: FULL WISHLIST VIEW */}
          {activeTab === 'wishlist' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>My Saved Wishlist Products ({wishlistedProducts.length})</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Products saved to your Tariff profile</span>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: 'var(--bg-section-alt)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <Heart size={54} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Your wishlist is empty</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.35rem', maxWidth: '400px', margin: '0.35rem auto 1.5rem' }}>
                    Save products you love by tapping the heart icon and find them here anytime.
                  </p>
                  <button 
                    onClick={() => {
                      setProfileOpen(false);
                      const cat = document.getElementById('products-grid');
                      if (cat) cat.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-checkout"
                    style={{ display: 'inline-flex', width: 'auto', padding: '0.65rem 1.75rem' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {wishlistedProducts.map(product => (
                    <div 
                      key={product.id} 
                      style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
                    >
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        style={{ position: 'absolute', top: '12px', right: '12px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}
                        title="Remove from Wishlist"
                      >
                        <Trash2 size={14} />
                      </button>

                      <div>
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          style={{ width: '100%', height: '110px', objectFit: 'contain', background: '#fff', borderRadius: '8px', marginBottom: '0.75rem', cursor: 'pointer' }}
                          onClick={() => setProductModal(product)} 
                        />
                        <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 800, textTransform: 'uppercase' }}>{product.category}</div>
                        <h4 
                          onClick={() => setProductModal(product)} 
                          style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--text-main)', height: '2.4em', overflow: 'hidden', cursor: 'pointer', margin: '2px 0 6px 0' }}
                        >
                          {product.title}
                        </h4>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--secondary)' }}>{formatPrice(product.priceNGN)}</span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{formatPrice(product.originalPriceNGN)}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => addToCart(product)}
                          className="btn-checkout"
                          style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                        >
                          <ShoppingBag size={14} /> Add to Cart
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TARIFF WALLET & REFUNDS */}
          {activeTab === 'wallet' && (
            <div>
              <div style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#fff', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.9 }}>Tariff Escrow Wallet Balance</div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '4px 0 0 0' }}>₦{userProfile.walletBalanceNGN?.toLocaleString()}</h2>
                <p style={{ fontSize: '0.825rem', opacity: 0.9, marginTop: '4px' }}>Available instant refund & promotional credits for seamless 1-click checkout.</p>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem' }}>Wallet & Points Transaction History</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {walletTransactions.map((tx) => (
                  <div key={tx.id} style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{tx.desc}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date}</div>
                    </div>
                    <span style={{ color: tx.type === 'credit' ? 'var(--secondary)' : '#DC2626', fontWeight: 800 }}>
                      {tx.type === 'credit' ? `+${tx.points.toLocaleString()} pts` : `-${tx.points.toLocaleString()} pts`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Saved Delivery Addresses ({addresses.length})</h3>
                <button 
                  onClick={() => {
                    setAddressForm({
                      fullName: userProfile.name,
                      phone: userProfile.phone,
                      label: 'Home Address',
                      street: '',
                      apartment: '',
                      city: '',
                      state: 'Lagos',
                      country: 'Nigeria',
                      postalCode: '',
                      deliveryInstructions: '',
                      default: false
                    });
                    setEditingAddressId(null);
                    setAddingAddress(!addingAddress);
                  }}
                  style={{ background: 'var(--primary)', color: '#fff', padding: '0.45rem 1rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Plus size={15} /> Add New Address
                </button>
              </div>

              {addingAddress ? (
                <form onSubmit={handleSaveAddress} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-section-alt)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>ADDRESS LABEL</label>
                    <input 
                      type="text"
                      placeholder="Home, Office, Studio..."
                      value={addressForm.label}
                      onChange={e => setAddressForm({...addressForm, label: e.target.value})}
                      required
                      style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>RECIPIENT FULL NAME</label>
                    <input 
                      type="text"
                      value={addressForm.fullName}
                      onChange={e => setAddressForm({...addressForm, fullName: e.target.value})}
                      required
                      style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>STREET ADDRESS</label>
                    <input 
                      type="text"
                      placeholder="14 Admiralty Way..."
                      value={addressForm.street}
                      onChange={e => setAddressForm({...addressForm, street: e.target.value})}
                      required
                      style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>CITY</label>
                    <input 
                      type="text"
                      placeholder="Lekki, Ikeja, Garki..."
                      value={addressForm.city}
                      onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                      required
                      style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>STATE</label>
                    <select
                      value={addressForm.state}
                      onChange={e => setAddressForm({...addressForm, state: e.target.value})}
                      style={{ width: '100%', padding: '0.6rem 0.85rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 700 }}
                    >
                      <option value="Lagos">Lagos State</option>
                      <option value="Abuja">Abuja FCT</option>
                      <option value="Ibadan">Iyo / Oyo State</option>
                      <option value="Port Harcourt">Rivers State</option>
                      <option value="Kano">Kano State</option>
                      <option value="Enugu">Enugu State</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setAddingAddress(false)} style={{ padding: '0.6rem 1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: 700 }}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary-lg" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>
                      {editingAddressId ? 'Update Address' : 'Save Address'}
                    </button>
                  </div>
                </form>
              ) : null}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {addresses.map((addr) => (
                  <div key={addr.id} style={{ background: 'var(--bg-section-alt)', border: addr.default ? '2px solid var(--primary)' : '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{addr.label}</strong>
                        {addr.default && (
                          <span style={{ background: 'var(--primary)', color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800 }}>
                            DEFAULT
                          </span>
                        )}
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{addr.street}, {addr.city}, {addr.state}, {addr.country}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>Phone: {addr.phone || userProfile.phone}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {!addr.default && (
                        <button onClick={() => setDefaultAddress(addr.id)} style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, padding: '0.3rem 0.6rem', border: '1px solid var(--border-highlight)', borderRadius: '6px' }}>
                          Set Default
                        </button>
                      )}
                      <button onClick={() => startEditAddress(addr)} style={{ color: 'var(--text-muted)', padding: '6px' }} title="Edit">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => deleteAddress(addr.id)} style={{ color: '#DC2626', padding: '6px' }} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: VIP REWARDS WALLET */}
          {activeTab === 'rewards' && (
            <div>
              <div style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #F3E8FF 100%)', border: '1px solid #FCD34D', borderRadius: '12px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ color: '#D97706', fontWeight: 800, fontSize: '0.85rem' }}>TARIFF VIP LOYALTY CLUB</div>
                  <h3 style={{ fontSize: '1.5rem', color: '#0F172A', fontWeight: 900, margin: '4px 0' }}>{userProfile.points.toLocaleString()} Points Available</h3>
                  <p style={{ color: '#64748B', fontSize: '0.8rem' }}>Earn 10 points for every ₦1,000 spent on factory direct deals.</p>
                </div>
                <div style={{ background: '#D97706', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '20px', fontWeight: 900, fontSize: '0.85rem' }}>
                  {currentVipTier.toUpperCase()}
                </div>
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.85rem' }}>Redeem Loyalty Points & Discounts</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>₦1,000 Discount</strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>Cost: 1,000 Points</div>
                  </div>
                  <button 
                    onClick={() => redeemReward(1000, 1000, '₦1,000 Discount')}
                    style={{ marginTop: '0.85rem', background: 'var(--primary)', color: '#fff', padding: '0.4rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}
                  >
                    Redeem Voucher
                  </button>
                </div>

                <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>₦5,000 Discount</strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>Cost: 5,000 Points</div>
                  </div>
                  <button 
                    onClick={() => redeemReward(5000, 5000, '₦5,000 Discount')}
                    style={{ marginTop: '0.85rem', background: 'var(--primary)', color: '#fff', padding: '0.4rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}
                  >
                    Redeem Voucher
                  </button>
                </div>

                <div style={{ background: 'var(--bg-section-alt)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <strong style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>₦15,000 VIP Voucher</strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>Cost: 15,000 Points</div>
                  </div>
                  <button 
                    onClick={() => redeemReward(15000, 15000, '₦15,000 VIP Voucher')}
                    style={{ marginTop: '0.85rem', background: 'var(--secondary)', color: '#fff', padding: '0.4rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem' }}
                  >
                    Redeem Voucher
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
