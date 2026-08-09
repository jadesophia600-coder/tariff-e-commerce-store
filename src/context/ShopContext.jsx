import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts, promoCodes } from '../data/products';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export const currencies = [
  { code: 'USD', symbol: '$', rate: 1, name: 'USD - United States' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'EUR - Europe Union' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'GBP - United Kingdom' },
  { code: 'NGN', symbol: '₦', rate: 1480, name: 'NGN - Nigeria (Jumia Hub)' },
  { code: 'KES', symbol: 'KSh', rate: 130, name: 'KES - Kenya (Jumia Hub)' },
  { code: 'ZAR', symbol: 'R', rate: 18.5, name: 'ZAR - South Africa' }
];

export const ShopProvider = ({ children }) => {
  const [products] = useState(mockProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(['prod-wearables-1', 'prod-fashion-3']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currency, setCurrency] = useState(currencies[0]);
  const [activePromo, setActivePromo] = useState(null);

  // Pagination & Sorting Controls
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'discount'
  const [priceFilterMax, setPriceFilterMax] = useState(400);

  // Reset pagination when category, search, or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, priceFilterMax]);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Jade Sophia',
    email: 'jadesophia600@gmail.com',
    phone: '+1 (555) 019-2834',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    vipTier: 'Tariff VIP Gold Member',
    points: 1450,
    savedTaxId: 'TX-9874-TRF',
    addresses: [
      { id: 'addr-1', label: 'Primary Residence', street: '742 Evergreen Terrace', city: 'Springfield', country: 'United States', default: true },
      { id: 'addr-2', label: 'Office Studio', street: '100 Cyberpunk Way, Suite 400', city: 'Neo Tokyo', country: 'Japan', default: false }
    ]
  });

  const [userOrders, setUserOrders] = useState([
    {
      orderId: 'TRF-984210',
      date: 'Aug 08, 2026',
      total: 89.49,
      status: 'In Transit — Customs Pre-Cleared',
      itemsCount: 2,
      trackingNumber: 'TRF-EXP-889412',
      items: [
        { title: 'Tariff CyberPulse OLED Smartwatch Ultra 100 Series', price: 39.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
        { title: 'Tariff Pods Ultra ANC Earbuds 107 Series', price: 19.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80' }
      ]
    },
    {
      orderId: 'TRF-774102',
      date: 'Jul 24, 2026',
      total: 54.99,
      status: 'Delivered',
      itemsCount: 1,
      trackingNumber: 'TRF-EXP-554109',
      items: [
        { title: 'Tariff CyberStrider Smart LED Sneakers 114 Series', price: 54.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' }
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

  // Countdown timer
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
    addToast(`Added "${product.title}" to Cart!`, 'success');
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

  const formatPrice = (priceInUSD) => {
    const converted = priceInUSD * currency.rate;
    if (currency.code === 'NGN' || currency.code === 'KES') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalTariffDuty = cart.reduce((sum, item) => sum + ((item.product.tariffDutyAmount || 0) * item.quantity), 0);
  
  let discountAmount = 0;
  if (activePromo) {
    if (activePromo.discountPercent) {
      discountAmount = (rawSubtotal * activePromo.discountPercent) / 100;
    } else if (activePromo.discountAmount) {
      discountAmount = activePromo.discountAmount;
    }
  }

  const shippingCost = rawSubtotal > 35 || cart.length === 0 ? 0 : 4.99;
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
      status: 'Processing — Customs Pre-Cleared'
    };

    setOrderSuccess(orderData);
    setUserOrders(prev => [orderData, ...prev]);
    setUserProfile(prev => ({ ...prev, points: prev.points + Math.floor(finalTotal * 10) }));
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
      currentPage,
      setCurrentPage,
      itemsPerPage
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
