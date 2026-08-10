import React from 'react';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

export const ProductSection = ({ 
  title, 
  subtitle, 
  icon: IconComponent, 
  products = [], 
  badgeText, 
  bgAlt = false,
  sectionId
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section 
      id={sectionId}
      style={{
        padding: '2.5rem 0',
        backgroundColor: bgAlt ? 'var(--bg-section-alt)' : 'transparent',
        borderTop: bgAlt ? '1px solid var(--border-color)' : 'none',
        borderBottom: bgAlt ? '1px solid var(--border-color)' : 'none',
        marginBottom: bgAlt ? '0' : '1.5rem'
      }}
    >
      <div className="container">
        
        {/* Section Header Row */}
        <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
          <div className="section-title-wrap">
            {IconComponent && (
              <div style={{ background: 'var(--primary-light)', padding: '10px', borderRadius: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                <IconComponent size={24} />
              </div>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 className="section-title">{title}</h2>
                {badgeText && (
                  <span className="badge-tariff-free" style={{ fontSize: '0.725rem' }}>
                    {badgeText}
                  </span>
                )}
              </div>
              {subtitle && <p style={{ color: '#64748B', fontSize: '0.875rem', marginTop: '2px' }}>{subtitle}</p>}
            </div>
          </div>

          <a href="#products-grid" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Explore All</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid" style={{ marginBottom: 0 }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
