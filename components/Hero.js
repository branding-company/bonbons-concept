'use client';
// Opening C with A's finale: paint the shell, then "pour the filling": it cracks into shards and the colour floods the page.
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/lib/store';
import { BONBONS } from '@/data/bonbons';
import { L } from '@/data/i18n';

const JEWELS = [
  { c: '#ff8a2b', t: '#ffe1c2', s: 'apricot-thyme' }, { c: '#c4163a', t: '#f9d3d8', s: 'pomegranate-ganache' },
  { c: '#a8cf5a', t: '#e6f0cc', s: 'pistachio' }, { c: '#f07aa0', t: '#fbd7e4', s: 'rose-petal-jam' },
  { c: '#e0a93a', t: '#f6e6b8', s: 'honey-walnut', g: true }, { c: '#8e3a7e', t: '#ecd3e6', s: 'mulberry' },
];

export function Hero() {
  const { t, lang } = useApp();
  const cv = useRef(), hit = useRef(), flood = useRef(), root = useRef();
  const eng = useRef(null);
  const [cur, setCur] = useState(0);
  const [fail, setFail] = useState(false);
  const curRef = useRef(0);

  useEffect(() => {
    let dead = false, io, ro;
    (async () => {
      try {
        const { Bon } = await import('./bonbonEngine');
        if (dead) return;
        const anchor = () => (innerWidth < 760 ? { x: 0, y: 0.36, s: 1.45 } : { x: 0.5, y: 0, s: 1.7 });
        const place = (b) => {
          const c = b.screenCenter(), r = b.screenRadius(), rr = root.current.getBoundingClientRect(), h = hit.current;
          if (!h) return; h.style.left = c.x - rr.left - r + 'px'; h.style.top = c.y - rr.top - r + 'px'; h.style.width = h.style.height = r * 2 + 'px';
        };
        const b = new Bon.Bonbon(cv.current, {
          paint: true, filling: JEWELS[0].c, anchor: anchor(), brush: 0.05, eventEl: hit.current, onResize: place,
          onBurst: () => {
            const c = b.screenCenter(), f = flood.current;
            f.style.left = c.x + 'px'; f.style.top = c.y + 'px'; f.style.opacity = 1;
            setTimeout(() => { f.style.transform = `scale(${Math.hypot(Math.max(c.x, innerWidth - c.x), Math.max(c.y, innerHeight - c.y)) * 2 / 40 + 1})`; }, 450);
            setTimeout(() => {
              document.getElementById('arrive')?.scrollIntoView({ behavior: 'instant', block: 'start' });
              f.style.opacity = 0;
              setTimeout(() => { f.style.transform = 'scale(0)'; b.reset(); b.clearPaint(); }, 800);
            }, 1700);
          },
        });
        eng.current = b; place(b);
        addEventListener('resize', () => { b.anchor = anchor(); b.resize(); });
        io = new IntersectionObserver(([e]) => { b.paused = !e.isIntersecting; }, { threshold: 0 }); io.observe(root.current);
        // the shell paints itself for the first seconds, then it is yours
        const seq = [['#ff8a2b', 0.5], ['#c4163a', 0.38], ['#e0a93a', 0.26]]; let done = false, lu = null; const s0 = performance.now();
        hit.current.addEventListener('pointerdown', () => { done = true; }, { once: true });
        (function auto(now) {
          if (done || dead) return; const tt0 = Math.max(0, (now - s0 - 400) / 3600); if (tt0 > 1) return;
          const k = Math.min(2, Math.floor(tt0 * 3)), tt = (tt0 * 3) % 1, col = seq[k][0];
          const u = 0.4 + 0.22 * tt, v = seq[k][1] + 0.2 * tt + Math.sin(tt * 3.14) * 0.07;
          if (lu && lu.k === k) for (let i = 1; i <= 12; i++) Bon.brush(b.tex, lu.u + (u - lu.u) * i / 12, lu.v + (v - lu.v) * i / 12, col, 0.042, k === 2 && i % 3 === 0);
          lu = { u, v, k }; b.map.needsUpdate = true; requestAnimationFrame(auto);
        })(performance.now());
      } catch (e) { console.error(e); setFail(true); }
    })();
    return () => { dead = true; io && io.disconnect(); eng.current && eng.current.destroy(); eng.current = null; };
  }, []);

  const pick = (i) => {
    setCur(i); curRef.current = i; const j = JEWELS[i]; const r = document.documentElement.style;
    r.setProperty('--ink', j.c); root.current.style.setProperty('--hero-bg', j.t);
    const b = eng.current; if (b) { b.paintColor = j.c; b.glitter = !!j.g; b.setFilling(j.c); }
  };
  useEffect(() => { pick(0); }, []);
  const name = BONBONS.find((b) => b.slug === JEWELS[cur].s)[lang].n;

  return (
    <section className="hero" ref={root} aria-label="Anush" data-tint={JEWELS[cur].t}>
      <div className="blob b1" /><div className="blob b2" />
      <canvas ref={cv} aria-hidden="true" style={{ pointerEvents: 'none' }} />
      <div ref={hit} className="hit" style={{ position: 'absolute', zIndex: 4, borderRadius: '50%', cursor: 'crosshair' }} />
      {fail && <div className="fb">WebGL is not available on this device.</div>}
      <div className="col">
        <div className="eyebrow">{t('hero_eyebrow')}</div>
        <h1 className="display" dangerouslySetInnerHTML={{ __html: t('hero_h1') }} />
        <p className="sub">{t('hero_sub')}</p>
        <div className="chips" role="group" aria-label={t('hero_pick')}>
          {JEWELS.map((j, i) => <button key={j.c} className={'chip' + (j.g ? ' gold' : '')} style={{ '--c': j.c }} aria-label={BONBONS.find((b) => b.slug === j.s)[lang].n} aria-pressed={i === cur} onClick={() => pick(i)} />)}
        </div>
        <div className="cname" aria-live="polite">{name}</div>
        <div className="row">
          <button className="cta" onClick={() => eng.current && eng.current.burst()}>{t('hero_pour')}</button>
          <button className="ghost" onClick={() => eng.current && eng.current.clearPaint()}>{t('hero_wipe')}</button>
        </div>
      </div>
      <a className="scrollcue" href="#arrive">{t('scroll')}</a>
      <div className="flood" ref={flood} aria-hidden="true" />
    </section>
  );
}
