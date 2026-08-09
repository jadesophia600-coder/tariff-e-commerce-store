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
  const [wishlist, setWishlist] = useState(['prod-1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currency, setCurrency] = useState(currencies[0]);
  const [activePromo, setActivePromo] = useState(null);
  
  // Modals & UI States
  const [cartOpen, setCartOpen] = useState(false);
  const [productModal, setProductModal] = useState(null);
  const [spinWheelOpen, setSpinWheelOpen] = useState(false);
  const [spinWheelUsed, setSpinWheelUsed] = useState(false);
  const [tariffCalculatorOpen, setTariffCalculatorOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Flash Sale Timer Countdown (HH:MM:SS)
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

  // Toast Notification System
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Cart Actions
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

  // Wishlist Actions
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

  // Promo Code Validation
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

  // Currency Formatter
  const formatPrice = (priceInUSD) => {
    const converted = priceInUSD * currency.rate;
    if (currency.code === 'NGN' || currency.code === 'KES') {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  // Price Calculations
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

  // Spin Wheel Reward Trigger
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

  // Execute Order
  const completeOrder = (shippingInfo) => {
    const orderData = {
      orderId: 'TRF-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total: finalTotal,
      currency: currency,
      shippingInfo
    };
    setOrderSuccess(orderData);
    setCart([]);
    setCheckoutOpen(false);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 }
    });
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
      orderSuccess,
      setOrderSuccess,
      addToCart,
      removeFromCart,
      updateCartQty,
      toggleWishlist,
      timeLeft,
      toasts,
      addToast,
      completeOrder
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
