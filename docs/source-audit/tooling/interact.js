// Interaction checks. Usage: node interact.js <outDir> <shotDir>
const fs = require('fs');
const path = require('path');
const { chromium, devices } = require('playwright');
const [, , outDir, shotDir] = process.argv;
const B = 'https://www.balilush.com';
const log = [];
const L = (...a) => { const s = a.map(x => typeof x === 'string' ? x : JSON.stringify(x)).join(' '); console.log(s); log.push(s); };

async function closeLightbox(page) {
  const btn = page.locator('[aria-label="close"], [data-testid="lightbox-close-button"], button:has-text("Close")').first();
  if (await btn.count() && await btn.isVisible().catch(() => false)) { await btn.click().catch(() => {}); return true; }
  // the X icon in the promo
  const x = page.locator('#SITE_CONTAINER [role="dialog"] svg').first();
  if (await x.count()) { await page.keyboard.press('Escape'); return 'esc'; }
  return false;
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  fs.mkdirSync(outDir, { recursive: true });

  // ---------- DESKTOP ----------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(B + '/', { waitUntil: 'load' });
  const t0 = Date.now();
  await page.waitForSelector('#POPUPS_ROOT [aria-label="Back to site"]', { timeout: 30000 }).catch(() => {});
  L('Popup appeared after ms', Date.now() - t0);
  await page.waitForTimeout(1500);
  const dlg = await page.evaluate(() => {
    const d = document.querySelector('[role="dialog"], [data-testid="lightbox"], #POPUPS_ROOT *');
    const root = document.querySelector('#POPUPS_ROOT');
    return { dialog: !!d, popupsRootHTMLlen: root ? root.innerHTML.length : 0, popupText: root ? root.innerText.slice(0, 300) : null };
  });
  L('LIGHTBOX on load:', dlg);
  await page.screenshot({ path: path.join(shotDir, 'state_home_lightbox_open__desktop.jpg'), type: 'jpeg', quality: 70 });
  // try close
  const closeSel = await page.evaluate(() => {
    const root = document.querySelector('#POPUPS_ROOT');
    if (!root) return null;
    const btns = [...root.querySelectorAll('button, [role=button], [aria-label]')].map(b => ({ tag: b.tagName, aria: b.getAttribute('aria-label'), id: b.id, text: b.innerText.slice(0, 40) }));
    return btns;
  });
  L('Popup buttons:', closeSel);
  const closeBtn = page.locator('#POPUPS_ROOT [aria-label="Back to site"]').first();
  if (await closeBtn.count()) { await closeBtn.click({ force: true }); L('Closed lightbox via close button'); }
  else { await page.keyboard.press('Escape'); L('Pressed Escape'); }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(shotDir, 'state_home_hero_no_lightbox__desktop.jpg'), type: 'jpeg', quality: 70 });
  // hero media
  const hero = await page.evaluate(() => {
    const s = document.querySelector('#comp-m28o2bbb');
    if (!s) return null;
    const imgs = [...s.querySelectorAll('img')].map(i => ({ src: i.currentSrc, nw: i.naturalWidth, nh: i.naturalHeight }));
    const vids = [...s.querySelectorAll('video')].map(v => v.currentSrc);
    const wv = [...s.querySelectorAll('wix-video, [data-testid*="video" i], canvas')].map(e => e.tagName + ' ' + (e.getAttribute('data-testid') || ''));
    return { id: s.id, imgs, vids, wv, html: s.outerHTML.length };
  });
  L('HERO media:', hero);

  // reload after lightbox closed: does it re-open on navigation?
  await page.goto(B + '/activities', { waitUntil: 'load' }); await page.waitForTimeout(3000);
  L('Lightbox after navigating to /activities (same session):', await page.evaluate(() => (document.querySelector('#POPUPS_ROOT') || {}).innerText?.slice(0, 80) || 'none'));

  // sticky header
  await page.goto(B + '/', { waitUntil: 'load' }); await page.waitForTimeout(2500);
  await page.keyboard.press('Escape');
  const pc = page.locator('#POPUPS_ROOT [aria-label="Back to site"]').first(); await pc.waitFor({timeout: 9000}).then(() => pc.click({ force: true })).catch(() => {}); await page.waitForTimeout(800);
  await page.mouse.wheel(0, 2500); await page.waitForTimeout(1500);
  const hdr = await page.evaluate(() => { const h = document.querySelector('header'); const r = h.getBoundingClientRect(); const cs = getComputedStyle(h); return { top: r.top, h: r.height, bg: cs.backgroundColor, wrapperBg: getComputedStyle(h.parentElement).backgroundColor, pos: cs.position, parentPos: getComputedStyle(h.parentElement).position, scrollY }; });
  L('HEADER after scrolling 2500px:', hdr);
  await page.screenshot({ path: path.join(shotDir, 'state_home_scrolled_header__desktop.jpg'), type: 'jpeg', quality: 70 });

  // Restaurant dropdown hover
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
  const rest = page.locator('header a:has-text("Restaurant"), header li:has-text("Restaurant")').first();
  await rest.hover().catch(e => L('hover fail', String(e).slice(0, 100)));
  await page.waitForTimeout(1200);
  const dd = await page.evaluate(() => [...document.querySelectorAll('header a, header [role=menuitem]')].filter(a => { const r = a.getBoundingClientRect(); return r.width && r.height && getComputedStyle(a).visibility !== 'hidden'; }).map(a => ({ t: a.innerText.trim(), href: a.href, y: Math.round(a.getBoundingClientRect().y) })));
  L('NAV items visible while hovering Restaurant:', dd);
  await page.screenshot({ path: path.join(shotDir, 'state_nav_restaurant_dropdown__desktop.jpg'), clip: { x: 0, y: 0, width: 1440, height: 400 }, type: 'jpeg', quality: 75 });
  // nav hover color
  const navHover = await page.evaluate(() => { const a = [...document.querySelectorAll('header a')].find(a => a.innerText.trim() === 'Restaurant'); if (!a) return null; const c = getComputedStyle(a.querySelector('*') || a); return { color: c.color, ff: c.fontFamily, fs: c.fontSize, ls: c.letterSpacing }; });
  L('Restaurant nav item style while hovered:', navHover);
  const navNormal = await page.evaluate(() => { const a = [...document.querySelectorAll('header a')].find(a => a.innerText.trim() === 'Activities'); const el = [...a.querySelectorAll('*')].find(e => e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) || a; const c = getComputedStyle(el); return { color: c.color, ff: c.fontFamily, fs: c.fontSize, fw: c.fontWeight, ls: c.letterSpacing, tt: c.textTransform }; });
  L('Activities nav item style (normal):', navNormal);
  const bookBtn = await page.evaluate(() => { const a = [...document.querySelectorAll('header a')].find(a => /BOOK YOUR STAY/i.test(a.innerText)); const c = getComputedStyle(a); const sp = getComputedStyle(a.querySelector('span') || a); return { bg: c.backgroundColor, color: sp.color, radius: c.borderRadius, border: c.border, ff: sp.fontFamily, fs: sp.fontSize, w: a.getBoundingClientRect().width, h: a.getBoundingClientRect().height }; });
  L('Header BOOK YOUR STAY button style:', bookBtn);

  // Home testimonial slider
  await page.goto(B + '/', { waitUntil: 'load' }); await page.waitForTimeout(2500);
  const pc2 = page.locator('#POPUPS_ROOT [aria-label="Back to site"]').first(); await pc2.waitFor({timeout: 9000}).then(() => pc2.click({ force: true })).catch(() => {}); await page.waitForTimeout(800);
  await page.locator('#comp-mascs8nm').scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);
  const slides = [];
  for (let i = 0; i < 8; i++) {
    const t = await page.evaluate(() => { const s = document.querySelector('#comp-mascs8nm'); return [...s.querySelectorAll('h2,p')].filter(e => e.getBoundingClientRect().width && getComputedStyle(e).visibility !== 'hidden').map(e => e.innerText.trim()).filter(Boolean).join(' || '); });
    slides.push(t);
    const next = page.locator('#comp-mascs8nm [aria-label*="next" i]').first();
    if (!(await next.count())) { L('no next arrow found'); break; }
    await next.click().catch(() => {}); await page.waitForTimeout(1500);
  }
  const uniq = [...new Set(slides)];
  L('TESTIMONIAL SLIDES (unique):', uniq.length);
  uniq.forEach((s, i) => L(`  slide ${i + 1}:`, s));
  await page.locator('#comp-mascs8nm').screenshot({ path: path.join(shotDir, 'state_home_testimonial_slider__desktop.jpg'), type: 'jpeg', quality: 70 }).catch(() => {});
  // Unique Teak Bungalows gallery (slider?)
  const gal = await page.evaluate(() => { const s = document.querySelector('#comp-mamummog'); return { imgs: [...s.querySelectorAll('img')].map(i => i.currentSrc.split('/v1/')[0]), arrows: [...s.querySelectorAll('[aria-label]')].map(a => a.getAttribute('aria-label')) }; });
  L('Teak bungalows gallery:', gal);

  // Banner LEARN MORE
  const lm = page.locator('#comp-md3hnnoh :text("LEARN MORE")').first();
  if (await lm.count()) { await lm.click().catch(e => L('LEARN MORE click err', String(e).slice(0, 80))); await page.waitForTimeout(2500); L('After LEARN MORE click url:', page.url(), 'popup:', await page.evaluate(() => (document.querySelector('#POPUPS_ROOT') || {}).innerText?.slice(0, 100) || 'none')); }

  // Footer non-links
  for (const label of ['Booking / Cancellation Policy', 'Site Terms', 'Privacy Policy', 'Host a Retreat']) {
    await page.goto(B + '/', { waitUntil: 'load' }); await page.waitForTimeout(2500);
    const c = page.locator('#POPUPS_ROOT [aria-label="Back to site"]').first(); await c.waitFor({timeout: 9000}).then(() => c.click({ force: true })).catch(() => {}); await page.waitForTimeout(800);
    const el = page.locator(`footer :text("${label}")`).first();
    if (!(await el.count())) { L('Footer label not found', label); continue; }
    const info = await el.evaluate(e => ({ tag: e.tagName, inA: !!e.closest('a'), cursor: getComputedStyle(e).cursor, onclick: !!e.closest('[onclick]') }));
    await el.click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(2500);
    L(`Footer "${label}":`, info, '-> url', page.url(), 'popup:', await page.evaluate(() => (document.querySelector('#POPUPS_ROOT') || {}).innerText?.slice(0, 150) || 'none'));
  }

  // Reviews filter
  await page.goto(B + '/reviews', { waitUntil: 'load' }); await page.waitForTimeout(3000);
  const c3 = page.locator('#POPUPS_ROOT [aria-label="Back to site"]').first(); await c3.waitFor({timeout: 9000}).then(() => c3.click({ force: true })).catch(() => {}); await page.waitForTimeout(800);
  const sel = await page.evaluate(() => [...document.querySelectorAll('select, [role=combobox], [role=listbox], input')].map(s => ({ tag: s.tagName, role: s.getAttribute('role'), aria: s.getAttribute('aria-label'), placeholder: s.placeholder, value: s.value, options: s.tagName === 'SELECT' ? [...s.options].map(o => o.text) : undefined })));
  L('Reviews filter controls:', sel);
  const countReviews = () => page.evaluate(() => [...document.querySelectorAll('main a[href*="/rooms/"]')].filter(a => a.getBoundingClientRect().height > 0).map(a => a.innerText.trim()));
  L('Reviews visible before filter:', (await countReviews()).length);
  const selectEl = page.locator('main select').first();
  if (await selectEl.count()) {
    const opts = await selectEl.evaluate(s => [...s.options].map(o => o.value + '|' + o.text));
    for (const o of opts.slice(0, 6)) {
      const v = o.split('|')[0];
      await selectEl.selectOption(v).catch(() => {}); await page.waitForTimeout(2000);
      const r = await countReviews();
      L(`  filter "${o}":`, r.length, [...new Set(r)]);
    }
  } else {
    const cb = page.locator('main [role=combobox], main button[aria-haspopup]').first();
    if (await cb.count()) { await cb.click(); await page.waitForTimeout(1000); L('combobox opts:', await page.evaluate(() => [...document.querySelectorAll('[role=option]')].map(o => o.innerText))); }
  }

  // Room page gallery
  await page.goto(B + '/rooms/duck-cottage', { waitUntil: 'load' }); await page.waitForTimeout(3000);
  const c4 = page.locator('#POPUPS_ROOT [aria-label="Back to site"]').first(); await c4.waitFor({timeout: 9000}).then(() => c4.click({ force: true })).catch(() => {}); await page.waitForTimeout(800);
  const rg = await page.evaluate(() => { const s = document.querySelector('#comp-mfwne6qz'); if (!s) return null; return { imgs: [...s.querySelectorAll('img')].length, arrows: [...s.querySelectorAll('[aria-label]')].map(a => a.getAttribute('aria-label')).slice(0, 10), testids: [...new Set([...s.querySelectorAll('[data-testid]')].map(a => a.getAttribute('data-testid')))].slice(0, 15), hook: [...new Set([...s.querySelectorAll('[data-hook]')].map(a => a.getAttribute('data-hook')))].slice(0, 15) }; });
  L('Room gallery (duck cottage):', rg);
  await page.locator('#comp-mfwne6qz').screenshot({ path: path.join(shotDir, 'state_room_gallery__desktop.jpg'), type: 'jpeg', quality: 70 }).catch(() => {});
  const firstImg = page.locator('#comp-mfwne6qz img').first();
  if (await firstImg.count()) { await firstImg.click().catch(() => {}); await page.waitForTimeout(2000); L('After clicking gallery image: url', page.url(), 'fullscreen?', await page.evaluate(() => !!document.querySelector('[data-hook*="fullscreen" i], [id*="fullscreen" i], [data-testid*="fullscreen" i]'))); await page.screenshot({ path: path.join(shotDir, 'state_room_gallery_expanded__desktop.jpg'), type: 'jpeg', quality: 70 }); }

  // Blog listing: categories, pagination, search
  await page.goto(B + '/blog', { waitUntil: 'load' }); await page.waitForTimeout(3000);
  L('Blog controls:', await page.evaluate(() => ({ search: !!document.querySelector('[data-hook*="search" i]'), cats: [...document.querySelectorAll('[data-hook*="category" i] a, nav a')].map(a => a.innerText.trim()).filter(Boolean), pagination: !!document.querySelector('[data-hook*="pagination" i]'), login: !!document.querySelector('[data-hook*="login" i], [aria-label*="log in" i]') })));
  await ctx.close();

  // ---------- MOBILE menu ----------
  const mctx = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
  const m = await mctx.newPage();
  await m.goto(B + '/', { waitUntil: 'load' }); await m.waitForTimeout(3500);
  L('MOBILE lightbox on load:', await m.evaluate(() => (document.querySelector('#POPUPS_ROOT') || {}).innerText?.slice(0, 120) || 'none'));
  await m.screenshot({ path: path.join(shotDir, 'state_home_first_view__mobile.jpg'), type: 'jpeg', quality: 70 });
  const mc = m.locator('#POPUPS_ROOT [aria-label="Back to site"]').first(); await mc.waitFor({timeout: 9000}).then(() => mc.click({ force: true })).catch(() => {}); await m.waitForTimeout(800);
  await m.waitForTimeout(1000);
  await m.screenshot({ path: path.join(shotDir, 'state_home_hero_no_lightbox__mobile.jpg'), type: 'jpeg', quality: 70 });
  const burger = m.locator('[aria-label*="menu" i], [data-testid*="hamburger" i], header [role=button]').first();
  L('Mobile header controls:', await m.evaluate(() => [...document.querySelectorAll('header [aria-label], header [role=button], header button')].map(b => ({ tag: b.tagName, aria: b.getAttribute('aria-label'), testid: b.getAttribute('data-testid'), vis: b.getBoundingClientRect().width > 0 }))));
  if (await burger.count()) {
    await burger.click({ force: true }).catch(e => L('burger click err', String(e).slice(0, 80))); await m.waitForTimeout(1500);
    L('Mobile menu items:', await m.evaluate(() => [...document.querySelectorAll('a, [role=menuitem]')].filter(a => { const r = a.getBoundingClientRect(); return r.width && r.height && r.top >= 0 && r.top < innerHeight; }).map(a => (a.innerText || a.getAttribute('aria-label') || '').trim() + ' -> ' + (a.href || ''))));
    await m.screenshot({ path: path.join(shotDir, 'state_mobile_menu_open__mobile.jpg'), type: 'jpeg', quality: 70 });
    // submenu expand?
    const sub = m.locator('[aria-label*="Restaurant" i] , button[aria-expanded]').first();
    if (await sub.count()) { await sub.click({ force: true }).catch(() => {}); await m.waitForTimeout(800); await m.screenshot({ path: path.join(shotDir, 'state_mobile_menu_submenu__mobile.jpg'), type: 'jpeg', quality: 70 }); L('Mobile menu after submenu toggle:', await m.evaluate(() => [...document.querySelectorAll('a')].filter(a => { const r = a.getBoundingClientRect(); return r.width && r.height && r.top >= 0 && r.top < innerHeight; }).map(a => a.innerText.trim()).filter(Boolean))); }
  }
  await mctx.close();
  await browser.close();
  fs.writeFileSync(path.join(outDir, 'interactions.log'), log.join('\n'));
})();
