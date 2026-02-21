/**
 * HARVICS PRODUCT DATA
 * Centralized product catalog with image mapping
 */

const productCatalog = {
  // 1. TEXTILES & APPAREL
  textiles: {
    men: [
      { name: "Formal Suit (3-piece)", keywords: "suit,men", price: "$120 - $250" },
      { name: "Casual Denim Shirt", keywords: "denim,shirt,men", price: "$25 - $45" },
      { name: "Polo T-Shirt", keywords: "polo,shirt,men", price: "$15 - $30" },
      { name: "Leather Jacket", keywords: "leather,jacket,men", price: "$80 - $150" }
    ],
    women: [
      { name: "Evening Gown", keywords: "gown,dress,women", price: "$150 - $300" },
      { name: "Summer Floral Dress", keywords: "floral,dress,women", price: "$35 - $60" },
      { name: "Silk Blouse", keywords: "silk,blouse,women", price: "$40 - $70" },
      { name: "Designer Handbag", keywords: "handbag,fashion", price: "$50 - $120" }
    ],
    kids: [
      { name: "Boys Cotton T-Shirt", keywords: "boy,tshirt", price: "$10 - $20" },
      { name: "Girls Party Dress", keywords: "girl,dress", price: "$25 - $45" },
      { name: "Denim Jeans", keywords: "jeans,kids", price: "$18 - $30" },
      { name: "School Uniform Set", keywords: "uniform,school", price: "$30 - $50" },
      { name: "Winter Hoodie", keywords: "hoodie,kids", price: "$22 - $40" },
      { name: "Soft Cotton Pajamas", keywords: "pajamas,kids", price: "$15 - $25" },
      { name: "School Shoes", keywords: "shoes,school", price: "$25 - $40" },
      { name: "Sneakers", keywords: "sneakers,kids", price: "$20 - $35" }
    ],
    home: [
      { name: "Luxury Bed Sheet Set", keywords: "bedsheet,bedroom", price: "$30 - $60" },
      { name: "Cotton Bath Towels", keywords: "towel,bathroom", price: "$12 - $25" },
      { name: "Decorative Cushions", keywords: "cushion,decor", price: "$15 - $30" },
      { name: "Kitchen Apron", keywords: "apron,kitchen", price: "$10 - $18" }
    ]
  },

  // 2. FMCG (FOOD & BEVERAGE)
  fmcg: {
    staples: [
      { name: "Premium Basmati Rice", keywords: "rice,basmati,grain", price: "$1.50/kg" },
      { name: "Wheat Flour (Atta)", keywords: "flour,wheat", price: "$0.80/kg" },
      { name: "Red Lentils (Masoor)", keywords: "lentils,red", price: "$1.20/kg" },
      { name: "Organic Oats", keywords: "oats,grain", price: "$2.50/kg" }
    ],
    oils: [
      { name: "Sunflower Oil", keywords: "oil,sunflower,bottle", price: "$2.00/L" },
      { name: "Extra Virgin Olive Oil", keywords: "olive,oil", price: "$8.00/L" },
      { name: "Pure Ghee", keywords: "ghee,butter", price: "$10.00/kg" },
      { name: "Whole Spices Mix", keywords: "spices,bowl", price: "$15.00/kg" }
    ],
    packaged: [
      { name: "Instant Noodles", keywords: "noodles,bowl", price: "$0.50/pack" },
      { name: "Chocolate Chip Cookies", keywords: "cookies,chocolate", price: "$1.20/pack" },
      { name: "Potato Chips", keywords: "chips,snack", price: "$0.80/pack" },
      { name: "Canned Sweet Corn", keywords: "corn,canned", price: "$1.00/can" }
    ],
    dairy: [
      { name: "UHT Milk", keywords: "milk,carton", price: "$1.10/L" },
      { name: "Cheddar Cheese", keywords: "cheese,block", price: "$5.00/block" },
      { name: "Fruit Juice Nectar", keywords: "juice,glass", price: "$1.50/L" },
      { name: "Instant Coffee", keywords: "coffee,jar", price: "$6.00/jar" }
    ],
    personalCare: [
      { name: "Herbal Toothpaste", keywords: "toothpaste,tube", price: "$2.00" },
      { name: "Moisturizing Soap", keywords: "soap,bar", price: "$1.00" },
      { name: "Shampoo", keywords: "shampoo,bottle", price: "$3.50" }
    ],
    homeCare: [
      { name: "Laundry Detergent", keywords: "detergent,laundry", price: "$4.00" },
      { name: "Dishwashing Liquid", keywords: "dishwashing,liquid", price: "$1.50" }
    ]
  },

  // 3. INDUSTRIAL & MINERALS
  industrial: [
    { name: "CNC Machining Center", keywords: "cnc,machine,factory", price: "Request Quote" },
    { name: "Industrial Safety Gear", keywords: "helmet,safety,vest", price: "$15 - $50" },
    { name: "Copper Wire Coils", keywords: "copper,wire,industrial", price: "Market Price" },
    { name: "Iron Ore Pellets", keywords: "iron,ore,mining", price: "Market Price" }
  ],

  // 4. COMMODITIES (GLOBAL TRADE)
  commodities: {
    energy: [
      { name: "Crude Oil (Brent / WTI)", keywords: "oil,rig,ocean", price: "Market Price" },
      { name: "Natural Gas (LNG)", keywords: "gas,tanker,ship", price: "Market Price" },
      { name: "Thermal Coal", keywords: "coal,mine", price: "Market Price" },
      { name: "Refined Diesel", keywords: "fuel,truck", price: "Market Price" }
    ],
    metals: [
      { name: "Gold Bullion", keywords: "gold,bars", price: "Market Price" },
      { name: "Silver Ingots", keywords: "silver,metal", price: "Market Price" },
      { name: "Copper Cathodes", keywords: "copper,industrial", price: "Market Price" },
      { name: "Aluminum Ingots", keywords: "aluminum,metal,industrial", price: "Market Price" },
      { name: "Iron Ore", keywords: "iron,ore,mining", price: "Market Price" },
      { name: "Steel Rebar", keywords: "steel,construction", price: "Market Price" }
    ],
    agri: [
      { name: "Wheat Grain", keywords: "wheat,field", price: "Market Price" },
      { name: "White Rice", keywords: "rice,bowl", price: "Market Price" },
      { name: "Yellow Corn", keywords: "corn,field", price: "Market Price" },
      { name: "Soybeans", keywords: "soybean,field", price: "Market Price" },
      { name: "Raw Sugar", keywords: "sugar,cane", price: "Market Price" }
    ],
    edibleOils: [
      { name: "Palm Oil", keywords: "palm,oil,plantation", price: "Market Price" },
      { name: "Soybean Oil", keywords: "soybean,oil", price: "Market Price" },
      { name: "Sunflower Oil", keywords: "sunflower,oil,field", price: "Market Price" },
      { name: "Coffee Beans", keywords: "coffee,beans", price: "Market Price" },
      { name: "Cocoa Beans", keywords: "cocoa,beans", price: "Market Price" }
    ],
    industrialChem: [
      { name: "Urea Fertilizer", keywords: "fertilizer,farm", price: "Market Price" },
      { name: "DAP / Potash", keywords: "fertilizer,chemical", price: "Market Price" },
      { name: "Phosphate Rock", keywords: "rock,mining", price: "Market Price" },
      { name: "Industrial Salt", keywords: "salt,pile", price: "Market Price" },
      { name: "Sulphur", keywords: "sulphur,yellow", price: "Market Price" }
    ],
    protein: [
      { name: "Frozen Beef", keywords: "beef,steak", price: "Market Price" },
      { name: "Frozen Poultry", keywords: "chicken,meat", price: "Market Price" },
      { name: "Fish & Seafood", keywords: "fish,seafood", price: "Market Price" },
      { name: "Soybean Meal", keywords: "soybean,meal,feed", price: "Market Price" }
    ],
    strategic: [
      { name: "Lithium Carbonate", keywords: "lithium,battery", price: "Market Price" },
      { name: "Nickel Ore", keywords: "nickel,ore", price: "Market Price" }
    ]
  },
  
  // 5. GLOBAL SOURCING
  sourcing: [
    { 
        name: "OEM / ODM Manufacturing", 
        keywords: "manufacturing,factory,production", 
        desc: "End-to-end product development and mass production facilities.",
        icon: "🏭"
    },
    { 
        name: "Private Label Development", 
        keywords: "brand,label,design", 
        desc: "Custom branding solutions for retailers and e-commerce.",
        icon: "🏷️"
    },
    { 
        name: "Quality Control & Inspection", 
        keywords: "quality,inspection,checklist", 
        desc: "Rigorous testing and factory audits to ensure compliance.",
        icon: "✅"
    },
    { 
        name: "Global Logistics & Freight", 
        keywords: "logistics,ship,cargo", 
        desc: "Seamless shipping by air, sea, and land.",
        icon: "🚢"
    },
    { 
        name: "Supply Chain Strategy", 
        keywords: "strategy,consulting,meeting", 
        desc: "Optimizing your supply chain for efficiency and cost reduction.",
        icon: "📈"
    },
    { 
        name: "Sustainable Sourcing", 
        keywords: "sustainable,eco,green", 
        desc: "Ethical and eco-friendly sourcing solutions.",
        icon: "🌱"
    },
    { 
        name: "Technology & Innovation", 
        keywords: "technology,ai,blockchain,digital", 
        desc: "AI-powered supplier matching and blockchain traceability.",
        icon: "🤖"
    },
    { 
        name: "Government & Industrial Projects", 
        keywords: "government,infrastructure,epc,building", 
        desc: "Turnkey procurement for public sector and large-scale infrastructure.",
        icon: "🏛️"
    }
  ]
};

/**
 * Helper to get a high-quality Unsplash image based on keywords
 */
const UNSPLASH_MAP = {
    // --- TEXTILES & APPAREL ---
    'suit': 'm0ZBWRYYq7o', // Man in suit
    'men': 'm0ZBWRYYq7o',
    'shirt': 'WBN-J1_w7Rw', // White shirt
    'denim': 'B00k_1iHnZk', // Denim texture
    'polo': 'WBN-J1_w7Rw',
    'leather': 'MQuL6b1_v4E', // Leather jacket/texture
    'jacket': 'MQuL6b1_v4E',
    'gown': '9Pspyy5lEMw', // Elegant dress
    'dress': 'P-J4kbEIEk0', // Floral dress
    'floral': 'P-J4kbEIEk0',
    'silk': 'cjUOhrBquqc', // Silk fabric
    'blouse': 'WBN-J1_w7Rw',
    'handbag': '9Pspyy5lEMw',
    'fashion': '9Pspyy5lEMw',
    'boy': '5UL65v055Fg', // Kid
    'tshirt': 'S-2Uq7sYj30', // T-shirt
    'girl': 'P-J4kbEIEk0',
    'women': '9Pspyy5lEMw',
    'jeans': 'B00k_1iHnZk',
    'kids': '5UL65v055Fg',
    'uniform': 'WBN-J1_w7Rw',
    'school': 'WBN-J1_w7Rw',
    'hoodie': '5UL65v055Fg',
    'pajamas': '5UL65v055Fg',
    'shoes': 'WBN-J1_w7Rw',
    'sneakers': 'WBN-J1_w7Rw',
    'bedsheet': 'G7sE2S4Lab4', // Luxury Bedding
    'bedroom': 'G7sE2S4Lab4',
    'towel': '8wTPqxlnKM4', // Towels
    'bathroom': '8wTPqxlnKM4',
    'cushion': 'G7sE2S4Lab4',
    'decor': 'G7sE2S4Lab4',
    'apron': 'WBN-J1_w7Rw',
    'kitchen': '8wTPqxlnKM4',

    // --- FMCG (FOOD & BEVERAGE) ---
    'rice': 'VmBToKkQ8ac', // Rice bowl
    'basmati': 'VmBToKkQ8ac',
    'grain': 'VmBToKkQ8ac',
    'flour': 'KxJ8r8yqQ7o', // Flour/Wheat
    'wheat': 'KxJ8r8yqQ7o',
    'lentils': 'uDnW85d_N7w', // Spices/Legumes
    'red': 'uDnW85d_N7w',
    'oats': 'KxJ8r8yqQ7o',
    'oil': 'PLyJqE4_W3I', // Olive Oil/Cooking Oil
    'sunflower': 'PLyJqE4_W3I',
    'bottle': 'PLyJqE4_W3I',
    'olive': 'PLyJqE4_W3I',
    'ghee': 'PLyJqE4_W3I',
    'butter': 'PLyJqE4_W3I',
    'spices': 'uDnW85d_N7w', // Spices market
    'bowl': 'VmBToKkQ8ac',
    'noodles': 'VmBToKkQ8ac',
    'cookies': 'S-2Uq7sYj30', // Generic food
    'chocolate': 'S-2Uq7sYj30',
    'chips': 'S-2Uq7sYj30',
    'snack': 'S-2Uq7sYj30',
    'corn': 'KxJ8r8yqQ7o',
    'canned': 'PLyJqE4_W3I',
    'milk': '8wTPqxlnKM4', // Clean white/dairy vibe
    'carton': '8wTPqxlnKM4',
    'cheese': '8wTPqxlnKM4',
    'block': '8wTPqxlnKM4',
    'juice': 'PLyJqE4_W3I',
    'glass': 'PLyJqE4_W3I',
    'coffee': 'n_3kdpSkrKw', // Coffee beans
    'jar': 'n_3kdpSkrKw',
    'toothpaste': 't8hTmte4Oyo', // Soap/Personal care
    'tube': 't8hTmte4Oyo',
    'soap': 't8hTmte4Oyo',
    'bar': 't8hTmte4Oyo',
    'shampoo': 't8hTmte4Oyo',
    'detergent': '8wTPqxlnKM4',
    'laundry': '8wTPqxlnKM4',
    'dishwashing': '8wTPqxlnKM4',
    'liquid': 'PLyJqE4_W3I',

    // --- INDUSTRIAL & MINERALS ---
    'cnc': 'Cj4_Q-l_s4I', // CNC Machine/Factory
    'machine': 'Cj4_Q-l_s4I',
    'factory': 'H6d6jIaO9WE', // Large factory
    'helmet': 'tE6th1h6Bfk', // Safety gear
    'safety': 'tE6th1h6Bfk',
    'vest': 'tE6th1h6Bfk',
    'copper': 'B00k_1iHnZk', // Metallic texture (placeholder)
    'wire': 'B00k_1iHnZk',
    'industrial': 'H6d6jIaO9WE',
    'iron': 'H6d6jIaO9WE',
    'ore': 'H6d6jIaO9WE',
    'mining': 'H6d6jIaO9WE',

    // --- COMMODITIES ---
    'rig': 'Ej2FQy1W7z4', // Oil Rig
    'ocean': 'Ej2FQy1W7z4',
    'gas': 'Ej2FQy1W7z4',
    'tanker': '0A7YwYhZhWw', // Ship
    'ship': '0A7YwYhZhWw',
    'coal': 'H6d6jIaO9WE',
    'mine': 'H6d6jIaO9WE',
    'fuel': 'Ej2FQy1W7z4',
    'truck': '0A7YwYhZhWw',
    'gold': 'ktXmcyqYx54', // Gold bars
    'bars': 'ktXmcyqYx54',
    'silver': 'ktXmcyqYx54', // Use gold as precious metal fallback
    'metal': 'ktXmcyqYx54',
    'aluminum': 'H6d6jIaO9WE',
    'steel': 'H6d6jIaO9WE',
    'construction': 'H6d6jIaO9WE',
    'field': '_rXmtIMnOT8', // Wheat field
    'soybean': '_rXmtIMnOT8',
    'sugar': '_rXmtIMnOT8',
    'cane': '_rXmtIMnOT8',
    'palm': '_rXmtIMnOT8',
    'plantation': '_rXmtIMnOT8',
    'beans': 'n_3kdpSkrKw', // Coffee beans
    'cocoa': 'n_3kdpSkrKw',
    'fertilizer': '_rXmtIMnOT8',
    'farm': '_rXmtIMnOT8',
    'chemical': 'H6d6jIaO9WE',
    'rock': 'H6d6jIaO9WE',
    'salt': 'H6d6jIaO9WE',
    'pile': 'H6d6jIaO9WE',
    'sulphur': 'H6d6jIaO9WE',
    'yellow': 'H6d6jIaO9WE',
    'beef': 'uDnW85d_N7w', // Meat/Food
    'steak': 'uDnW85d_N7w',
    'poultry': 'uDnW85d_N7w',
    'chicken': 'uDnW85d_N7w',
    'meat': 'uDnW85d_N7w',
    'fish': 'uDnW85d_N7w',
    'seafood': 'uDnW85d_N7w',
    'meal': 'uDnW85d_N7w',
    'feed': '_rXmtIMnOT8',
    'lithium': 'ktXmcyqYx54', // Precious material
    'battery': 'ktXmcyqYx54',
    'nickel': 'H6d6jIaO9WE',

    // --- SOURCING & LOGISTICS ---
    'home': '1616486338812-3dadae4b4f9d', // Home Textiles
    'curtains': 'cjUOhrBquqc', // Silk/Curtains
    'bedding': '1522771753035-48498225e6ab', // Bedding
    'towels': 'm8wsQ_8cd2M', // Towels stack
    'office': '1497366216548-37526070297c', // Corporate Office
    'meeting': '1556761175-5973dc0f32e7', // Business Meeting
    'strategy': '1454165804606-c3d57bc86b40', // Global Strategy
    'logistics': '0A7YwYhZhWw', // Container Ship
    'manufacturing': '1565514020176-db5928a57342', // Manufacturing
    'team': '1522071820081-009f0129c71c', // Diverse Team
    'partnership': '1521791136064-7986c2920216', // Partnership
    'fmcg': '1542838132-92c53300491e', // FMCG Generic
    'textiles': '1523381210434-271e8be1f52b', // Textiles Generic
    'industrial': '1504917595217-d4dc5ebe6122', // Industrial Power
    'building': '1486406146926-c627a92ad1ab', // Modern Building
    'map': '1524661135-423995f22d0b', // World Map
    'email': '1596524430623-6ce64b9c546a', // Typing
    'phone': '1516321318423-f06f85e504b3', // Communication

    // --- DEFAULTS ---
    'default': 'H6d6jIaO9WE' // Industrial Factory as generic fallback
};

/**
 * Helper function to get image URL from keywords
 * @param {string} keywords - Comma separated keywords
 * @returns {string} - Image URL
 */










function getProductImage(keywords) {
    if (!keywords) return `https://images.unsplash.com/photo-${UNSPLASH_MAP.default}?auto=format&fit=crop&w=600&q=80`;
    
    const keys = keywords.toLowerCase().split(',').map(k => k.trim());
    
    for (const key of keys) {
        if (UNSPLASH_MAP[key]) {
            const val = UNSPLASH_MAP[key];
            // Check if it's a local path or Unsplash ID
            if (val.includes('/') || val.includes('.')) {
                return val;
            } else {
                return `https://images.unsplash.com/photo-${val}?auto=format&fit=crop&w=600&q=80`;
            }
        }
    }
    
    // Try partial matches
    for (const key of keys) {
        for (const mapKey in UNSPLASH_MAP) {
            if (mapKey.includes(key) || key.includes(mapKey)) {
                 const val = UNSPLASH_MAP[mapKey];
                 if (val.includes('/') || val.includes('.')) {
                    return val;
                } else {
                    return `https://images.unsplash.com/photo-${val}?auto=format&fit=crop&w=600&q=80`;
                }
            }
        }
    }
    
    return `https://images.unsplash.com/photo-${UNSPLASH_MAP.default}?auto=format&fit=crop&w=600&q=80`;
}

/**
 * Helper to render a product grid
 * @param {string} containerId - ID of the container element
 * @param {Array} products - Array of product objects
 */
function renderProductGrid(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = products.map(product => {
        const imageUrl = getProductImage(product.keywords);
        return `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;"></div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
            </div>
        </div>
        `;
    }).join('');
}
