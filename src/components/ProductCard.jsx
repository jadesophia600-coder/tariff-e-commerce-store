import React from 'react';
import { useShop } from '../context/ShopContext';
import { fallbackProductImage } from '../data/products';
import { Star, Heart, ShoppingBag, ShieldCheck, Eye } from 'lucide-react';

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
      
      {/* Product Top Image & Badges */}
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

      {/* Product Content Body */}
      <div className="product-body">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span className="product-category-text">{product.category}</span>
          <button 
            onClick={() => setProductModal(product)} 
            style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem' }}
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>

        <h3 
          className="product-title"
          onClick={() => setProductModal(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.title}
        </h3>

        {/* Rating Row */}
        <div className="product-rating-row">
          <div style={{ display: 'flex', gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                fill={i < Math.floor(product.rating) ? "#F59E0B" : "none"} 
                color="#F59E0B" 
              />
            ))}
          </div>
          <span style={{ fontWeight: 700, color: '#fff' }}>{product.rating}</span>
          <span className="rating-count">({product.reviewsCount.toLocaleString()})</span>
        </div>

        {/* Tariff Pre-Cleared Guarantee Pill */}
        <div className="product-tariff-guarantee">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>
              {product.tariffDutyAmount === 0 ? "DUTY FREE PROMO" : `Tariff Duty Included ($${product.tariffDutyAmount.toFixed(2)})`}
            </span>
          </div>
        </div>

        {/* Stock Level Bar (Temu Style) */}
        {product.isFlashSale && (
          <div className="stock-bar-wrap">
            <div className="stock-bar-bg">
              <div className="stock-bar-fill" style={{ width: `${stockPercentage}%` }}></div>
            </div>
            <span className="stock-text">⚡ {stockPercentage}% Claimed — Only {product.stockTotal - product.stockClaimed} Left!</span>
          </div>
        )}

        {/* Pricing & Add to Cart Action */}
        <div className="product-price-row">
          <div>
            <span className="price-main">{formatPrice(product.price)}</span>
            <span className="price-old">{formatPrice(product.originalPrice)}</span>
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
