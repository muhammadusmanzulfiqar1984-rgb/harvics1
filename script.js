/**
 * HARVICS GLOBAL SCRIPT
 * Handles Localization, AI Assistant, Sliders, and Interactivity
 */

function getBaseRoot() {
  try {
    const path = location.pathname || "/";
    if (path.includes("/subpages/")) return path.split("/subpages/")[0] || "";
    if (/\/[^/]+\.html$/i.test(path)) return path.replace(/\/[^/]+\.html$/i, "");
    return path.replace(/\/$/,"");
  } catch (e) {
    return "";
  }
}

function withBaseRoot(url, baseRoot) {
  if (!url) return url;
  if (/^(https?:|data:|mailto:|tel:|#)/i.test(url)) return url;
  if (url.startsWith("//")) return url;
  if (!url.startsWith("/")) return url;
  const root = baseRoot && baseRoot !== "/" ? baseRoot.replace(/\/$/,"") : "";
  if (root && url.startsWith(root + "/")) return url;
  return root + url;
}

function normalizeInternalUrls(baseRoot) {
  if (!baseRoot || baseRoot === "/") return;
  const nodes = document.querySelectorAll("a[href], link[href], script[src], img[src]");
  nodes.forEach((el) => {
    if (el.dataset && el.dataset.baseRooted === "1") return;
    if (el.tagName === "A" || el.tagName === "LINK") {
      const href = el.getAttribute("href");
      const next = withBaseRoot(href, baseRoot);
      if (next !== href) el.setAttribute("href", next);
    } else if (el.tagName === "SCRIPT" || el.tagName === "IMG") {
      const src = el.getAttribute("src");
      const next = withBaseRoot(src, baseRoot);
      if (next !== src) el.setAttribute("src", next);
    }
    if (el.dataset) el.dataset.baseRooted = "1";
  });
}

function getInlineLayout() {
  return `<header>
  <div class="top-bar">
    <div class="clock" id="hdr-clock">
      <div class="hand hour" id="h"></div>
      <div class="hand min" id="m"></div>
      <div class="hand sec" id="s"></div>
      <div class="dot"></div>
    </div>
    <a href="/index.html" class="logo" data-i18n-key="brandName">Harvics</a>
    <div class="language-switcher">
      <button type="button" id="global-toggle">GLOBAL</button>
      <select id="language-select" aria-label="Language">
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ar">العربية</option>
        <option value="zh">中文</option>
        <option value="hi">हिन्दी</option>
        <option value="he">עברית</option>
        <option value="pt">Português</option>
        <option value="ru">Русский</option>
        <option value="bn">বাংলা</option>
        <option value="ur">اردو</option>
      </select>
      <a href="#login" class="login-link" data-i18n-key="login">Login</a>
    </div>
  </div>
  <nav class="main-nav">
    <ul class="main-menu">
      <li><a href="/index.html#about" data-i18n-key="navAbout">About Us</a></li>
      <li><a href="/index.html#textiles" data-i18n-key="navTextiles">Textiles &amp; Apparels</a></li>
      <li><a href="/index.html#fmcg" data-i18n-key="navFmcg">FMCG</a></li>
      <li><a href="/index.html#commodities" data-i18n-key="navCommodities">Commodities</a></li>
      <li><a href="/index.html#industrial" data-i18n-key="navIndustrial">Industrial Solutions</a></li>
      <li><a href="/index.html#minerals" data-i18n-key="navMinerals">Minerals</a></li>
      <li><a href="/index.html#oil-gas" data-i18n-key="navOilGas">Oil &amp; Gas</a></li>
      <li><a href="/index.html#real-estate" data-i18n-key="navRealEstate">Real Estate</a></li>
      <li><a href="/index.html#sourcing" data-i18n-key="navSourcing">Sourcing Solutions</a></li>
      <li><a href="/index.html#finance" data-i18n-key="navFinance">Finance &amp; HPay</a></li>
      <li><a href="/index.html#ai" data-i18n-key="navAI">AI &amp; Technology</a></li>
    </ul>
  </nav>
  <div class="header-debug-line"></div>
</header>
<div class="mega-curtain" id="mega-curtain" aria-hidden="true">
  <div class="mega-curtain-inner"></div>
</div>
<div class="global-panel" id="global-panel" aria-hidden="true">
  <div class="global-panel-inner">
    <div class="global-panel-title">Global</div>
    <div class="global-panel-content">
      Markets steady. Sourcing lanes open. Logistics normal. <button id="global-switch" data-on="0">Toggle</button>
    </div>
  </div>
  </div>
<footer class="site-footer">
  <div class="footer-top">
    <div class="footer-col">
      <h4 data-i18n-key="ftIM">Industries &amp; Markets</h4>
      <ul>
        <li><a href="/index.html#textiles" data-i18n-key="navTextiles">Textiles &amp; Apparels</a></li>
        <li><a href="/index.html#fmcg" data-i18n-key="navFmcg">FMCG</a></li>
        <li><a href="/index.html#commodities" data-i18n-key="navCommodities">Commodities</a></li>
        <li><a href="/index.html#industrial" data-i18n-key="navIndustrial">Industrial Solutions</a></li>
        <li><a href="/index.html#minerals" data-i18n-key="navMinerals">Minerals</a></li>
        <li><a href="/index.html#oil-gas" data-i18n-key="navOilGas">Oil &amp; Gas</a></li>
        <li><a href="/index.html#real-estate" data-i18n-key="navRealEstate">Real Estate</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 data-i18n-key="ftSO">Sourcing &amp; Operations</h4>
      <ul>
        <li><a href="/sourcing.html#strategy" data-i18n-key="ftGSS">Global Sourcing Solutions</a></li>
        <li><a href="/sourcing.html#manufacturing" data-i18n-key="ftOEMODM">OEM / ODM Manufacturing</a></li>
        <li><a href="/sourcing.html#manufacturing" data-i18n-key="ftPLD">Private Label Development</a></li>
        <li><a href="/sourcing.html#logistics" data-i18n-key="ftSCM">Supply Chain Management</a></li>
        <li><a href="/sourcing.html#quality" data-i18n-key="ftQCI">Quality Control &amp; Inspection</a></li>
        <li><a href="/sourcing.html#logistics" data-i18n-key="ftLW">Logistics &amp; Warehousing</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 data-i18n-key="ftFP">Finance &amp; Payments</h4>
      <ul>
        <li><a href="/finance.html" data-i18n-key="ftTF">Trade Finance</a></li>
        <li><a href="/finance.html" data-i18n-key="ftSF">Structured Funding</a></li>
        <li><a href="/finance.html" data-i18n-key="ftEscrow">Escrow &amp; Settlement</a></li>
        <li><a href="/finance.html" data-i18n-key="ftCBP">Cross-Border Payments</a></li>
        <li><a href="/finance.html" data-i18n-key="ftHPay">HPay</a></li>
        <li><a href="/finance.html" data-i18n-key="ftRisk">Risk &amp; Compliance</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 data-i18n-key="ftAT">AI &amp; Technology</h4>
      <ul>
        <li><a href="/ai.html" data-i18n-key="ftAISCI">AI Supply Chain Intelligence</a></li>
        <li><a href="/ai.html" data-i18n-key="ftProcAuto">Procurement Automation</a></li>
        <li><a href="/ai.html" data-i18n-key="ftMarketAnalytics">Market &amp; Price Analytics</a></li>
        <li><a href="/ai.html" data-i18n-key="ftERPCRM">ERP / CRM Integration</a></li>
        <li><a href="/ai.html" data-i18n-key="ftDataDecision">Data &amp; Decision Systems</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 data-i18n-key="ftBiz">For Business</h4>
      <ul>
        <li><a href="/about.html" data-i18n-key="ftEnterprise">Enterprise Partnerships</a></li>
        <li><a href="/about.html" data-i18n-key="ftInstitutional">Institutional Clients</a></li>
        <li><a href="/about.html" data-i18n-key="ftJointVentures">Strategic Joint Ventures</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 data-i18n-key="ftGov">For Governments &amp; Institutions</h4>
      <ul>
        <li><a href="/about.html" data-i18n-key="ftPublicSector">Public Sector Solutions</a></li>
        <li><a href="/about.html" data-i18n-key="ftInfrastructure">Infrastructure Projects</a></li>
        <li><a href="/about.html" data-i18n-key="ftTradeDev">Trade &amp; Development Programs</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 data-i18n-key="ftVG">Values &amp; Governance</h4>
      <ul>
        <li><a href="/about.html" data-i18n-key="ftIntegrity">Integrity &amp; Transparency</a></li>
        <li><a href="/about.html" data-i18n-key="ftResponsible">Responsible Sourcing</a></li>
        <li><a href="/about.html" data-i18n-key="ftSustain">Sustainability</a></li>
        <li><a href="/about.html" data-i18n-key="ftPrivacySec">Data Privacy &amp; Security</a></li>
        <li><a href="/about.html" data-i18n-key="ftCompliance">Compliance Framework</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4 data-i18n-key="ftAboutGV">About Harvics Global Ventures</h4>
      <ul>
        <li><a href="/about.html" data-i18n-key="ftCompanyOverview">Company Overview</a></li>
        <li><a href="/about.html" data-i18n-key="ftLeadership">Leadership</a></li>
        <li><a href="/about.html" data-i18n-key="ftCareerOpp">Career Opportunities</a></li>
        <li><a href="/about.html" data-i18n-key="ftInvestors">Investors</a></li>
        <li><a href="/about.html" data-i18n-key="ftEthicsComp">Ethics &amp; Compliance</a></li>
        <li><a href="/about.html" data-i18n-key="ftNewsInsights">News &amp; Insights</a></li>
        <li><a href="/about.html" data-i18n-key="ftEvents">Events</a></li>
        <li><a href="/contact.html" data-i18n-key="ftContactUs">Contact Us</a></li>
      </ul>
      <div class="footer-social">
        <a href="#" aria-label="LinkedIn">in</a>
        <a href="#" aria-label="X">x</a>
        <a href="#" aria-label="YouTube">yt</a>
        <a href="#" aria-label="Instagram">ig</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div data-i18n-key="ftBottom">© 2026 Harvics Global Ventures . All rights reserved.</div>
    <div style="display:flex;gap:24px;align-items:center">
      <a href="#" data-i18n-key="ftPrivacyPolicy">Privacy Policy</a>
      <a href="#" data-i18n-key="ftTermsUse">Terms of Use</a>
      <a href="#" data-i18n-key="ftCompliance">Compliance</a>
      <a href="#" data-i18n-key="ftAccessibility">Accessibility</a>
      <span data-i18n-key="ftGlobalOps">Global Operations</span>
    </div>
  </div>
</footer>`;
}

async function injectLayoutShell() {
  try {
    const baseRoot = getBaseRoot();
    const candidates = [
      withBaseRoot('/layout.html', baseRoot),
      'layout.html',
      './layout.html'
    ];
    let html = null;
    for (const url of candidates) {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) continue;
        html = await res.text();
        if (html) break;
      } catch (e) {}
    }
    if (!html) html = getInlineLayout();
    if (!html) throw new Error('Failed to load layout');
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
      const page = document.getElementById("page-content");
      if (page) {
        page.appendChild(footer);
      } else {
        body.appendChild(footer);
      }
    }
    normalizeInternalUrls(baseRoot);
  } catch (e) {
    console.error('Layout injection error:', e);
  }
}

function cleanPageShell() {
  const bodyFooter = document.querySelector('body > footer.site-footer');
  const pageFooter = document.querySelector('#page-content footer.site-footer');
  const keepFooter = pageFooter || bodyFooter;
  document.querySelectorAll('footer.site-footer').forEach(el => {
    if (keepFooter && el === keepFooter) return;
    el.remove();
  });
  document.querySelectorAll('.footer-top').forEach(el => {
    if (el.closest('footer.site-footer')) return;
    el.remove();
  });
}

function initSubpageRouter(){}

async function runAppInit(){
  try{ await injectLayoutShell(); }catch(e){ console.error("injectLayoutShell", e); }
  try{ normalizeInternalUrls(getBaseRoot()); }catch(e){ console.error("normalizeInternalUrls", e); }
  try{ setHeaderHeightVar(); }catch(e){ console.error("setHeaderHeightVar", e); }
  try{ cleanPageShell(); }catch(e){ console.error("cleanPageShell", e); }
  try{ await ensureAiLandingMicrocopy(); }catch(e){ console.error("ensureAiLandingMicrocopy", e); }
  const safe = (name, fn) => {
    try{ if (typeof fn === 'function') fn(); }
    catch(e){ console.error(name, e); }
  };
  safe("initClock", initClock);
  safe("initMegaCurtain", initMegaCurtain);
  safe("initLocalization", initLocalization);
  safe("injectLandingBanner", injectLandingBanner);
  safe("injectAnchors", injectAnchors);
  safe("initFooterIndustries", initFooterIndustries);
  safe("initSocialLinks", initSocialLinks);
  safe("initHomepageImages", initHomepageImages);
  safe("ensureGlobalImageFallback", ensureGlobalImageFallback);
  safe("initWheel", initWheel);
  safe("initAutoSliders", initAutoSliders);
  safe("initHeroSlider", initHeroSlider);
  safe("initMotionSlider", initMotionSlider);
  safe("initCoverageAnimation", initCoverageAnimation);
  safe("initLiquidGlass", initLiquidGlass);
  safe("initScrollZoom", initScrollZoom);
  safe("initDepthTilt", initDepthTilt);
  safe("initSpecularSweep", initSpecularSweep);
  safe("initScrollReveal", initScrollReveal);
  safe("initNewsletter", initNewsletter);
  safe("initExtras", initExtras);
  safe("initSubpageAutoFill", initSubpageAutoFill);
  safe("initSectionMarkers", initSectionMarkers);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runAppInit);
} else {
  runAppInit();
}

function initLiquidGlass(){
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce) return;
  const els = Array.from(document.querySelectorAll(".wheel,.how-tabs,.coverage,.insight-card,.ai-sheet,.social .disc,.connect-inner"));
  if(!els.length) return;

  function setVars(el, x, y){
    el.style.setProperty("--lgx", x.toFixed(3));
    el.style.setProperty("--lgy", y.toFixed(3));
  }

  els.forEach(el=>{
    el.addEventListener("pointermove", (e)=>{
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / (r.width / 2);
      const ny = (e.clientY - cy) / (r.height / 2);
      const x = Math.max(-1, Math.min(1, nx));
      const y = Math.max(-1, Math.min(1, ny));
      setVars(el, x, y);
    });
    el.addEventListener("pointerleave", ()=>{
      setVars(el, 0, 0);
    });
  });
}

function initScrollZoom(){
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce) return;
  const page = document.getElementById("page-content");
  const scroller = (page && page.scrollHeight > page.clientHeight + 1) ? page : window;
  const targets = Array.from(document.querySelectorAll("[data-scroll-zoom='1']"));
  if(!targets.length) return;
  let raf = 0;

  function clamp(v, min, max){
    return Math.min(max, Math.max(min, v));
  }

  function update(){
    raf = 0;
    const vh = window.innerHeight || 0;
    targets.forEach(el=>{
      const rect = el.getBoundingClientRect();
      const total = vh + rect.height;
      const p = total > 0 ? clamp((vh - rect.top) / total, 0, 1) : 0;
      const scale = 1 + p * 0.09;
      const ty = (0.5 - p) * 18;
      el.style.setProperty("--sz", scale.toFixed(4));
      el.style.setProperty("--szy", ty.toFixed(2)+"px");
    });
  }

  function onScroll(){
    if(raf) return;
    raf = requestAnimationFrame(update);
  }

  if(scroller === window){
    window.addEventListener("scroll", onScroll, { passive: true });
  }else{
    scroller.addEventListener("scroll", onScroll, { passive: true });
  }
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

function initDepthTilt(){
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce) return;
  const page = document.getElementById("page-content");
  const scroller = (page && page.scrollHeight > page.clientHeight + 1) ? page : window;
  const targets = Array.from(document.querySelectorAll("[data-scroll-zoom='1']"));
  if(!targets.length) return;

  let lastX = 0;
  let lastY = 0;
  let raf = 0;

  function clamp(v, min, max){
    return Math.min(max, Math.max(min, v));
  }

  function apply(){
    raf = 0;
    const cx = (window.innerWidth || 0) / 2;
    const cy = (window.innerHeight || 0) / 2;
    const nx = cx ? (lastX - cx) / cx : 0;
    const ny = cy ? (lastY - cy) / cy : 0;
    const x = clamp(nx, -1, 1);
    const y = clamp(ny, -1, 1);

    const maxMove = 10;
    const maxRot = 5.5;
    const tx = x * maxMove;
    const ty = y * maxMove;
    const rx = -y * maxRot;
    const ry = x * maxRot;

    targets.forEach(el=>{
      el.style.setProperty("--tilt-x", tx.toFixed(2)+"px");
      el.style.setProperty("--tilt-y", ty.toFixed(2)+"px");
      el.style.setProperty("--tilt-rx", rx.toFixed(2)+"deg");
      el.style.setProperty("--tilt-ry", ry.toFixed(2)+"deg");
    });
  }

  function onMove(e){
    lastX = e.clientX;
    lastY = e.clientY;
    if(raf) return;
    raf = requestAnimationFrame(apply);
  }

  function onLeave(){
    targets.forEach(el=>{
      el.style.setProperty("--tilt-x", "0px");
      el.style.setProperty("--tilt-y", "0px");
      el.style.setProperty("--tilt-rx", "0deg");
      el.style.setProperty("--tilt-ry", "0deg");
    });
  }

  if(scroller === window){
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
  }else{
    scroller.addEventListener("pointermove", onMove, { passive: true });
    scroller.addEventListener("pointerleave", onLeave, { passive: true });
  }
  onLeave();
}

function initSpecularSweep(){
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce) return;
  const page = document.getElementById("page-content");
  const scroller = (page && page.scrollHeight > page.clientHeight + 1) ? page : window;
  let raf = 0;

  function clamp(v, min, max){
    return Math.min(max, Math.max(min, v));
  }

  function readProgress(){
    if(scroller === window){
      const st = window.scrollY || 0;
      const sh = document.documentElement.scrollHeight || 0;
      const ch = window.innerHeight || 0;
      const max = Math.max(1, sh - ch);
      return clamp(st / max, 0, 1);
    }
    const st = scroller.scrollTop || 0;
    const sh = scroller.scrollHeight || 0;
    const ch = scroller.clientHeight || 0;
    const max = Math.max(1, sh - ch);
    return clamp(st / max, 0, 1);
  }

  function update(){
    raf = 0;
    const p = readProgress();
    document.documentElement.style.setProperty("--spec", p.toFixed(4));
  }

  function onScroll(){
    if(raf) return;
    raf = requestAnimationFrame(update);
  }

  if(scroller === window){
    window.addEventListener("scroll", onScroll, { passive: true });
  }else{
    scroller.addEventListener("scroll", onScroll, { passive: true });
  }
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

function initSmoothScroll(){
  return;
}

function setHeaderHeightVar(){
  try{
    const header=document.querySelector('header');
    // Header includes nav, so just take header height
    const h=(header?header.offsetHeight:0);
    if(h>0){
      document.documentElement.style.setProperty('--header-h', h+'px');
    }
  }catch(e){}
}
window.addEventListener("resize", setHeaderHeightVar);

function initSectionMarkers(){
  try{
    const main=document.getElementById("page-content");
    if(!main) return;
    let blocks=Array.from(main.querySelectorAll(":scope > section"));
    if(!blocks.length){
      blocks=Array.from(main.children).filter(function(el){
        const tag=el.tagName;
        if(tag==="SCRIPT"||tag==="STYLE") return false;
        return true;
      });
    }
    if(!blocks.length) return;
    blocks.forEach(function(section, idx){
      if(section.dataset.sectionMarked==="1") return;
      section.dataset.sectionMarked="1";
      const n=idx+1;
      const start=document.createElement("div");
      start.className="section-marker section-marker-start";
      start.textContent="SECTION "+n+" START";
      const end=document.createElement("div");
      end.className="section-marker section-marker-end";
      end.textContent="SECTION "+n+" END";
      const parent=section.parentNode;
      if(parent){
        parent.insertBefore(start, section);
        if(section.nextSibling){
          parent.insertBefore(end, section.nextSibling);
        }else{
          parent.appendChild(end);
        }
      }
    });
  }catch(e){}
}

async function ensureAiLandingMicrocopy(){
  try{
    const cacheKey="landingDescriptions_ai";
    const cached=localStorage.getItem(cacheKey);
    if(cached){ try{ Object.assign(landingDescriptions.en, JSON.parse(cached)); }catch{} }
    const corpus=await extractAppleStyleCorpus();
    const keys=["navTextiles","navFmcg","navCommodities","navIndustrial","navMinerals","navOilGas","navRealEstate","navSourcing","navFinance","navAI","navAbout"];
    const updates={};
    for(const k of keys){
      const base=landingDescriptions.en[k]||{title:k,desc:""};
      if(base && base.desc && base.desc.length>24) continue;
      const label=intelligenceLayer.getLabel(k);
      const prompt=("Using the following Apple-style corpus, write a concise two-line landing microcopy for Harvics '"+label+"'. Keep it minimal, modern, and product-savvy. Return JSON with {title, desc}. Corpus:\n"+corpus+"\nBase:\n"+(base.title||"")+". "+(base.desc||""));
      const ans=await intelligenceLayer.askAi(prompt).catch(()=> "");
      let obj=null;
      try{ obj=JSON.parse(ans); }catch{ obj=null; }
      if(obj && obj.title && typeof obj.title==="string"){
        updates[k]={title:obj.title, desc:obj.desc||""};
      }
      await new Promise(r=>setTimeout(r,120));
    }
    if(Object.keys(updates).length){
      Object.assign(landingDescriptions.en, updates);
      try{ localStorage.setItem(cacheKey, JSON.stringify(updates)); }catch{}
      updateLandingHero();
    }
  }catch(e){}
}

async function extractAppleStyleCorpus(){
  const urls=["/APPLE EXAMPLE/Apple webpage .html","/APPLE EXAMPLE/TV & Home - Apple.html"];
  let text="";
  for(const u of urls){
    try{
      const res=await fetch(u, {cache:"no-store"});
      if(!res.ok) continue;
      const html=await res.text();
      const doc=new DOMParser().parseFromString(html,"text/html");
      const parts=[];
      doc.querySelectorAll("h1,h2,h3,p,li").forEach(el=>{
        const t=(el.textContent||"").trim();
        if(t && t.length<160) parts.push(t);
      });
      text+=parts.join(" • ")+" • ";
    }catch(e){}
  }
  return text.slice(0, 4000);
}
function initHubPage(){
  const root=document.getElementById("hub-root");
  if(!root) return;
  const keys=["navTextiles","navIndustrial","navFmcg","navSourcing","navCommodities"];
  const slugs={navTextiles:"textiles",navIndustrial:"industrial",navFmcg:"fmcg",navSourcing:"sourcing",navCommodities:"commodities"};
  const imagery={textiles:"textiles",industrial:"industrial",fmcg:"fmcg",sourcing:"logistics",commodities:"agri"};
  const sections=keys.map(k=>{
    const t=intelligenceLayer.getLandingText(k);
    const id=slugs[k];
    let bgUrl='';
    try{
      const key=imagery[id]||'map';
      if(typeof getProductImage==='function'){ bgUrl=getProductImage(key); }
      else{ bgUrl='https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80'; }
    }catch(e){}
    return `<section id="${id}" class="catalog-hero tint" style="background-image:url('${bgUrl}');background-size:cover;background-position:center"><div style="max-width:1200px;margin:0 auto;padding:48px 24px;"><h1 style="font-size:clamp(1.8rem,4vw,2.6rem);color:var(--burgundy);font-weight:700;letter-spacing:0.02em">${t.title||""}</h1><p style="max-width:720px;color:var(--text);opacity:.85">${t.desc||""}</p><div style="margin-top:16px;display:flex;gap:12px"><a href="index.html#${id}" style="padding:10px 14px;border:1px solid var(--gold);color:var(--burgundy);text-decoration:none">Explore</a><a href="index.html#${id}" style="padding:10px 14px;border:1px solid var(--divider);color:var(--burgundy);text-decoration:none">Back to Home</a></div></div></section>`;
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
    const keyMap = {
      navTextiles: "textiles,apparel",
      navFmcg: "fmcg,food",
      navCommodities: "commodities,agri",
      navIndustrial: "industrial,manufacturing",
      navMinerals: "minerals,metal",
      navOilGas: "oil-gas,energy",
      navRealEstate: "real estate,building",
      navSourcing: "sourcing,logistics",
      navFinance: "finance,reports",
      navAI: "ai,vision",
      navAbout: "about,services"
    };
    const heroKeywords = [keyMap[ctx.key], ctx.section, ctx.item, ...(ctx.extras||[])].filter(Boolean).join(",");
    let heroBgUrl = null;
    try{
      if (typeof getProductImage === "function") heroBgUrl = getProductImage(heroKeywords || "default");
    }catch(e){}
    if (heroBgUrl) {
      const computed = window.getComputedStyle(hero);
      if (!hero.style.backgroundImage || computed.backgroundImage === "none") {
        hero.style.backgroundImage = `url('${heroBgUrl}')`;
        hero.style.backgroundSize = "cover";
        hero.style.backgroundPosition = "center";
      }
    }
    const titleParts=[intelligenceLayer.getLabel(ctx.key), ctx.section, ctx.item, (ctx.extras||[]).join(" — ")].filter(Boolean);
    p.textContent=getRelevantDescription(ctx);
    let container=document.getElementById("subpage-grid");
    if(!container){
      const grid=document.createElement("section");
      grid.className="catalog-grid";
      grid.innerHTML='<div style="max-width:1200px;margin:0 auto;padding:24px;"><div id="subpage-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;"></div></div>';
      host.appendChild(grid);
      container=document.getElementById("subpage-grid");
    }
    if(hero) hero.style.minHeight="auto";
    ensureProductData(function(){
      try {
        let cards=getRelevantCards(ctx);
        const gridTarget=container || document.getElementById("subpage-grid");
        if(!gridTarget) return;
        
        if (!cards || cards.length === 0) {
           cards = fallbackProducts(ctx);
        }

        gridTarget.innerHTML=(cards||[]).map(function(card){
          let url = "";
          try { url = getImage(card.keywords); } catch(err) { url = "https://placehold.co/600x400?text=Harvics"; }
          return '<div class="product-card"><div class="product-image" style="height:160px;background-image:url(\''+url+'\');background-size:cover;background-position:center"></div><div class="product-info"><div class="product-name">'+(card.name||"")+'</div><div class="product-price">'+(card.desc||card.price||"")+'</div></div></div>';
        }).join("");
      } catch(e) {
        console.error("Grid render error:", e);
        const gridTarget=container || document.getElementById("subpage-grid");
        if(gridTarget) gridTarget.innerHTML = '<div style="padding:20px;color:red">Error loading products. Please refresh.</div>';
      }
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
  const baseRoot = getBaseRoot();
  const tag=document.createElement("script");
  tag.src=withBaseRoot("/product-data.js", baseRoot) || "product-data.js";
  tag.onload=function(){ cb(); };
  tag.onerror=function(){ cb(); };
  document.head.appendChild(tag);
}

function getImage(keywords){
  if(typeof getProductImage==="function") return getProductImage(keywords||"default");
  const k=(keywords||"default").split(",")[0]||"default";
  return "https://source.unsplash.com/1200x800/?"+encodeURIComponent(k);
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

function getCatalogProducts(ctx){
  if(!ctx || typeof productCatalog==="undefined") return null;
  const key=(ctx.key||"").toLowerCase();
  const section=(ctx.section||"").toLowerCase();
  const item=(ctx.item||"").toLowerCase();
  const pick=(arr)=>Array.isArray(arr)?arr:null;
  if(key==="navtextiles"){
    if(item.includes("men")) return pick(productCatalog.textiles && productCatalog.textiles.men);
    if(item.includes("ladies")||item.includes("women")) return pick(productCatalog.textiles && productCatalog.textiles.women);
    if(item.includes("kids")) return pick(productCatalog.textiles && productCatalog.textiles.kids);
    if(section.includes("home")) return pick(productCatalog.textiles && productCatalog.textiles.home);
    if(section.includes("fabrics")) return pick(productCatalog.textiles && productCatalog.textiles.home);
    if(section.includes("accessories")) return pick(productCatalog.textiles && productCatalog.textiles.accessories) || pick(productCatalog.textiles && productCatalog.textiles.home);
  }
  if(key==="navfmcg"){
    if(section.includes("personal")) return pick(productCatalog.fmcg && productCatalog.fmcg.personalCare);
    if(section.includes("home")) return pick(productCatalog.fmcg && productCatalog.fmcg.homeCare);
    if(section.includes("distribution")) return pick(productCatalog.fmcg && productCatalog.fmcg.packaged);
    if(section.includes("food")||section.includes("beverage")||item.includes("snack")){
      if(item.includes("grain")||item.includes("rice")||item.includes("wheat")) return pick(productCatalog.fmcg && productCatalog.fmcg.staples);
      if(item.includes("spice")||item.includes("oil")) return pick(productCatalog.fmcg && productCatalog.fmcg.oils);
      if(item.includes("snack")||item.includes("cookie")||item.includes("chips")) return pick(productCatalog.fmcg && productCatalog.fmcg.packaged);
      if(item.includes("beverage")||item.includes("juice")||item.includes("coffee")) return pick(productCatalog.fmcg && productCatalog.fmcg.dairy);
      return pick(productCatalog.fmcg && productCatalog.fmcg.packaged);
    }
  }
  if(key==="navindustrial") return pick(productCatalog.industrial);
  if(key==="navcommodities"){
    if(section.includes("agri")) return pick(productCatalog.commodities && productCatalog.commodities.agri);
    if(section.includes("energy")) return pick(productCatalog.commodities && productCatalog.commodities.energy);
    if(section.includes("metals")) return pick(productCatalog.commodities && productCatalog.commodities.metals);
    if(section.includes("protein")) return pick(productCatalog.commodities && productCatalog.commodities.protein);
    if(section.includes("strategic")) return pick(productCatalog.commodities && productCatalog.commodities.strategic);
    if(section.includes("industrial")) return pick(productCatalog.commodities && productCatalog.commodities.industrialChem);
    return pick(productCatalog.commodities && productCatalog.commodities.energy);
  }
  if(key==="navminerals"){
    if(section.includes("metal")) return pick(productCatalog.minerals && productCatalog.minerals.metals);
    if(section.includes("energy")) return pick(productCatalog.minerals && productCatalog.minerals.energy);
    if(section.includes("precious")) return pick(productCatalog.minerals && productCatalog.minerals.precious);
    if(section.includes("industrial")) return pick(productCatalog.minerals && productCatalog.minerals.industrial);
    return pick(productCatalog.minerals && productCatalog.minerals.metals);
  }
  if(key==="navoilgas"){
    if(section.includes("upstream")) return pick(productCatalog.oilgas && productCatalog.oilgas.upstream);
    if(section.includes("midstream")) return pick(productCatalog.oilgas && productCatalog.oilgas.midstream);
    if(section.includes("downstream")) return pick(productCatalog.oilgas && productCatalog.oilgas.downstream);
    if(section.includes("services")) return pick(productCatalog.oilgas && productCatalog.oilgas.services);
    return pick(productCatalog.oilgas && productCatalog.oilgas.services);
  }
  if(key==="navrealestate"){
    if(section.includes("commercial")) return pick(productCatalog.realestate && productCatalog.realestate.commercial);
    if(section.includes("residential")) return pick(productCatalog.realestate && productCatalog.realestate.residential);
    if(section.includes("industrial")) return pick(productCatalog.realestate && productCatalog.realestate.industrial);
    if(section.includes("services")) return pick(productCatalog.realestate && productCatalog.realestate.services);
    return pick(productCatalog.realestate && productCatalog.realestate.commercial);
  }
  if(key==="navfinance"){
    if(section.includes("trade")) return pick(productCatalog.finance && productCatalog.finance.tradeFinance);
    if(section.includes("hpay")||section.includes("payments")) return pick(productCatalog.finance && productCatalog.finance.hpay);
    if(section.includes("invoice")||section.includes("billing")) return pick(productCatalog.finance && productCatalog.finance.invoicing);
    if(section.includes("risk")) return pick(productCatalog.finance && productCatalog.finance.risk);
    return pick(productCatalog.finance && productCatalog.finance.tradeFinance);
  }
  if(key==="navai"){
    if(section.includes("data")) return pick(productCatalog.ai && productCatalog.ai.data);
    if(section.includes("integration")) return pick(productCatalog.ai && productCatalog.ai.integration);
    if(section.includes("support")) return pick(productCatalog.ai && productCatalog.ai.support);
    return pick(productCatalog.ai && productCatalog.ai.solutions);
  }
  if(key==="navsourcing") return pick(productCatalog.sourcing);
  return null;
}

function getRelevantCards(ctx){
  const catalog=getCatalogProducts(ctx);
  if(catalog && catalog.length){
    return catalog.map(function(item){
      return { name:item.name, desc:item.desc||item.price||"", keywords:item.keywords||"default" };
    });
  }
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
  return fallbackProducts(ctx);
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
      ftIM: "Industries & Markets",
      ftSO: "Sourcing & Operations",
      ftFP: "Finance & Payments",
      ftAT: "AI & Technology",
      ftBiz: "For Business",
      ftGov: "For Governments & Institutions",
      ftVG: "Values & Governance",
      ftAboutGV: "About Harvics Global Ventures",
      
      // Footer Links
      ftCar: "Careers",
      ftSus: "Sustainability",
      ftNews: "News & Insights",
      ftCont: "Contact",
      ftPriv: "Privacy Policy",
      ftTerms: "Terms of Service",
      ftMap: "Sitemap",
      ftGSS: "Global Sourcing Solutions",
      ftOEMODM: "OEM / ODM Manufacturing",
      ftPLD: "Private Label Development",
      ftSCM: "Supply Chain Management",
      ftQCI: "Quality Control & Inspection",
      ftLW: "Logistics & Warehousing",
      ftTF: "Trade Finance",
      ftSF: "Structured Funding",
      ftEscrow: "Escrow & Settlement",
      ftCBP: "Cross-Border Payments",
      ftHPay: "HPay",
      ftRisk: "Risk & Compliance",
      ftAISCI: "AI Supply Chain Intelligence",
      ftProcAuto: "Procurement Automation",
      ftMarketAnalytics: "Market & Price Analytics",
      ftERPCRM: "ERP / CRM Integration",
      ftDataDecision: "Data & Decision Systems",
      ftEnterprise: "Enterprise Partnerships",
      ftInstitutional: "Institutional Clients",
      ftJointVentures: "Strategic Joint Ventures",
      ftPublicSector: "Public Sector Solutions",
      ftInfrastructure: "Infrastructure Projects",
      ftTradeDev: "Trade & Development Programs",
      ftIntegrity: "Integrity & Transparency",
      ftResponsible: "Responsible Sourcing",
      ftSustain: "Sustainability",
      ftPrivacySec: "Data Privacy & Security",
      ftCompliance: "Compliance Framework",
      ftCompanyOverview: "Company Overview",
      ftLeadership: "Leadership",
      ftCareerOpp: "Career Opportunities",
      ftInvestors: "Investors",
      ftEthicsComp: "Ethics & Compliance",
      ftNewsInsights: "News & Insights",
      ftEvents: "Events",
      ftContactUs: "Contact Us",
      ftBottom: "© 2026 Harvics Global Ventures . All rights reserved.",
      ftPrivacyPolicy: "Privacy Policy",
      ftTermsUse: "Terms of Use",
      ftAccessibility: "Accessibility",
      ftGlobalOps: "Global Operations",
      
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
          "men-s-wear": "Menswear essentials across chinos, denim fits, easy‑iron shirts, merino knitwear, blazers and outerwear. Completed with technical sportswear, trainers and loungewear.",
          "ladies-wear": "Ladies’ wear and lingerie including balcony/plunge bras, seamless knickers, shapewear, sports bras, tights and versatile dresses built for comfort.",
          "kids-baby": "Kidswear and baby basics with soft cottons, durable denim, school uniforms, hoodies and pajamas tuned to everyday play."
        },
        "home-textiles": {
          "bedding": "Luxury bed linens and duvet sets with balanced thread counts, colorfast dyes and durable weaves for repeated wash cycles.",
          "bath": "Cotton towels and bath sets with absorbent loops, low linting and consistent GSM benchmarks.",
          "decor": "Cushions and throws with compliant trims, stitched panels and fabric libraries matched to palette."
        }
      },
      navFmcg: {
        staples: {
          "grains": "Rice, wheat and oats with origin verification, moisture controls and packaging that travels well.",
          "legumes": "Lentils and pulses prepared for export windows with calibrated grading and weight checks."
        },
        oils: {
          "edible-oils": "Sunflower, olive and ghee with batch traceability, peroxide values and labeling aligned to market.",
          "spices": "Whole spices and blends with volatile oil retention, consistent sieve profiles and aroma integrity."
        },
        packaged: {
          "snacks": "Ready‑to‑eat snacks and noodles structured for shelf life, clean labeling and logistics.",
          "cookies": "Cookies and confection with texture profiles tuned to brand, packed for heat and handling."
        },
        dairy: {
          "milk-beverages": "UHT milk, cheese and juices managed through cold‑chain, HACCP and export compliance."
        },
        personalCare: {
          "care": "Toothpaste, soaps and shampoos with INCI alignment, micro testing and carton specs for retail."
        },
        homeCare: {
          "hygiene": "Detergents and dish care with surfactant ranges, fragrance locks and packaging that reduces leaks."
        }
      },
      navCommodities: {
        energy: {
          "oil": "Crude and refined products with specs, laycans and routes planned to terminal windows.",
          "lng": "Natural gas logistics matched to capacity, storage and off‑take agreements."
        },
        metals: {
          "metals": "Gold, silver, copper and aluminum with assays, bars and cathodes aligned to exchange norms."
        },
        agri: {
          "grains": "Wheat, rice and corn with origin checks, fumigation and phytosanitary documentation.",
          "soybean": "Soybeans and meals managed to protein ranges and delivery calendars."
        }
      },
      navIndustrial: {
        "mro": {
          "safety": "Safety gear, helmets and vests with certification and reliable restock cycles.",
          "machinery": "CNC and equipment with spares, service windows and installation support."
        }
      }
    }
  };

  const landingDescriptions = {
    en: {
      navTextiles: { title: "Textiles engineered for scale.", desc: "Private label programs, compliant factories and fabric libraries tied to disciplined cut plans, QA and logistics — built to deliver at retail speed." },
      navFmcg: { title: "FMCG built for velocity.", desc: "Staples, oils, snacks, dairy and care products with origin control, labeling and export logistics tuned to shelf life and route." },
      navCommodities: { title: "Commodities, structured and clear.", desc: "Agri, metals and energy flows with specs, inspection and execution windows coordinated to contracts and risk." },
      navIndustrial: { title: "Industrial supply, uninterrupted.", desc: "Chemicals, machinery and MRO with certification, spares planning and restock cycles that keep lines running." },
      navMinerals: { title: "Minerals with strategic discipline.", desc: "Metallic, energy and industrial inputs managed through origin, assays and bulk delivery calendars." },
      navOilGas: { title: "Oil & Gas, from upstream to retail.", desc: "Exploration, midstream and downstream operations aligned to HSE, EPC partners and reliable off‑take." },
      navRealEstate: { title: "Real estate with commercial intelligence.", desc: "Commercial, residential and industrial assets supported with advisory, leasing and facilities management." },
      navSourcing: { title: "AI‑powered sourcing that scales.", desc: "Supplier discovery, vetting, inspections, logistics and risk‑aware workflows orchestrated in one layer." },
      navFinance: { title: "Finance & HPay that moves capital.", desc: "LCs, SBLCs, cross‑border payments and structured instruments with KYC/AML and clear reconciliation." },
      navAI: { title: "AI & Technology built into operations.", desc: "Forecasting, computer vision, data pipelines and integrations enabling intelligent supply chains." },
      navAbout: { title: "Harvics, an intelligence layer.", desc: "AI‑native supply chain intelligence across energy, goods and capital — engineered for clarity and scale." }
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
    },
    es: {
      navTextiles: { title: "Textiles diseñados para escalar.", desc: "Marca propia, fábricas conformes y bibliotecas de telas con planes de corte, QA y logística para el retail." },
      navFmcg: { title: "FMCG preparado para velocidad.", desc: "Básicos, aceites, snacks, lácteos y cuidado con control de origen, etiquetado y logística de exportación." },
      navCommodities: { title: "Commodities estructurados y claros.", desc: "Flujos de agro, metales y energía con especificaciones, inspección y ejecución alineadas a contratos y riesgo." },
      navIndustrial: { title: "Suministro industrial sin interrupción.", desc: "Químicos, maquinaria y MRO con certificación, repuestos y ciclos de reposición confiables." },
      navMinerals: { title: "Minerales con disciplina estratégica.", desc: "Metálicos, energía e insumos industriales con origen, ensayos y calendarios de entrega a granel." },
      navOilGas: { title: "Petróleo y Gas, de upstream a retail.", desc: "Operaciones upstream, midstream y downstream alineadas a HSE y socios EPC." },
      navRealEstate: { title: "Bienes raíces con inteligencia comercial.", desc: "Activos comerciales, residenciales e industriales con asesoría, arrendamiento y FM." },
      navSourcing: { title: "Abastecimiento impulsado por IA.", desc: "Descubrimiento de proveedores, verificación, inspección y logística en un solo flujo." },
      navFinance: { title: "Finanzas y HPay que mueven capital.", desc: "LC, SBLC y pagos transfronterizos con KYC/AML y conciliación clara." },
      navAI: { title: "IA y Tecnología integradas.", desc: "Pronóstico, visión por computadora y datos para cadenas inteligentes." },
      navAbout: { title: "Harvics, capa de inteligencia.", desc: "Inteligencia nativa de cadena de suministro en energía, bienes y capital." }
    },
    ar: {
      navTextiles: { title: "منسوجات مُصممة للتوسع.", desc: "علامات خاصة، مصانع ملتزمة ومكتبات أقمشة مع خطط قص وجودة ولوجستيات للبيع بالتجزئة." },
      navFmcg: { title: "سلع استهلاكية بسرعة عالية.", desc: "أساسيات وأطعمة وألبان وعناية مع توثيق الأصل والتوسيم ولوجستيات التصدير." },
      navCommodities: { title: "سلع منظمة وواضحة.", desc: "تدفقات زراعية ومعدنية وطاقة بمواصفات وفحص وتنفيذ وفق العقود والمخاطر." },
      navIndustrial: { title: "توريد صناعي دون انقطاع.", desc: "كيماويات وماكينات وقطع MRO مع شهادات وخطط قطع غيار ودورات إعادة تخزين." },
      navMinerals: { title: "معادن بانضباط استراتيجي.", desc: "مدخلات معدنية وطاقية وصناعية مع أصل ونتائج تحليل وجدولة تسليم بالجملة." },
      navOilGas: { title: "نفط وغاز من المنبع إلى البيع.", desc: "عمليات المنبع والوسط والمصب متوافقة مع HSE وشركاء EPC." },
      navRealEstate: { title: "عقارات بذكاء تجاري.", desc: "أصول تجارية وسكنية وصناعية مع استشارات وتأجير وإدارة مرافق." },
      navSourcing: { title: "توريد مدعوم بالذكاء الاصطناعي.", desc: "اكتشاف الموردين والتحقق والفحص واللوجستيات في طبقة واحدة." },
      navFinance: { title: "التمويل وHPay لتحريك رأس المال.", desc: "اعتمادات مستندية ومدفوعات عابرة للحدود مع KYC/AML ومطابقة واضحة." },
      navAI: { title: "ذكاء وتقنية مدمجة.", desc: "تنبؤ ورؤية حاسوبية وأنظمة بيانات لسلاسل توريد ذكية." },
      navAbout: { title: "هارفكس طبقة ذكاء.", desc: "ذكاء سلسلة توريد أصلي عبر الطاقة والسلع ورأس المال." }
    },
    zh: {
      navTextiles: { title: "可规模化的纺织供应。", desc: "自有品牌、合规工厂与面料库，结合版型、质检与物流，面向零售速度交付。" },
      navFmcg: { title: "高周转的快消品。", desc: "粮油、零食、乳制与个护，产地控制、标签与出口物流匹配保质期与路线。" },
      navCommodities: { title: "结构化的大宗商品。", desc: "农、金属与能源，规格、检验与执行窗口与合同和风控协同。" },
      navIndustrial: { title: "不间断的工业供应。", desc: "化工、设备与MRO，认证、备件计划与补货周期保障产线运行。" },
      navMinerals: { title: "有战略纪律的矿产。", desc: "金属与能源工业投入，产地、化验与散装交付日程管理。" },
      navOilGas: { title: "油气：从上游到终端。", desc: "上游、中游、下游运营，符合HSE并联通EPC伙伴与稳定承购。" },
      navRealEstate: { title: "具商业智能的不动产。", desc: "商住工资产，多维咨询、租赁与设施管理支持。" },
      navSourcing: { title: "AI驱动的采购。", desc: "供应商发现、核验、检验与物流在同一流程层统一。" },
      navFinance: { title: "Finance与HPay推动资本流动。", desc: "信用证、跨境支付与结构化工具，KYC/AML与清晰对账。" },
      navAI: { title: "融入运营的AI与技术。", desc: "预测、计算机视觉、数据管线与集成赋能智能供应链。" },
      navAbout: { title: "Harvics：智能层。", desc: "面向能源、商品与资本的AI原生供应链智能。" }
    },
    hi: {
      navTextiles: { title: "स्केल के लिए निर्मित टेक्सटाइल।", desc: "प्राइवेट लेबल, अनुपालन फैक्ट्रियां और फैब्रिक लाइब्रेरी, कट‑प्लान, QA और लॉजिस्टिक्स के साथ।" },
      navFmcg: { title: "फास्ट‑मूविंग उपभोक्ता वस्तुएं।", desc: "अनाज, तेल, स्नैक्स, डेयरी और केयर — मूल‑नियंत्रण, लेबलिंग और निर्यात लॉजिस्टिक्स के साथ।" },
      navCommodities: { title: "सुव्यवस्थित कमोडिटीज।", desc: "एग्री, मेटल्स और ऊर्जा — स्पेक, निरीक्षण और निष्पादन विंडो अनुबंध और जोखिम से संयोजित।" },
      navIndustrial: { title: "निरंतर औद्योगिक सप्लाई।", desc: "केमिकल्स, मशीनरी और MRO — प्रमाणन और स्पेयर‑प्लानिंग के साथ।" },
      navMinerals: { title: "रणनीतिक अनुशासन वाले मिनरल्स।", desc: "मेटलिक, ऊर्जा और औद्योगिक इनपुट — ओरिजिन, एस्से और बल्क डिलीवरी कैलेंडर।" },
      navOilGas: { title: "ऑयल और गैस: अपस्ट्रीम से रिटेल।", desc: "अपस्ट्रीम, मिडस्ट्रीम और डाउनस्ट्रीम HSE और EPC पार्टनर्स के अनुरूप।" },
      navRealEstate: { title: "व्यावसायिक बुद्धिमत्ता के साथ रियल एस्टेट।", desc: "कमेंट, रेसिडेंशियल और इंडस्ट्रियल — सलाह, लीजिंग और FM।" },
      navSourcing: { title: "AI‑संचालित सोर्सिंग।", desc: "सप्लायर खोज, सत्यापन, निरीक्षण और लॉजिस्टिक्स एक ही लेयर में।" },
      navFinance: { title: "Finance और HPay।", desc: "LC, SBLC और क्रॉस‑बॉर्डर पेमेंट्स KYC/AML और क्लियर रिकंसीलिएशन के साथ।" },
      navAI: { title: "AI और टेक्नोलॉजी संचालन में।", desc: "फोरकास्टिंग, विज़न, डेटा पाइपलाइन और इंटीग्रेशन।" },
      navAbout: { title: "Harvics — एक इंटेलिजेंस लेयर।", desc: "ऊर्जा, वस्तुओं और पूंजी के लिए AI‑नेटिव सप्लाई‑चेन इंटेलिजेंस।" }
    },
    pt: {
      navTextiles: { title: "Têxteis prontos para escalar.", desc: "Marca própria, fábricas conformes e bibliotecas de tecidos com planos de corte, QA e logística." },
      navFmcg: { title: "FMCG de alta velocidade.", desc: "Grãos, óleos, snacks, laticínios e cuidados com origem, rotulagem e logística." },
      navCommodities: { title: "Commodities estruturadas.", desc: "Agro, metais e energia com especificações, inspeção e execução coordenadas." },
      navIndustrial: { title: "Fornecimento industrial contínuo.", desc: "Químicos, máquinas e MRO com certificação e reposição confiável." },
      navMinerals: { title: "Minerais com disciplina.", desc: "Insumos metálicos e energéticos com origem e ensaios e entregas a granel." },
      navOilGas: { title: "Óleo & Gás do upstream ao varejo.", desc: "Operações alinhadas a HSE e parceiros EPC." },
      navRealEstate: { title: "Imóveis com inteligência comercial.", desc: "Ativos comerciais, residenciais e industriais com consultoria, locação e FM." },
      navSourcing: { title: "Abastecimento com IA.", desc: "Descoberta de fornecedores, verificação, inspeção e logística em uma camada." },
      navFinance: { title: "Finanças & HPay.", desc: "LC, SBLC e pagamentos transfronteiriços com KYC/AML." },
      navAI: { title: "IA & Tecnologia integradas.", desc: "Previsão, visão computacional e pipelines de dados." },
      navAbout: { title: "Harvics, camada de inteligência.", desc: "Inteligência nativa de cadeia de suprimentos." }
    },
    ru: {
      navTextiles: { title: "Текстиль для масштаба.", desc: "Private label, соответствующие фабрики и библиотеки тканей с контролем качества и логистикой." },
      navFmcg: { title: "FMCG для высокой скорости.", desc: "Базовые продукты, масла, снеки, молочная и уход с контролем происхождения и экспортной логистикой." },
      navCommodities: { title: "Структурированные товары.", desc: "Агро, металлы и энергия со спецификациями, инспекцией и исполнением." },
      navIndustrial: { title: "Непрерывные промышленные поставки.", desc: "Химия, оборудование и MRO с сертификацией и планом запасных частей." },
      navMinerals: { title: "Минералы с дисциплиной.", desc: "Металлы и энергетические ресурсы с происхождением, анализами и графиками поставок." },
      navOilGas: { title: "Нефть и газ: от добычи до розницы.", desc: "Операции в соответствии с HSE и EPC партнёрами." },
      navRealEstate: { title: "Недвижимость с интеллектом.", desc: "Коммерческие, жилые и промышленные активы с консалтингом, арендой и FM." },
      navSourcing: { title: "Закупки с ИИ.", desc: "Поиск, проверка, инспекция и логистика в одном слое." },
      navFinance: { title: "Финансы и HPay.", desc: "LC, SBLC и трансграничные платежи с KYC/AML." },
      navAI: { title: "ИИ и технологии.", desc: "Прогнозирование, компьютерное зрение и данные для цепей поставок." },
      navAbout: { title: "Harvics — слой интеллекта.", desc: "ИИ‑нативная интеллектуальная логистика." }
    },
    bn: {
      navTextiles: { title: "স্কেলে তৈরি টেক্সটাইল।", desc: "প্রাইভেট লেবেল, কমপ্লায়েন্ট কারখানা ও ফ্যাব্রিক লাইব্রেরি; কাট‑প্ল্যান, QA ও লজিস্টিকস।" },
      navFmcg: { title: "উচ্চ গতির FMCG।", desc: "ধান, তেল, স্ন্যাকস, দুগ্ধ ও কেয়ার — উৎস নিয়ন্ত্রণ, লেবেলিং ও রপ্তানি লজিস্টিকস।" },
      navCommodities: { title: "সংগঠিত কমোডিটিজ।", desc: "কৃষি, ধাতু ও জ্বালানি — স্পেক, ইন্সপেকশন ও এক্সিকিউশন।" },
      navIndustrial: { title: "বাধাহীন ইন্ডাস্ট্রিয়াল সাপ্লাই।", desc: "কেমিক্যাল, মেশিনারি ও MRO — সার্টিফিকেট ও স্পেয়ার পরিকল্পনা।" },
      navMinerals: { title: "কৌশলগত শৃঙ্খলার মিনারেলস।", desc: "ধাতু ও জ্বালানি ইনপুট — উৎস, পরীক্ষা ও বাল্ক ডেলিভারি।" },
      navOilGas: { title: "তেল ও গ্যাস — আপস্ট্রিম থেকে রিটেইল।", desc: "HSE ও EPC অংশীদারের সাথে সঙ্গতিপূর্ণ অপারেশন।" },
      navRealEstate: { title: "কমার্শিয়াল ইন্টেলিজেন্স সহ রিয়েল এস্টেট।", desc: "কমার্শিয়াল, রেসিডেন্সিয়াল ও ইন্ডাস্ট্রিয়াল সম্পদ — পরামর্শ, লিজিং ও FM।" },
      navSourcing: { title: "AI‑নির্ভর সোর্সিং।", desc: "সরবরাহকারীর অনুসন্ধান, যাচাইকরণ, পরিদর্শন ও লজিস্টিকস এক স্তরে।" },
      navFinance: { title: "ফাইন্যান্স ও HPay।", desc: "LC, SBLC ও ক্রস‑বর্ডার পেমেন্ট KYC/AML সহ।" },
      navAI: { title: "AI ও টেকনোলজি একীভূত।", desc: "ফোরকাস্টিং, ভিশন ও ডেটা পাইপলাইন।" },
      navAbout: { title: "Harvics — একটি ইন্টেলিজেন্স লেয়ার।", desc: "এনার্জি, গুডস ও ক্যাপিটালের জন্য AI‑নেটিভ সাপ্লাই‑চেইন ইন্টেলিজেন্স।" }
    },
    ur: {
      navTextiles: { title: "وسیع پیمانے کے لیے تیار ٹیکسٹائل۔", desc: "پرائیویٹ لیبل، مطابق فیکٹریاں اور فیبرک لائبریریاں، کٹ‑پلان، QA اور لاجسٹکس کے ساتھ۔" },
      navFmcg: { title: "تیز رفتار FMCG۔", desc: "اجناس، تیل، اسنیکس، ڈیری اور کیئر — اصل کنٹرول، لیبلنگ اور برآمدی لاجسٹکس۔" },
      navCommodities: { title: "منظم کموڈٹیز۔", desc: "ایگری، میٹلز اور انرجی — اسپیکس، معائنہ اور عمل درآمد۔" },
      navIndustrial: { title: "بلا تعطل صنعتی سپلائی۔", desc: "کیمیکلز، مشینری اور MRO — سرٹیفیکیشن اور اسپيئر پلاننگ۔" },
      navMinerals: { title: "حکمتِ عملی نظم کے ساتھ منرلز۔", desc: "میٹالک، انرجی اور صنعتی ان پٹس — اصل، تجزیات اور بلک ڈیلیوری۔" },
      navOilGas: { title: "تیل و گیس: اپ اسٹریم سے ریٹیل۔", desc: "HSE اور EPC پارٹنرز کے مطابق آپریشنز۔" },
      navRealEstate: { title: "کمرشل انٹیلیجنس کے ساتھ رئیل اسٹیٹ۔", desc: "کمرشل، رہائشی اور صنعتی اثاثے — ایڈوائزری، لیزنگ اور FM۔" },
      navSourcing: { title: "AI سے چلنے والا سورسنگ۔", desc: "سپلائر ڈسکوری، ویٹنگ، انسپیکشن اور لاجسٹکس ایک ہی لیئر میں۔" },
      navFinance: { title: "فنانس اور HPay۔", desc: "LC، SBLC اور کراس‑بارڈر پیمنٹس KYC/AML کے ساتھ۔" },
      navAI: { title: "AI اور ٹیکنالوجی مربوط۔", desc: "فورکاسٹنگ، وژن، ڈیٹا پائپ لائنز اور انٹیگریشنز۔" },
      navAbout: { title: "Harvics — ایک انٹیلیجنس لیئر۔", desc: "انرجی، سامان اور سرمایہ کے لیے AI‑نیٹو سپلائی چین انٹیلیجنس۔" }
    },
    he: {
      navTextiles: { title: "טקסטיל בנוי להתרחבות.", desc: "מותג פרטי, מפעלים תואמים וספריות בדים עם תכנון גזירה, QA ולוגיסטיקה." },
      navFmcg: { title: "מוצרי צריכה בתנועה מהירה.", desc: "מוצרים בסיסיים, שמנים, חטיפים, מוצרי חלב וטיפוח עם בקרת מקור ושרשרת אספקה." },
      navCommodities: { title: "סחורות מובנות וברורות.", desc: "חקלאות, מתכות ואנרגיה עם מפרטים, בדיקות וביצוע מתואם." },
      navIndustrial: { title: "אספקה תעשייתית רציפה.", desc: "כימיקלים, מכונות ו‑MRO עם הסמכה ותכנון חלפים." },
      navMinerals: { title: "מינרלים עם משמעת אסטרטגית.", desc: "קלטים מתכתיים ואנרגטיים עם מקור, בדיקות ולוחות אספקה." },
      navOilGas: { title: "נפט וגז — מה‑upstream ל‑retail.", desc: "פעילות בהתאם ל‑HSE ושותפי EPC." },
      navRealEstate: { title: "נדל״ן עם אינטליגנציה עסקית.", desc: "נכסים מסחריים, מגורים ותעשייה עם ייעוץ, השכרה ו‑FM." },
      navSourcing: { title: "רכש מונע‑AI.", desc: "איתור ספקים, בדיקה, ביקורת ולוגיסטיקה בשכבה אחת." },
      navFinance: { title: "פיננסים ו‑HPay.", desc: "LC, SBLC ותשלומים חוצי גבולות עם KYC/AML." },
      navAI: { title: "AI וטכנולוגיה משולבים.", desc: "חזוי, ראייה ממוחשבת וצינורות נתונים." },
      navAbout: { title: "Harvics — שכבת אינטליגנציה.", desc: "אינטליגנציה שרשרת‑אספקה מקורית‑AI." }
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

  async function ensureFooterI18n(lang){
    try{
      const cacheKey="footer_i18n_"+lang;
      const cached=localStorage.getItem(cacheKey);
      if(cached){
        try{ Object.assign(messages[lang]||(messages[lang]={}), JSON.parse(cached)); }catch{}
        return;
      }
      const src=messages.en||{};
      const keys=["ftIM","ftSO","ftFP","ftAT","ftBiz","ftGov","ftVG","ftAboutGV","ftGSS","ftOEMODM","ftPLD","ftSCM","ftQCI","ftLW","ftTF","ftSF","ftEscrow","ftCBP","ftHPay","ftRisk","ftAISCI","ftProcAuto","ftMarketAnalytics","ftERPCRM","ftDataDecision","ftEnterprise","ftInstitutional","ftJointVentures","ftPublicSector","ftInfrastructure","ftTradeDev","ftIntegrity","ftResponsible","ftSustain","ftPrivacySec","ftCompliance","ftCompanyOverview","ftLeadership","ftCareerOpp","ftInvestors","ftEthicsComp","ftNewsInsights","ftEvents","ftContactUs","ftBottom","ftPrivacyPolicy","ftTermsUse","ftAccessibility","ftGlobalOps"];
      const payload=keys.reduce((o,k)=>{o[k]=src[k]||k; return o;}, {});
      const prompt="Translate the following UI labels from English into "+lang+" and return ONLY a compact JSON object with the same keys and translated values:\n"+JSON.stringify(payload);
      const ans=await askAi(prompt).catch(()=> "");
      let obj=null;
      try{ obj=JSON.parse(ans); }catch{ obj=null; }
      if(obj && typeof obj==="object"){
        Object.assign(messages[lang]||(messages[lang]={}), obj);
        try{ localStorage.setItem(cacheKey, JSON.stringify(obj)); }catch{}
      }
    }catch(e){}
  }

  async function setLocale(locale) {
    const lang = messages[locale] ? locale : "en";
    currentLocale = lang;
    try {
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === "ar" || lang === "he" || lang === "ur") ? "rtl" : "ltr";
    } catch {}
    await ensureFooterI18n(lang);
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
        return "";
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
    const heroKeyMap = {
      navTextiles: "textiles",
      navFmcg: "fmcg",
      navCommodities: "agri",
      navIndustrial: "industrial",
      navMinerals: "map",
      navOilGas: "logistics",
      navRealEstate: "building",
      navSourcing: "logistics",
      navFinance: "reports",
      navAI: "vision",
      navAbout: "map"
    };
    let bgUrl = null;
    try{
      const k = heroKeyMap[key] || "map";
      if (typeof getProductImage === "function") {
        bgUrl = getProductImage(k);
      }
    }catch(e){}
    if (bgUrl) {
      section.style.backgroundImage = `url('${bgUrl}')`;
      section.style.backgroundSize = "cover";
      section.style.backgroundPosition = "center";
    }
    const h1 = section.querySelector("h1");
    const p = section.querySelector("p");
    h1.textContent = t.title || "";
    p.textContent = t.desc || "";
    host.insertBefore(section, host.firstChild);
    if(!t.desc || t.desc.length<24){
      ensureAiLandingMicrocopy().then(()=>updateLandingHero());
    }
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

function initSocialLinks(){
  const map = {
    LinkedIn: "https://www.linkedin.com/company/harvics-supreme",
    X: "https://x.com/HarvicsSupreme",
    YouTube: "https://www.youtube.com/@HarvicsSupreme",
    Instagram: "https://instagram.com/harvicssupreme"
  };
  document.querySelectorAll(".footer-social a").forEach(function(a){
    const label = a.getAttribute("aria-label") || "";
    const url = map[label];
    if(url){
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
    }
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

  let lastOpenByKeyboard = false;
  let currentKey = null;
  const header = document.querySelector("header");
  const hoverCapable = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let closeTimer = null;
  let overHeader = false;
  let overCurtain = false;

  function close(){
    currentKey = null;
    curtain.classList.remove("open");
    curtain.setAttribute("aria-hidden","true");
    inner.innerHTML="";
    links.forEach(a=>a.classList.remove("nav-active"));
  }

  function openFor(key){
    const baseRoot = getBaseRoot();
    const data=(intelligenceLayer.getMegaData && intelligenceLayer.getMegaData()) || {};
    const blocks=data[key];
    if(!blocks || !Array.isArray(blocks)) return close();

    const toSlug = (label, fallback) => {
      const s = String(label || "").toLowerCase()
        .replace(/'s/gi,"-s")
        .replace(/[^\w\s-]/g,"")
        .replace(/\s+/g,"-")
        .replace(/-+/g,"-")
        .replace(/^-+|-+$/g,"");
      return s || fallback;
    };
    function anchorHref(k, section, item){
      const sectionSlug = toSlug(section, "section");
      const itemSlug = toSlug(item, "item");
      return withBaseRoot(`/subpages/${k}/${sectionSlug}/${itemSlug}.html`, baseRoot);
    }
    inner.innerHTML=blocks.map(b=>{
      const sectionSlug = toSlug(b.t, "section");
      const items=(b.items||[]).map(it=>{
        const href = anchorHref(key, b.t, it);
        return `<li><a href="${href}">${it}</a></li>`;
      }).join("");
      return `<div class="mega-block"><div class="mega-title">${b.t||""}</div><ul class="mega-items">${items}</ul></div>`;
    }).join("");

    currentKey = key;
    curtain.classList.add("open");
    curtain.setAttribute("aria-hidden","false");
    links.forEach(a=>{
      const k=a.getAttribute("data-i18n-key");
      a.classList.toggle("nav-active", k===key);
    });
  }

  function scheduleClose(){
    if(closeTimer) clearTimeout(closeTimer);
    closeTimer = setTimeout(close, 1100);
  }

  function cancelScheduledClose(){
    if(closeTimer) clearTimeout(closeTimer);
    closeTimer = null;
  }

  function updateCloseState(){
    if(!hoverCapable) return;
    if(lastOpenByKeyboard) return;
    if(overHeader || overCurtain) cancelScheduledClose();
    else scheduleClose();
  }

  links.forEach(a=>{
    const key=a.getAttribute("data-i18n-key");
    if(!key) return;
    a.addEventListener("focus", ()=>{ lastOpenByKeyboard=false; openFor(key); });
    a.addEventListener("click", (e)=>{
      lastOpenByKeyboard = false;
      if(hoverCapable){
        close();
        return;
      }
      e.preventDefault();
      if(curtain.classList.contains("open") && currentKey === key){
        close();
        return;
      }
      openFor(key);
    });
    a.addEventListener("mouseenter", ()=>{
      if(!hoverCapable) return;
      overHeader = true;
      updateCloseState();
      lastOpenByKeyboard = false;
      openFor(key);
    });
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

  document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") close(); });
  document.addEventListener("pointerdown", (e)=>{
    const t = e.target;
    if(curtain.contains(t)) return;
    if(header && header.contains(t)) return;
    close();
  });
  window.addEventListener("scroll", close, { passive:true });
  window.addEventListener("resize", close);
  if(header){
    header.addEventListener("mouseenter", ()=>{
      if(!hoverCapable) return;
      overHeader = true;
      updateCloseState();
    });
    header.addEventListener("mouseleave", ()=>{
      if(!hoverCapable) return;
      overHeader = false;
      updateCloseState();
    });
  }
  curtain.addEventListener("mouseenter", ()=>{
    if(!hoverCapable) return;
    overCurtain = true;
    updateCloseState();
  });
  curtain.addEventListener("mouseleave", ()=>{
    if(!hoverCapable) return;
    overCurtain = false;
    updateCloseState();
  });
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

  const categories = [];

  container.innerHTML = categories.map(cat => {
    return '';
  }).join('');
}

function initHomepageImages() {
  if (typeof getProductImage !== 'function') return;

  document.querySelectorAll('[data-bg-key]').forEach(el => {
    const key = el.getAttribute('data-bg-key');
    if (!key) return;
    const url = (typeof getProductImage === 'function') ? getProductImage(key) : '';
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
    function variants(p){
      const out = [];
      out.push(p.startsWith('/') ? p : `./${p}`);
      if (p.includes('/web pics/')) out.push(p.replace('/web pics/','/WEB PICS/'));
      if (p.includes('/WEB PICS/')) out.push(p.replace('/WEB PICS/','/web pics/'));
      return out;
    }
    const paths = variants(file);
    const key = el.getAttribute('data-bg-key') || '';
    function tryNext(i){
      if(i >= paths.length){
        let fb = '';
        if (typeof getProductImage === 'function' && key) fb = getProductImage(key) || '';
        if (!fb && typeof getProductImage === 'function') fb = getProductImage('map') || '';
        if (!fb) fb = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80';
        el.style.backgroundImage = `url('${fb}')`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
        return;
      }
      const url = encodeURI(paths[i]);
      const img = new Image();
      img.onload = () => {
        el.style.backgroundImage = `url('${url}')`;
        if (!el.style.backgroundSize) el.style.backgroundSize = 'cover';
        if (!el.style.backgroundPosition) el.style.backgroundPosition = 'center';
      };
      img.onerror = () => { tryNext(i+1); };
      img.src = url;
    }
    tryNext(0);
  });

  // Local rotation: data-bg-files="path1 | path2 | path3"
  document.querySelectorAll('[data-bg-files]').forEach(el => {
    const raw = el.getAttribute('data-bg-files') || '';
    function variants(p){
      const out = [];
      out.push(p);
      if (p.includes('/web pics/')) out.push(p.replace('/web pics/','/WEB PICS/'));
      if (p.includes('/WEB PICS/')) out.push(p.replace('/WEB PICS/','/web pics/'));
      return out;
    }
    const files = raw.split('|').map(s => s.trim()).filter(Boolean).flatMap(variants);
    if (files.length < 2) return;
    const key = el.getAttribute('data-bg-key') || '';
    let idx = 0;
    function fallback(){
      let fb = '';
      if (typeof getProductImage === 'function' && key) fb = getProductImage(key) || '';
      if (!fb && typeof getProductImage === 'function') fb = getProductImage('map') || '';
      if (!fb) fb = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80';
      el.style.backgroundImage = `url('${fb}')`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
    }
    function setBg(p){
      const path = p.startsWith('/') ? p : `./${p}`;
      const url = encodeURI(path);
      const img = new Image();
      img.onload = () => {
        el.style.backgroundImage = `url('${url}')`;
        if (!el.style.backgroundSize) el.style.backgroundSize = 'cover';
        if (!el.style.backgroundPosition) el.style.backgroundPosition = 'center';
      };
      img.onerror = () => {
        fallback();
      };
      img.src = url;
    }
    setBg(files[idx]);
    const intervalMs = parseInt(el.getAttribute('data-bg-interval')||'6000',10);
    const ms = isNaN(intervalMs) ? 6000 : Math.max(2000, intervalMs);
    setInterval(()=>{ idx = (idx+1) % files.length; setBg(files[idx]); }, ms);
  });

  // (removed dynamic directory feed to restore stable behavior)
}

function ensureGlobalImageFallback(){
  try{
    const def = (typeof getProductImage==='function') ? getProductImage('map') : 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80';
    document.querySelectorAll('.product-image').forEach(el=>{
      const bg = getComputedStyle(el).backgroundImage;
      if(!bg || bg==='none'){ el.style.backgroundImage = `url('${def}')`; el.style.backgroundSize='cover'; el.style.backgroundPosition='center'; }
    });
    document.querySelectorAll('.ind-card').forEach(el=>{
      const bg = getComputedStyle(el).backgroundImage;
      if(!bg || bg==='none'){
        const key = el.getAttribute('data-bg-key') || 'default';
        const url = (typeof getProductImage==='function') ? getProductImage(key) : def;
        el.style.backgroundImage = `url('${url}')`; el.style.backgroundSize='cover'; el.style.backgroundPosition='center';
      }
    });
    document.querySelectorAll('.slide:not([data-no-image="1"])').forEach(el=>{
      const bg = getComputedStyle(el).backgroundImage;
      if(!bg || bg==='none'){
        const file = el.getAttribute('data-bg-file');
        if(file){
          // Prefer remote mapping if a data-img-key is available; otherwise default
          const k = el.getAttribute('data-bg-key') || 'map';
          const url = (typeof getProductImage==='function') ? getProductImage(k) : def;
          el.style.backgroundImage = `url('${url}')`;
        }else{
          const k = el.getAttribute('data-bg-key') || 'map';
          const url = (typeof getProductImage==='function') ? getProductImage(k) : def;
          el.style.backgroundImage = `url('${url}')`;
        }
        el.style.backgroundSize='cover'; el.style.backgroundPosition='center';
      }
    });
    document.querySelectorAll('img').forEach(img=>{
      const src = img.getAttribute('src')||'';
      if(!src || /transparent|data:image\/gif/i.test(src)){
        const key = img.getAttribute('data-img-key') || 'default';
        const url = (typeof getProductImage==='function') ? getProductImage(key) : def;
        img.src = url;
      }
    });
  }catch(e){}
}
// Auto-flow sliders with pause on hover
function initAutoSliders(){
  const sliders = Array.from(document.querySelectorAll('.slider')).filter(sl => {
    const attr = sl.getAttribute('data-autoplay');
    if (attr === '0') return false;
    return true;
  });
  if(!sliders.length) return;
  sliders.forEach(sl => {
    let baseSpeed = parseFloat(sl.getAttribute('data-speed')||'0.6');
    if(!(baseSpeed>0)) baseSpeed = 0.6;
    let speed = baseSpeed;
    let dirAttr = parseInt(sl.getAttribute('data-dir')||'1',10);
    let dir = dirAttr === -1 ? -1 : 1;
    let rafId = null;
    let lastX = null;
    function step(){
      const delta = speed * dir;
      sl.scrollLeft += delta;
      const max = sl.scrollWidth - sl.clientWidth;
      if (sl.scrollLeft <= 0 && dir < 0) dir = 1;
      if (sl.scrollLeft >= max && dir > 0) dir = -1;
      rafId = requestAnimationFrame(step);
    }
    sl.addEventListener('mousemove', (e)=>{
      if(lastX == null){ lastX = e.clientX; return; }
      const dx = e.clientX - lastX;
      if(Math.abs(dx) > 2){ dir = dx > 0 ? 1 : -1; lastX = e.clientX; }
    });
    rafId = requestAnimationFrame(step);
  });
}

function initWheel(){
  const svg = document.querySelector('.wheel-svg');
  if(!svg) return;
  const cx = 160;
  const cy = 160;
  const r = 145;
  const labels = Array.from(svg.querySelectorAll('.wheel-label'));
  const titleEl = document.getElementById('how-tab-title');
  const textEl = document.getElementById('how-tab-text');

  labels.forEach(el => {
    const a = parseFloat(el.getAttribute('data-angle') || '0');
    const angle = isNaN(a) ? 0 : a;
    el.removeAttribute('x');
    el.removeAttribute('y');
    el.setAttribute('text-anchor', 'middle');
    el.setAttribute('transform', `translate(${cx},${cy}) rotate(${angle}) translate(0,-${r})`);

    function activate(){
      labels.forEach(n=>n.classList.remove('active-tab'));
      el.classList.add('active-tab');
      const labelText = el.textContent || '';
      if(titleEl) titleEl.textContent = labelText;
      if(textEl) textEl.textContent = labelText;
    }
    el.addEventListener('mouseenter', activate);
    el.addEventListener('click', activate);

    if(el === labels[0]) activate();
  });
}

function initCoverageAnimation(){
  const runs = Array.from(document.querySelectorAll('.coverage .run'));
  if(!runs.length) return;
  runs.forEach((el, i)=>{
    const off = (i+1) * 0.7;
    el.dataset.offset = String(off);
  });
  function step(ts){
    runs.forEach(el=>{
      const targetStr = el.getAttribute('data-width') || '70%';
      const base = Math.max(10, Math.min(100, parseFloat(targetStr)));
      const off = parseFloat(el.dataset.offset || '0');
      const t = ts * 0.0008 + off;
      const osc = 6 * Math.sin(t);
      const val = Math.max(5, Math.min(100, base + osc));
      el.style.width = val.toFixed(1) + '%';
    });
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initMotionSlider(){
  const sliderEl = document.querySelector('.motion-slider');
  const track = sliderEl ? sliderEl.querySelector('.motion-track') : null;
  if(!track) return;
  const slides = Array.from(track.querySelectorAll('.motion-slide'));
  if(slides.length <= 1) return;

  let index = 0;

  track.style.transform = 'translate3d(0,0,0)';

  function step(){
    index = (index + 1) % slides.length;
    const offset = index * 100;
    track.style.transform = 'translate3d(-'+offset+'%,0,0)';
    slides.forEach((s,i)=>{
      s.classList.toggle('is-active', i === index);
    });
  }

  // auto-run continuously
  setInterval(step, 5200);
}

function initHeroSlider() {
  const container = document.querySelector('.hero-slider-container');
  if (!container) return;

  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.hero-dot');
  const prevBtn = container.querySelector('.hero-prev');
  const nextBtn = container.querySelector('.hero-next');
  const slidesContainer = container.querySelector('.hero-slides');
  
  if (!slides.length) return;

  let currentIndex = 0;
  let interval;
  const duration = 5000; // 5 seconds per slide

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentIndex = index;

    // Update slides container transform
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active class for dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    interval = setInterval(nextSlide, duration);
  }

  function stopAutoSlide() {
    if (interval) clearInterval(interval);
  }

  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoSlide(); // Reset timer on interaction
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoSlide(); // Reset timer on interaction
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startAutoSlide(); // Reset timer on interaction
    });
  });

  // Initialize
  startAutoSlide();
}

function setHeroLocalBackground(){
  const hero = document.querySelector('section.hero');
  if(!hero) return;
  const candidates = [
    "FMCG%20IMAGES/Product%20Photos/1759696963916.jpg",
    "FMCG%20IMAGES/Product%20Photos/1759697222105.jpg"
  ];
  let i = 0;
  function tryNext(){
    if(i >= candidates.length) return;
    const url = candidates[i++];
    const img = new Image();
    img.onload = function(){
      hero.style.backgroundImage = "url('"+url+"')";
      hero.style.backgroundSize = "cover";
      hero.style.backgroundPosition = "center";
    };
    img.onerror = function(){ tryNext(); };
    img.src = url;
  }
  tryNext();
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
  if(overlay){ overlay.style.display="none"; }
  if(openBtn){ openBtn.style.display="none"; }

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
  if(aiOverlay){ aiOverlay.style.display="none"; }

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
