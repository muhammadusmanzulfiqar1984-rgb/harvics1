/**
 * HARVICS GLOBAL SCRIPT
 * Handles Localization, AI Assistant, Sliders, and Interactivity
 */

async function injectLayoutShell() {
  try {
    const res = await fetch('/layout.html', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load layout');
    const html = await res.text();
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    const header = tpl.content.querySelector('header');
    const curtain = tpl.content.querySelector('#mega-curtain');
    const footer = tpl.content.querySelector('footer.site-footer');
    const host = document.getElementById('site-shell');
    const body = document.body;
    if (header && host) {
      body.insertBefore(header, host);
    } else if (header) {
      body.insertBefore(header, body.firstChild);
    }
    if (curtain) {
      const anchor = document.querySelector('header') || host;
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(curtain, anchor.nextSibling);
      } else {
        body.insertBefore(curtain, body.firstChild.nextSibling);
      }
    }
    if (footer) {
      body.appendChild(footer);
    }
  } catch (e) {
    console.error('Layout injection error:', e);
  }
}

function cleanPageShell() {
  const bodyFooter = document.querySelector('body > footer.site-footer');
  document.querySelectorAll('footer.site-footer').forEach(el => {
    if (el !== bodyFooter) el.remove();
  });
  document.querySelectorAll('main .footer-top, #page-content .footer-top').forEach(el => el.remove());
}

function initSubpageRouter(){}

document.addEventListener('DOMContentLoaded', async () => {
  await injectLayoutShell();
  setHeaderHeightVar();
  cleanPageShell();
  if (typeof initClock === 'function') initClock();
  if (typeof initMegaCurtain === 'function') initMegaCurtain();
  if (typeof initLocalization === 'function') initLocalization();
  if (typeof injectLandingBanner === 'function') injectLandingBanner();
  if (typeof injectAnchors === 'function') injectAnchors();
  if (typeof initFooterIndustries === 'function') initFooterIndustries();
  if (typeof initHomepageImages === 'function') initHomepageImages();
  if (typeof initAutoSliders === 'function') initAutoSliders();
  if (typeof initScrollReveal === 'function') initScrollReveal();
  if (typeof initNewsletter === 'function') initNewsletter();
  if (typeof initExtras === 'function') initExtras();
  if (typeof initSubpageAutoFill === 'function') initSubpageAutoFill();
});

function setHeaderHeightVar(){
  try{
    const header=document.querySelector('header');
    const nav=document.querySelector('.main-nav');
    const h=(header?header.offsetHeight:0)+(nav?nav.offsetHeight:0);
    if(h>0){
      document.documentElement.style.setProperty('--header-h', h+'px');
    }
  }catch(e){}
}

function initHubPage(){
  const root=document.getElementById("hub-root");
  if(!root) return;
  const keys=["navTextiles","navIndustrial","navFmcg","navSourcing","navCommodities"];
  const slugs={navTextiles:"textiles",navIndustrial:"industrial",navFmcg:"fmcg",navSourcing:"sourcing",navCommodities:"commodities"};
  const sections=keys.map(k=>{
    const t=intelligenceLayer.getLandingText(k);
    const id=slugs[k];
    return `<section id="${id}" class="catalog-hero tint"><div style="max-width:1200px;margin:0 auto;padding:48px 24px;"><h1 style="font-size:clamp(1.8rem,4vw,2.6rem);color:var(--burgundy);font-weight:700;letter-spacing:0.02em">${t.title||""}</h1><p style="max-width:720px;color:var(--text);opacity:.85">${t.desc||""}</p><div style="margin-top:16px;display:flex;gap:12px"><a href="index.html#${id}" style="padding:10px 14px;border:1px solid var(--gold);color:var(--burgundy);text-decoration:none">Explore</a><a href="index.html#${id}" style="padding:10px 14px;border:1px solid var(--divider);color:var(--burgundy);text-decoration:none">Back to Home</a></div></div></section>`;
  }).join("");
  const nav=`<nav style="max-width:1200px;margin:24px auto;padding:0 16px;display:flex;gap:12px;flex-wrap:wrap">${keys.map(k=>`<a href="#${slugs[k]}" style="padding:8px 12px;border:1px solid var(--divider);color:var(--burgundy);text-decoration:none">${intelligenceLayer.getLabel(k)}</a>`).join("")}</nav>`;
  root.innerHTML=nav+sections;
}
/* =========================================
function initSubpageAutoFill(){
  try{
    if(!(location.pathname||"").includes("/subpages/")) return;
    const ctx=parseSubpageCtx();
    if(!ctx) return;
    const host=document.getElementById("page-content")||document.querySelector("main")||document.body;
    let hero=host.querySelector(".catalog-hero");
    let h1, p;
    if(!hero){
      hero=document.createElement("section");
      hero.className="catalog-hero tint";
      hero.innerHTML='<div style="max-width:1200px;margin:0 auto;padding:48px 24px;"><h1 style="font-size:clamp(1.8rem,4vw,2.6rem);color:var(--burgundy);font-weight:700;letter-spacing:0.02em"></h1><p id="catalog-desc" style="max-width:720px;color:var(--text);opacity:0.85"></p><div class="cta-row" style="margin-top:16px;display:flex;gap:12px;flex-wrap:wrap"><a href="sourcing.html" style="padding:10px 14px;border:1px solid var(--gold);color:var(--burgundy);text-decoration:none">Request Sourcing</a><a href="index.html#global-network" style="padding:10px 14px;border:1px solid var(--divider);color:var(--burgundy);text-decoration:none">Learn More</a></div></div>';
      h1=hero.querySelector("h1");
      p=hero.querySelector("#catalog-desc");
      const titleParts=[intelligenceLayer.getLabel(ctx.key), ctx.section, ctx.item, (ctx.extras||[]).join(" — ")].filter(Boolean);
      h1.textContent=titleParts.join(" — ");
      host.insertBefore(hero, host.firstChild);
    }else{
      h1=hero.querySelector("h1")||hero.appendChild(document.createElement("h1"));
      p=hero.querySelector("#catalog-desc")||hero.appendChild(document.createElement("p"));
    }
    const titleParts=[intelligenceLayer.getLabel(ctx.key), ctx.section, ctx.item, (ctx.extras||[]).join(" — ")].filter(Boolean);
    p.textContent=getRelevantDescription(ctx);
    const grid=document.createElement("section");
    grid.className="catalog-grid";
    grid.innerHTML='<div style="max-width:1200px;margin:0 auto;padding:24px;"><div id="subpage-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;"></div></div>';
    host.appendChild(grid);
    ensureProductData(function(){
      const cards=getRelevantCards(ctx);
      const container=document.getElementById("subpage-grid");
      container.innerHTML=(cards||[]).map(function(card){
        const url=getImage(card.keywords);
        return '<div class="product-card"><div class="product-image" style="height:160px;background-image:url('+url+');background-size:cover;background-position:center"></div><div class="product-info"><div class="product-name">'+(card.name||"")+'</div><div class="product-price">'+(card.desc||"")+'</div></div></div>';
      }).join("");
    });
  }catch(e){ console.error("Subpage autofill error:",e); }
}

function parseSubpageCtx(){
  const parts=(location.pathname||"").split("/").filter(Boolean);
  const idx=parts.indexOf("subpages");
  if(idx<0 || parts.length<idx+3) return null;
  const key=parts[idx+1]; // e.g., navTextiles
  const section=unslug(parts[idx+2]);
  let item=null;
  let extras=[];
  if(parts.length>idx+3){
    item=unslug(parts[idx+3].replace(/men-s-wear/i,"Mens Wear").replace(/kids-wear/i,"Kids Wear").replace(/ladies-wear/i,"Ladies Wear"));
  }
  if(parts.length>idx+4){
    extras=parts.slice(idx+4).map(unslug);
    const last=extras[extras.length-1];
    if(last && last.endsWith(".html")) extras[extras.length-1]=last.replace(/\.html$/i,"");
  }
  return { key, section, item, extras };
}

function unslug(s){ return String(s||"").replace(/\.html$/i,"").replace(/-/g," ").replace(/\s+/g," ").trim(); }

function ensureProductData(cb){
  if(typeof productCatalog!=="undefined" && typeof getProductImage==="function"){ cb(); return; }
  const tag=document.createElement("script");
  tag.src="product-data.js";
  tag.onload=function(){ cb(); };
  tag.onerror=function(){ cb(); };
  document.head.appendChild(tag);
}

function getImage(keywords){
  if(typeof getProductImage==="function") return getProductImage(keywords||"default");
  const k=(keywords||"default").split(",")[0]||"default";
  return "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80";
}

function getRelevantDescription(ctx){
  const k=(ctx.key||"").toLowerCase();
  if(k==="navcommodities") return "Structured commodity operations: supplier verification, grade/class alignment, inspection scheduling, trade structuring and compliant logistics across energy, metals and agri.";
  if(k==="navfmcg") return "FMCG sourcing and distribution: private label development, packaging optimization, compliance checks and multi‑channel logistics.";
  if(k==="navindustrial") return "Industrial supply: machinery procurement, chemicals and MRO with safety compliance and continuity of parts.";
  if(k==="navminerals") return "Minerals sourcing: origin verification, assay alignment, certification, bulk shipment coordination and delivery windows.";
  if(k==="navoilgas") return "Oil & gas support: upstream/midstream/downstream services with EPC partners, HSE alignment and inspection/certification.";
  if(k==="navrealestate") return "Real estate: site acquisition, leasing advisory, portfolio and facilities management aligned to long‑term value.";
  if(k==="navfinance") return "Finance & HPay: LC/SBLC structuring, payments gateway, invoicing and reconciliation with KYC/AML.";
  if(k==="navai") return "AI & technology: forecasting, computer vision, integrations and data pipelines supporting sourcing and supply operations.";
  if(k==="navsourcing") return "Global sourcing: supplier discovery, vetting, QC/inspection, documentation and cross‑border logistics.";
  if(k==="navtextiles") return "Textiles & apparel workflows: disciplined blocks, fabric libraries, compliance audits and export‑ready logistics.";
  return "Professional sourcing workflows: discovery, verification, quality control, documentation and logistics.";
}

function getRelevantCards(ctx){
  const k=(ctx.key||"").toLowerCase();
  if(k==="navcommodities"){
    return [
      { name:"Supplier Verification", desc:"Identity, capacity and compliance checks.", keywords:"inspection,industrial" },
      { name:"Quality Inspection", desc:"SGS/BV scheduling and assay alignment.", keywords:"inspection,quality" },
      { name:"Trade Structuring (LC/SBLC)", desc:"Instrument terms and documentation.", keywords:"lc,sblc" },
      { name:"Hedging Coordination", desc:"Risk coverage with counterparties.", keywords:"reports,finance" },
      { name:"Bulk Shipment Scheduling", desc:"Windows, ports and berths alignment.", keywords:"ship,port" },
      { name:"Logistics & Freight", desc:"Sea/rail/truck lanes coordination.", keywords:"logistics,ship" },
      { name:"Contract Drafting", desc:"Grades, tolerances and delivery terms.", keywords:"docs,email" },
      { name:"Compliance & Risk", desc:"KYC/AML and sanctions screening.", keywords:"kyc,aml" }
    ];
  }
  if(k==="navfmcg"){
    return [
      { name:"Private Label Development", desc:"Brand design and packaging systems.", keywords:"brand,packaging" },
      { name:"Packaging Optimization", desc:"Cost, materials and compliance.", keywords:"packaging,logistics" },
      { name:"Quality Audits", desc:"Factory checks and batch testing.", keywords:"quality,inspection" },
      { name:"Distribution Planning", desc:"Retail/wholesale channel mapping.", keywords:"retail,logistics" },
      { name:"Cold Chain Logistics", desc:"Temperature‑controlled lanes.", keywords:"logistics,industrial" },
      { name:"Supplier Discovery", desc:"Cross‑region vendor sourcing.", keywords:"manufacturing,factory" },
      { name:"Documentation", desc:"Labels, certificates and invoices.", keywords:"docs,email" },
      { name:"Compliance", desc:"Safety and import alignment.", keywords:"reports,inspection" }
    ];
  }
  if(k==="navindustrial"){
    return [
      { name:"Machinery Procurement", desc:"OEM sourcing and specs alignment.", keywords:"cnc,machine" },
      { name:"MRO Supply", desc:"Bearings, belts and tools continuity.", keywords:"tools,industrial" },
      { name:"Safety Equipment", desc:"PPE and systems compliance.", keywords:"helmet,safety" },
      { name:"Industrial Chemicals", desc:"Grades and certifications.", keywords:"chemical,industrial" },
      { name:"Contracts", desc:"Long‑term availability planning.", keywords:"docs,map" },
      { name:"Quality & Testing", desc:"Incoming/outing checks.", keywords:"inspection,quality" },
      { name:"Logistics", desc:"Heavy and special transport.", keywords:"logistics,truck" },
      { name:"Reporting", desc:"Milestones and dashboards.", keywords:"reports,map" }
    ];
  }
  if(k==="navminerals"){
    return [
      { name:"Origin Verification", desc:"Certificates and chain of custody.", keywords:"docs,inspection" },
      { name:"Assay Alignment", desc:"Labs and grade specs.", keywords:"gold,metal" },
      { name:"Certification", desc:"SGS/BV and port docs.", keywords:"inspection,port" },
      { name:"Bulk Shipment", desc:"Cargo planning and berths.", keywords:"ship,port" },
      { name:"Logistics", desc:"Rail and trucking to terminal.", keywords:"logistics,truck" },
      { name:"Contract Terms", desc:"Tolerance and quality clauses.", keywords:"docs,email" },
      { name:"Risk Controls", desc:"KYC/AML and sanctions.", keywords:"kyc,aml" },
      { name:"Scheduling", desc:"Windows and delivery cycles.", keywords:"reports,map" }
    ];
  }
  if(k==="navoilgas"){
    return [
      { name:"EPC Coordination", desc:"Pipeline and terminal projects.", keywords:"pipeline,industrial" },
      { name:"HSE Audits", desc:"Safety discipline alignment.", keywords:"hse,safety" },
      { name:"Inspection & Certification", desc:"Refinery and terminal ops.", keywords:"inspection,industrial" },
      { name:"Chartering", desc:"OSV and tanker fixtures.", keywords:"tanker,ship" },
      { name:"Trading & Offtake", desc:"Downstream instruments.", keywords:"fuel,truck" },
      { name:"Logistics", desc:"Marine and land movement.", keywords:"logistics,port" },
      { name:"Contracts", desc:"Project and supply terms.", keywords:"docs,email" },
      { name:"Compliance", desc:"KYC/AML and permits.", keywords:"kyc,aml" }
    ];
  }
  if(k==="navrealestate"){
    return [
      { name:"Leasing Advisory", desc:"Commercial, retail and industrial.", keywords:"leasing,office" },
      { name:"Facilities Management", desc:"FM operations and SLAs.", keywords:"fm,industrial" },
      { name:"Portfolio Management", desc:"Performance and reports.", keywords:"reports,map" },
      { name:"Site Acquisition", desc:"Due diligence and permits.", keywords:"docs,building" },
      { name:"Development Partners", desc:"EPC and design teams.", keywords:"parks,industrial" },
      { name:"Contracts", desc:"Leases and service terms.", keywords:"docs,email" },
      { name:"Compliance", desc:"Safety and regulatory.", keywords:"inspection,industrial" },
      { name:"Logistics", desc:"Fit‑out and handover.", keywords:"industrial,building" }
    ];
  }
  if(k==="navfinance"){
    return [
      { name:"LC Structuring", desc:"Terms and issuing banks.", keywords:"lc,finance" },
      { name:"SBLC", desc:"Standby instruments.", keywords:"sblc,finance" },
      { name:"Payments Gateway", desc:"Processing and settlement.", keywords:"gateway,payments" },
      { name:"Invoicing", desc:"Bills, reconciliation and reports.", keywords:"bills,reports" },
      { name:"KYC/AML", desc:"Screening and compliance.", keywords:"kyc,aml" },
      { name:"Risk Scoring", desc:"Profiles and controls.", keywords:"scoring,analytics" },
      { name:"Documentation", desc:"Contracts and notices.", keywords:"docs,email" },
      { name:"Analytics", desc:"Dashboards and alerts.", keywords:"reports,map" }
    ];
  }
  if(k==="navai"){
    return [
      { name:"Forecasting", desc:"Demand and supply models.", keywords:"forecasting,ai" },
      { name:"Computer Vision", desc:"Inspection and detection.", keywords:"vision,ai" },
      { name:"ERP Integration", desc:"Systems connectivity.", keywords:"erp,integration" },
      { name:"Data Pipelines", desc:"Warehouses and APIs.", keywords:"pipelines,data" },
      { name:"Conversational Chat", desc:"Assist workflows.", keywords:"chat,ai" },
      { name:"Training & Enablement", desc:"Teams and adoption.", keywords:"training,support" },
      { name:"SLAs", desc:"Support agreements.", keywords:"slas,support" },
      { name:"Documentation", desc:"Guides and references.", keywords:"docs,support" }
    ];
  }
  if(k==="navtextiles"){
    return [
      { name:"Supplier Discovery", desc:"Cut blocks and fabric libraries.", keywords:"textiles,manufacturing" },
      { name:"Compliance Audits", desc:"Factory and social checks.", keywords:"inspection,quality" },
      { name:"Private Label", desc:"Design and trims.", keywords:"brand,packaging" },
      { name:"QC & Testing", desc:"Fit and fabric tests.", keywords:"quality,inspection" },
      { name:"Packaging & Labeling", desc:"Export‑ready packs.", keywords:"packaging,logistics" },
      { name:"Logistics", desc:"Consolidation and freight.", keywords:"logistics,ship" },
      { name:"Documentation", desc:"Specs, invoices, certs.", keywords:"docs,email" },
      { name:"Reporting", desc:"Milestones and delivery.", keywords:"reports,map" }
    ];
  }
  return getNeutralCards();
}

function fallbackProducts(ctx){
  const title=(ctx.item||ctx.section||intelligenceLayer.getLabel(ctx.key)||"Category");
  return Array.from({length:8}).map(function(_,i){ return { name: title, keywords: "default", price: "" }; });
}
/* =========================================
   6. SCROLL REVEAL (Apple Style)
   ========================================= */
function initScrollReveal() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  if (!items.length) return;

  document.documentElement.classList.add("reveal-on");

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* =========================================
   1. LOCALIZATION & AI ENGINE
   ========================================= */
const intelligenceLayer = (function () {
  const messages = {
    en: {
      brandName: "Harvics",
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
      brandName: "Harvics",
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
    },
    es: {
      brandName: "Harvics",
      languageLabel: "Idioma",
      login: "Iniciar sesión",
      navAbout: "Sobre nosotros",
      navTextiles: "Textiles y confección",
      navFmcg: "FMCG",
      navSourcing: "Soluciones de abastecimiento",
      navMinerals: "Minerales",
      navCommodities: "Productos básicos",
      navIndustrial: "Soluciones industriales",
      navFinance: "Finanzas y HPay",
      navAI: "IA y Tecnología",
      navRealEstate: "Bienes raíces",
      navOilGas: "Petróleo y Gas",
      footerDesc: "Su socio global de confianza para abastecimiento, fabricación y cadena de suministro.",
      btnJoin: "Unirse",
      emailPlaceholder: "Su correo electrónico",
      ftInd: "Industrias",
      ftCo: "Empresa",
      ftStay: "Mantente informado",
      ftCar: "Carreras",
      ftSus: "Sostenibilidad",
      ftNews: "Noticias e Insights",
      ftCont: "Contacto",
      ftPriv: "Privacidad",
      ftTerms: "Términos",
      ftMap: "Mapa del sitio",
      ftSub: "Suscríbete para recibir las últimas tendencias del mercado.",
      ftCopy: "Harvics Global Ventures. Todos los derechos reservados.",
      btnStart: "Comienza hoy"
    },
    ar: {
      brandName: "هارفكس",
      languageLabel: "اللغة",
      login: "تسجيل الدخول",
      navAbout: "نبذة عنا",
      navTextiles: "المنسوجات والملابس",
      navFmcg: "السلع الاستهلاكية السريعة",
      navSourcing: "حلول التوريد",
      navMinerals: "المعادن",
      navCommodities: "السلع",
      navIndustrial: "الحلول الصناعية",
      navFinance: "المالية وHPay",
      navAI: "الذكاء الاصطناعي والتقنية",
      navRealEstate: "العقارات",
      navOilGas: "النفط والغاز",
      footerDesc: "شريكك العالمي الموثوق للتوريد والتصنيع وحلول سلسلة الإمداد.",
      btnJoin: "انضم",
      emailPlaceholder: "بريدك الإلكتروني",
      ftInd: "القطاعات",
      ftCo: "الشركة",
      ftStay: "ابقَ على اطلاع",
      ftCar: "الوظائف",
      ftSus: "الاستدامة",
      ftNews: "الأخبار والرؤى",
      ftCont: "اتصل بنا",
      ftPriv: "الخصوصية",
      ftTerms: "الشروط",
      ftMap: "خريطة الموقع",
      ftSub: "اشترك لتلقي أحدث اتجاهات السوق.",
      ftCopy: "هارفكس جلوبال فنتشرز. جميع الحقوق محفوظة.",
      btnStart: "ابدأ اليوم"
    },
    zh: {
      brandName: "Harvics",
      languageLabel: "语言",
      login: "登录",
      navAbout: "关于我们",
      navTextiles: "纺织与服装",
      navFmcg: "快消品",
      navSourcing: "采购解决方案",
      navMinerals: "矿产",
      navCommodities: "大宗商品",
      navIndustrial: "工业解决方案",
      navFinance: "金融与HPay",
      navAI: "AI与技术",
      navRealEstate: "房地产",
      navOilGas: "石油与天然气",
      footerDesc: "值得信赖的全球合作伙伴，提供采购、制造及供应链解决方案。",
      btnJoin: "加入",
      emailPlaceholder: "电子邮箱地址",
      ftInd: "行业",
      ftCo: "公司",
      ftStay: "保持更新",
      ftCar: "招聘",
      ftSus: "可持续发展",
      ftNews: "新闻与洞察",
      ftCont: "联系我们",
      ftPriv: "隐私政策",
      ftTerms: "服务条款",
      ftMap: "网站地图",
      ftSub: "订阅我们的通讯以获取最新市场趋势。",
      ftCopy: "Harvics Global Ventures. 版权所有。",
      btnStart: "立即开始"
    },
    hi: {
      brandName: "Harvics",
      languageLabel: "भाषा",
      login: "लॉगिन",
      navAbout: "हमारे बारे में",
      navTextiles: "वस्त्र एवं परिधान",
      navFmcg: "एफएमसीजी",
      navSourcing: "सोर्सिंग समाधान",
      navMinerals: "खनिज",
      navCommodities: "कमोडिटी",
      navIndustrial: "औद्योगिक समाधान",
      navFinance: "वित्त एवं HPay",
      navAI: "एआई एवं तकनीक",
      navRealEstate: "रियल एस्टेट",
      navOilGas: "तेल एवं गैस",
      footerDesc: "सोर्सिंग, विनिर्माण और सप्लाई चेन समाधान के लिए आपका विश्वसनीय वैश्विक साझेदार।",
      btnJoin: "जुड़ें",
      emailPlaceholder: "आपका ईमेल पता",
      ftInd: "उद्योग",
      ftCo: "कंपनी",
      ftStay: "अपडेट रहें",
      ftCar: "करियर",
      ftSus: "स्थिरता",
      ftNews: "समाचार एवं अंतर्दृष्टि",
      ftCont: "संपर्क",
      ftPriv: "गोपनीयता नीति",
      ftTerms: "सेवा की शर्तें",
      ftMap: "साइटमैप",
      ftSub: "नवीनतम बाजार रुझानों के लिए सदस्यता लें।",
      ftCopy: "Harvics Global Ventures. सर्वाधिकार सुरक्षित.",
      btnStart: "आज ही शुरू करें"
    },
    he: {
      brandName: "Harvics",
      languageLabel: "שפה",
      login: "כניסה",
      navAbout: "אודות",
      navTextiles: "טקסטיל וביגוד",
      navFmcg: "מוצרי צריכה מהירים",
      navSourcing: "פתרונות רכש",
      navMinerals: "מינרלים",
      navCommodities: "סחורות",
      navIndustrial: "פתרונות תעשייה",
      navFinance: "פיננסים ו‑HPay",
      navAI: "בינה מלאכותית וטכנולוגיה",
      navRealEstate: "נדל\"ן",
      navOilGas: "נפט וגז",
      footerDesc: "השותף הגלובלי המהימן שלכם לרכש, ייצור ופתרונות שרשרת אספקה.",
      btnJoin: "הצטרפות",
      emailPlaceholder: "כתובת אימייל",
      ftInd: "תעשיות",
      ftCo: "חברה",
      ftStay: "הישארו מעודכנים",
      ftCar: "קריירה",
      ftSus: "קיימות",
      ftNews: "חדשות ותובנות",
      ftCont: "צור קשר",
      ftPriv: "מדיניות פרטיות",
      ftTerms: "תנאי שימוש",
      ftMap: "מפת אתר",
      ftSub: "הירשמו לניוזלטר לקבלת מגמות שוק עדכניות.",
      ftCopy: "Harvics Global Ventures. כל הזכויות שמורות.",
      btnStart: "התחילו היום"
    },
    pt: {
      brandName: "Harvics",
      languageLabel: "Idioma",
      login: "Entrar",
      navAbout: "Sobre",
      navTextiles: "Têxteis e vestuário",
      navFmcg: "Bens de consumo",
      navSourcing: "Soluções de sourcing",
      navMinerals: "Minerais",
      navCommodities: "Commodities",
      navIndustrial: "Soluções industriais",
      navFinance: "Finanças e HPay",
      navAI: "IA e Tecnologia",
      navRealEstate: "Imobiliário",
      navOilGas: "Petróleo e Gás",
      footerDesc: "Seu parceiro global de confiança para sourcing, fabricação e soluções de cadeia de suprimentos.",
      btnJoin: "Participar",
      emailPlaceholder: "Seu e‑mail",
      ftInd: "Indústrias",
      ftCo: "Empresa",
      ftStay: "Fique atualizado",
      ftCar: "Carreiras",
      ftSus: "Sustentabilidade",
      ftNews: "Notícias e Insights",
      ftCont: "Contato",
      ftPriv: "Privacidade",
      ftTerms: "Termos",
      ftMap: "Mapa do site",
      ftSub: "Assine para receber as últimas tendências do mercado.",
      ftCopy: "Harvics Global Ventures. Todos os direitos reservados.",
      btnStart: "Comece hoje"
    },
    ru: {
      brandName: "Harvics",
      languageLabel: "Язык",
      login: "Войти",
      navAbout: "О компании",
      navTextiles: "Текстиль и одежда",
      navFmcg: "FMCG",
      navSourcing: "Решения по закупкам",
      navMinerals: "Минералы",
      navCommodities: "Товары",
      navIndustrial: "Промышленные решения",
      navFinance: "Финансы и HPay",
      navAI: "ИИ и технологии",
      navRealEstate: "Недвижимость",
      navOilGas: "Нефть и газ",
      footerDesc: "Ваш надёжный глобальный партнёр по закупкам, производству и цепочкам поставок.",
      btnJoin: "Присоединиться",
      emailPlaceholder: "Ваш e‑mail",
      ftInd: "Отрасли",
      ftCo: "Компания",
      ftStay: "Будьте в курсе",
      ftCar: "Карьера",
      ftSus: "Устойчивость",
      ftNews: "Новости и аналитика",
      ftCont: "Контакты",
      ftPriv: "Конфиденциальность",
      ftTerms: "Условия",
      ftMap: "Карта сайта",
      ftSub: "Подпишитесь на рассылку, чтобы получать последние рыночные тенденции.",
      ftCopy: "Harvics Global Ventures. Все права защищены.",
      btnStart: "Начать сегодня"
    },
    bn: {
      brandName: "Harvics",
      languageLabel: "ভাষা",
      login: "লগইন",
      navAbout: "আমাদের সম্পর্কে",
      navTextiles: "টেক্সটাইল ও পোশাক",
      navFmcg: "FMCG",
      navSourcing: "সোর্সিং সমাধান",
      navMinerals: "খনিজ",
      navCommodities: "কমোডিটি",
      navIndustrial: "শিল্প সমাধান",
      navFinance: "ফাইন্যান্স ও HPay",
      navAI: "এআই ও প্রযুক্তি",
      navRealEstate: "রিয়েল এস্টেট",
      navOilGas: "তেল ও গ্যাস",
      footerDesc: "সোর্সিং, উৎপাদন ও সরবরাহ শৃঙ্খলার সমাধানে আপনার বিশ্বস্ত বৈশ্বিক অংশীদার।",
      btnJoin: "যোগ দিন",
      emailPlaceholder: "আপনার ইমেল",
      ftInd: "শিল্প",
      ftCo: "কোম্পানি",
      ftStay: "আপডেট থাকুন",
      ftCar: "ক্যারিয়ার",
      ftSus: "স্থিতিশীলতা",
      ftNews: "খবর ও অন্তর্দৃষ্টি",
      ftCont: "যোগাযোগ",
      ftPriv: "গোপনীয়তা নীতি",
      ftTerms: "পরিষেবার শর্তাবলী",
      ftMap: "সাইটম্যাপ",
      ftSub: "সর্বশেষ বাজার প্রবণতার জন্য সাবস্ক্রাইব করুন।",
      ftCopy: "Harvics Global Ventures. সর্বস্বত্ব সংরক্ষিত।",
      btnStart: "আজই শুরু করুন"
    },
    ur: {
      brandName: "Harvics",
      languageLabel: "زبان",
      login: "لاگ اِن",
      navAbout: "ہمارے بارے میں",
      navTextiles: "ٹیکسٹائل اور ملبوسات",
      navFmcg: "تیز رفتار صارف مصنوعات",
      navSourcing: "سورسنگ حل",
      navMinerals: "معدنیات",
      navCommodities: "اجناس",
      navIndustrial: "صنعتی حل",
      navFinance: "مالیات اور HPay",
      navAI: "اے آئی اور ٹیکنالوجی",
      navRealEstate: "رئیل اسٹیٹ",
      navOilGas: "تیل و گیس",
      footerDesc: "سورسنگ، مینوفیکچرنگ اور سپلائی چین حل کے لیے آپ کا قابلِ اعتماد عالمی شراکت دار۔",
      btnJoin: "شامل ہوں",
      emailPlaceholder: "آپ کا ای میل",
      ftInd: "صنعتیں",
      ftCo: "کمپنی",
      ftStay: "باخبر رہیں",
      ftCar: "کیریئرز",
      ftSus: "پائیداری",
      ftNews: "خبریں اور بصیرت",
      ftCont: "رابطہ",
      ftPriv: "رازداری پالیسی",
      ftTerms: "شرائطِ استعمال",
      ftMap: "سائٹ میپ",
      ftSub: "تازہ ترین مارکیٹ رجحانات کے لیے سبسکرائب کریں۔",
      ftCopy: "Harvics Global Ventures. تمام حقوق محفوظ ہیں۔",
      btnStart: "آج ہی شروع کریں"
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

  // Canonical navigation order and mappings (single source of truth)
  const navOrder = [
    "navAbout",
    "navTextiles",
    "navFmcg",
    "navCommodities",
    "navIndustrial",
    "navMinerals",
    "navOilGas",
    "navRealEstate",
    "navSourcing",
    "navFinance",
    "navAI"
  ];

  // Vertical industry keys (footer industries list mirrors header)
  const verticalKeys = [
    "navTextiles",
    "navFmcg",
    "navCommodities",
    "navIndustrial",
    "navMinerals",
    "navOilGas",
    "navRealEstate"
  ];

  // Map nav keys to anchored section IDs
  const sectionIdByKey = {
    navAbout: "about",
    navTextiles: "textiles",
    navFmcg: "fmcg",
    navCommodities: "commodities",
    navIndustrial: "industrial",
    navMinerals: "minerals",
    navOilGas: "oil-gas",
    navRealEstate: "real-estate",
    navSourcing: "sourcing",
    navFinance: "finance",
    navAI: "ai"
  };

  // AI-aligned page descriptions per locale (centralized)
  const pageDescriptions = {
    en: {
      navTextiles: {
        apparel: {
          "men-s-wear": "Menswear essentials: chinos, denim fits, easy‑iron shirts, merino knitwear, blazers and outerwear including Stormwear parkas and wool overcoats. Complete looks with technical sportswear, trainers and loungewear.",
          "ladies-wear": "Ladies’ wear and lingerie: balcony/plunge bras, seamless knickers, shapewear, sports bras, tights and versatile dresses. Comfort‑first fabrics with supportive fits."
        }
      }
    },
    fr: {
      navTextiles: {
        "vêtements": {
          "hommes": "Essentiels pour hommes : chinos, denim, chemises faciles à repasser, maille mérinos, vestes et manteaux, parkas Stormwear, sports techniques, baskets et loungewear.",
          "femmes": "Prêt‑à‑porter et lingerie : soutiens‑gorge balconnet/plongeants, culottes sans coutures, shapewear, brassières sport, collants et robes polyvalentes."
        }
      }
    }
  };

  const landingDescriptions = {
    en: {
      navTextiles: { title: "Engineering Textile Excellence Across Global Markets", desc: "Harvics Textiles & Apparels connects manufacturing precision with international demand across fashion, functional wear and institutional supply chains. Private label programs, bulk export and technical fabrics with quality and compliance." },
      navFmcg: { title: "Fast-Moving Consumer Goods. Global Velocity.", desc: "Branded and private-label products across food, personal care and home essentials. Distribution strength, packaging efficiency and cross-border scalability with export‑compliant logistics." },
      navCommodities: { title: "Structured Commodity Trade With Risk Intelligence", desc: "Agricultural, soft, metal and energy commodities. Operations integrate sourcing, inspection, hedging coordination and logistics execution with supplier verification and contract structuring." },
      navIndustrial: { title: "Industrial Supply Chains Without Disruption", desc: "Support for manufacturing, infrastructure and heavy industries through chemicals, machinery, safety equipment and MRO supply. Industrial‑grade sourcing audits, technical compliance alignment and long‑term procurement contracts." },
      navMinerals: { title: "Strategic Mineral Supply for Global Industry", desc: "Extraction partnerships, trading and supply management across metallic, energy and industrial minerals. Partner networks, bulk shipment coordination and certification compliance." },
      navOilGas: { title: "Energy Infrastructure. Delivered With Discipline.", desc: "Upstream, midstream and downstream services with structured project support and trading execution. Cross‑border energy coordination, HSE alignment and contract structuring." },
      navRealEstate: { title: "Asset Development With Commercial Intelligence", desc: "Commercial, residential and industrial assets aligned with long‑term value. Strategic site acquisition, portfolio management, leasing and facility management." },
      navSourcing: { title: "Global Procurement Engineered for Scale", desc: "Supplier discovery and vetting, quality inspections, logistics coordination and procurement consulting. Multi‑region networks with risk mitigation and performance audits." },
      navFinance: { title: "Trade Finance Meets Digital Payment Infrastructure", desc: "Secure international transactions via letters of credit, SBLC and payment gateways. Transaction structuring, risk scoring and cross‑border facilitation." },
      navAI: { title: "Intelligence Layer for Global Commerce", desc: "Predictive analytics, automation and integration powering decisions across verticals. Forecasting engines, computer vision, ERP integration and data pipelines." },
      navAbout: { title: "About Harvics", desc: "AI-native sourcing and supply-chain intelligence operating across energy, goods and capital." }
    },
    fr: {
      navTextiles: { title: "Textile et habillement", desc: "Approvisionnement mondial en habillement et linge de maison avec blocs de coupe disciplinés, bibliothèques de tissus et conformité des usines." },
      navFmcg: { title: "FMCG & Biens de consommation", desc: "Denrées de base, soins personnels, entretien et distribution. Gamme complète avec conformité sécurité et étiquetage." },
      navCommodities: { title: "Énergie & Produits de base", desc: "Énergie, agri et métaux. Achats structurés avec qualités, fenêtres logistiques et contrôles de risque." },
      navIndustrial: { title: "Solutions industrielles", desc: "Produits chimiques, machines, MRO et sécurité. Spécifications certifiées et continuité des pièces pour la disponibilité." },
      navMinerals: { title: "Minéraux", desc: "Métaux, énergie, précieux et intrants industriels. Vérification d’origine, alignement des analyses et calendriers de livraison." },
      navOilGas: { title: "Pétrole & Gaz", desc: "Amont, milieu et aval. Équipements, partenaires EPC et disciplines HSE pour des opérations fiables." },
      navRealEstate: { title: "Immobilier", desc: "Actifs commerciaux, résidentiels et industriels. Conseil, location et FM avec rapports de niveau investisseur." },
      navSourcing: { title: "Approvisionnement", desc: "Découverte fournisseurs, vérification, négociation et logistique. Flux de travail assistés par IA." },
      navFinance: { title: "Finance & HPay", desc: "Financement du commerce, paiements et facturation. Instruments structurés avec KYC/AML et rapprochement clair." },
      navAI: { title: "IA & Technologie", desc: "Prévision, vision et chat. Données et intégrations pour des chaînes d’approvisionnement intelligentes." },
      navAbout: { title: "À propos de Harvics", desc: "Intelligence de chaîne d’approvisionnement native IA couvrant énergie, biens et capital." }
    }
  };

  function toSlug(label) {
    return String(label || "").toLowerCase()
      .replace(/'s/gi, "-s")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getLabel(key) {
    const dict = messages[currentLocale] || messages.en;
    return dict[key] || key;
  }

  function getPageDescription(key, section, item) {
    const locale = currentLocale in pageDescriptions ? currentLocale : "en";
    const map = pageDescriptions[locale] || {};
    const secSlug = toSlug(section);
    const itemSlug = toSlug(item);
    const k = map[key] || {};
    const sec = k[secSlug] || {};
    const specific = sec[itemSlug];
    if (specific) return specific;
    // Fallback generic line
    const industryTitle = getLabel(key);
    return `${item} in ${section} under ${industryTitle}. Professional sourcing, quality control, and logistics tailored to your needs.`;
  }

  function getLandingText(key) {
    const locale = currentLocale in landingDescriptions ? currentLocale : "en";
    const primary = landingDescriptions[locale] || landingDescriptions.en;
    const value = primary[key];
    if (value) return value;
    const fallback = landingDescriptions.en[key];
    return fallback || { title: getLabel(key), desc: "" };
  }

  // Render footer industries list dynamically from single source
  function initFooterIndustries(){
    const ul = document.querySelector('.site-footer h4[data-i18n-key="ftInd"] + ul');
    if(!ul) return;
    const html = verticalKeys.map(key => {
      const id = sectionIdByKey[key] || "";
      const href = id ? `index.html#${id}` : "#";
      return `<li><a href="${href}" data-i18n-key="${key}"></a></li>`;
    }).join("");
    ul.innerHTML = html;
    // Re-apply localization so newly injected links receive text
    if (typeof intelligenceLayer.getLocale === "function" &&
        typeof intelligenceLayer.setLocale === "function") {
      intelligenceLayer.setLocale(intelligenceLayer.getLocale());
    }
  }

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
    const lang = messages[locale] ? locale : "en";
    currentLocale = lang;
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === "ar" || lang === "he" || lang === "ur") ? "rtl" : "ltr";
    } catch {}
    applyText();
    window.dispatchEvent(new CustomEvent('localeChanged', { detail: { locale: lang } }));
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
    getMegaData: () => megaData[currentLocale] || megaData.en,
    getLabel,
    getPageDescription,
    getLandingText
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

function buildId(parts){
  return parts.map(function(p){return String(p||"")})
    .map(function(x){return x.toLowerCase().replace(/'s/gi,"-s").replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");})
    .filter(Boolean).join("-");
}

function keyIdFor(k){
  var map={navAbout:"about",navTextiles:"textiles",navFmcg:"fmcg",navCommodities:"commodities",navIndustrial:"industrial",navMinerals:"minerals",navOilGas:"oil-gas",navRealEstate:"real-estate",navSourcing:"sourcing",navFinance:"finance",navAI:"ai"};
  return map[k] || buildId([k]);
}

function getL5Extras(key, section, item) {
  var ks=String(key||"").toLowerCase();
  var sec=String(section||"").toLowerCase();
  var it=String(item||"").toLowerCase();
  if(ks==="navtextiles" && sec.indexOf("apparel")!==-1 && it.indexOf("men")!==-1) return ["shirts","slim fit"];
  if(ks==="navfmcg") return ["category","selection"];
  if(ks==="navcommodities") return ["class","grade"];
  if(ks==="navindustrial") return ["line","model"];
  if(ks==="navminerals") return ["class","grade"];
  if(ks==="navoilgas") return ["segment","type"];
  if(ks==="navrealestate") return ["type","unit"];
  if(ks==="navsourcing") return ["service","detail"];
  if(ks==="navfinance") return ["product","feature"];
  if(ks==="avai") return ["module","feature"];
  return ["catalog","browse"];
}

function injectAnchors() {
  if(!/index\.html$/i.test(location.pathname)) return;
  var data=(intelligenceLayer.getMegaData && intelligenceLayer.getMegaData()) || {};
  var container=document.body;
  Object.keys(data||{}).forEach(function(key){
    var keyId=keyIdFor(key);
    if(!document.getElementById(keyId)){
      var a1=document.createElement("span");
      a1.id=keyId;
      a1.className="section-anchor";
      container.appendChild(a1);
    }
    var blocks=data[key]||[];
    blocks.forEach(function(b){
      var a2Id=buildId([keyId,b.t]);
      if(!document.getElementById(a2Id)){
        var a2=document.createElement("span");
        a2.id=a2Id;
        a2.className="section-anchor";
        container.appendChild(a2);
      }
      (b.items||[]).forEach(function(it){
        var a3Id=buildId([keyId,b.t,it]);
        if(!document.getElementById(a3Id)){
          var a3=document.createElement("span");
          a3.id=a3Id;
          a3.className="section-anchor";
          container.appendChild(a3);
        }
        var extras=getL5Extras(key,b.t,it);
        var a4Id=buildId([keyId,b.t,it,extras[0]]);
        if(!document.getElementById(a4Id)){
          var a4=document.createElement("span");
          a4.id=a4Id;
          a4.className="section-anchor";
          container.appendChild(a4);
        }
        var a5Id=buildId([keyId,b.t,it,extras[0],extras[1]]);
        if(!document.getElementById(a5Id)){
          var a5=document.createElement("span");
          a5.id=a5Id;
          a5.className="section-anchor";
          container.appendChild(a5);
        }
      });
    });
  });
}
// Inject dynamic page description using centralized map
window.injectPageDescription = function(ctx) {
  try {
    const descEl = document.getElementById("catalog-desc");
    if (!descEl || !ctx) return;
    const text = intelligenceLayer.getPageDescription(ctx.key, ctx.section, ctx.item);
    descEl.textContent = text;
  } catch (e) {
    console.error("Description injection error:", e);
  }
};

window.injectLandingBanner = function() {
  try {
    const path = (location.pathname || "").split("/").pop();
    const map = {
      "textiles.html": "navTextiles",
      "fmcg.html": "navFmcg",
      "commodities.html": "navCommodities",
      "industrial.html": "navIndustrial",
      "minerals.html": "navMinerals",
      "oil-gas.html": "navOilGas",
      "real-estate.html": "navRealEstate",
      "sourcing.html": "navSourcing",
      "finance.html": "navFinance",
      "ai.html": "navAI",
      "about.html": "navAbout"
    };
    const key = map[path];
    if (!key) return;
    const host = document.getElementById("page-content") || document.querySelector("main");
    if (!host) return;
    if (document.querySelector(".page-hero")) return;
    if (host.querySelector(".landing-hero")) return;
    const t = intelligenceLayer.getLandingText(key);
    const section = document.createElement("section");
    section.className = "catalog-hero tint landing-hero";
    section.innerHTML = '<div style="max-width:1200px;margin:0 auto;padding:48px 24px;"><h1 style="font-size:clamp(1.8rem,4vw,2.6rem);color:var(--burgundy);font-weight:700;letter-spacing:0.02em"></h1><p style="max-width:720px;color:var(--text);opacity:0.85"></p></div>';
    const h1 = section.querySelector("h1");
    const p = section.querySelector("p");
    h1.textContent = t.title || "";
    p.textContent = t.desc || "";
    host.insertBefore(section, host.firstChild);
  } catch (e) {
    console.error("Landing banner injection error:", e);
  }
};

function updateLandingHero() {
  try {
    const section = document.querySelector(".landing-hero");
    if (!section) return;
    const path = (location.pathname || "").split("/").pop();
    const map = {
      "textiles.html": "navTextiles",
      "fmcg.html": "navFmcg",
      "commodities.html": "navCommodities",
      "industrial.html": "navIndustrial",
      "minerals.html": "navMinerals",
      "oil-gas.html": "navOilGas",
      "real-estate.html": "navRealEstate",
      "sourcing.html": "navSourcing",
      "finance.html": "navFinance",
      "ai.html": "navAI",
      "about.html": "navAbout"
    };
    const key = map[path];
    if (!key) return;
    const t = intelligenceLayer.getLandingText(key);
    const h1 = section.querySelector("h1");
    const p = section.querySelector("p");
    if (h1) h1.textContent = t.title || "";
    if (p) p.textContent = t.desc || "";
  } catch {}
}

window.addEventListener("localeChanged", updateLandingHero);
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
      
      if (input && btn && input.value.trim() !== "") {
        input.value = "";
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
  setInterval(tick, 1000);
  
  const regionSelect=document.getElementById("region-select");
  if(regionSelect){
    regionSelect.addEventListener("change",function(){
      if(regionSelect.value) tz=regionSelect.value;
      tick();
    });
  }
}

function initMegaCurtain(){
  const curtain=document.getElementById("mega-curtain");
  if(!curtain) return;

  let inner=curtain.querySelector(".mega-curtain-inner");
  if(!inner){
    inner=document.createElement("div");
    inner.className="mega-curtain-inner";
    curtain.appendChild(inner);
  }

  const links=[...document.querySelectorAll(".main-menu a[data-i18n-key]")];
  if(!links.length) return;

  function close(){
    curtain.classList.remove("open");
    inner.innerHTML="";
    links.forEach(a=>a.classList.remove("nav-active"));
  }

  function openFor(key){
    const data=(intelligenceLayer.getMegaData && intelligenceLayer.getMegaData()) || {};
    const blocks=data[key];
    if(!blocks || !Array.isArray(blocks)) return close();

    function anchorHref(k, section, item){
      const keyId = keyIdFor(k);
      const extras = getL5Extras(k, section, item) || [];
      const id = buildId([keyId, section, item, extras[0], extras[1]]);
      return "/index.html#" + id;
    }

    const toSlug = (label, fallback) => {
      const s = String(label || "").toLowerCase()
        .replace(/'s/gi,"-s")
        .replace(/[^\w\s-]/g,"")
        .replace(/\s+/g,"-")
        .replace(/-+/g,"-")
        .replace(/^-+|-+$/g,"");
      return s || fallback;
    };
    inner.innerHTML=blocks.map(b=>{
      const sectionSlug = toSlug(b.t, "section");
      const items=(b.items||[]).map(it=>{
        const href = anchorHref(key, b.t, it);
        return `<li><a href="${href}">${it}</a></li>`;
      }).join("");
      return `<div class="mega-block"><div class="mega-title">${b.t||""}</div><ul class="mega-items">${items}</ul></div>`;
    }).join("");

    curtain.classList.add("open");
    links.forEach(a=>{
      const k=a.getAttribute("data-i18n-key");
      a.classList.toggle("nav-active", k===key);
    });
  }

  links.forEach(a=>{
    const key=a.getAttribute("data-i18n-key");
    if(!key) return;
    a.addEventListener("mouseenter", ()=>{ lastOpenByKeyboard=false; openFor(key); });
    a.addEventListener("focus", ()=>{ lastOpenByKeyboard=false; openFor(key); });
    a.addEventListener("keydown",(e)=>{
      const idx=links.indexOf(a);
      if(e.key==="ArrowRight"){
        e.preventDefault();
        const next=links[(idx+1)%links.length];
        lastOpenByKeyboard=true;
        openFor(next.getAttribute("data-i18n-key"));
        next.focus();
      }else if(e.key==="ArrowLeft"){
        e.preventDefault();
        const prev=links[(idx-1+links.length)%links.length];
        lastOpenByKeyboard=true;
        openFor(prev.getAttribute("data-i18n-key"));
        prev.focus();
      }else if(e.key==="Enter"||e.key===" "){
        e.preventDefault();
        lastOpenByKeyboard=true;
        openFor(key);
        const first=inner.querySelector(".mega-items a");
        if(first){ first.focus(); }
      }else if(e.key==="Escape"){
        close();
      }
    });
  });

  curtain.addEventListener("mouseleave", close);
  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") close(); });
  document.addEventListener("pointerdown", (e)=>{ if(!curtain.contains(e.target)) close(); });
  curtain.addEventListener("click", (e)=>{
    const a=e.target.closest("a");
    if(a) close();
  });
}

// Highlight active nav based on hash
window.addEventListener("hashchange", function(){
  const hash=(location.hash||"").replace("#","");
  const key=Object.keys(sectionIdByKey).find(k=>sectionIdByKey[k]===hash);
  const links=[...document.querySelectorAll(".main-menu a[data-i18n-key]")];
  links.forEach(a=>{
    const k=a.getAttribute("data-i18n-key");
    a.classList.toggle("nav-active", k===key);
  });
});

/* =========================================
   9. Catalog Subpage Renderer
   ========================================= */
function initCatalogPage(){
  const root=document.getElementById("catalog-root");
  if(!root) return;
  const params=new URLSearchParams(location.search||"");
  const key=params.get("key");
  const section=params.get("section");
  const item=params.get("item");
  const dict=(intelligenceLayer.getMegaData && intelligenceLayer.getMegaData()) || {};
  const blocks=dict[key] || [];
  const block=blocks.find(b => (b.t||"")===section);
  const validItem=(block && (block.items||[]).includes(item)) ? item : null;
  const title = [ (document.querySelector(`.main-menu a[data-i18n-key="${key}"]`)||{}).textContent || "", section || "", validItem || "" ].filter(Boolean).join(" — ");
  const template = `
    <section class="catalog-hero tint">
      <div style="max-width:1200px;margin:0 auto;padding:48px 24px;">
        <h1 style="font-size:clamp(1.8rem,4vw,2.6rem);color:var(--burgundy);font-weight:700;letter-spacing:0.02em;">${title}</h1>
        <p style="max-width:720px;color:var(--text);opacity:0.85">Curated products and solutions aligned with Harvics’ unified model. Explore disciplined categories and contact us for tailored sourcing.</p>
      </div>
    </section>
    <section class="catalog-grid">
      <div style="max-width:1200px;margin:0 auto;padding:24px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
          ${Array.from({length:8}).map((_,i)=>`
            <div style="border:1px solid var(--divider);background:#fff;box-shadow:var(--card-shadow);border-radius:0;overflow:hidden">
              <div style="height:160px;background-size:cover;background-position:center;background-image:url('https://images.unsplash.com/photo-1618005198919-719f0eb84d6b?auto=format&fit=crop&w=800&q=60');"></div>
              <div style="padding:12px 14px;color:var(--burgundy);font-weight:600">${validItem || section || "Category"}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
  root.innerHTML=template;
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

  // Local file override: data-bg-file
  document.querySelectorAll('[data-bg-file]').forEach(el => {
    const file = el.getAttribute('data-bg-file');
    if (!file) return;
    const path = file.startsWith('/') ? file : `./${file}`;
    const url = encodeURI(path);
    el.style.backgroundImage = `url('${url}')`;
    if (!el.style.backgroundSize) el.style.backgroundSize = 'cover';
    if (!el.style.backgroundPosition) el.style.backgroundPosition = 'center';
  });
}

// Auto-flow sliders with pause on hover
function initAutoSliders(){
  const sliders = Array.from(document.querySelectorAll('.slider[data-autoplay="1"]'));
  if(!sliders.length) return;
  sliders.forEach(sl => {
    let speed = parseFloat(sl.getAttribute('data-speed')||'0.6');
    if(!(speed>0)) speed = 0.6;
    let dirAttr = parseInt(sl.getAttribute('data-dir')||'1',10);
    let dir = dirAttr === -1 ? -1 : 1;
    let rafId = null;
    let paused = false;
    let lastX = null;
    function step(){
      if(paused){ rafId = requestAnimationFrame(step); return; }
      const delta = speed * dir;
      sl.scrollLeft += delta;
      const max = sl.scrollWidth - sl.clientWidth;
      if (sl.scrollLeft <= 0 && dir < 0) dir = 1;
      if (sl.scrollLeft >= max && dir > 0) dir = -1;
      rafId = requestAnimationFrame(step);
    }
    sl.addEventListener('mouseenter', ()=>{ paused = false; });
    sl.addEventListener('mouseleave', ()=>{ paused = false; lastX = null; });
    sl.addEventListener('pointerdown', ()=>{ paused = true; });
    sl.addEventListener('pointerup', ()=>{ paused = false; });
    sl.addEventListener('mousemove', (e)=>{
      if(lastX == null){ lastX = e.clientX; return; }
      const dx = e.clientX - lastX;
      if(Math.abs(dx) > 2){ dir = dx > 0 ? 1 : -1; lastX = e.clientX; }
    });
    rafId = requestAnimationFrame(step);
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
      if(searchInput) searchInput.focus();
    });
    overlay.addEventListener("click",function(e){
      if(e.target===overlay){overlay.style.display="none";}
    });
    document.addEventListener("keydown",function(e){
      if(e.key==="Escape"){overlay.style.display="none";}
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
