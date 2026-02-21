/**
 * HARVICS GLOBAL SCRIPT
 * Handles Localization, AI Assistant, Sliders, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modules
  initLocalization();
  initMegaMenu();
  initSliders();
  initNewsletter();
  initClock();
  initIndustryShowcase();
  initHomepageImages();
  initScrollReveal();
  initExtras();
});

/* =========================================
   6. SCROLL REVEAL (Apple Style)
   ========================================= */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger specific animations for How We Work
        if (entry.target.id === 'howwework') {
          const bars = entry.target.querySelectorAll('.bar .run');
          setTimeout(() => {
            bars.forEach(bar => {
              // Assuming bar width is set via inline style or dataset
              // If previously set to 0, restore it. 
              // For simplicity, we assume CSS transition handles width change if class added
              // But original code used dataset.width. Let's support that.
              if(bar.dataset.width) bar.style.width = bar.dataset.width;
            });
          }, 300);
        }
        
        obs.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* =========================================
   1. LOCALIZATION & AI ENGINE
   ========================================= */
const intelligenceLayer = (function () {
  const messages = {
    en: {
      brandName: "HARVICS",
      languageLabel: "Language",
      login: "Login",
      navAbout: "About Us",
      navTextiles: "Textiles & Apparels",
      navFmcg: "FMCG",
      navSourcing: "Sourcing Solutions",
      navMinerals: "Minerals",
      navCommodities: "Commodities",
      navIndustrial: "Industrial Solutions",
      navFinance: "Finance & HPay",
      navAI: "AI & Technology",
      navRealEstate: "Real Estate",
      navOilGas: "Oil & Gas",
      // Footer & General
      footerDesc: "Your trusted global partner for sourcing, manufacturing, and supply chain solutions. Connecting markets, delivering excellence.",
      footerCol1: "Company",
      footerCol2: "Sectors",
      footerCol3: "Resources",
      footerCol4: "Newsletter",
      btnJoin: "Join",
      emailPlaceholder: "Your email address",
      // Categories
      catMen: "Men",
      catLadies: "Ladies",
      catKids: "Kids",
      catHomeTextiles: "Home Textiles",
      catLingerie: "Lingerie",
      catKitchen: "Kitchen",
      catTowels: "Towels",
      catShoes: "Shoes",
      catXyz: "XYZ",
      
      // Footer Titles
      ftInd: "Industries",
      ftCo: "Company",
      ftStay: "Stay Updated",
      
      // Footer Links
      ftCar: "Careers",
      ftSus: "Sustainability",
      ftNews: "News & Insights",
      ftCont: "Contact",
      ftPriv: "Privacy Policy",
      ftTerms: "Terms of Service",
      ftMap: "Sitemap",
      
      // Footer Desc
      ftSub: "Subscribe to our newsletter for the latest market trends.",
      ftCopy: "Harvics Global Ventures. All rights reserved.",
      
      // About Section
      abtQuote: "“Global supply chains were never built for today’s complexity. Harvics was created to change that.”",
      abtFounderText: "With HARVICS OS, we bring intelligence, clarity, and precision to how energy, goods, and capital move across global markets — enabling enterprises to operate with confidence.",
      abtFounderTitle: "Founder & CEO, Harvics",
      abtTitle: "About Us",
      abtP1: "Harvics is an AI-native sourcing and supply-chain intelligence company operating across energy, oil & gas, industrial goods, technology, real-estate-linked assets, and financial solutions.",
      abtP2: "Powered by HARVICS OS, our proprietary operating system, we connect origins, logistics, markets, and capital into a single intelligent framework. This enables enterprises to source smarter, manage risk, and execute at global scale with clarity and control.",
      abtP3: "Harvics operates as an intelligence layer, not a traditional intermediary — built for precision, resilience, and long-term value.",
      abtBrand: "Harvics. Intelligent supply chains, engineered for the future.",
      
      // How We Work
      whEnd: "End‑to‑end",
      whSup: "supply chain",
      whMgmt: "management",
      whSrc: "Sourcing",
      whDsg: "Design",
      whMfg: "Manufacturing",
      whCmp: "Compliance",
      whLog: "DC & Transport",
      whRet: "Retail",
      
      // Coverage
      covTitle: "Supply Chain Coverage",
      covSol: "Supply Chain Solutions",
      covImp: "Importer / Wholesaler",
      covSup: "Supplier",

      // Section Headers
      shPort: "Global Product Portfolio",
      shPortSub: "Explore our diverse range of sourcing and supply chain solutions.",
      shIns: "Harvics Insights",
      shInsSub: "Latest news and industry updates from our global team",
      shConn: "Ready to Scale Your Business?",
      shConnSub: "Join thousands of global partners who trust Harvics for their sourcing and supply chain needs.",
      btnStart: "Get Started Today"
    },
    fr: {
      brandName: "HARVICS",
      languageLabel: "Langue",
      login: "Connexion",
      navAbout: "À propos",
      navTextiles: "Textile et habillement",
      navFmcg: "FMCG",
      navSourcing: "Approvisionnement",
      navMinerals: "Minéraux",
      navCommodities: "Produits de base",
      navIndustrial: "Solutions industrielles",
      navFinance: "Finance & HPay",
      navAI: "IA & Technologie",
      navRealEstate: "Immobilier",
      navOilGas: "Pétrole & Gaz",
      // Footer & General
      footerDesc: "Votre partenaire mondial de confiance pour l'approvisionnement, la fabrication et les solutions de chaîne d'approvisionnement.",
      footerCol1: "Entreprise",
      footerCol2: "Secteurs",
      footerCol3: "Ressources",
      footerCol4: "Bulletin",
      btnJoin: "Rejoindre",
      emailPlaceholder: "Votre adresse e-mail",
      // Categories
      catMen: "Hommes",
      catLadies: "Femmes",
      catKids: "Enfants",
      catHomeTextiles: "Linge de maison",
      catLingerie: "Lingerie",
      catKitchen: "Cuisine",
      catTowels: "Serviettes",
      catShoes: "Chaussures",
      catXyz: "XYZ",

      // How We Work
      whEnd: "De bout en bout",
      whSup: "chaîne d'approvisionnement",
      whMgmt: "gestion",
      whSrc: "Sourcing",
      whDsg: "Design",
      whMfg: "Fabrication",
      whCmp: "Conformité",
      whLog: "DC & Transport",
      whRet: "Vente au détail",
      
      // Coverage
      covTitle: "Couverture de la chaîne d'approvisionnement",
      covSol: "Solutions de chaîne d'approvisionnement",
      covImp: "Importateur / Grossiste",
      covSup: "Fournisseur",
      
      // Footer Titles
      ftInd: "Secteurs",
      ftCo: "Entreprise",
      ftStay: "Restez informé",
      
      // Footer Links
      ftCar: "Carrières",
      ftSus: "Durabilité",
      ftNews: "Actualités",
      ftCont: "Contact",
      ftPriv: "Politique de confidentialité",
      ftTerms: "Conditions d'utilisation",
      ftMap: "Plan du site",
      
      // Footer Desc
      ftSub: "Abonnez-vous à notre newsletter pour les dernières tendances du marché.",
      ftCopy: "Harvics Global Ventures. Tous droits réservés.",
      
      // Section Headers
      shPort: "Portefeuille mondial de produits",
      shPortSub: "Découvrez notre gamme diversifiée de solutions d'approvisionnement.",
      shIns: "Actualités Harvics",
      shInsSub: "Dernières nouvelles et mises à jour de notre équipe mondiale",
      shConn: "Prêt à développer votre entreprise ?",
      shConnSub: "Rejoignez des milliers de partenaires mondiaux qui font confiance à Harvics.",
      btnStart: "Commencez aujourd'hui"
    }
  };

  let currentLocale = "en";
  
  // Mega Menu Data
  const megaData = {
    en: {
      navTextiles: [
        {t:"Apparel", items:["Men's Wear","Ladies' Wear","Kids' Wear","Sportswear"]},
        {t:"Home Textiles", items:["Bed Linen","Bath Linen","Curtains","Kitchen"]},
        {t:"Fabrics", items:["Cotton","Polyester","Blends","Denim"]},
        {t:"Accessories", items:["Scarves","Bags","Belts","Shoes"]}
      ],
      navFmcg: [
        {t:"Food", items:["Grains","Spices","Snacks","Beverages"]},
        {t:"Personal Care", items:["Skincare","Haircare","Hygiene","Cosmetics"]},
        {t:"Home Care", items:["Detergents","Cleaners","Paper","Tools"]},
        {t:"Distribution", items:["Retail","Wholesale","Logistics","Storage"]}
      ],
      navSourcing: [
        {t:"Global Sourcing", items:["Supplier Discovery","Vetting","Negotiation"]},
        {t:"Quality Control", items:["Inspections","Audits","Testing"]},
        {t:"Logistics", items:["Freight","Customs","Warehousing"]},
        {t:"Consulting", items:["Strategy","Optimization","Risk Management"]}
      ],
      navMinerals: [
        {t:"Metals", items:["Iron Ore","Copper","Aluminum","Zinc"]},
        {t:"Energy", items:["Coal","Uranium","Lithium"]},
        {t:"Precious", items:["Gold","Silver","Platinum"]},
        {t:"Industrial", items:["Sand","Gravel","Limestone"]}
      ],
      navCommodities: [
        {t:"Agri", items:["Wheat","Rice","Corn","Soybeans"]},
        {t:"Energy", items:["Crude Oil","Natural Gas","LNG"]},
        {t:"Softs", items:["Coffee","Cocoa","Sugar","Cotton"]},
        {t:"Metals", items:["Steel","Copper","Aluminum"]}
      ],
      navIndustrial: [
        {t:"Chemicals", items:["Polymers","Acids","Solvents"]},
        {t:"Machinery", items:["Textile","Food Processing","Packaging"]},
        {t:"Safety", items:["PPE","Lockout","Fire"]},
        {t:"MRO", items:["Bearings","Belts","Tools"]}
      ],
      navFinance: [
        {t:"Trade Finance", items:["LC","SBLC","Forfaiting"]},
        {t:"HPay", items:["Wallets","Payments","Gateway"]},
        {t:"Invoicing", items:["Bills","Reconciliation","Reports"]},
        {t:"Risk", items:["KYC","AML","Scoring"]}
      ],
      navAI: [
        {t:"AI Solutions", items:["Forecasting","Vision","Chat"]},
        {t:"Data", items:["Pipelines","Warehouses","APIs"]},
        {t:"Integration", items:["ERP","E-commerce","Mobile"]},
        {t:"Support", items:["SLAs","Training","Docs"]}
      ],
      navRealEstate: [
        {t:"Commercial", items:["Offices","Retail","Mixed Use"]},
        {t:"Residential", items:["Apartments","Villas","Community"]},
        {t:"Industrial", items:["Warehouses","Parks","SEZ"]},
        {t:"Services", items:["FM","Leasing","Advisory"]}
      ],
      navOilGas: [
        {t:"Upstream", items:["Exploration","Drilling","OSV"]},
        {t:"Midstream", items:["Pipelines","Storage","Terminals"]},
        {t:"Downstream", items:["Refining","Trading","Distribution"]},
        {t:"Services", items:["EPC","HSE","Inspection"]}
      ],
      navAbout: [
        {t:"Company", items:["History","Leadership","Values"]},
        {t:"Careers", items:["Openings","Culture","Internships"]},
        {t:"Press", items:["News","Media Kit","Events"]},
        {t:"Contact", items:["Offices","Email","Support"]}
      ],
      default: [
        {t:"Overview", items:["At a Glance","Solutions","Contact"]},
        {t:"Sectors", items:["FMCG","Textiles","Industrial"]},
        {t:"Resources", items:["Compliance","Quality","Logistics"]},
        {t:"Get Started", items:["Request Quote","Talk to Sales","FAQ"]}
      ]
    },
    fr: {
      navTextiles: [
        {t:"Vêtements", items:["Hommes","Femmes","Enfants","Sport"]},
        {t:"Linge de maison", items:["Linge de lit","Linge de bain","Rideaux","Cuisine"]},
        {t:"Tissus", items:["Coton","Polyester","Mélanges","Denim"]},
        {t:"Accessoires", items:["Écharpes","Sacs","Ceintures","Chaussures"]}
      ],
      navFmcg: [
        {t:"Alimentation", items:["Céréales","Épices","Snacks","Boissons"]},
        {t:"Soins personnels", items:["Peau","Cheveux","Hygiène","Cosmétiques"]},
        {t:"Entretien", items:["Détergents","Nettoyants","Papier","Outils"]},
        {t:"Distribution", items:["Détail","Gros","Logistique","Stockage"]}
      ],
      navSourcing: [
        {t:"Sourcing mondial", items:["Découverte","Vérification","Négociation"]},
        {t:"Contrôle qualité", items:["Inspections","Audits","Tests"]},
        {t:"Logistique", items:["Fret","Douanes","Entreposage"]},
        {t:"Conseil", items:["Stratégie","Optimisation","Gestion des risques"]}
      ],
      navMinerals: [
        {t:"Métaux", items:["Minerai de fer","Cuivre","Aluminium","Zinc"]},
        {t:"Énergie", items:["Charbon","Uranium","Lithium"]},
        {t:"Précieux", items:["Or","Argent","Platine"]},
        {t:"Industriel", items:["Sable","Gravier","Calcaire"]}
      ],
      navCommodities: [
        {t:"Agri", items:["Blé","Riz","Maïs","Soja"]},
        {t:"Énergie", items:["Pétrole brut","Gaz naturel","GNL"]},
        {t:"Softs", items:["Café","Cacao","Sucre","Coton"]},
        {t:"Métaux", items:["Acier","Cuivre","Aluminium"]}
      ],
      navIndustrial: [
        {t:"Chimie", items:["Polymères","Acides","Solvants"]},
        {t:"Machines", items:["Textile","Agroalimentaire","Emballage"]},
        {t:"Sécurité", items:["EPI","Verrouillage","Incendie"]},
        {t:"MRO", items:["Roulements","Courroies","Outils"]}
      ],
      navFinance: [
        {t:"Financement du commerce", items:["Crédoc","SBLC","Forfaitage"]},
        {t:"HPay", items:["Portefeuilles","Paiements","Passerelle"]},
        {t:"Facturation", items:["Factures","Rapprochement","Rapports"]},
        {t:"Risque", items:["KYC","AML","Score"]}
      ],
      navAI: [
        {t:"Solutions IA", items:["Prévision","Vision","Chat"]},
        {t:"Données", items:["Pipelines","Entrepôts","APIs"]},
        {t:"Intégration", items:["ERP","E‑commerce","Mobile"]},
        {t:"Support", items:["SLAs","Formation","Docs"]}
      ],
      navRealEstate: [
        {t:"Commercial", items:["Bureaux","Retail","Mixte"]},
        {t:"Résidentiel", items:["Appartements","Villas","Communauté"]},
        {t:"Industriel", items:["Entrepôts","Parcs","ZES"]},
        {t:"Services", items:["FM","Location","Conseil"]}
      ],
      navOilGas: [
        {t:"Amont", items:["Exploration","Forage","OSV"]},
        {t:"Milieu", items:["Pipelines","Stockage","Terminaux"]},
        {t:"Aval", items:["Raffinage","Trading","Distribution"]},
        {t:"Services", items:["EPC","HSE","Inspection"]}
      ],
      navAbout: [
        {t:"Entreprise", items:["Histoire","Direction","Valeurs"]},
        {t:"Carrières", items:["Postes","Culture","Stages"]},
        {t:"Presse", items:["Actualités","Kit média","Événements"]},
        {t:"Contact", items:["Bureaux","Email","Support"]}
      ],
      default: [
        {t:"Vue d’ensemble", items:["Aperçu","Solutions","Contact"]},
        {t:"Secteurs", items:["FMCG","Textile","Industriel"]},
        {t:"Ressources", items:["Conformité","Qualité","Logistique"]},
        {t:"Commencer", items:["Demander un devis","Parler aux ventes","FAQ"]}
      ]
    }
  };

  function applyText() {
    const dict = messages[currentLocale] || messages.en;
    document.querySelectorAll("[data-i18n-key]").forEach(el => {
      const key = el.getAttribute("data-i18n-key");
      if (dict[key]) {
        if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
  }

  function setLocale(locale) {
    if (messages[locale]) {
      currentLocale = locale;
      applyText();
      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale } }));
    }
  }

  function askAi(promptText) {
    return fetch("http://localhost:8004/api/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText || "" })
    })
      .then(async function (response) {
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.detail || "Request failed");
        }
        return response.json();
      })
      .then(function (data) {
        return data.answer || "";
      })
      .catch(function (err) {
        console.error("AI Error:", err);
        return "Connection Error: " + err.message + " (Check console for details)";
      });
  }

  return {
    setLocale,
    askAi,
    getLocale: () => currentLocale,
    getMegaData: () => megaData[currentLocale] || megaData.en
  };
})();

function initLocalization() {
  const select = document.getElementById("language-select");
  if (select) {
    select.addEventListener("change", (e) => {
      intelligenceLayer.setLocale(e.target.value);
    });
    // Set initial state
    intelligenceLayer.setLocale(select.value);
  }
}

/* =========================================
   2. SLIDER LOGIC (Dynamic & Configurable)
   ========================================= */
const sliderConfig = {
  hero: [],
  industrial: []
};

function initSliders() {
  // Check for local slider data (generated by python script)
  if (typeof sliderData !== 'undefined') {
    
    const isVideo = (url) => url && url.match(/\.(mp4|webm|mov|m4v)$/i);

    // 1. Hero Slider
    if (sliderData.hero && sliderData.hero.length > 0) {
      const heroContainer = document.getElementById('hero-slides');
      if (heroContainer) {
        heroContainer.innerHTML = sliderData.hero.map((slide, index) => {
          if (isVideo(slide.img)) {
            return `
              <div class="hero-slide ${index === 0 ? 'active' : ''}">
                <video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover">
                  <source src="${slide.img}">
                </video>
                <div class="hero-overlay"></div>
              </div>
            `;
          } else {
            return `<div class="hero-slide ${index === 0 ? 'active' : ''}" style="background-image:url('${slide.img}')"></div>`;
          }
        }).join('');
      }
    }
    
    // 2. Slider A (Secondary Slider)
    if (sliderData.sliderA && sliderData.sliderA.length > 0) {
      const sliderA = document.querySelector('#sliderA .slider');
      if (sliderA) {
        sliderA.innerHTML = sliderData.sliderA.map(slide => {
          if (isVideo(slide.img)) {
             return `
              <div class="slide" style="position:relative;overflow:hidden">
                <video autoplay muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
                  <source src="${slide.img}">
                </video>
                <a href="${slide.link || '#'}" style="position:absolute;inset:0;z-index:2"></a>
                <div class="slide-title" style="z-index:3">${slide.title}</div>
              </div>
            `;
          } else {
            return `
              <div class="slide" style="background-image:url('${slide.img}')">
                <a href="${slide.link || '#'}"></a>
                <div class="slide-title">${slide.title}</div>
              </div>
            `;
          }
        }).join('');
      }
    }

    // 3. Slider B (Primary/Category Slider)
    if (sliderData.sliderB && sliderData.sliderB.length > 0) {
      const sliderB = document.querySelector('#sliderB .slider');
      if (sliderB) {
        sliderB.innerHTML = sliderData.sliderB.map(slide => {
           if (isVideo(slide.img)) {
             return `
              <div class="slide" style="position:relative;overflow:hidden">
                <video autoplay muted loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
                  <source src="${slide.img}">
                </video>
                <a href="${slide.link || '#'}" style="position:absolute;inset:0;z-index:2"></a>
                <div class="slide-title" style="z-index:3">${slide.title}</div>
              </div>
            `;
          } else {
            return `
              <div class="slide" style="background-image:url('${slide.img}')">
                <a href="${slide.link || '#'}"></a>
                <div class="slide-title">${slide.title}</div>
              </div>
            `;
          }
        }).join('');
      }
    }
  }

  // Hero Slider Logic
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentHero = 0;
  
  if (heroSlides.length > 0) {
    setInterval(() => {
      heroSlides[currentHero].classList.remove('active');
      currentHero = (currentHero + 1) % heroSlides.length;
      heroSlides[currentHero].classList.add('active');
    }, 5000);
  }
}

/* =========================================
   3. FOOTER & NEWSLETTER
   ========================================= */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      
      if (input.value.trim() !== "") {
        const originalText = btn.textContent;
        btn.textContent = "✓";
        btn.style.background = "#4CAF50";
        input.value = "";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
        }, 3000);
        alert("Thank you for subscribing to Harvics Insights!");
      }
    });
  });
}

/* =========================================
   4. CLOCK (Header)
   ========================================= */
function initClock() {
  function addRoman(clockEl){
    if(!clockEl) return;
    // Clear existing numerals to prevent duplicates
    clockEl.querySelectorAll(".numeral").forEach(e => e.remove());
    
    const labels=["XII","I","II","III","IV","V","VI","VII","VIII","IX","X","XI"];
    const radius=Math.max(12, Math.floor(clockEl.offsetWidth/2)-18);
    labels.forEach(function(txt, i){
      const el=document.createElement("span");
      el.className="numeral";
      el.textContent=txt;
      const angle=(i/12)*360;
      el.style.transform=`translate(-50%,-50%) rotate(${angle}deg) translate(0,-${radius}px) rotate(${-angle}deg)`;
      clockEl.appendChild(el);
    });
  }
  
  const hdrClock=document.getElementById("hdr-clock");
  const bigClock=document.getElementById("big-clock");
  addRoman(hdrClock);
  addRoman(bigClock);

  const h=document.getElementById("h");
  const m=document.getElementById("m");
  const s=document.getElementById("s");
  const bh=document.getElementById("bh");
  const bm=document.getElementById("bm");
  const bs=document.getElementById("bs");
  
  let tz=(Intl.DateTimeFormat().resolvedOptions().timeZone)||"UTC";
  
  function updateHands(hhEl, mmEl, ssEl, now){
    if(!hhEl||!mmEl||!ssEl) return;
    const hh=((now.getHours()%12)/12)*360+(now.getMinutes()/60)*30;
    const mm=((now.getMinutes())/60)*360;
    const ss=((now.getSeconds())/60)*360;
    hhEl.style.transform=`translate(-50%,0) rotate(${hh}deg)`;
    mmEl.style.transform=`translate(-50%,0) rotate(${mm}deg)`;
    ssEl.style.transform=`translate(-50%,0) rotate(${ss}deg)`;
  }
  
  function tick(){
    const base=new Date();
    const now=new Date(base.toLocaleString("en-US",{timeZone:tz}));
    updateHands(h,m,s,now);
    updateHands(bh,bm,bs,now);
  }
  
  tick();
  setInterval(tick,1000);
  
  const regionSelect=document.getElementById("region-select");
  if(regionSelect){
    regionSelect.addEventListener("change",function(){
      if(regionSelect.value) tz=regionSelect.value;
      tick();
    });
  }
}

/* =========================================
   5. INDUSTRY SHOWCASE (Index Page)
   ========================================= */
function initIndustryShowcase() {
  const container = document.getElementById('industry-showcase');
  if (!container || typeof productCatalog === 'undefined') return;

  const categories = [
    { 
      id: 'textiles', 
      name: 'Textiles & Apparel', 
      data: [
        ...productCatalog.textiles.men.slice(0, 2),
        ...productCatalog.textiles.women.slice(0, 2),
        ...productCatalog.textiles.kids.slice(0, 2)
      ]
    },
    { 
      id: 'fmcg', 
      name: 'FMCG & Consumer Goods', 
      data: [
        ...productCatalog.fmcg.staples.slice(0, 1),
        ...productCatalog.fmcg.oils.slice(0, 1),
        ...productCatalog.fmcg.packaged.slice(0, 1),
        ...productCatalog.fmcg.personalCare.slice(0, 1),
        ...productCatalog.fmcg.homeCare.slice(0, 1)
      ]
    },
    { 
      id: 'commodities-energy', 
      name: 'Energy & Metals (Commodities)', 
      data: [
        ...productCatalog.commodities.energy.slice(0, 2),
        ...productCatalog.commodities.metals.slice(0, 2),
        ...productCatalog.commodities.strategic.slice(0, 2)
      ]
    },
    { 
      id: 'commodities-agri', 
      name: 'Agri & Soft Commodities',
      data: [
        ...productCatalog.commodities.agri.slice(0, 2),
        ...productCatalog.commodities.edibleOils.slice(0, 2),
        ...productCatalog.commodities.protein.slice(0, 2)
      ]
    },
    { 
      id: 'industrial', 
      name: 'Industrial & Chemical Solutions', 
      data: [
        ...productCatalog.industrial.slice(0, 2),
        ...productCatalog.commodities.industrialChem.slice(0, 2)
      ]
    }
  ];

  container.innerHTML = categories.map(cat => {
    let pageUrl = '#';
    if (cat.id === 'textiles') pageUrl = 'textiles.html';
    else if (cat.id === 'fmcg') pageUrl = 'fmcg.html';
    else if (cat.id.startsWith('commodities')) pageUrl = 'commodities.html';
    else if (cat.id === 'industrial') pageUrl = 'industrial.html';

    const productsHtml = cat.data.map((p, i) => {
      const keywords = p.keywords ? p.keywords.replace(/ /g, ',') : 'product';
      // Use getProductImage from product-data.js if available, otherwise fallback
      let imgUrl = '';
      if (typeof getProductImage === 'function') {
        imgUrl = getProductImage(keywords);
      } else {
        // Fallback if product-data.js is not loaded yet (should not happen if ordered correctly)
        imgUrl = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80';
      }
      
      return `
      <div class="showcase-card">
        <div class="showcase-img" style="background-image: url('${imgUrl}'); background-size: cover; background-position: center;"></div>
        <div class="showcase-info">
          <div class="showcase-name">${p.name}</div>
          <div class="showcase-price">${p.price}</div>
        </div>
      </div>`;
    }).join('');

    return `
    <div class="category-row reveal" id="${cat.id}">
      <div class="category-header">
        <h3 class="category-title">${cat.name}</h3>
        <a href="${pageUrl}" class="category-link">View All ></a>
      </div>
      <div class="product-carousel">
        ${productsHtml}
      </div>
    </div>`;
  }).join('');
}

function initHomepageImages() {
  if (typeof getProductImage !== 'function') return;

  document.querySelectorAll('[data-bg-key]').forEach(el => {
    const key = el.getAttribute('data-bg-key');
    if (!key) return;
    const url = getProductImage(key);
    if (url) el.style.backgroundImage = `url('${url}')`;
    if (!el.style.backgroundSize) el.style.backgroundSize = 'cover';
    if (!el.style.backgroundPosition) el.style.backgroundPosition = 'center';
  });

  document.querySelectorAll('img[data-img-key]').forEach(img => {
    const key = img.getAttribute('data-img-key');
    if (!key) return;
    const url = getProductImage(key);
    if (url) img.src = url;
  });
}

/* =========================================
   7. MEGA MENU
   ========================================= */
function initMegaMenu() {
  const mega = document.getElementById("mega");
  const megaCtr = document.getElementById("mega-ctr");
  const curtain = document.getElementById("mega-overlay");

  function renderMega(key){
    const data = intelligenceLayer.getMegaData();
    const blocks = data[key] || data.default;
    if(megaCtr) {
      megaCtr.innerHTML = blocks.map(function(b){
        return '<div class="group"><div class="g-head">'+b.t+'</div><div class="g-items">'+b.items.map(function(it){return '<a href="#">'+it+'</a>';}).join('')+'</div></div>';
      }).join('');
    }
  }
  
  function openMega(key){
    window.__renderMegaLastKey = key;
    renderMega(key);
    if(mega) mega.classList.add("open");
    if(curtain) curtain.classList.add("open");
  }
  
  function closeMega(){
    if(mega) mega.classList.remove("open");
    if(curtain) curtain.classList.remove("open");
  }
  
  const navLis = document.querySelectorAll(".main-menu > li");
  navLis.forEach(function(li){
    li.addEventListener("mouseenter",function(){
      const a = li.querySelector("a");
      const t = a && a.getAttribute("data-i18n-key");
      if(t){ openMega(t); }
    });
    li.addEventListener("focusin",function(){
      const a = li.querySelector("a");
      const t = a && a.getAttribute("data-i18n-key");
      if(t){ openMega(t); }
    });
  });
  
  let closeTimer;
  function scheduleClose(){ closeTimer = setTimeout(closeMega, 120); }
  function cancelClose(){ if(closeTimer){ clearTimeout(closeTimer); closeTimer=null; } }
  
  const header = document.querySelector("header");
  if(header) {
    header.addEventListener("mouseleave", scheduleClose);
    header.addEventListener("mouseenter", cancelClose);
  }
  
  if(curtain) curtain.addEventListener("mouseenter", closeMega);

  // Re-render if language changes while open
  window.addEventListener('localeChanged', () => {
    if (window.__renderMegaLastKey && mega && mega.classList.contains('open')) {
      renderMega(window.__renderMegaLastKey);
    }
  });
}

/* =========================================
   8. EXTRA UTILITIES (Search, AI, Header, etc.)
   ========================================= */
function initExtras() {
  // Copyright Year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // 1. Header Height
  const hdr = document.querySelector("header");
  if(hdr){
    document.documentElement.style.setProperty("--header-h", hdr.offsetHeight+"px");
    new ResizeObserver(entries=>{
      for(const e of entries){
        document.documentElement.style.setProperty("--header-h", e.target.offsetHeight+"px");
      }
    }).observe(hdr);
  }

  // 2. Search Overlay
  const overlay=document.getElementById("search-overlay");
  const openBtn=document.getElementById("open-search"); 
  const searchInput=document.getElementById("search-input");
  if(openBtn&&overlay){
    openBtn.addEventListener("click",function(){
      overlay.style.display="flex";
      setTimeout(()=>{searchInput&&searchInput.focus();},50);
    });
    overlay.addEventListener("click",function(e){
      if(e.target===overlay){overlay.style.display="none";}
    });
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape"){overlay.style.display="none";}
    });
  }

  // 3. Slider Auto-Scroll
  const sliders=document.querySelectorAll(".slider");
  sliders.forEach(function(slider){
    let dir=1;
    const speed=0.3;
    function step(){
      const max=Math.max(0, slider.scrollWidth - slider.clientWidth);
      slider.scrollLeft+=speed*dir;
      if(slider.scrollLeft<=0 || slider.scrollLeft>=max-1){dir*=-1;}
      requestAnimationFrame(step);
    }
    slider.addEventListener("mouseenter",function(){dir*=-1;});
    slider.addEventListener("mouseleave",function(){dir*=-1;});
    requestAnimationFrame(step);
  });

  // 4. Industry Cards Image Swap (Disabled)
  /*
  const fmcg=document.getElementById("ind-fmcg");
  const textiles=document.getElementById("ind-textiles");
  if(fmcg || textiles) {
    const fmcgImgs=[
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=1400&q=60",
      "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=1400&q=60"
    ];
    const texImgs=[
      "https://images.unsplash.com/photo-1520975934081-52b9d2677c1d?auto=format&fit=crop&w=1400&q=60",
      "https://images.unsplash.com/photo-1512436991169-85ba7c59e1ab?auto=format&fit=crop&w=1400&q=60"
    ];
    let idx=0;
    function swap(){
      if(fmcg) fmcg.style.backgroundImage=`url('${fmcgImgs[idx%fmcgImgs.length]}')`;
      if(textiles) textiles.style.backgroundImage=`url('${texImgs[idx%texImgs.length]}')`;
      idx++;
    }
    swap();
    setInterval(swap,15000);
  }
  */

  // 7. Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const input = this.querySelector('input');
      if(btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#2ecc71'; // Green color for success
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 3000);
      }
    });
  }


  // 5. Global Panel
  const globalToggle=document.getElementById("global-toggle");
  const globalPanel=document.getElementById("global-panel");
  const globalSwitch=document.getElementById("global-switch");
  if(globalToggle&&globalPanel){
    globalToggle.addEventListener("click",function(){
      globalPanel.classList.toggle("open");
    });
  }
  if(globalSwitch){
    globalSwitch.addEventListener("click",function(){
      const on=globalSwitch.getAttribute("data-on")==="1";
      globalSwitch.setAttribute("data-on", on? "0":"1");
    });
  }

  // 6. AI Fab & Overlay
  const aiFab=document.getElementById("ai-fab");
  const aiOverlay=document.getElementById("ai-overlay");
  const aiClose=document.getElementById("ai-close");
  if(aiFab&&aiOverlay&&aiClose){
    aiFab.addEventListener("click",function(){aiOverlay.style.display="flex";});
    aiClose.addEventListener("click",function(){aiOverlay.style.display="none";});
    aiOverlay.addEventListener("click",function(e){if(e.target===aiOverlay){aiOverlay.style.display="none";}});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"){aiOverlay.style.display="none";}});
  }

  // 7. AI Ask Logic
  const input = document.getElementById("ai-input");
  const button = document.getElementById("ai-send");
  const output = document.getElementById("ai-output");

  if (button && input && output) {
    button.addEventListener("click", function () {
      const promptText = input.value.trim();
      if (!promptText) {
        output.textContent = "Please type something to ask.";
        return;
      }
      button.disabled = true;
      output.textContent = "Thinking...";
      intelligenceLayer
        .askAi(promptText)
        .then(function (answer) {
          output.textContent = answer;
        })
        .catch(function (err) {
          output.textContent = "Error: " + err.message;
        })
        .finally(function () {
          button.disabled = false;
        });
    });
  }
}
