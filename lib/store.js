'use client';
import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { BONBONS, BY_SLUG, PRICE, SIZES, FX } from '@/data/bonbons';
import { t as tr } from '@/data/i18n';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const DEF_BOX = { size: 9, slots: Array(9).fill(null), ribbon: 'pom', to: '', from: '', msg: '' };
const KEY = 'anush-demo-v1';

export function fmt(amd, cur = 'AMD') {
  if (cur === 'AMD') return Math.round(amd).toLocaleString('en-US') + ' AMD';
  const v = amd / FX[cur];
  const sym = { USD: '$', EUR: '€', RUB: '₽' }[cur];
  return cur === 'RUB' ? Math.round(v).toLocaleString('en-US') + ' ₽' : sym + v.toFixed(v < 100 ? 1 : 0);
}
export const boxPrice = (size) => PRICE[size];
export const perPiece = (size) => PRICE[size] / size;

export function encodeBox(box) {
  const p = new URLSearchParams();
  p.set('s', box.size); p.set('r', box.ribbon);
  p.set('i', box.slots.map((s) => (s ? BY_SLUG[s].i.toString(16) : '-')).join(''));
  if (box.msg) p.set('m', box.msg); if (box.from) p.set('f', box.from); if (box.to) p.set('t', box.to);
  return p.toString();
}
export function decodeBox(qs) {
  try {
    const p = new URLSearchParams(qs); const size = +p.get('s'); if (!SIZES.includes(size)) return null;
    const idx = (p.get('i') || '').split('');
    const slots = Array(size).fill(null).map((_, k) => (idx[k] && idx[k] !== '-' && BONBONS[parseInt(idx[k], 16)] ? BONBONS[parseInt(idx[k], 16)].slug : null));
    return { size, slots, ribbon: p.get('r') || 'pom', msg: p.get('m') || '', from: p.get('f') || '', to: p.get('t') || '' };
  } catch (e) { return null; }
}

export function Providers({ lang, children }) {
  const [box, setBox] = useState(DEF_BOX);
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  const [cur, setCur] = useState('AMD');
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (d.box) setBox(d.box); if (d.cart) setCart(d.cart);
    } catch (e) {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify({ box, cart })); } catch (e) {} }, [box, cart, ready]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const api = useMemo(() => ({
    lang, box, cart, cur, setCur, ready,
    t: (k, v) => tr(lang, k, v),
    setSize: (size) => setBox((b) => { const slots = Array(size).fill(null); b.slots.filter(Boolean).slice(0, size).forEach((s, i) => (slots[i] = s)); return { ...b, size, slots }; }),
    place: (slug, at) => setBox((b) => {
      const slots = b.slots.slice(); let i = at != null && !slots[at] ? at : slots.findIndex((s) => !s);
      if (i < 0) return b; slots[i] = slug; return { ...b, slots, last: i };
    }),
    removeAt: (i) => setBox((b) => { const slots = b.slots.slice(); slots[i] = null; return { ...b, slots, last: undefined }; }),
    setRibbon: (ribbon) => setBox((b) => ({ ...b, ribbon })),
    setCard: (patch) => setBox((b) => ({ ...b, ...patch })),
    clearBox: () => setBox((b) => ({ ...b, slots: Array(b.size).fill(null), last: undefined })),
    loadBox: (nb) => setBox((b) => ({ ...b, ...nb, last: undefined })),
    surprise: () => setBox((b) => { const slots = Array(b.size).fill(null).map(() => BONBONS[Math.floor(Math.random() * BONBONS.length)].slug); return { ...b, slots, last: undefined }; }),
    addToCart: (b) => setCart((c) => [...c, { id: Date.now() + '' + Math.floor(Math.random() * 99), kind: 'box', size: b.size, items: b.slots, ribbon: b.ribbon, card: { to: b.to, from: b.from, msg: b.msg }, price: PRICE[b.size] }]),
    removeFromCart: (id) => setCart((c) => c.filter((x) => x.id !== id)),
    clearCart: () => setCart([]),
  }), [lang, box, cart, cur, ready]);
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const filled = (box) => box.slots.filter(Boolean).length;
