import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Clock, TrendingUp, X, Sparkles, ArrowRight } from 'lucide-react';

export const SearchAutocomplete = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    recentSearches, 
    addRecentSearch, 
    clearRecentSearches, 
    products, 
    addToast 
  } = useShop();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trendingKeywords = [
    'iPhone 15 Pro Max',
    'Samsung S24 Ultra',
    'Air Fryer Ninja',
    'Nike Air Max 270',
    'MacBook Air M3',
    'Dyson Airwrap Styler',
    'Sony WH-1000XM5',
    'CeraVe Cleanser'
  ];

  // Match live product titles
  const liveMatches = searchQuery.trim() 
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const handleSelectSearch = (term) => {
    setSearchQuery(term);
    addRecentSearch(term);
    setIsOpen(false);

    const matches = products.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
    addToast(`Searching for "${term}" — Found ${matches.length} products!`, 'success');

    const catalogElement = document.getElementById('products-grid');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    handleSelectSearch(searchQuery.trim());
  };

  return (
    <div ref={containerRef} className="search-container">
      <form onSubmit={handleFormSubmit}>
        <div className="search-input-wrap">
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '8px' }} />
          <input
            type="text"
            className="search-input"
            placeholder="Search iPhone 15, Samsung S24, Air Fryer, Sneakers, Laptops..."
            value={searchQuery}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
          />

          {searchQuery && (
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              style={{ color: 'var(--text-muted)', padding: '0 4px', marginRight: '6px' }}
            >
              <X size={16} />
            </button>
          )}

          <button type="submit" className="search-btn" title="Click to search catalog">
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Autocomplete & Suggestions Dropdown Panel */}
      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '115%',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 1000,
            padding: '1.25rem',
            overflow: 'hidden'
          }}
          className="animate-pop-in"
        >
          {/* Live Product Matches */}
          {liveMatches.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={13} /> Product Matches ({liveMatches.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {liveMatches.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSearch(item.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: 'var(--bg-section-alt)',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    <img src={item.image} alt={item.title} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain' }} />
                    <div style={{ flex: 1, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', height: '1.4em', overflow: 'hidden' }}>
                      {item.title}
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--secondary)' }}>
                      ₦{item.priceNGN.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> Recent Searches
                </div>
                <button onClick={clearRecentSearches} style={{ fontSize: '0.725rem', color: '#DC2626', fontWeight: 700 }}>
                  Clear
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSearch(term)}
                    style={{
                      background: 'var(--bg-section-alt)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={13} /> Trending Searches in Nigeria
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
              {trendingKeywords.map((term, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSearch(term)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: 'var(--text-main)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: 'transparent'
                  }}
                  className="category-card-hover"
                >
                  <span>🔥 {term}</span>
                  <ArrowRight size={13} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
