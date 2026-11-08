'use client';
// Scroll-told making process. Scenes animate from scroll progress in real time (no video).
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/lib/store';
import { Orb } from './Orb';
import { BONBONS } from '@/data/bonbons';

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x) => x * x * (3 - 2 * x);

function Temper({ p }) {
  const w = ease(p), temp = p < 0.5 ? 45 - 18 * ease(p * 2) : 27 + 4 * ease((p - 0.5) * 2);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <rect x="30" y="60" width="340" height="220" rx="26" fill="#efe6dc" /><rect x="30" y="60" width="340" height="220" rx="26" fill="none" stroke="#d9cbbb" strokeWidth="3" />
      <g style={{ transform: `translateX(${Math.sin(p * 18) * 14}px)` }}>
        <ellipse cx="200" cy="170" rx={100 + 20 * w} ry={52 + 10 * w} fill="#4a2315" />
        <ellipse cx="200" cy="170" rx={80 + 14 * w} ry={38 + 8 * w} fill="#6a3318" opacity=".8" />
        <ellipse cx="170" cy="150" rx="32" ry="10" fill="#fff" opacity=".28" transform="rotate(-8 170 150)" />
      </g>
      <g style={{ transform: `translate(${-110 + 220 * (0.5 + 0.5 * Math.sin(p * 14))}px, ${p * 4}px)` }}><rect x="150" y="110" width="12" height="100" rx="5" fill="#cfc4b8" /><rect x="90" y="196" width="140" height="10" rx="5" fill="#b5a897" /></g>
      <path d="M40 350 C100 350 120 322 170 322 S240 366 280 340 S340 330 360 338" fill="none" stroke="rgba(42,20,12,.15)" strokeWidth="6" strokeLinecap="round" />
      <path d="M40 350 C100 350 120 322 170 322 S240 366 280 340 S340 330 360 338" fill="none" stroke="#c4163a" strokeWidth="6" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} />
      <text x="200" y="40" textAnchor="middle" fontSize="40" fontWeight="900" fill="#2a140c" fontFamily="Fraunces, serif">{temp.toFixed(1)}°C</text>
    </svg>
  );
}
function Paint({ p }) {
  const d = (i) => clamp(p * 3 - i);
  const strokes = [['#c4163a', 'M110 170 C160 90 250 90 300 170', 0], ['#ff8a2b', 'M120 215 C170 140 240 140 292 220', 1], ['#e0a93a', 'M140 258 C180 200 230 200 266 262', 2]];
  const kk = Math.min(2, Math.floor(p * 3)), ll = clamp(p * 3 - kk), bx = 120 + 170 * ll, by = 230 - 55 * kk - 60 * Math.sin(ll * Math.PI);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <circle cx="200" cy="210" r="128" fill="#fff6e6" /><circle cx="200" cy="210" r="118" fill="#3d1c10" />
      <ellipse cx="160" cy="150" rx="40" ry="14" fill="#fff" opacity=".18" transform="rotate(-30 160 150)" />
      {strokes.map(([c, dd, i]) => <path key={i} d={dd} fill="none" stroke={c} strokeWidth="18" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - d(i)} />)}
      <g transform={`translate(${bx - 120} ${by - 230})`} style={{ transition: 'none' }}><path d="M120 230 l60 -70 l12 10 l-58 72z" fill="#b5875a" /><path d="M118 232 l-10 18 l20 -8z" fill="#2a140c" /></g>
    </svg>
  );
}
function Fill({ p }) {
  const lv = ease(clamp(p * 1.3)), drop = (p * 6) % 1;
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <defs><clipPath id="cav"><path d="M90 200 A110 110 0 0 0 310 200 Z" /></clipPath></defs>
      <path d="M90 200 A110 110 0 0 0 310 200 Z" fill="#fff6e6" /><path d="M100 200 A100 100 0 0 0 300 200 Z" fill="#7a3f20" />
      <g clipPath="url(#cav)"><rect x="90" y={300 - 100 * lv} width="220" height="120" fill="#ff8a2b" /><ellipse cx="200" cy={300 - 100 * lv} rx="100" ry="8" fill="#ffc07a" /></g>
      <rect x="186" y="40" width="28" height="70" rx="12" fill="#cfc4b8" /><path d="M192 110 L208 110 L204 130 L196 130Z" fill="#b5a897" />
      {p < 0.78 && <ellipse cx="200" cy={135 + drop * 110} rx={5 + (1 - drop) * 3} ry={9 - drop * 3} fill="#ff8a2b" />}
      <text x="200" y="360" textAnchor="middle" fontSize="22" fontWeight="800" fill="#2a140c" fontFamily="Nunito, sans-serif">{Math.round(lv * 100)}%</text>
    </svg>
  );
}
function Seal({ p }) {
  const s = ease(clamp(p * 1.2)), sh = clamp((p - 0.5) * 2);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true">
      <defs><clipPath id="bon"><circle cx="200" cy="190" r="110" /></clipPath></defs>
      <circle cx="200" cy="190" r="110" fill="#c4163a" /><circle cx="200" cy="190" r="110" fill="url(#none)" />
      <ellipse cx="160" cy="140" rx="34" ry="14" fill="#fff" opacity=".5" transform="rotate(-30 160 140)" />
      <g clipPath="url(#bon)"><rect x="80" y={420 - 150 * s} width="240" height="60" fill="#6a2a14" /></g>
      <g clipPath="url(#bon)"><rect x={-200 + 600 * sh} y="60" width="46" height="260" fill="#fff" opacity=".35" transform="rotate(20 200 190)" /></g>
      <ellipse cx="200" cy="330" rx="90" ry="10" fill="rgba(42,20,12,.18)" />
    </svg>
  );
}

export function Story() {
  const { t } = useApp();
  const ref = useRef(); const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const run = () => { raf = 0; const r = ref.current.getBoundingClientRect(); setP(clamp(-r.top / (r.height - innerHeight))); };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); };
  }, []);
  const idx = Math.min(3, Math.floor(p * 4)), lp = clamp(p * 4 - idx);
  const scenes = [<Temper p={lp} />, <Paint p={lp} />, <Fill p={lp} />, <Seal p={lp} />];
  return (
    <section className="story" ref={ref} id="atelier" data-tint="#f3dfc3">
      <div className="stick">
        <div className="scene">{scenes.map((s, i) => <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === idx ? 1 : 0, transition: 'opacity .5s' }}>{s}</div>)}</div>
        <div className="txt">
          <div className="kick">{t('story_k')}</div>
          <h2 className="display" dangerouslySetInnerHTML={{ __html: t('story_h') }} />
          <div className="steps">{[1, 2, 3, 4].map((n, i) => <div key={n} className={'step' + (i === idx ? ' on' : '')}><h3>{String(n).padStart(2, '0')} · {t('st' + n + '_h')}</h3><p>{t('st' + n + '_p')}</p></div>)}</div>
          <div className="prog" style={{ '--p': p }}><i /></div>
        </div>
      </div>
    </section>
  );
}
