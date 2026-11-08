'use client';
// Build Your Box: tap or drag bonbons in; they drop with spring physics; the lid closes and the ribbon ties itself;
// a handwritten-style card is typed; the box can be shared by link. Works the same by tap on a phone.
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp, boxPrice, perPiece, fmt, encodeBox, decodeBox, filled } from '@/lib/store';
import { BONBONS, BY_SLUG, SIZES, RIBBONS, OCCASIONS, PRICE } from '@/data/bonbons';
import { L } from '@/data/i18n';
import { Orb } from './Orb';
import { buzz } from './Sections';

function useTyped(text, on, delay = 900, speed = 55) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { setN(0); return; }
    let i = 0, iv; const to = setTimeout(() => { iv = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv); }, speed); }, delay);
    return () => { clearTimeout(to); clearInterval(iv); };
  }, [text, on]);
  return text.slice(0, n);
}

export function Ribbon({ color, on }) {
  const shade = `color-mix(in srgb, ${color} 72%, #000)`;
  return (
    <svg className={'ribbon' + (on ? ' on' : '')} viewBox="0 0 100 100" aria-hidden="true">
      <rect className="rb h" x="0" y="43" width="100" height="14" fill={color} /><rect className="rb h" x="0" y="43" width="100" height="3" fill="#fff" opacity=".25" />
      <rect className="rb v" x="43" y="0" width="14" height="100" fill={color} /><rect className="rb v" x="43" y="0" width="3" height="100" fill="#fff" opacity=".25" />
      <g className="bow">
        <path d="M50 50 C30 22 8 30 14 48 C18 60 38 56 50 50Z" fill={color} stroke={shade} strokeWidth=".6" />
        <path d="M50 50 C70 22 92 30 86 48 C82 60 62 56 50 50Z" fill={color} stroke={shade} strokeWidth=".6" />
        <path d="M50 52 L34 82 L44 78 L50 88 L54 70Z" fill={shade} /><path d="M50 52 L66 82 L56 78 L50 88 L46 70Z" fill={color} stroke={shade} strokeWidth=".4" />
        <circle cx="50" cy="50" r="6" fill={color} stroke={shade} strokeWidth=".6" /><ellipse cx="48" cy="47.5" rx="2.2" ry="1.4" fill="#fff" opacity=".55" />
      </g>
    </svg>
  );
}

export function BoxStage({ size, slots, closed, ribbon, card, onSlot, dragSlot, registerEl, lang, t, tapHint }) {
  const cols = Math.sqrt(size);
  const rc = (RIBBONS.find((r) => r.id === ribbon) || RIBBONS[0]).c;
  const text = useTyped(card.msg || '', closed, 1500);
  return (
    <div className={'stage' + (closed ? ' closed' : '')} style={{ '--n': cols }}>
      <div className="tray">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
          {slots.map((s, i) => (
            <button key={i} type="button" className={'slot' + (dragSlot === i ? ' hot' : '') + (s ? ' full' : '')} data-i={i} onClick={() => onSlot(i)} aria-label={s ? BY_SLUG[s][lang].n : t('drop_here')} disabled={closed}>
              <span className="cav" />
              {s && <span className="bon" ref={(el) => registerEl(i, el)}><Orb b={BY_SLUG[s]} size={160} cup={false} style={{ width: '88%', height: '88%' }} /></span>}
            </button>
          ))}
        </div>
      </div>
      <div className="lid" aria-hidden={!closed}>
        <div className="lidface"><span className="foil">Anush</span><span className="foil small">hand-painted · Yerevan</span></div>
        <Ribbon color={rc} on={closed} />
        <div className="gcard" style={{ '--r': rc }}>
          <div className="to">{card.to ? `${card.to},` : ''}</div>
          <div className="hand">{text}<i className="caret" /></div>
          <div className="fr">{card.from ? `— ${card.from}` : ''}</div>
        </div>
      </div>
    </div>
  );
}

export function usePhysics() {
  const els = useRef({}), st = useRef({}), raf = useRef(0), last = useRef(0);
  const tick = useCallback((now) => {
    const dt = Math.min(0.032, (now - last.current) / 1000 || 0.016); last.current = now; let any = false;
    for (const k in st.current) {
      const s = st.current[k], el = els.current[k]; if (!el) continue;
      if (s.fall) {
        s.vy += 2800 * dt; s.y += s.vy * dt;
        if (s.y >= 0) {
          s.y = 0;
          if (s.vy > 300) { s.sq = Math.min(0.26, s.vy / 5200); s.sqv = 0; s.vy = -s.vy * 0.33; if (!s.hit) { s.hit = true; buzz(10); s.onLand && s.onLand(); } }
          else { s.vy = 0; s.fall = false; }
        }
      }
      s.sqv += (-260 * s.sq - 15 * s.sqv) * dt; s.sq += s.sqv * dt;
      if (!s.fall && Math.abs(s.sq) < 0.002 && Math.abs(s.sqv) < 0.01) { s.sq = 0; s.sqv = 0; el.style.transform = ''; delete st.current[k]; continue; }
      el.style.transform = `translateY(${s.y}px) scale(${1 + s.sq * 0.7},${1 - s.sq})`; any = true;
    }
    raf.current = any ? requestAnimationFrame(tick) : 0;
  }, []);
  const kick = () => { if (!raf.current) { last.current = performance.now(); raf.current = requestAnimationFrame(tick); } };
  const drop = useCallback((i, delay = 0) => {
    const go = () => {
      const el = els.current[i]; if (!el) return;
      const slot = el.parentElement, stage = slot.closest('.stage');
      const from = -(slot.offsetTop + slot.offsetHeight + 60 + (stage ? 0 : 0));
      st.current[i] = { y: from, vy: 0, sq: 0, sqv: 0, fall: true, hit: false, onLand: () => {
        const n = Math.round(Math.sqrt(Object.keys(els.current).length ? slot.parentElement.children.length : 9)); const cols = Math.sqrt(slot.parentElement.children.length);
        [i - 1, i + 1, i - cols, i + cols].forEach((j) => { if (j >= 0 && j < slot.parentElement.children.length && els.current[j] && j !== i && !(Math.abs(j - i) === 1 && Math.floor(j / cols) !== Math.floor(i / cols))) { const o = st.current[j] || (st.current[j] = { y: 0, vy: 0, sq: 0, sqv: 0, fall: false }); o.sq = Math.max(o.sq, 0.07); } });
        kick();
      } };
      els.current[i].style.transform = `translateY(${from}px)`; kick();
    };
    // hide until its turn so it does not flash in place
    const el0 = els.current[i]; if (el0) el0.style.transform = 'translateY(-2000px)';
    delay ? setTimeout(go, delay) : go();
  }, [tick]);
  const register = useCallback((i, el) => { if (el) els.current[i] = el; else delete els.current[i]; }, []);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return { drop, register };
}

export function useDropWatcher(slots, drop, gate = true) {
  const prev = useRef(slots.map(() => null));
  useEffect(() => {
    if (!gate) return;
    const fresh = []; slots.forEach((s, i) => { if (s && prev.current[i] !== s) fresh.push(i); });
    fresh.forEach((i, k) => requestAnimationFrame(() => drop(i, fresh.length > 1 ? k * 70 : 0)));
    prev.current = slots.slice();
  }, [slots, gate]);
}

export function Builder() {
  const { lang, t, box, setSize, place, removeAt, setRibbon, setCard, clearBox, surprise, addToCart, loadBox, ready } = useApp();
  const l = L(lang);
  const { drop, register } = usePhysics();
  const [closed, setClosed] = useState(false);
  const [drag, setDrag] = useState(null); const [hot, setHot] = useState(null);
  const [copied, setCopied] = useState(false); const [added, setAdded] = useState(false);
  const [link, setLink] = useState('');
  const stageRef = useRef();
  const n = filled(box), full = n === box.size;
  useDropWatcher(box.slots, drop, !closed);

  useEffect(() => {
    if (!ready) return;
    const q = new URLSearchParams(location.search); const occ = q.get('occ');
    if (occ) { const o = OCCASIONS.find((x) => x.id === occ); if (o) loadBox({ size: o.size, slots: o.items.slice(0, o.size), ribbon: o.ribbon, msg: '' }); }
  }, [ready]);

  useEffect(() => { const b = location.origin + (process.env.NEXT_PUBLIC_BASE || '') + `/${lang}/build/?` + encodeBox(box); setLink(b); }, [box, lang]);

  const price = boxPrice(box.size);
  const next = SIZES[SIZES.indexOf(box.size) + 1];
  const nudge = next ? t('nudge', { n: next - box.size, size: next, p: fmt(perPiece(box.size) - perPiece(next)) }) : t('nudge_full');

  // drag from palette
  const startDrag = (e, slug) => {
    const sx = e.clientX, sy = e.clientY; let moved = false;
    const move = (ev) => {
      if (!moved && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 9) moved = true;
      if (moved) { setDrag({ slug, x: ev.clientX, y: ev.clientY }); setHot(slotAt(ev.clientX, ev.clientY)); }
    };
    const up = (ev) => {
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
      if (moved) { const i = slotAt(ev.clientX, ev.clientY); if (i != null && !closed) place(slug, i); else if (i == null) { /* dropped outside */ } }
      else if (!closed && !full) place(slug);
      setDrag(null); setHot(null);
    };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
  };
  const slotAt = (x, y) => {
    const els = stageRef.current && stageRef.current.querySelectorAll('.slot'); if (!els) return null; let best = null, bd = 1e9;
    els.forEach((el) => { const r = el.getBoundingClientRect(); const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)); if (d < r.width * 0.75 && d < bd) { bd = d; best = +el.dataset.i; } });
    if (best != null && box.slots[best]) { // prefer an empty slot if aimed at a full one
      let alt = null, ad = 1e9; els.forEach((el) => { const i = +el.dataset.i; if (box.slots[i]) return; const r = el.getBoundingClientRect(); const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2)); if (d < ad) { ad = d; alt = i; } }); return alt != null && ad < 220 ? alt : null;
    }
    return best;
  };

  const doClose = () => { if (!full) return; buzz(24); setClosed(true); stageRef.current && stageRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' }); };
  const doOpen = () => { buzz(10); setClosed(false); };
  const doCopy = async () => {
    try { await navigator.clipboard.writeText(link); } catch (e) { const ta = document.createElement('textarea'); ta.value = link; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e2) {} ta.remove(); }
    setCopied(true); buzz(); setTimeout(() => setCopied(false), 1800);
  };
  const doShare = async () => { if (navigator.share) { try { await navigator.share({ title: 'Anush', text: t('gift_view_h'), url: link }); return; } catch (e) {} } doCopy(); };
  const add = () => { addToCart(box); setAdded(true); buzz(20); setTimeout(() => setAdded(false), 2500); };

  return (
    <div className="builder">
      <div className="b-left" ref={stageRef}>
        <BoxStage size={box.size} slots={box.slots} closed={closed} ribbon={box.ribbon} card={box} lang={lang} t={t} dragSlot={hot} registerEl={register}
          onSlot={(i) => { if (box.slots[i]) { removeAt(i); buzz(8); } }} />
        <p className="hint">{box.slots.some(Boolean) ? t('undo') : t('tip')}</p>
      </div>
      <div className="b-right">
        <div className="pricebar">
          <div><div className="kick">{t('your_box')}</div><div className="price display" aria-live="polite">{fmt(price)}</div><div className="sm">{fmt(perPiece(box.size))} {t('per')} · <span className="sample">{t('sample')}</span></div></div>
          <div className="count" aria-live="polite"><b>{n}</b>/{box.size}</div>
        </div>
        <div className="sizes" role="radiogroup" aria-label={t('size')}>
          {SIZES.map((s) => <button key={s} role="radio" aria-checked={s === box.size} className={s === box.size ? 'on' : ''} onClick={() => { setSize(s); setClosed(false); buzz(8); }}><b>{s}</b><span>{fmt(PRICE[s])}</span></button>)}
        </div>
        <div className="nudge">{nudge}</div>
        <div className="kick" style={{ margin: '18px 0 8px' }}>{t('ribbon')}</div>
        <div className="ribbons">{RIBBONS.map((r) => <button key={r.id} aria-label={r.n[l]} aria-pressed={box.ribbon === r.id} style={{ '--c': r.c }} onClick={() => { setRibbon(r.id); buzz(8); }} />)}</div>
        <div className="kick" style={{ margin: '18px 0 8px' }}>{t('card_k')}</div>
        <div className="two"><input aria-label={t('card_to')} placeholder={t('card_to')} value={box.to} maxLength={30} onChange={(e) => setCard({ to: e.target.value })} /><input aria-label={t('card_from')} placeholder={t('card_from')} value={box.from} maxLength={30} onChange={(e) => setCard({ from: e.target.value })} /></div>
        <textarea aria-label={t('card_msg')} placeholder={t('card_ph')} rows={3} maxLength={120} value={box.msg} onChange={(e) => setCard({ msg: e.target.value })} />
        <div className="row" style={{ marginTop: 14 }}>
          {!closed ? <button className="cta" onClick={doClose} disabled={!full}>{full ? t('close_box') : t('box_left', { n: box.size - n })}</button> : <button className="cta" onClick={doOpen}>{t('open_box')}</button>}
          <button className="ghost" onClick={() => { setClosed(false); surprise(); }}>{t('random')}</button>
          <button className="ghost" onClick={() => { setClosed(false); clearBox(); }}>{t('clear')}</button>
        </div>
        {full && <div className="share card">
          <div className="row"><button className="cta" onClick={add}>{added ? '✓ ' : ''}{t('add_cart')} · {fmt(price)}</button>{added && <Link className="ghost" href={`/${lang}/cart/`}>{t('nav_cart')} →</Link>}</div>
          <div className="kick" style={{ marginTop: 16 }}>{t('share')}</div>
          <div className="linkrow"><input readOnly aria-label={t('share')} value={link} onFocus={(e) => e.target.select()} /><button className="ghost" onClick={doShare}>{copied ? t('copied') : t('copy')}</button></div>
          <div className="sm">{t('share_note')}</div>
        </div>}
      </div>
      <div className="palette" role="list" aria-label={t('col_k')}>
        {BONBONS.map((b) => (
          <button key={b.slug} role="listitem" className="pal" onPointerDown={(e) => startDrag(e, b.slug)} aria-label={`${b[lang].n}: ${t('col_add')}`} disabled={closed}>
            <Orb b={b} size={72} cup={false} /><span>{b[lang].n}</span>
          </button>
        ))}
      </div>
      {drag && <div className="ghostbon" style={{ left: drag.x, top: drag.y }}><Orb b={BY_SLUG[drag.slug]} size={92} cup={false} /></div>}
    </div>
  );
}

// Recipient view: "I made this box for you". The box arrives closed, then opens and the bonbons drop in.
export function GiftView({ data }) {
  const { lang, t } = useApp();
  const { drop, register } = usePhysics();
  const [closed, setClosed] = useState(true); const [vis, setVis] = useState(data.slots.map(() => null));
  useDropWatcher(vis, drop, true);
  const open = () => {
    buzz(20); setClosed(false);
    data.slots.forEach((s, i) => setTimeout(() => { setVis((v) => { const nv = v.slice(); nv[i] = s; return nv; }); }, 700 + i * 150));
  };
  return (
    <div className="giftview">
      <div className="b-left">
        <BoxStage size={data.size} slots={vis} closed={closed} ribbon={data.ribbon} card={data} lang={lang} t={t} registerEl={register} onSlot={() => {}} />
      </div>
      <div className="b-right">
        <div className="kick">{t('gift_view_k')}</div>
        <h1 className="display" dangerouslySetInnerHTML={{ __html: t('gift_view_h') }} />
        {data.from && <p className="lead">{t('gift_from', { name: data.from })}</p>}
        <p className="lead" style={{ marginTop: 10 }}>{t('gift_view_p')}</p>
        <div className="row" style={{ marginTop: 26 }}>
          {closed ? <button className="cta" onClick={open}>{t('open_box')}</button> : <Link className="cta" href={`/${lang}/build/`}>{t('gift_view_cta')} →</Link>}
        </div>
      </div>
    </div>
  );
}

export function BuildPage() {
  const { t } = useApp();
  const [gift, setGift] = useState(null); const [ready, setReady] = useState(false);
  useEffect(() => { const q = location.search; if (q.includes('s=') && q.includes('i=')) { const d = decodeBox(q); if (d && d.slots.some(Boolean)) setGift(d); } setReady(true); }, []);
  if (!ready) return <div className="builder" style={{ minHeight: '60vh' }} />;
  return gift ? <GiftView data={gift} /> : (
    <>
      <div className="wrap" style={{ marginBottom: 18 }}><div className="kick">{t('build_k')}</div><h1 className="display" style={{ fontSize: 'clamp(34px,5vw,72px)' }} dangerouslySetInnerHTML={{ __html: t('build_h') }} /></div>
      <Builder />
    </>
  );
}
