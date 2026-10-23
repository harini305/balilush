// Usage: node crawl.js <urls.txt> <dataDir> <shotDir> [viewports=desktop,tablet,mobile]
const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');

const [, , urlFile, dataDir, shotDir, vpArg] = process.argv;
const urls = fs.readFileSync(urlFile, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
const VPS = {
  desktop: { viewport: { width: 1440, height: 900 }, userAgent: undefined, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
  tablet: { viewport: { width: 768, height: 1024 }, userAgent: devices['iPad (gen 7)'].userAgent, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, userAgent: devices['iPhone 13'].userAgent, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
};
const vps = (vpArg || 'desktop,tablet,mobile').split(',');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(shotDir, { recursive: true });

const slug = u => {
  const p = new URL(u).pathname.replace(/^\/|\/$/g, '');
  return (p || 'home').replace(/[^a-z0-9]+/gi, '_');
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let i = 0; i < 200; i++) {
      const max = document.documentElement.scrollHeight;
      if (window.scrollY + window.innerHeight >= max - 2) break;
      window.scrollBy(0, step);
      await new Promise(r => setTimeout(r, 250));
    }
    await new Promise(r => setTimeout(r, 800));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  });
}

function extract() {
  const vis = el => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const sectionOf = el => {
    const s = el.closest('section, header, footer, #SITE_HEADER, #SITE_FOOTER');
    if (!s) return null;
    return s.id || s.tagName.toLowerCase();
  };
  const box = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const style = el => {
    const s = getComputedStyle(el);
    return { ff: s.fontFamily, fs: s.fontSize, fw: s.fontWeight, fst: s.fontStyle, lh: s.lineHeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color, align: s.textAlign };
  };
  const meta = {};
  document.querySelectorAll('meta').forEach(m => {
    const k = m.getAttribute('name') || m.getAttribute('property') || m.getAttribute('http-equiv') || m.getAttribute('itemprop');
    if (k) meta[k] = m.getAttribute('content');
  });
  const links_head = [...document.querySelectorAll('link')].map(l => ({ rel: l.rel, href: l.href, hreflang: l.hreflang || undefined, sizes: l.sizes?.value || undefined, type: l.type || undefined }))
    .filter(l => /canonical|icon|alternate|preload|stylesheet|manifest/.test(l.rel) && !/parastorage.*\.css/.test(l.href) || /canonical|icon|alternate/.test(l.rel));
  const jsonld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent); } catch { return s.textContent.slice(0, 2000); } });

  // Text blocks: leaf-ish block elements with own text
  const textSel = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,label,button,a,span,div';
  const seen = new Set();
  const texts = [];
  for (const el of document.querySelectorAll(textSel)) {
    if (!vis(el)) continue;
    // own direct text
    const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
    const tag = el.tagName.toLowerCase();
    let txt;
    if (/^(h[1-6]|p|li|blockquote|figcaption|label|button)$/.test(tag)) {
      if (el.parentElement && el.parentElement.closest('h1,h2,h3,h4,h5,h6,p,li,blockquote,button') ) continue;
      txt = el.innerText.trim();
    } else if (tag === 'a') {
      if (el.closest('h1,h2,h3,h4,h5,h6,p,li')) continue;
      txt = el.innerText.trim();
    } else {
      if (!own) continue;
      if (el.closest('h1,h2,h3,h4,h5,h6,p,li,blockquote,button,a')) continue;
      txt = own;
    }
    if (!txt) continue;
    const b = box(el);
    const key = txt + '|' + b.y;
    if (seen.has(key)) continue;
    seen.add(key);
    // style from deepest span carrying text
    let styEl = el;
    const sp = el.querySelector('span:not(:empty)');
    if (sp && sp.innerText.trim()) styEl = sp;
    texts.push({ tag, text: txt.replace(/ /g, ' '), section: sectionOf(el), box: b, style: style(styEl), href: el.closest('a')?.href });
  }
  texts.sort((a, b) => a.box.y - b.box.y || a.box.x - b.box.x);

  const images = [...document.querySelectorAll('img')].map(img => ({
    src: img.currentSrc || img.src, alt: img.alt, nw: img.naturalWidth, nh: img.naturalHeight,
    box: box(img), visible: vis(img), section: sectionOf(img), objectFit: getComputedStyle(img).objectFit,
    link: img.closest('a')?.href,
  }));
  const bgImages = [];
  for (const el of document.querySelectorAll('*')) {
    const bi = getComputedStyle(el).backgroundImage;
    if (bi && bi !== 'none' && bi.includes('url(')) bgImages.push({ bg: bi.slice(0, 400), box: box(el), section: sectionOf(el), tag: el.tagName.toLowerCase(), id: el.id });
  }
  const videos = [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc || v.src, poster: v.poster, sources: [...v.querySelectorAll('source')].map(s => s.src), box: box(v), section: sectionOf(v), autoplay: v.autoplay, loop: v.loop, muted: v.muted }));
  const iframes = [...document.querySelectorAll('iframe')].map(f => ({ src: f.src, title: f.title, box: box(f), visible: vis(f), section: sectionOf(f) }));
  const links = [...document.querySelectorAll('a[href]')].map(a => ({ href: a.href, text: (a.innerText || a.getAttribute('aria-label') || '').trim().slice(0, 120), target: a.target, section: sectionOf(a), visible: vis(a), box: box(a) }));
  const forms = [...document.querySelectorAll('form, input, textarea, select')].map(f => ({ tag: f.tagName.toLowerCase(), type: f.type, name: f.name, placeholder: f.placeholder, required: f.required, ariaLabel: f.getAttribute('aria-label'), section: sectionOf(f), visible: vis(f) }));
  const sections = [...document.querySelectorAll('#SITE_HEADER, section, #SITE_FOOTER')].filter(s => !s.parentElement.closest('section')).map(s => {
    const cs = getComputedStyle(s);
    return { id: s.id, tag: s.tagName.toLowerCase(), box: box(s), bg: cs.backgroundColor, position: cs.position, textPreview: s.innerText.trim().replace(/\s+/g, ' ').slice(0, 200) };
  });
  // header behavior
  const hdr = document.querySelector('#SITE_HEADER, header');
  const header = hdr ? { position: getComputedStyle(hdr).position, box: box(hdr), wrapperPos: hdr.parentElement && getComputedStyle(hdr.parentElement).position } : null;
  // style stats
  const ffCount = {}, colorCount = {}, bgCount = {}, borderCount = {}, radiusCount = {}, shadowCount = {};
  const inc = (o, k, n = 1) => { if (k) o[k] = (o[k] || 0) + n; };
  for (const el of document.querySelectorAll('body *')) {
    if (!vis(el)) continue;
    const s = getComputedStyle(el);
    const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    if (hasText) { inc(ffCount, s.fontFamily); inc(colorCount, s.color); }
    if (s.backgroundColor !== 'rgba(0, 0, 0, 0)') inc(bgCount, s.backgroundColor);
    if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== 'none') inc(borderCount, s.borderTopColor + ' ' + s.borderTopWidth);
    if (s.borderTopLeftRadius !== '0px') inc(radiusCount, s.borderTopLeftRadius);
    if (s.boxShadow !== 'none') inc(shadowCount, s.boxShadow);
  }
  const fontFaces = [];
  for (const ss of document.styleSheets) {
    try { for (const r of ss.cssRules) if (r.constructor.name === 'CSSFontFaceRule') fontFaces.push({ family: r.style.getPropertyValue('font-family'), weight: r.style.getPropertyValue('font-weight'), style: r.style.getPropertyValue('font-style'), src: r.style.getPropertyValue('src').slice(0, 300) }); } catch (e) {}
  }
  const loadedFonts = [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight} ${f.style}`);
  const scripts = [...document.querySelectorAll('script[src]')].map(s => s.src);
  return {
    url: location.href, title: document.title, lang: document.documentElement.lang, meta, links_head, jsonld,
    docHeight: document.documentElement.scrollHeight, docWidth: document.documentElement.scrollWidth, innerWidth,
    hOverflow: document.documentElement.scrollWidth > innerWidth,
    header, sections, texts, images, bgImages, videos, iframes, links, forms,
    stats: { ffCount, colorCount, bgCount, borderCount, radiusCount, shadowCount }, fontFaces, loadedFonts: [...new Set(loadedFonts)], scripts,
  };
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const vpName of vps) {
    const ctx = await browser.newContext({ ...VPS[vpName] });
    for (const url of urls) {
      const name = `${slug(url)}__${vpName}`;
      if (fs.existsSync(path.join(dataDir, name + '.json'))) { console.log('skip', name); continue; }
      const page = await ctx.newPage();
      const requests = new Set();
      page.on('request', r => { try { requests.add(new URL(r.url()).hostname); } catch {} });
      const consoleErr = [];
      page.on('pageerror', e => consoleErr.push(String(e).slice(0, 300)));
      let status = null;
      try {
        const resp = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
        status = resp && resp.status();
        await page.waitForTimeout(2500);
        await autoScroll(page);
        await page.waitForTimeout(1000);
        const data = await page.evaluate(extract);
        data.status = status; data.finalUrl = page.url(); data.viewportName = vpName; data.requestHosts = [...requests].sort(); data.pageErrors = consoleErr;
        fs.writeFileSync(path.join(dataDir, name + '.json'), JSON.stringify(data, null, 1));
        await page.screenshot({ path: path.join(shotDir, name + '.jpg'), fullPage: true, type: 'jpeg', quality: 60 });
        console.log('ok', name, status, data.docHeight, data.texts.length, data.images.length);
      } catch (e) {
        console.log('ERR', name, status, String(e).slice(0, 200));
        fs.writeFileSync(path.join(dataDir, name + '.error.txt'), String(e));
      }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
})();
