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

// Photo pools for category-matched rendering
const photoPools = {
  electronics: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  ],
  wearables: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80'
  ],
  audio: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
  ],
  hometech: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80'
  ],
  gaming: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80'
  ],
  sports: [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
  ]
};

const prefixList = ['Tariff Cyber', 'Tariff Apex', 'Tariff Pulse', 'Tariff Matrix', 'Tariff Quantum', 'Tariff Pro', 'Tariff Horizon', 'Tariff Stealth', 'Tariff Nova', 'Tariff Titan', 'Tariff Sonic', 'Tariff Aero', 'Tariff Lumina', 'Tariff Edge', 'Tariff Elite'];

const categoryNouns = {
  electronics: ['Ultra Phone 5G', 'Foldable OLED Phone', '4K Pro Drone', 'Slim Metal Laptop', 'Curved 165Hz Monitor', 'Mini Projection Hub', 'Wireless Charger Pad', 'PowerBank 30000mAh', '8K Action Cam'],
  wearables: ['OLED Smartwatch', 'Biomark Ring', 'Fitness Tracker Band', 'Solar GPS Watch', 'Pulse HR Monitor', 'ECG Smart Band', 'Titanium Sport Watch'],
  fashion: ['LED Sneakers', 'Cyberpunk Backpack', 'Reflective Hoodie', 'Waterproof Parka', 'Streetwear Joggers', 'Modular Waist Bag', 'Techwear Vest'],
  audio: ['ANC Headphones', 'Pods Ultra Earbuds', 'Bone Conduction Headset', 'RGB Desktop Speaker', 'Hi-Fi DAC Amplifier', 'Studio Monitor Buds'],
  hometech: ['Robot Vacuum Cleaner', 'Ambient Light Bar', 'Smart Air Purifier', 'HD Security Cam', 'Smart Door Lock', 'Automatic Soap Dispenser'],
  gaming: ['RGB Mechanical Keyboard', 'Ultra Light Mouse', '4K VR Glasses Kit', 'Haptic Gamepad', 'Gaming Headset Stand', 'Streamer Mic Arm'],
  beauty: ['Microcurrent Facial Wand', 'Ionic Hair Dryer', 'LED Therapy Mask', 'Ultrasonic Skin Scrubber', 'Hot Air Styler', 'Electric Cleansing Brush'],
  sports: ['Percussion Massage Gun', 'Smart Jump Rope', 'Resistance Band Set', 'Hydration Vest', 'Smart Dumbbell Set', 'Recovery Compression Boots']
};

// Deterministic generator function for 1,500 products per category
export function generateProductsForCategory(category, count = 1500) {
  const photos = photoPools[category] || photoPools.electronics;
  const nouns = categoryNouns[category] || categoryNouns.electronics;
  
  const generated = [];
  for (let i = 1; i <= count; i++) {
    const prefix = prefixList[i % prefixList.length];
    const noun = nouns[i % nouns.length];
    const modelNum = 100 + (i * 7) % 900;
    const title = `${prefix} ${noun} ${modelNum} Series`;

    const basePrice = Number((15 + (i * 13.5) % 285).toFixed(2));
    const discount = 50 + (i * 3) % 41; // 50% to 90% off
    const origPrice = Number((basePrice / (1 - discount / 100)).toFixed(2));
    const rating = Number((4.3 + (i % 8) * 0.1).toFixed(1));
    const reviews = 350 + (i * 47) % 15000;
    const stockTotal = 50 + (i * 11) % 200;
    const stockClaimed = Math.floor(stockTotal * (0.6 + (i % 35) * 0.01));
    const isFlash = (i % 3 === 0);
    const tariffDuty = (i % 4 === 0) ? 0.00 : Number(((i % 5) * 1.25).toFixed(2));

    generated.push({
      id: `prod-${category}-${i}`,
      title,
      category,
      price: basePrice,
      originalPrice: origPrice,
      discountPercent: discount,
      rating,
      reviewsCount: reviews,
      image: photos[i % photos.length],
      stockTotal,
      stockClaimed,
      isFlashSale: isFlash,
      tariffRatePercent: (i % 4 === 0) ? 0 : 5,
      tariffDutyAmount: tariffDuty,
      guaranteedDeliveryDays: `${2 + (i % 3)}-${4 + (i % 3)} Days Express`,
      description: `Factory-direct premium ${noun.toLowerCase()} featuring high-grade engineering, long battery life, and 100% tax pre-cleared doorstep delivery.`,
      features: ['Factory Direct Warranty', 'Pre-Cleared Customs Tax', 'Heavy Duty Quality', 'Global Logistics Guaranteed'],
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
