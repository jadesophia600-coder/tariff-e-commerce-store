import React from 'react';
import { useShop } from '../context/ShopContext';
import { categories, fallbackProductImage } from '../data/products';
import { Zap, Smartphone, Watch, ShoppingBag, Headphones, Home, Gamepad2, Sparkles, Activity, ArrowRight, Grid } from 'lucide-react';

const iconMap = {
  Zap,
  Smartphone,
  Watch,
  ShoppingBag,
  Headphones,
  Home,
  Gamepad2,
  Sparkles,
  Activity
};

export const CategoryShowcase = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    const catalogElement = document.getElementById('products-grid');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ background: 'rgba(124, 58, 237, 0.15)', padding: '8px', borderRadius: '10px', color: '#7C3AED' }}>
              <Grid size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff' }}>EXPLORE ALL CATEGORIES</h2>
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Browse factory direct items by specialized department</p>
            </div>
          </div>

          <button 
            onClick={() => handleCategoryClick('all')} 
            style={{ color: '#7C3AED', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>View All Items</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Category Photo Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Zap;
            const isSelected = selectedCategory === cat.id;

            return (
              <div 
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  position: 'relative',
                  height: '180px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #7C3AED' : '1px solid var(--border-color)',
                  boxShadow: isSelected ? '0 0 25px rgba(124, 58, 237, 0.4)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="shine-effect category-card-hover"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackProductImage;
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(11, 15, 25, 0.3) 0%, rgba(11, 15, 25, 0.95) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyBinding: 'space-between',
                    padding: '1.25rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ background: isSelected ? '#7C3AED' : 'rgba(11, 15, 25, 0.7)', backdropFilter: 'blur(8px)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <IconComponent size={20} />
                    </div>

                    <span style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '0.725rem', fontWeight: 800, padding: '0.2rem 0.65rem', borderRadius: '20px' }}>
                      {cat.count} Deals
                    </span>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '0 0 2px 0' }}>
                      {cat.name}
                    </h3>
                    <p style={{ color: '#D1D5DB', fontSize: '0.78rem', margin: 0, lineHeight: 1.25, height: '2.4em', overflow: 'hidden' }}>
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
