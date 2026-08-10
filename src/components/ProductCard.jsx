import React from 'react';
import { useShop } from '../context/ShopContext';
import { fallbackProductImage } from '../data/products';
import { Star, Heart, ShoppingBag, ShieldCheck, Eye, Store } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    setProductModal 
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);
  const stockPercentage = Math.round((product.stockClaimed / product.stockTotal) * 100);

  return (
    <div className="product-card">
      
      {/* Product Image & Badges Container */}
      <div className="product-image-container">
        
        <span className="badge-flash product-discount-badge">
          -{product.discountPercent}% OFF
        </span>

        <button 
          className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isWishlisted ? "#fff" : "none"} />
        </button>

        <img 
          src={product.image} 
          alt={product.title} 
          className="product-img" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackProductImage;
          }}
          onClick={() => setProductModal(product)}
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Product Details Body */}
      <div className="product-body">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <span className="product-category-text">{product.category}</span>
          <button 
            onClick={() => setProductModal(product)} 
            style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.725rem', fontWeight: 600 }}
          >
            <Eye size={12} />
            <span>Quick View</span>
          </button>
        </div>

        {/* Seller Info Badge */}
        <div className="product-seller-text" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Store size={12} color="#059669" />
          <span>{product.seller || 'Tariff Official Store ✓'}</span>
        </div>

        <h3 
          className="product-title"
          onClick={() => setProductModal(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.title}
        </h3>

        {/* Rating & Reviews */}
        <div className="product-rating-row">
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                fill={i < Math.floor(product.rating) ? "#D97706" : "none"} 
                color="#D97706" 
              />
            ))}
          </div>
          <span style={{ fontWeight: 800, color: '#0F172A' }}>{product.rating}</span>
          <span className="rating-count">({product.reviewsCount.toLocaleString()})</span>
        </div>

        {/* Tariff Duty Guarantee Pill */}
        <div className="product-tariff-guarantee">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="#059669" />
            <span>
              {product.tariffDutyAmountNGN === 0 ? "100% Tax Pre-Paid ✓" : `Customs Duty Pre-Paid`}
            </span>
          </div>
        </div>

        {/* Stock Progress Bar (Flash Sales) */}
        {product.isFlashSale && (
          <div className="stock-bar-wrap">
            <div className="stock-bar-bg">
              <div className="stock-bar-fill" style={{ width: `${stockPercentage}%` }}></div>
            </div>
            <span className="stock-text">⚡ {stockPercentage}% Claimed — Only {product.stockTotal - product.stockClaimed} Left!</span>
          </div>
        )}

        {/* Price & Action Row */}
        <div className="product-price-row">
          <div>
            <span className="price-main">{formatPrice(product.priceNGN)}</span>
            <span className="price-old">{formatPrice(product.originalPriceNGN)}</span>
          </div>

          <button 
            className="add-cart-btn"
            onClick={() => addToCart(product)}
            title="Add to Tariff Cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

      </div>

    </div>
  );
};
