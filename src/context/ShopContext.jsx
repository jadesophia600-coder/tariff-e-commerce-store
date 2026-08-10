import React, { createContext, useContext, useState, useEffect } from 'react';
import { masterProductsList, promoCodes, sellersDirectory, nigerianDeliveryRates } from '../data/products';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export const currencies = [
  { code: 'NGN', symbol: '₦', rate: 1, name: 'NGN - Nigerian Naira (Default)' },
  { code: 'USD', symbol: '$', rate: 0.00067, name: 'USD - United States Dollar' },
  { code: 'EUR', symbol: '€', rate: 0.00062, name: 'EUR - Euro' },
  { code: 'GBP', symbol: '£', rate: 0.00053, name: 'GBP - British Pound' },
  { code: 'KES', symbol: 'KSh', rate: 0.087, name: 'KES - Kenyan Shilling' },
  { code: 'ZAR', symbol: 'R', rate: 0.012, name: 'ZAR - South African Rand' }
];

export const ShopProvider = ({ children }) => {
  const [products] = useState(masterProductsList);
  const [cart, setCart] = useState([]);
  
  // Persistent Wishlist State with Deduplication
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('tariff_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.from(new Set(parsed)); // Deduplicate
      }
    } catch (e) {
      console.error('Failed to parse saved wishlist', e);
    }
    return ['ph-1', 'fas-1', 'elec-1'];
  });

  useEffect(() => {
    localStorage.setItem('tariff_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currency, setCurrency] = useState(currencies[0]); // Default NGN ₦
  const [activePromo, setActivePromo] = useState(null);

  // Selected State for Delivery Calculation (Lagos, Abuja, Port Harcourt, etc.)
  const [selectedState, setSelectedState] = useState('Lagos');

  // Recent Searches History
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('tariff_recent_searches');
    return saved ? JSON.parse(saved) : ['iPhone 15 Pro', 'Air Fryer Ninja', 'Nike Sneakers', 'MacBook Air M3'];
  });

  const addRecentSearch = (term) => {
    if (!term || !term.trim()) return;
    const clean = term.trim();
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 6);
      localStorage.setItem('tariff_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('tariff_recent_searches');
  };

  // Light / Dark Theme State with LocalStorage Persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tariff_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tariff_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Notification Center State 🔔
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', title: '🚚 Order In Transit', message: 'Order #TRF-984210 (iPhone 15 Pro) cleared Lagos Customs Hub.', time: '10 mins ago', read: false },
    { id: 'notif-2', title: '🔔 Price Drop Alert', message: 'Samsung S24 Ultra dropped by ₦270,000 in your wishlist!', time: '1 hour ago', read: false },
    { id: 'notif-3', title: '🔥 Flash Deal Live', message: 'AirPods Pro 2 USB-C 18% OFF Flash Sale ends in 4 hours.', time: '3 hours ago', read: true }
  ]);

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Filter & Sort state
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilterMax, setPriceFilterMax] = useState(2000000);

  // Persistent User Profile State
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('tariff_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user profile', e);
    }
    return {
      firstName: 'Jade',
      lastName: 'Sophia',
      name: 'Jade Sophia',
      email: 'jadesophia600@gmail.com',
      phone: '+234 812 345 6789',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      points: 14500,
      walletBalanceNGN: 45000, // Tariff Wallet Escrow Balance
      savedTaxId: 'NG-88941-TRF'
    };
  });

  useEffect(() => {
    localStorage.setItem('tariff_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Dynamic Tier Calculation
  const calculateVipTier = (points) => {
    if (points >= 20000) return 'Tariff Platinum VIP';
    if (points >= 5000) return 'Tariff Gold Member';
    if (points >= 1000) return 'Tariff Silver Member';
    return 'Tariff Standard Member';
  };

  const currentVipTier = calculateVipTier(userProfile.points);

  // Persistent Saved Address Book
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('tariff_addresses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load addresses', e);
    }
    return [
      { 
        id: 'addr-1', 
        fullName: 'Jade Sophia', 
        phone: '+234 812 345 6789', 
        label: 'Home Address', 
        street: '14 Admiralty Way', 
        apartment: 'Suite 4B', 
        city: 'Lekki Phase 1', 
        state: 'Lagos', 
        country: 'Nigeria', 
        postalCode: '105102', 
        deliveryInstructions: 'Ring bell at front gate', 
        default: true 
      },
      { 
        id: 'addr-2', 
        fullName: 'Jade Sophia', 
        phone: '+234 812 345 6789', 
        label: 'Office Studio', 
        street: '45 Allen Avenue', 
        apartment: 'Floor 2', 
        city: 'Ikeja', 
        state: 'Lagos', 
        country: 'Nigeria', 
        postalCode: '100271', 
        deliveryInstructions: 'Leave with reception desk', 
        default: false 
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tariff_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addAddress = (newAddr) => {
    const addrWithId = {
      ...newAddr,
      id: 'addr-' + Date.now(),
      default: addresses.length === 0 ? true : (newAddr.default || false)
    };
    setAddresses(prev => {
      let updated = [...prev];
      if (addrWithId.default) {
        updated = updated.map(a => ({ ...a, default: false }));
      }
      return [...updated, addrWithId];
    });
    addToast('New delivery address added successfully!', 'success');
  };

  const updateAddress = (updatedAddr) => {
    setAddresses(prev => prev.map(a => {
      if (a.id === updatedAddr.id) {
        return updatedAddr;
      }
      if (updatedAddr.default) {
        return { ...a, default: false };
      }
      return a;
    }));
    addToast('Address updated successfully!', 'success');
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    addToast('Address removed.', 'warning');
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({
      ...a,
      default: a.id === id
    })));
    addToast('Default delivery address updated.', 'success');
  };

  // Persistent User Orders
  const [userOrders, setUserOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('tariff_user_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load user orders', e);
    }
    return [
      {
        orderId: 'TRF-984210',
        date: 'Aug 08, 2026',
        total: 1450000,
        status: 'In Transit',
        statusDetail: 'In Transit — Pre-Cleared at Customs',
        itemsCount: 1,
        trackingNumber: 'TRF-EXP-889412',
        seller: 'Slot Electronics',
        paymentMethod: 'Debit Card (Visa)',
        items: [
          { 
            id: 'ph-1', 
            title: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium)', 
            price: 1450000, 
            quantity: 1, 
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' 
          }
        ]
      },
      {
        orderId: 'TRF-774102',
        date: 'Jul 24, 2026',
        total: 68000,
        status: 'Delivered',
        statusDetail: 'Delivered to Lekki Address',
        itemsCount: 1,
        trackingNumber: 'TRF-EXP-554109',
        seller: 'Nike Authorized Store',
        paymentMethod: 'Bank Transfer',
        items: [
          { 
            id: 'fas-1', 
            title: 'Nike Air Max 270 React Running Sneakers', 
            price: 68000, 
            quantity: 1, 
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' 
          }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tariff_user_orders', JSON.stringify(userOrders));
  }, [userOrders]);

  // Persistent Wallet Transactions History
  const [walletTransactions, setWalletTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('tariff_wallet_transactions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load wallet transactions', e);
    }
    return [
      { id: 'tx-1', type: 'credit', points: 1450, desc: 'Earned 1,450 points on Order #TRF-984210', date: 'Aug 08, 2026' },
      { id: 'tx-2', type: 'credit', points: 680, desc: 'Earned 680 points on Order #TRF-774102', date: 'Jul 24, 2026' },
      { id: 'tx-3', type: 'credit', points: 10000, desc: 'Tariff VIP Welcome Gift Points', date: 'Jul 01, 2026' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('tariff_wallet_transactions', JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  // Redeem Rewards Handler
  const redeemReward = (costPoints, voucherDiscountNGN, label) => {
    if (userProfile.points < costPoints) {
      addToast(`Insufficient points! You need ${costPoints.toLocaleString()} points to redeem ${label}.`, 'warning');
      return false;
    }

    // Deduct points
    setUserProfile(prev => ({
      ...prev,
      points: prev.points - costPoints
    }));

    // Record wallet transaction
    const newTx = {
      id: 'tx-' + Date.now(),
      type: 'debit',
      points: costPoints,
      desc: `Redeemed ${label} (${voucherDiscountNGN ? `₦${voucherDiscountNGN.toLocaleString()} OFF` : 'Voucher'})`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setWalletTransactions(prev => [newTx, ...prev]);

    // Apply discount or promo
    if (voucherDiscountNGN) {
      setActivePromo({
        code: `VIP-REWARD-${voucherDiscountNGN}`,
        discountAmount: voucherDiscountNGN,
        desc: `Tariff VIP Reward Voucher (₦${voucherDiscountNGN.toLocaleString()} OFF)`
      });
    }

    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 }
    });

    addToast(`🎉 Success! Redeemed ${label}. Applied to your current checkout.`, 'success');
    return true;
  };

  // UI Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);
  const [spinWheelOpen, setSpinWheelOpen] = useState(false);
  const [spinWheelUsed, setSpinWheelUsed] = useState(false);
  const [tariffCalculatorOpen, setTariffCalculatorOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState('overview'); // 'overview', 'orders', 'wishlist', 'wallet', 'addresses', 'rewards'
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [sellerStoreModal, setSellerStoreModal] = useState(null);
  const [buyerProtectionModal, setBuyerProtectionModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Countdown timer for Flash Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const addToCart = (product, quantity = 1, color = null, size = null) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { 
        product, 
        quantity, 
        selectedColor: color || product.colors?.[0], 
        selectedSize: size || product.sizes?.[0] 
      }];
    });
    addToast(`Added "${product.title}" to Tariff Cart!`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item removed from cart.', 'warning');
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  // Safe Deduplicated Wishlist Toggle
  const toggleWishlist = (productId) => {
    if (!productId) return;
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addToast('Removed from your Wishlist.', 'warning');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to your Tariff Wishlist!', 'success');
        return Array.from(new Set([...prev, productId])); // Guarantee zero duplicates
      }
    });
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (promoCodes[cleanCode]) {
      setActivePromo({ code: cleanCode, ...promoCodes[cleanCode] });
      addToast(`Promo ${cleanCode} Applied!`, 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try TARIFF2026 or FLASH80', 'warning');
      return false;
    }
  };

  // Price Formatter supporting ₦ NGN Naira and conversions
  const formatPrice = (priceInNGN) => {
    const converted = priceInNGN * currency.rate;
    if (currency.code === 'NGN') {
      return `₦${Math.round(converted).toLocaleString()}`;
    } else if (currency.code === 'USD' || currency.code === 'EUR' || currency.code === 'GBP') {
      return `${currency.symbol}${converted.toFixed(2)}`;
    }
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.product.priceNGN * item.quantity), 0);
  const totalTariffDuty = cart.reduce((sum, item) => sum + ((item.product.tariffDutyAmountNGN || 0) * item.quantity), 0);
  
  let discountAmount = 0;
  if (activePromo) {
    if (activePromo.discountPercent) {
      discountAmount = (rawSubtotal * activePromo.discountPercent) / 100;
    } else if (activePromo.discountAmount) {
      discountAmount = activePromo.discountAmount;
    }
  }

  const deliveryInfo = nigerianDeliveryRates[selectedState] || nigerianDeliveryRates['Lagos'];
  const shippingCost = rawSubtotal >= 50000 || cart.length === 0 ? 0 : deliveryInfo.fee;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + totalTariffDuty + shippingCost);

  const triggerWheelReward = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    applyPromoCode('FLASH80');
    setSpinWheelUsed(true);
    addToast('🎉 You won 30% OFF! Code FLASH80 applied automatically.', 'success');
  };

  const completeOrder = (shippingInfo) => {
    const earnedPoints = Math.floor(finalTotal / 100);
    const orderData = {
      orderId: 'TRF-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: cart.map(item => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.priceNGN,
        quantity: item.quantity,
        image: item.product.image
      })),
      total: finalTotal,
      currency: currency,
      shippingInfo,
      status: 'Processing',
      statusDetail: 'Processing — Pre-Cleared at Customs',
      trackingNumber: 'TRF-EXP-' + Math.floor(100000 + Math.random() * 900000),
      seller: cart[0]?.product?.seller || 'Tariff Official Store',
      paymentMethod: shippingInfo.paymentMethod || 'Debit Card'
    };

    setOrderSuccess(orderData);
    setUserOrders(prev => [orderData, ...prev]);

    // Update user profile points
    setUserProfile(prev => ({
      ...prev,
      points: prev.points + earnedPoints
    }));

    // Record points earned in wallet transactions
    setWalletTransactions(prev => [
      {
        id: 'tx-' + Date.now(),
        type: 'credit',
        points: earnedPoints,
        desc: `Earned ${earnedPoints.toLocaleString()} points on Order #${orderData.orderId}`,
        date: orderData.date
      },
      ...prev
    ]);

    setCart([]);
    setCheckoutOpen(false);

    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const updateUserProfile = (newDetails) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...newDetails };
      if (newDetails.firstName || newDetails.lastName) {
        updated.name = `${newDetails.firstName || prev.firstName || ''} ${newDetails.lastName || prev.lastName || ''}`.trim();
      }
      return updated;
    });
    addToast('Profile updated successfully!', 'success');
  };

  const openSellerStore = (sellerName) => {
    const sellerData = sellersDirectory[sellerName] || sellersDirectory['Slot Electronics'];
    setSellerStoreModal(sellerData);
  };

  const openProfileTab = (tabName = 'overview') => {
    setProfileInitialTab(tabName);
    setProfileOpen(true);
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      currency,
      setCurrency,
      activePromo,
      applyPromoCode,
      formatPrice,
      rawSubtotal,
      totalTariffDuty,
      discountAmount,
      shippingCost,
      finalTotal,
      cartOpen,
      setCartOpen,
      productModal,
      setProductModal,
      spinWheelOpen,
      setSpinWheelOpen,
      spinWheelUsed,
      triggerWheelReward,
      tariffCalculatorOpen,
      setTariffCalculatorOpen,
      checkoutOpen,
      setCheckoutOpen,
      profileOpen,
      setProfileOpen,
      profileInitialTab,
      setProfileInitialTab,
      openProfileTab,
      selectedOrderDetails,
      setSelectedOrderDetails,
      orderSuccess,
      setOrderSuccess,
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
      addToCart,
      removeFromCart,
      updateCartQty,
      toggleWishlist,
      timeLeft,
      toasts,
      addToast,
      completeOrder,
      sortBy,
      setSortBy,
      priceFilterMax,
      setPriceFilterMax,
      theme,
      toggleTheme,
      recentSearches,
      addRecentSearch,
      clearRecentSearches,
      selectedState,
      setSelectedState,
      deliveryInfo,
      notifications,
      markNotificationRead,
      unreadNotificationsCount,
      notificationCenterOpen,
      setNotificationCenterOpen,
      sellerStoreModal,
      setSellerStoreModal,
      openSellerStore,
      buyerProtectionModal,
      setBuyerProtectionModal
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
