import React from 'react';
import { useShop } from '../context/ShopContext';
import { SlidersHorizontal, ArrowUpDown, DollarSign, Star, Zap } from 'lucide-react';

export const FilterBar = ({ totalCount }) => {
  const { 
    sortBy, 
    setSortBy, 
    priceFilterMax, 
    setPriceFilterMax,
    formatPrice
  } = useShop();

  return (
    <div style={{ background: 'rgba(18, 24, 38, 0.65)', backdropFilter: 'blur(12px)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
      
      {/* Result Count & Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <SlidersHorizontal size={18} color="#7C3AED" />
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>
          Catalog Filters
        </span>
        <span style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#A78BFA', padding: '0.15rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
          {totalCount} Deals Available
        </span>
      </div>

      {/* Interactive Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Price Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#9CA3AF' }}>
          <span>Max Price: <strong style={{ color: '#10B981' }}>{formatPrice(priceFilterMax)}</strong></span>
          <input 
            type="range" 
            min="20" 
            max="400" 
            value={priceFilterMax} 
            onChange={(e) => setPriceFilterMax(Number(e.target.value))}
            style={{ accentColor: '#7C3AED', cursor: 'pointer', width: '130px' }}
          />
        </div>

        {/* Sorting Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={15} color="#9CA3AF" />
          <span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Sort:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#0B0F19',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="popular">🔥 Most Popular Blitz Deals</option>
            <option value="discount">⚡ Highest Discount %</option>
            <option value="price-low">💲 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
            <option value="rating">⭐ Top Rated Buyers Choice</option>
          </select>
        </div>

      </div>

    </div>
  );
};
