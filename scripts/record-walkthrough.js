// Scripted walkthrough for the showcase video. Best recorded on a machine with a real GPU (headed), so WebGL runs at 60 fps.
// Usage: node scripts/record-walkthrough.js https://branding-company.github.io/bonbons-concept out-dir [--headed]
// Output: a .webm in out-dir; speed it up to ~60-80 s afterwards (see playbook, section 10).
const { chromium } = require('playwright');
const [, , ORIGIN = 'http://localhost:8124', OUT = 'showcase/video'] = process.argv;
const headed = process.argv.includes('--headed');
const wait = (p, ms) => p.waitForTimeout(ms);
async function glide(p, y, ms = 1400) { await p.evaluate(([y, ms]) => new Promise((r) => { const s = scrollY, t0 = performance.now(); (function f(n) { const k = Math.min(1, (n - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; scrollTo(0, s + (y - s) * e); k < 1 ? requestAnimationFrame(f) : r(); })(t0); }), [y, ms]); }
async function drag(p, from, to) { const a = await from.boundingBox(), b = await to.boundingBox(); await p.mouse.move(a.x + a.width / 2, a.y + a.height / 2); await p.mouse.down(); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 24 }); await p.mouse.up(); }
(async () => {
  const b = await chromium.launch({ headless: !headed, args: ['--use-gl=angle', '--ignore-gpu-blocklist', '--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: OUT, size: { width: 1440, height: 900 } } });
  const p = await ctx.newPage();
  await p.goto(`${ORIGIN}/en/`, { waitUntil: 'networkidle' }); await wait(p, 5200);
  const bb = await p.locator('.hit').boundingBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
  await p.locator('.chip').nth(3).click(); await p.mouse.move(cx - 120, cy + 40); await p.mouse.down(); await p.mouse.move(cx + 110, cy - 50, { steps: 40 }); await p.mouse.up(); await wait(p, 500);
  await p.locator('.hero .cta').click(); await wait(p, 4200);                       // crack and flood
  await glide(p, 900, 1200); await wait(p, 1200);
  await p.locator('.scroller').evaluate((el) => el.scrollTo({ left: 900, behavior: 'smooth' })); await wait(p, 1600);
  await p.goto(`${ORIGIN}/en/build/`, { waitUntil: 'networkidle' }); await wait(p, 800);
  for (const i of [0, 1, 2, 4]) { await p.locator('.pal').nth(i).click(); await wait(p, 350); }
  await drag(p, p.locator('.pal').nth(14), p.locator('.slot').nth(4)); await wait(p, 500);
  for (const i of [6, 7, 8, 12]) { await p.locator('.pal').nth(i).click(); await wait(p, 350); }
  await wait(p, 900); await p.locator('.sizes button').nth(2).click(); await wait(p, 900); await p.locator('.sizes button').nth(1).click(); await wait(p, 900);
  await p.locator('.ribbons button').nth(1).click(); await p.fill('input[placeholder="To"]', 'Mama'); await p.fill('input[placeholder="From"]', 'Ilona');
  await p.locator('textarea').pressSequentially('Happy birthday! Eat the pomegranate one first.', { delay: 35 });
  await p.locator('button.cta', { hasText: 'Close the box' }).click(); await wait(p, 7000);
  const link = (await p.inputValue('.linkrow input')).replace(/^https?:\/\/[^/]+/, ORIGIN);
  await p.goto(link, { waitUntil: 'networkidle' }); await wait(p, 1800); await p.locator('button.cta', { hasText: 'Open the box' }).click(); await wait(p, 4500);
  await p.goto(`${ORIGIN}/en/finder/`, { waitUntil: 'networkidle' }); for (let i = 0; i < 5; i++) { await p.locator('.qa button').nth([0, 2, 0, 1, 0][i]).click(); await wait(p, 600); } await wait(p, 1500);
  await p.goto(`${ORIGIN}/en/corporate/`, { waitUntil: 'networkidle' }); await p.fill('input[maxlength="28"]', 'Nairit Group'); await wait(p, 900); await p.locator('.seg button').nth(2).click(); await wait(p, 900); await p.fill('input[type=number]', '120'); await wait(p, 1500);
  await p.goto(`${ORIGIN}/en/gift/`, { waitUntil: 'networkidle' }); await p.locator('.tabs button').nth(1).click(); for (const c of ['USD', 'EUR', 'RUB']) { await p.locator('.curs button', { hasText: c }).click(); await wait(p, 700); }
  await p.goto(`${ORIGIN}/en/`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.getElementById('atelier').scrollIntoView({ behavior: 'instant' }));
  const total = await p.evaluate(() => document.getElementById('atelier').offsetHeight - innerHeight); const top = await p.evaluate(() => document.getElementById('atelier').offsetTop);
  await glide(p, top + total, 7000); await wait(p, 600);
  await p.goto(`${ORIGIN}/hy/`, { waitUntil: 'networkidle' }); await wait(p, 4500);
  await ctx.close(); await b.close();
})();
