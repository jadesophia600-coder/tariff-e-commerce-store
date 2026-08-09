import React from 'react';
import { useShop } from '../context/ShopContext';
import { categories } from '../data/products';
import { Zap, Smartphone, Watch, ShoppingBag, Headphones, Home, Gamepad2 } from 'lucide-react';

const iconMap = {
  Zap,
  Smartphone,
  Watch,
  ShoppingBag,
  Headphones,
  Home,
  Gamepad2
};

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  return (
    <div className="category-bar-section">
      <div className="container">
        <div className="category-scroll-wrapper">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Zap;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <IconComponent size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
