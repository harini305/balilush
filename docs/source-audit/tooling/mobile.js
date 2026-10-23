const { chromium, devices } = require('playwright');
const shot = process.argv[2];
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  const ctx = await b.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 } });
  const m = await ctx.newPage();
  await m.goto('https://www.balilush.com/', { waitUntil: 'load' });
  const t0 = Date.now();
  const pop = await m.waitForSelector('#POPUPS_ROOT [aria-label="Back to site"]', { timeout: 15000 }).then(() => Date.now() - t0).catch(() => 'not shown within 15s');
  console.log('mobile popup:', pop);
  if (typeof pop === 'number') { await m.waitForTimeout(1500); await m.screenshot({ path: shot + '/state_home_lightbox_open__mobile.jpg', type: 'jpeg', quality: 70 }); await m.locator('#POPUPS_ROOT [aria-label="Back to site"]').first().click({ force: true }); await m.waitForTimeout(800); }
  await m.screenshot({ path: shot + '/state_home_hero_no_lightbox__mobile.jpg', type: 'jpeg', quality: 70 });
  const hdrInfo = await m.evaluate(() => { const h = document.querySelector('header'); const cs = getComputedStyle(h.parentElement); return { h: h.getBoundingClientRect().height, parentPos: cs.position }; });
  console.log('mobile header', hdrInfo);
  const burger = m.locator('button[aria-label="Menu"]').filter({ visible: true }).first();
  await burger.click(); await m.waitForTimeout(1500);
  const items = await m.evaluate(() => [...document.querySelectorAll('nav a, nav button, [role=dialog] a, [role=dialog] button')].filter(a => { const r = a.getBoundingClientRect(); return r.width && r.height && getComputedStyle(a).visibility !== 'hidden'; }).map(a => ({ t: (a.innerText || a.getAttribute('aria-label') || '').trim(), href: a.href || '', y: Math.round(a.getBoundingClientRect().y) })));
  console.log('menu items', JSON.stringify(items));
  const st = await m.evaluate(() => { const d = [...document.querySelectorAll('[role=dialog]')].find(d => d.getBoundingClientRect().width > 0); if (!d) return null; const a = d.querySelector('a'); const sp = [...d.querySelectorAll('*')].find(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim() === 'Rooms')); const cs = sp ? getComputedStyle(sp) : null; return { bg: getComputedStyle(d).backgroundColor, inner: [...d.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundColor).filter(c => c !== 'rgba(0, 0, 0, 0)').slice(0, 3), font: cs && { ff: cs.fontFamily, fs: cs.fontSize, color: cs.color } }; });
  console.log('menu style', JSON.stringify(st));
  await m.screenshot({ path: shot + '/state_mobile_menu_open__mobile.jpg', type: 'jpeg', quality: 70 });
  const more = m.locator('button[aria-label="More Restaurant pages"]').filter({ visible: true }).first();
  if (await more.count()) { await more.click(); await m.waitForTimeout(1000); await m.screenshot({ path: shot + '/state_mobile_menu_submenu__mobile.jpg', type: 'jpeg', quality: 70 });
    console.log('after submenu', JSON.stringify(await m.evaluate(() => [...document.querySelectorAll('[role=dialog] a')].filter(a => a.getBoundingClientRect().height > 0).map(a => a.innerText.trim() + '->' + a.href)))); }
  await b.close();
})();
