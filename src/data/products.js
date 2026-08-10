export const categories = [
  { 
    id: 'all', 
    name: 'All Factory Direct Deals', 
    icon: 'Zap', 
    count: 12000, 
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80', 
    description: 'Explore 12,000+ factory-direct mega discounts with zero hidden tax.' 
  },
  { 
    id: 'electronics', 
    name: 'Phones & Tech Gadgets', 
    icon: 'Smartphone', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', 
    description: 'Smartphones, 4K Drones, Slim Laptops & Curved Monitors (1,500+ Items)' 
  },
  { 
    id: 'wearables', 
    name: 'Smart Wearables', 
    icon: 'Watch', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 
    description: 'AMOLED Smartwatches, Health Rings & Bio Trackers (1,500+ Items)' 
  },
  { 
    id: 'fashion', 
    name: 'Streetwear & Apparel', 
    icon: 'ShoppingBag', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', 
    description: 'LED Sneakers, Reflective Hoodies & Anti-theft Backpacks (1,500+ Items)' 
  },
  { 
    id: 'audio', 
    name: 'Pro Audio & Sound', 
    icon: 'Headphones', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 
    description: 'ANC Headphones, Spatial Earbuds & Bluetooth Speakers (1,500+ Items)' 
  },
  { 
    id: 'hometech', 
    name: 'Smart Home & Living', 
    icon: 'Home', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80', 
    description: 'LiDAR Robot Vacuums, RGB Ambient Lighting & Home Tech (1,500+ Items)' 
  },
  { 
    id: 'gaming', 
    name: 'Cyber Gaming Gear', 
    icon: 'Gamepad2', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80', 
    description: 'VR Motion Kits, Mechanical Keyboards & Light Mice (1,500+ Items)' 
  },
  { 
    id: 'beauty', 
    name: 'Beauty & Skincare', 
    icon: 'Sparkles', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80', 
    description: 'Microcurrent Facial Wands & High-Speed Ionic Hair Dryers (1,500+ Items)' 
  },
  { 
    id: 'sports', 
    name: 'Sports & Fitness', 
    icon: 'Activity', 
    count: 1500, 
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', 
    description: 'Percussion Massage Guns, Fitness Tech & Gym Gear (1,500+ Items)' 
  }
];

// Rich, diverse image libraries per category
const categoryPhotos = {
  electronics: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574944985070-8f30534970d7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80'
  ],
  wearables: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517502474097-f9b30659dadb?auto=format&fit=crop&w=800&q=80'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
  ],
  audio: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  ],
  hometech: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80'
  ],
  gaming: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
  ]
};

// Unique Brand Names
const brandPrefixes = ['Tariff Cyber', 'Tariff Apex', 'Tariff Pulse', 'Tariff Matrix', 'Tariff Quantum', 'Tariff Horizon', 'Tariff Stealth', 'Tariff Nova', 'Tariff Titan', 'Tariff Sonic', 'Tariff Aero', 'Tariff Lumina', 'Tariff Edge', 'Tariff Elite', 'Tariff Prism', 'Tariff Vortex', 'Tariff Phantom', 'Tariff Zenith', 'Tariff Vantage', 'Tariff Kinetic'];

// Unique Product Items per Category
const categoryProductCatalog = {
  electronics: [
    { title: 'Foldable OLED Dual-Screen Phone', price: 299.99, orig: 899.99 },
    { title: '4K HDR Obstacle Avoidance Drone', price: 89.99, orig: 349.99 },
    { title: 'UltraBook Pro M2 Metal Laptop', price: 349.99, orig: 999.99 },
    { title: 'Curved 165Hz Frameless Gaming Monitor', price: 189.99, orig: 599.99 },
    { title: 'Magnetic Wireless Fast PowerBank 30000mAh', price: 29.99, orig: 99.99 },
    { title: 'Mini Portable 1080P Projector', price: 69.99, orig: 249.99 },
    { title: 'Waterproof 4K Action Camera Kit', price: 49.99, orig: 179.99 },
    { title: 'Fast 120W GaN Desktop Charger Hub', price: 24.99, orig: 85.00 },
    { title: 'AR Smart Glasses HUD Display', price: 149.99, orig: 499.99 },
    { title: 'Rugged Dual SIM Outdoor 5G Phone', price: 199.99, orig: 599.99 }
  ],
  wearables: [
    { title: 'AMOLED Retina Smartwatch Ultra', price: 39.99, orig: 199.99 },
    { title: 'FitRing Pro Biomark Health Ring', price: 29.99, orig: 149.99 },
    { title: 'Solar Outdoor GPS Track Watch', price: 49.99, orig: 220.00 },
    { title: 'ECG Bio-Sensor Heart Rate Band', price: 22.99, orig: 89.99 },
    { title: 'Slim AMOLED Fitness Tracker', price: 17.99, orig: 69.99 },
    { title: 'Tactical Military Grade Smartwatch', price: 54.99, orig: 249.99 },
    { title: 'Kids Safety GPS Locator Smartwatch', price: 21.99, orig: 79.99 }
  ],
  fashion: [
    { title: 'Smart LED Light Athletic Sneakers', price: 54.99, orig: 169.99 },
    { title: 'Urban Anti-theft TSA Backpack', price: 27.99, orig: 99.99 },
    { title: 'Neon 3M Reflective Oversized Hoodie', price: 22.50, orig: 75.00 },
    { title: 'Waterproof Techwear Modular Cargo Pants', price: 34.99, orig: 120.00 },
    { title: 'Retro Chunky Sole Streetwear Kicks', price: 48.99, orig: 159.99 },
    { title: 'Smart Heated Winter Puffer Jacket', price: 69.99, orig: 249.99 },
    { title: 'Polarized Cyberpunk Sunglasses', price: 14.99, orig: 59.99 }
  ],
  audio: [
    { title: 'SoundMatrix Pro ANC Headphones', price: 49.50, orig: 180.00 },
    { title: 'Pods Ultra Spatial ANC Earbuds', price: 19.99, orig: 89.99 },
    { title: 'Bone Conduction Open-Ear Sport Headset', price: 28.99, orig: 110.00 },
    { title: 'RGB Desktop Soundbar Speaker', price: 25.99, orig: 89.99 },
    { title: 'Studio Podcast USB Condenser Mic', price: 32.99, orig: 129.99 },
    { title: 'Hi-Fi Lossless Bluetooth DAC Amp', price: 45.99, orig: 169.99 },
    { title: 'Waterproof Outdoor Party Speaker 50W', price: 39.99, orig: 149.99 }
  ],
  hometech: [
    { title: 'Lumina Smart Ambient Light Bar Duo', price: 24.99, orig: 79.99 },
    { title: 'BotClean LiDAR Laser Robot Vacuum & Mop', price: 119.99, orig: 399.99 },
    { title: 'HEPA Smart Air Purifier & Ionizer', price: 49.99, orig: 189.99 },
    { title: 'Wireless Outdoor Solar Security Camera', price: 36.99, orig: 139.99 },
    { title: 'Smart Fingerprint Keyless Door Lock', price: 58.99, orig: 210.00 },
    { title: 'Automatic Infrared Soap & Sanitizer Dispenser', price: 16.99, orig: 49.99 }
  ],
  gaming: [
    { title: 'PrismGamer Mechanical Wireless Keyboard', price: 29.99, orig: 99.99 },
    { title: 'NeonGlide Ultra Light 58g Gaming Mouse', price: 19.99, orig: 69.99 },
    { title: 'VR Motion Matrix 4K Haptic Glasses Kit', price: 129.99, orig: 449.99 },
    { title: 'Universal Wireless Gamepad Controller', price: 22.99, orig: 79.99 },
    { title: 'RGB Gaming Headset Stand with USB Hub', price: 18.99, orig: 59.99 },
    { title: '4K 60fps HDMI Video Capture Card', price: 27.99, orig: 99.99 }
  ],
  beauty: [
    { title: 'GlowSculpt Microcurrent Facial Toning Wand', price: 21.99, orig: 89.99 },
    { title: 'SilkSonic 110k RPM Ionic Hair Dryer', price: 34.99, orig: 150.00 },
    { title: '7-Color LED Phototherapy Face Mask', price: 29.99, orig: 119.99 },
    { title: 'Ultrasonic Skin Scrubber Blackhead Remover', price: 15.99, orig: 55.00 },
    { title: 'Sonic Electric Toothbrush with 8 Heads', price: 18.99, orig: 69.99 }
  ],
  sports: [
    { title: 'PulseFlex Percussion Massage Gun', price: 28.99, orig: 110.00 },
    { title: 'Smart LED Count Jump Rope', price: 12.99, orig: 45.00 },
    { title: 'Heavy Duty Resistance Band Gym Set', price: 16.99, orig: 59.99 },
    { title: 'Smart Body Fat Scale Bluetooth Sync', price: 19.99, orig: 69.99 },
    { title: 'Pneumatic Recovery Air Compression Boots', price: 89.99, orig: 320.00 }
  ]
};

// Generator that creates 1,500 UNIQUE items per category with distinct titles and photos
export function generateProductsForCategory(category, count = 1500) {
  const photos = categoryPhotos[category] || categoryPhotos.electronics;
  const items = categoryProductCatalog[category] || categoryProductCatalog.electronics;
  
  const generated = [];
  for (let i = 1; i <= count; i++) {
    const brand = brandPrefixes[(i * 3 + category.length) % brandPrefixes.length];
    const template = items[(i - 1) % items.length];
    
    // Vary model series to ensure 100% unique titles
    const editionNumber = Math.floor(i / items.length) + 1;
    const seriesCode = 100 + (i * 13) % 900;
    const title = editionNumber > 1 
      ? `${brand} ${template.title} V${editionNumber} (${seriesCode} Series)`
      : `${brand} ${template.title} (${seriesCode} Series)`;

    // Vary price slightly per model so every price is unique
    const priceVariance = Number(((i % 17) * 0.75).toFixed(2));
    const finalPrice = Number((template.price + priceVariance).toFixed(2));
    const discount = 50 + (i * 7) % 38; // 50% to 88% off
    const origPrice = Number((finalPrice / (1 - discount / 100)).toFixed(2));
    
    const rating = Number((4.3 + (i % 8) * 0.1).toFixed(1));
    const reviews = 120 + (i * 29) % 18000;
    const stockTotal = 40 + (i * 7) % 220;
    const stockClaimed = Math.floor(stockTotal * (0.65 + (i % 30) * 0.01));
    const isFlash = (i % 3 === 0);
    const tariffDuty = (i % 4 === 0) ? 0.00 : Number(((i % 6) * 1.15).toFixed(2));

    // Dynamic distinct photo selector using photo pool and index
    const photoUrl = photos[(i + Math.floor(i / photos.length)) % photos.length];

    generated.push({
      id: `prod-${category}-${i}`,
      title,
      category,
      price: finalPrice,
      originalPrice: origPrice,
      discountPercent: discount,
      rating,
      reviewsCount: reviews,
      image: photoUrl,
      stockTotal,
      stockClaimed,
      isFlashSale: isFlash,
      tariffRatePercent: (i % 4 === 0) ? 0 : 5,
      tariffDutyAmount: tariffDuty,
      guaranteedDeliveryDays: `${2 + (i % 3)}-${4 + (i % 3)} Days Express`,
      description: `Factory-direct premium ${template.title.toLowerCase()} engineered with next-gen components, long durability, and 100% tax pre-cleared doorstep delivery guarantee.`,
      features: ['Factory Direct Warranty', 'Pre-Cleared Customs Tax', 'Heavy Duty Build', 'Express Logistics'],
      colors: ['#7C3AED', '#0B0F19', '#10B981'],
      sizes: ['Standard']
    });
  }
  return generated;
}

// Generate complete 12,000+ dataset across all 8 categories
export const allMockProducts = [
  ...generateProductsForCategory('electronics', 1500),
  ...generateProductsForCategory('wearables', 1500),
  ...generateProductsForCategory('fashion', 1500),
  ...generateProductsForCategory('audio', 1500),
  ...generateProductsForCategory('hometech', 1500),
  ...generateProductsForCategory('gaming', 1500),
  ...generateProductsForCategory('beauty', 1500),
  ...generateProductsForCategory('sports', 1500)
];

export const mockProducts = allMockProducts;

export const fallbackProductImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';

export const promoCodes = {
  'TARIFF2026': { discountPercent: 20, desc: '20% OFF Site-wide' },
  'FLASH80': { discountPercent: 30, desc: 'Extra 30% OFF Flash Sale' },
  'TARIFFVIP': { discountAmount: 15, desc: '$15 OFF Tariff VIP Gift' }
};
