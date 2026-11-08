// Captures a screenshot of every feature in its "best" state, desktop and phone.
// Usage: serve ./out (BASE_PATH= npm run build), then: node scripts/capture.js http://localhost:8124 showcase/screens
// Needs Playwright (globally installed or in node_modules).
const { chromium } = require('playwright');
const path = require('path');
const [, , ORIGIN = 'http://localhost:8124', OUT = 'showcase/screens', ONLY] = process.argv; // ONLY: optional feature-name prefix, e.g. 10-

const FEATURES = [
  ['01-hero-paint', async (p, m) => { await p.goto(`${ORIGIN}/en/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(6500); await stroke(p, m, 3); }],
  ['02-hero-flood', async (p, m) => { await p.goto(`${ORIGIN}/en/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(5000); await stroke(p, m, 1); await p.locator('.hero .cta').click(); await p.waitForTimeout(m ? 2300 : 2000); }],
  ['03-collection', async (p, m) => { await p.goto(`${ORIGIN}/en/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500); await p.evaluate(() => document.getElementById('collection').scrollIntoView({ behavior: 'instant' })); await p.locator('.cutbtn').first().click(); await p.waitForTimeout(900); }],
  ['04-build-fill', async (p, m) => { await build(p, m, false); }],
  ['05-build-closed', async (p, m) => { await build(p, m, true); }],
  ['06-gift-recipient', async (p, m) => { const link = await build(p, m, true); await p.goto(link, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500); await p.locator('button.cta', { hasText: 'Open the box' }).click(); await p.waitForTimeout(3600); }],
  ['07-bonbon-page', async (p, m) => { await p.goto(`${ORIGIN}/en/collection/pomegranate-ganache/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(2600); }],
  ['08-flavour-finder', async (p, m) => { await p.goto(`${ORIGIN}/en/finder/`, { waitUntil: 'networkidle' }); for (let i = 0; i < 5; i++) { await p.locator('.qa button').nth([0, 2, 0, 1, 0][i]).click(); await p.waitForTimeout(250); } await p.waitForTimeout(1200); }],
  ['09-occasions', async (p, m) => { await p.goto(`${ORIGIN}/en/occasions/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(800); }],
  ['10-gift-yerevan', async (p, m) => { await p.goto(`${ORIGIN}/en/gift/`, { waitUntil: 'networkidle' }); await p.locator('.fld', { hasText: 'Recipient name' }).locator('input').fill('Ani Petrosyan'); await p.locator('.fld', { hasText: 'Address in Yerevan' }).locator('input').fill('Tumanyan 12, Yerevan'); await p.locator('.chk input').check(); await p.waitForTimeout(500); }],
  ['11-gift-diaspora', async (p, m) => { await p.goto(`${ORIGIN}/en/gift/`, { waitUntil: 'networkidle' }); await p.locator('.tabs button').nth(1).click(); await p.locator('.curs button', { hasText: 'USD' }).click(); await p.waitForTimeout(600); }],
  ['12-corporate', async (p, m) => { await p.goto(`${ORIGIN}/en/corporate/`, { waitUntil: 'networkidle' }); await p.fill('input[maxlength="28"]', 'Nairit Group'); await p.fill('input[type=number]', '120'); await p.waitForTimeout(700); }],
  ['13-workshops', async (p, m) => { await p.goto(`${ORIGIN}/en/workshops/`, { waitUntil: 'networkidle' }); await p.locator('.calgrid button.has').nth(1).click(); await p.locator('.slots button:not([disabled])').first().click(); await p.waitForTimeout(600); }],
  ['14-pairing', async (p, m) => { await p.goto(`${ORIGIN}/en/pairing/`, { waitUntil: 'networkidle' }); await p.locator('.tabs button').nth(1).click(); await p.locator('.chipsrow button').first().click(); await p.waitForTimeout(500); }],
  ['15-atelier-story', async (p, m) => { await p.goto(`${ORIGIN}/en/`, { waitUntil: 'networkidle' }); await p.evaluate(() => { const s = document.getElementById('atelier'); window.scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * 0.4); }); await p.waitForTimeout(1500); }],
  ['16-cart-checkout', async (p, m) => { await build(p, m, true); await p.locator('button.cta', { hasText: 'Add to cart' }).click(); await p.goto(`${ORIGIN}/en/cart/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(800); }],
  ['17-armenian', async (p, m) => { await p.goto(`${ORIGIN}/hy/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(6000); await stroke(p, m, 1); }],
  ['18-russian-build', async (p, m) => { await p.goto(`${ORIGIN}/ru/build/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(600); for (let i = 0; i < 9; i++) { await p.locator('.pal').nth([0, 1, 7, 13, 14, 6, 2, 3, 9][i]).click(); await p.waitForTimeout(110); } await p.waitForTimeout(1800); }],
];

async function stroke(p, m, chip) {
  await p.locator('.chip').nth(chip).click();
  const bb = await p.locator('.hit').boundingBox(); if (!bb) return;
  const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
  await p.mouse.move(cx - 90, cy - 30); await p.mouse.down(); await p.mouse.move(cx + 90, cy + 50, { steps: 14 }); await p.mouse.up(); await p.waitForTimeout(500);
}
async function build(p, m, close) {
  await p.goto(`${ORIGIN}/en/build/`, { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
  for (let i = 0; i < 9; i++) { await p.locator('.pal').nth([0, 1, 2, 4, 14, 6, 7, 8, 12][i]).click(); await p.waitForTimeout(110); }
  await p.waitForTimeout(1800);
  if (close) {
    await p.fill('input[placeholder="To"]', 'Mama'); await p.fill('input[placeholder="From"]', 'Ilona'); await p.fill('textarea', 'Happy birthday! Eat the pomegranate one first.');
    await p.locator('button.cta', { hasText: 'Close the box' }).click(); await p.waitForTimeout(6200);
  }
  return await p.inputValue('.linkrow input').catch(() => null).then((l) => l && l.replace(/^https?:\/\/[^/]+/, ORIGIN));
}

(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--no-sandbox'] });
  for (const [kind, vp, dsf, mob] of [['desktop', { width: 1440, height: 900 }, 1.25, false], ['phone', { width: 390, height: 844 }, 2, true]]) {
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: dsf, hasTouch: mob, isMobile: mob });
    for (const [name, fn] of FEATURES.filter(([n]) => !ONLY || n.startsWith(ONLY))) {
      const p = await ctx.newPage(); const errs = [];
      p.on('pageerror', (e) => errs.push(e.message));
      try { await fn(p, mob); await p.screenshot({ path: path.join(OUT, kind, `${name}.png`) }); console.log(kind, name, errs.length ? 'ERR ' + errs.join('|') : 'ok'); }
      catch (e) { console.log(kind, name, 'FAILED', e.message.split('\n')[0]); }
      await p.close();
    }
    await ctx.close();
  }
  await b.close();
})();
