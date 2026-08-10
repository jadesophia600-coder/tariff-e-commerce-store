import React from 'react';
import { useShop } from '../context/ShopContext';
import { SlidersHorizontal, ArrowUpDown, Tag } from 'lucide-react';

export const FilterBar = ({ totalCount }) => {
  const { 
    sortBy, 
    setSortBy, 
    priceFilterMax, 
    setPriceFilterMax,
    formatPrice,
    selectedCategory,
    setSelectedCategory
  } = useShop();

  return (
    <div 
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1rem 1.5rem',
        marginBottom: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      
      {/* Total Items Found */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Tag size={18} color="var(--primary)" />
        <span style={{ color: '#0F172A', fontWeight: 800, fontSize: '1rem' }}>
          {totalCount} {totalCount === 1 ? 'Product' : 'Products'} Available
        </span>
        {selectedCategory !== 'all' && (
          <button 
            onClick={() => setSelectedCategory('all')} 
            style={{ color: '#DC2626', fontSize: '0.8rem', fontWeight: 700, marginLeft: '0.5rem', textDecoration: 'underline' }}
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Filter Controls (Price Slider & Sorting) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', flexWrap: 'wrap' }}>
        
        {/* Price Slider Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <SlidersHorizontal size={16} color="#64748B" />
          <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Max Price:</span>
          <input
            type="range"
            min="20000"
            max="2000000"
            step="10000"
            value={priceFilterMax}
            onChange={(e) => setPriceFilterMax(Number(e.target.value))}
            style={{ accentColor: 'var(--primary)', cursor: 'pointer', width: '130px' }}
          />
          <span style={{ color: 'var(--secondary)', fontWeight: 800, fontSize: '0.9rem' }}>
            {formatPrice(priceFilterMax)}
          </span>
        </div>

        {/* Sort Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={16} color="#64748B" />
          <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="popular">Most Popular</option>
            <option value="discount">Highest Discount %</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Customer Rated</option>
          </select>
        </div>

      </div>

    </div>
  );
};
