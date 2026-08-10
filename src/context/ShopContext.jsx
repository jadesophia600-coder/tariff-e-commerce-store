import React, { createContext, useContext, useState, useEffect } from 'react';
import { masterProductsList, promoCodes } from '../data/products';
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
  const [wishlist, setWishlist] = useState(['ph-1', 'fas-1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currency, setCurrency] = useState(currencies[0]); // Default NGN ₦
  const [activePromo, setActivePromo] = useState(null);

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

  // Filter & Sort state
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilterMax, setPriceFilterMax] = useState(2000000);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Jade Sophia',
    email: 'jadesophia600@gmail.com',
    phone: '+234 812 345 6789',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    vipTier: 'Tariff Gold Member',
    points: 14500,
    savedTaxId: 'NG-88941-TRF',
    addresses: [
      { id: 'addr-1', label: 'Home Address', street: '14 Admiralty Way, Lekki Phase 1', city: 'Lagos', country: 'Nigeria', default: true },
      { id: 'addr-2', label: 'Office Studio', street: '45 Allen Avenue, Ikeja', city: 'Lagos', country: 'Nigeria', default: false }
    ]
  });

  const [userOrders, setUserOrders] = useState([
    {
      orderId: 'TRF-984210',
      date: 'Aug 08, 2026',
      total: 1450000,
      status: 'In Transit — Customs Pre-Cleared',
      itemsCount: 1,
      trackingNumber: 'TRF-EXP-889412',
      items: [
        { title: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium)', price: 1450000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' }
      ]
    },
    {
      orderId: 'TRF-774102',
      date: 'Jul 24, 2026',
      total: 68000,
      status: 'Delivered',
      itemsCount: 1,
      trackingNumber: 'TRF-EXP-554109',
      items: [
        { title: 'Nike Air Max 270 React Running Sneakers', price: 68000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }
      ]
    }
  ]);
  
  // UI Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);
  const [spinWheelOpen, setSpinWheelOpen] = useState(false);
  const [spinWheelUsed, setSpinWheelUsed] = useState(false);
  const [tariffCalculatorOpen, setTariffCalculatorOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        addToast('Removed from Wishlist.', 'warning');
        return prev.filter(id => id !== productId);
      } else {
        addToast('Saved to your Tariff Wishlist!', 'success');
        return [...prev, productId];
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

  const shippingCost = rawSubtotal >= 50000 || cart.length === 0 ? 0 : 3500;
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
    const orderData = {
      orderId: 'TRF-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total: finalTotal,
      currency: currency,
      shippingInfo,
      status: 'Processing — Pre-Cleared at Customs'
    };

    setOrderSuccess(orderData);
    setUserOrders(prev => [orderData, ...prev]);
    setUserProfile(prev => ({ ...prev, points: prev.points + Math.floor(finalTotal / 100) }));
    setCart([]);
    setCheckoutOpen(false);

    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const updateUserProfile = (newDetails) => {
    setUserProfile(prev => ({ ...prev, ...newDetails }));
    addToast('User profile updated successfully!', 'success');
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
      orderSuccess,
      setOrderSuccess,
      userProfile,
      updateUserProfile,
      userOrders,
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
      toggleTheme
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
