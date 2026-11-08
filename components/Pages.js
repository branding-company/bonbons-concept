'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp, fmt, filled, perPiece } from '@/lib/store';
import { BONBONS, BY_SLUG, ING, ALLERGEN, DRINK, PRICE, SIZES, RIBBONS, FX, SAMPLE_SESSIONS } from '@/data/bonbons';
import { L } from '@/data/i18n';
import { Orb } from './Orb';
import { Ribbon } from './Builder';
import { buzz } from './Sections';

const Head = ({ k, h, p }) => { const { t } = useApp(); return (<div style={{ marginBottom: 28 }}><div className="kick">{t(k)}</div><h1 className="display" dangerouslySetInnerHTML={{ __html: t(h) }} />{p && <p className="lead">{t(p)}</p>}</div>); };
const Field = ({ label, children }) => (<label className="fld"><span>{label}</span>{children}</label>);
function save(key, rec) { try { const a = JSON.parse(localStorage.getItem(key) || '[]'); a.push({ ...rec, at: new Date().toISOString() }); localStorage.setItem(key, JSON.stringify(a)); } catch (e) {} }

/* ---------- collection grid + product ---------- */
export function CollectionGrid() {
  const { t, lang, place } = useApp();
  return (
    <div className="wrap"><Head k="col_k" h="col_h" p="col_p" />
      <div className="cgrid">{BONBONS.map((b, i) => (
        <Link key={b.slug} href={`/${lang}/collection/${b.slug}/`} className="cg" style={{ '--c': b.c }}>
          <Orb b={b} size={120} /><h3>{b[lang].n}</h3><p>{b[lang].f}</p>
        </Link>))}
      </div>
    </div>
  );
}

export function ProductDetail({ slug }) {
  const { t, lang, place } = useApp(); const l = L(lang);
  const b = BY_SLUG[slug]; const d = b[lang];
  const [cut, setCut] = useState(100); const [ok, setOk] = useState(false); const raf = useRef();
  const animate = (to) => { cancelAnimationFrame(raf.current); const from = cut, t0 = performance.now(); const step = (n) => { const k = Math.min(1, (n - t0) / 900); const e = k * k * (3 - 2 * k); setCut(from + (to - from) * e); if (k < 1) raf.current = requestAnimationFrame(step); }; raf.current = requestAnimationFrame(step); };
  useEffect(() => { const to = setTimeout(() => animate(0), 900); return () => { clearTimeout(to); cancelAnimationFrame(raf.current); }; }, [slug]);
  const rel = BONBONS.filter((x) => x.slug !== slug).sort((x, y) => (y.tags.fruity * b.tags.fruity + y.tags.nutty * b.tags.nutty + y.tags.floral * b.tags.floral) - (x.tags.fruity * b.tags.fruity + x.tags.nutty * b.tags.nutty + x.tags.floral * b.tags.floral)).slice(0, 4);
  return (
    <div className="wrap pd" style={{ '--c': b.c }}>
      <Link className="back" href={`/${lang}/collection/`}>← {t('pd_back')}</Link>
      <div className="pdgrid">
        <div className="pdvis">
          <div className="halo" />
          <div className="knife-wrap">
            <Orb b={b} size={420} className="o1" />
            <div className="o2" style={{ clipPath: `inset(0 0 0 ${cut}%)` }}><Orb b={b} size={420} cut /></div>
            <i className="knife" style={{ left: `${cut}%`, opacity: cut > 0 && cut < 100 ? 1 : 0 }} />
          </div>
          <div className="row" style={{ justifyContent: 'center', marginTop: 10 }}>
            <input type="range" min="0" max="100" value={cut} aria-label={t('pd_cut')} onChange={(e) => setCut(+e.target.value)} style={{ maxWidth: 260 }} />
            <button className="ghost" onClick={() => animate(cut > 50 ? 0 : 100)}>{t('pd_cut')}</button>
          </div>
        </div>
        <div>
          <div className="kick">{String(b.i + 1).padStart(2, '0')} / 16</div>
          <h1 className="display">{d.n}</h1>
          <p className="lead" style={{ margin: '10px 0 20px' }}>“{d.s}”</p>
          <dl className="spec">
            <dt>{t('pd_filling')}</dt><dd>{d.f}</dd>
            <dt>{t('pd_notes')}</dt><dd>{d.t}</dd>
            <dt>{t('pd_ing')}</dt><dd>{b.ing.map((k) => ING[k][l]).join(', ')}</dd>
            <dt>{t('pd_all')}</dt><dd>{b.all.map((k) => ALLERGEN[k][l]).join(', ')}{b.all.includes('alcohol') && <><br /><b>{t('pd_alc')}</b></>}</dd>
            <dt>{t('pd_bb')}</dt><dd>{t('pd_bb_v')}</dd>
            <dt>{t('pd_pair')}</dt><dd>{DRINK[b.best][l]}</dd>
            <dt>{t('price')}</dt><dd>{fmt(PRICE[4] / 4)} <span className="sample">{t('sample')}</span></dd>
          </dl>
          <div className="row" style={{ marginTop: 22 }}>
            <button className="cta" onClick={() => { place(b.slug); buzz(); setOk(true); setTimeout(() => setOk(false), 1500); }}>{ok ? '✓' : t('pd_add')}</button>
            <Link className="ghost" href={`/${lang}/build/`}>{t('nav_build')} →</Link>
          </div>
        </div>
      </div>
      <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,52px)', margin: '60px 0 18px' }}>{t('pd_more')}</h2>
      <div className="cgrid">{rel.map((x) => <Link key={x.slug} href={`/${lang}/collection/${x.slug}/`} className="cg" style={{ '--c': x.c }}><Orb b={x} size={96} /><h3>{x[lang].n}</h3></Link>)}</div>
    </div>
  );
}

/* ---------- flavour finder ---------- */
const QS = [
  { k: 'q1', a: [{ fruity: 3 }, { intense: 1, nutty: 2 }, { floral: 3 }] },
  { k: 'q2', a: [{ nutty: 3 }, { fruity: 1, floral: 1 }, { nutty: 1, fruity: 1 }] },
  { k: 'q3', a: [{ boozy: 4, intense: 1 }, { boozy: 1 }, { noAlc: 1 }] },
  { k: 'q4', a: [{ fruity: 3 }, { floral: 3 }, { nutty: 3 }] },
  { k: 'q5', a: [{ intense: 3 }, { nutty: 1, fruity: 1 }, { floral: 1, fruity: 1 }] },
];
export function Finder() {
  const { t, lang, loadBox } = useApp(); const router = useRouter();
  const [step, setStep] = useState(0); const [ans, setAns] = useState([]);
  const res = useMemo(() => {
    if (ans.length < QS.length) return null;
    const w = {}; let noAlc = false; ans.forEach((ai, qi) => { const o = QS[qi].a[ai]; for (const k in o) { if (k === 'noAlc') noAlc = true; else w[k] = (w[k] || 0) + o[k]; } });
    const sc = BONBONS.filter((b) => !(noAlc && b.all.includes('alcohol'))).map((b) => ({ b, s: Object.keys(b.tags).reduce((a, k) => a + (w[k] || 0) * b.tags[k], 0) + (b.tags.intense ? 0 : 0.01) })).sort((x, y) => y.s - x.s);
    const top = sc.slice(0, 9), max = top[0].s || 1;
    return top.map((x) => ({ b: x.b, pct: Math.max(40, Math.round((x.s / max) * 100)) }));
  }, [ans]);
  const pick = (i) => { buzz(10); const a = [...ans, i]; setAns(a); setStep(step + 1); };
  const q = QS[step];
  return (
    <div className="wrap" style={{ maxWidth: 900 }}>
      <Head k="finder_k" h="finder_h" p="finder_p" />
      {!res ? (
        <div className="card quiz" key={step}>
          <div className="kick">{t('finder_q', { i: step + 1, n: QS.length })}</div>
          <div className="qbar"><i style={{ width: `${(step / QS.length) * 100}%` }} /></div>
          <h2 className="display" style={{ fontSize: 'clamp(30px,4.4vw,54px)', margin: '16px 0 22px' }}>{t(q.k)}</h2>
          <div className="qa">{[0, 1, 2].map((i) => <button key={i} onClick={() => pick(i)}><b>{'ABC'[i]}</b>{t(q.k + 'abc'[i])}</button>)}</div>
        </div>
      ) : (
        <div className="card">
          <div className="kick">{t('finder_res')}</div><p className="lead" style={{ margin: '8px 0 20px' }}>{t('finder_res_p')}</p>
          <div className="rgrid">{res.map(({ b, pct }, i) => (<Link key={b.slug} href={`/${lang}/collection/${b.slug}/`} className="rc" style={{ '--c': b.c, animationDelay: i * 70 + 'ms' }}><Orb b={b} size={86} cup={false} /><b>{b[lang].n}</b><span>{pct}% {t('finder_match')}</span></Link>))}</div>
          <div className="row" style={{ marginTop: 22 }}>
            <button className="cta" onClick={() => { loadBox({ size: 9, slots: res.map((r) => r.b.slug), ribbon: 'pom' }); router.push(`/${lang}/build/`); }}>{t('finder_add')} →</button>
            <button className="ghost" onClick={() => { setStep(0); setAns([]); }}>{t('finder_again')}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- gifting ---------- */
const todayPlus = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const FEE = 1500, FREE_OVER = 15000;
export function Gifting() {
  const { t, lang, box, cur, setCur } = useApp(); const l = L(lang);
  const [tab, setTab] = useState('yer'); const [size, setSize] = useState(9); const [saved, setSaved] = useState(null);
  const [f, setF] = useState({ date: todayPlus(1), slot: 0, rec: '', phone: '', addr: '', msg: '', surprise: false, sender: '', country: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const base = filled(box) === box.size && box.size ? box.size : size; const price = PRICE[base]; const fee = tab === 'yer' ? (price >= FREE_OVER ? 0 : FEE) : 2500;
  const total = price + fee;
  const submit = (e) => { e.preventDefault(); const rec = { tab, size: base, ...f, total }; save('anush-demo-gifts', rec); setSaved(rec); buzz(20); };
  return (
    <div className="wrap" style={{ maxWidth: 1000 }}>
      <Head k="del_k" h="del_h" p="del_p" />
      <div className="tabs" role="tablist">{[['yer', 'del_tab_yer'], ['dia', 'del_tab_dia']].map(([k, tk]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{t(tk)}</button>)}</div>
      <div className="two-col">
        <form className="card form" onSubmit={submit}>
          {filled(box) === box.size && box.size ? <p className="note">{t('your_box')}: {box.size} {t('pieces')} · {fmt(PRICE[box.size])}</p> : (
            <Field label={t('del_box')}><select value={size} onChange={(e) => setSize(+e.target.value)}>{SIZES.map((s) => <option key={s} value={s}>{s} {t('pieces')} · {fmt(PRICE[s])}</option>)}</select></Field>)}
          <div className="two"><Field label={t('del_date')}><input type="date" required min={todayPlus(0)} value={f.date} onChange={set('date')} /></Field>
            <Field label={t('del_slot')}><select value={f.slot} onChange={set('slot')}>{[1, 2, 3, 4].map((n, i) => <option key={n} value={i}>{t('del_s' + n)}</option>)}</select></Field></div>
          {tab === 'dia' && <div className="two"><Field label={t('del_sender')}><input required value={f.sender} onChange={set('sender')} /></Field><Field label={t('del_country')}><input required placeholder="USA, France, Russia…" value={f.country} onChange={set('country')} /></Field></div>}
          <div className="two"><Field label={t('del_rec')}><input required value={f.rec} onChange={set('rec')} /></Field><Field label={t('del_phone')}><input required type="tel" value={f.phone} onChange={set('phone')} /></Field></div>
          <Field label={t('del_addr')}><input required placeholder="Tumanyan 12, Yerevan" value={f.addr} onChange={set('addr')} /></Field>
          <Field label={t('del_msg')}><textarea rows={3} maxLength={140} value={f.msg} onChange={set('msg')} placeholder={t('card_ph')} /></Field>
          <label className="chk"><input type="checkbox" checked={f.surprise} onChange={set('surprise')} /><span><b>{t('del_surprise')}</b><br /><small>{t('del_surprise_p')}</small></span></label>
          <button className="cta" type="submit">{t('del_submit')}</button>
          <p className="sm">{t('del_note')}</p>
        </form>
        <aside className="card sum">
          <div className="kick">{t('total')}</div>
          <div className="price display">{fmt(total, tab === 'dia' ? cur : 'AMD')}</div>
          {tab === 'dia' && <div className="curs" role="group" aria-label={t('del_cur')}>{['AMD', 'USD', 'EUR', 'RUB'].map((c) => <button key={c} aria-pressed={cur === c} onClick={() => setCur(c)}>{c}</button>)}</div>}
          <ul className="lines"><li><span>{base} {t('pieces')}</span><b>{fmt(price, tab === 'dia' ? cur : 'AMD')}</b></li><li><span>{t('del_fee')}</span><b>{fee ? fmt(fee, tab === 'dia' ? cur : 'AMD') : '0'}</b></li></ul>
          <p className="sm">{t('del_free', { n: fmt(FREE_OVER) })} · {t('sample')}</p>
          {tab === 'dia' && <ul className="fx">{['USD', 'EUR', 'RUB'].map((c) => <li key={c}><span>{c}</span><b>{fmt(total, c)}</b></li>)}<li><span>AMD</span><b>{fmt(total)}</b></li></ul>}
          {saved && <div className="note ok" role="status">✓ {t('del_saved')}</div>}
        </aside>
      </div>
    </div>
  );
}

/* ---------- corporate ---------- */
const TIERS = [[20, 0], [50, 6], [100, 10], [250, 15]];
export function Corporate() {
  const { t, lang } = useApp();
  const [name, setName] = useState('Your Company'); const [logo, setLogo] = useState(null); const [where, setWhere] = useState('lid');
  const [size, setSize] = useState(9); const [qty, setQty] = useState(50); const [sent, setSent] = useState(false);
  const [f, setF] = useState({ contact: '', email: '', phone: '', note: '' });
  const disc = [...TIERS].reverse().find(([q]) => qty >= q)?.[1] ?? 0;
  const unit = Math.round(PRICE[size] * (1 - disc / 100)) + (where !== 'bon' ? 600 : 0) + (where !== 'lid' ? size * 120 : 0);
  const total = unit * qty;
  const up = (e) => { const file = e.target.files && e.target.files[0]; if (file) { const r = new FileReader(); r.onload = () => setLogo(r.result); r.readAsDataURL(file); } };
  const submit = (e) => { e.preventDefault(); save('anush-demo-quotes', { name, where, size, qty, unit, total, ...f }); setSent(true); buzz(20); };
  const rc = RIBBONS[1].c;
  const mark = logo ? <img src={logo} alt="" /> : <span>{name || '·'}</span>;
  return (
    <div className="wrap" style={{ maxWidth: 1100 }}>
      <Head k="corp_k" h="corp_h" p="corp_p" />
      <div className="two-col">
        <div>
          <div className="stage closed corp" style={{ '--n': 3 }}>
            <div className="tray" />
            <div className="lid" style={{ transitionDelay: '0s' }}>
              <div className="lidface"><span className="foil">Anush</span><span className="foil small">hand-painted · Yerevan</span></div>
              <Ribbon color={rc} on />
              {where !== 'bon' && <div className="logoplate foilmark">{mark}</div>}
            </div>
          </div>
          {where !== 'lid' && <div className="bonrow">{BONBONS.slice(0, 5).map((b) => <div key={b.slug} className="bl"><Orb b={b} size={90} cup={false} /><i>{logo ? <img src={logo} alt="" /> : name.slice(0, 2)}</i></div>)}</div>}
        </div>
        <form className="card form" onSubmit={submit}>
          <Field label={t('corp_name')}><input value={name} maxLength={28} onChange={(e) => setName(e.target.value)} /></Field>
          <div className="row"><label className="ghost fileb">{t('corp_upload')}<input type="file" accept="image/*" onChange={up} hidden /></label>{logo && <button type="button" className="ghost" onClick={() => setLogo(null)}>×</button>}</div>
          <div className="kick">{t('corp_where')}</div>
          <div className="seg" role="radiogroup">{[['lid', 'corp_lid'], ['bon', 'corp_bon'], ['both', 'corp_both']].map(([k, tk]) => <button type="button" role="radio" aria-checked={where === k} key={k} onClick={() => setWhere(k)}>{t(tk)}</button>)}</div>
          <div className="two"><Field label={t('corp_size')}><select value={size} onChange={(e) => setSize(+e.target.value)}>{SIZES.map((s) => <option key={s} value={s}>{s} {t('pieces')}</option>)}</select></Field>
            <Field label={t('corp_qty')}><input type="number" min="20" max="5000" value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 0))} /></Field></div>
          <div className="tiers2">{TIERS.map(([q, d]) => <div key={q} className={disc === d && qty >= q ? 'on' : ''}><b>{t('corp_min', { n: q })}</b><span>{d ? t('corp_disc', { n: d }) : '—'}</span></div>)}</div>
          <div className="sumrow"><span>{t('corp_tier')}</span><b>{fmt(unit)} {t('corp_unit')}</b></div>
          <div className="sumrow big"><span>{t('corp_total')}</span><b className="display">{fmt(total)}</b></div>
          <p className="sm">{t('corp_deadline')} · {t('sample')}</p>
          <div className="two"><Field label={t('corp_contact')}><input required value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} /></Field><Field label={t('corp_phone')}><input required type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field></div>
          <Field label={t('corp_email')}><input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
          <Field label={t('corp_note')}><textarea rows={2} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} style={{ fontFamily: 'var(--body)', fontSize: 15 }} /></Field>
          <button className="cta" type="submit">{t('corp_quote')}</button>
          {sent && <div className="note ok" role="status">✓ {t('corp_sent')}</div>}
        </form>
      </div>
    </div>
  );
}

/* ---------- workshops ---------- */
const PRICE_WS = 14000;
export function Workshops() {
  const { t, lang } = useApp();
  const [m, setM] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [sel, setSel] = useState(null); const [slot, setSlot] = useState(null); const [f, setF] = useState({ name: '', email: '', guests: 2 }); const [ok, setOk] = useState(false);
  const loc = lang === 'ru' ? 'ru-RU' : lang === 'hy' ? 'hy-AM' : 'en-GB';
  const days = useMemo(() => { const first = (m.getDay() + 6) % 7, n = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate(); return [...Array(first).fill(null), ...Array.from({ length: n }, (_, i) => new Date(m.getFullYear(), m.getMonth(), i + 1))]; }, [m]);
  const sess = (d) => { if (!d) return null; const today = new Date(); today.setHours(0, 0, 0, 0); if (d <= today) return null; return SAMPLE_SESSIONS.find((s) => s.dow === d.getDay()) || null; };
  const seatsLeft = (d, sl) => { const s = sess(d); if (!s) return 0; const seed = (d.getDate() * 7 + sl.charCodeAt(0)) % 5; return Math.max(0, s.seats - seed - 1); };
  const wd = [...Array(7)].map((_, i) => new Date(2024, 0, 1 + i).toLocaleDateString(loc, { weekday: 'short' }));
  const s = sel && sess(sel);
  return (
    <div className="wrap" style={{ maxWidth: 1000 }}>
      <Head k="ws_k" h="ws_h" p="ws_p" />
      <div className="two-col">
        <div className="card cal">
          <div className="calhead"><button aria-label="‹" onClick={() => setM(new Date(m.getFullYear(), m.getMonth() - 1, 1))}>‹</button><b className="display">{m.toLocaleDateString(loc, { month: 'long', year: 'numeric' })}</b><button aria-label="›" onClick={() => setM(new Date(m.getFullYear(), m.getMonth() + 1, 1))}>›</button></div>
          <div className="calgrid">{wd.map((w) => <i key={w} className="wd">{w}</i>)}{days.map((d, i) => { const ss = sess(d); return d ? <button key={i} disabled={!ss} className={(sel && d.getTime() === sel.getTime() ? 'on ' : '') + (ss ? 'has' : '')} onClick={() => { setSel(d); setSlot(null); setOk(false); buzz(8); }}>{d.getDate()}</button> : <span key={i} />; })}</div>
          <p className="sm" style={{ marginTop: 12 }}>{t('ws_sample')} · {PRICE_WS.toLocaleString('en-US')} AMD {t('ws_price')}</p>
        </div>
        <div className="card form">
          {!sel ? <p className="lead">{t('ws_pick')}</p> : !s ? <p>{t('ws_none')}</p> : (
            <>
              <div className="kick">{sel.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' })}</div>
              <div className="slots">{s.slots.map((sl) => { const left = seatsLeft(sel, sl); return <button key={sl} type="button" disabled={!left} aria-pressed={slot === sl} onClick={() => setSlot(sl)}><b>{sl}</b><span>{left ? t('ws_seats', { n: left }) : t('ws_full')}</span></button>; })}</div>
              {slot && (
                <form onSubmit={(e) => { e.preventDefault(); save('anush-demo-workshops', { date: sel.toISOString().slice(0, 10), slot, ...f }); setOk(true); buzz(20); }} className="form" style={{ marginTop: 14 }}>
                  <Field label={t('ws_name')}><input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
                  <div className="two"><Field label={t('ws_email')}><input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field><Field label={t('ws_guests')}><input type="number" min="1" max="8" value={f.guests} onChange={(e) => setF({ ...f, guests: +e.target.value })} /></Field></div>
                  <div className="sumrow big"><span>{t('total')}</span><b className="display">{fmt(PRICE_WS * f.guests)}</b></div>
                  <button className="cta" type="submit">{t('ws_book')}</button>
                  {ok && <div className="note ok" role="status">✓ {t('ws_ok')}</div>}
                </form>)}
            </>)}
        </div>
      </div>
    </div>
  );
}

/* ---------- pairing ---------- */
export function Pairing() {
  const { t, lang } = useApp(); const l = L(lang);
  const [cat, setCat] = useState('brandy');
  const drinks = Object.entries(DRINK).filter(([, v]) => v[3] === cat);
  const [dk, setDk] = useState(null);
  const list = BONBONS.map((b) => ({ b, s: b.pair[cat] + (dk && b.best === dk ? 1 : 0) })).sort((x, y) => y.s - x.s);
  return (
    <div className="wrap" style={{ maxWidth: 1000 }}>
      <Head k="pair_k" h="pair_h" p="pair_p" />
      <div className="tabs" role="tablist">{['brandy', 'wine', 'coffee', 'tea'].map((c) => <button key={c} role="tab" aria-selected={cat === c} onClick={() => { setCat(c); setDk(null); }}>{t(c)}</button>)}</div>
      <div className="chipsrow">{drinks.map(([k, v]) => <button key={k} aria-pressed={dk === k} onClick={() => setDk(dk === k ? null : k)}>{v[l]}</button>)}</div>
      <div className="plist">{list.map(({ b, s }) => (
        <Link key={b.slug} href={`/${lang}/collection/${b.slug}/`} className={'pl s' + Math.min(2, b.pair[cat])} style={{ '--c': b.c, opacity: b.pair[cat] ? 1 : 0.45 }}>
          <Orb b={b} size={64} cup={false} /><div><b>{b[lang].n}</b><small>{t('pair_best')} {DRINK[b.best][l]}</small></div>
          <span className="dots" aria-label={`${b.pair[cat]}/2`}>{[0, 1].map((i) => <i key={i} className={i < b.pair[cat] ? 'on' : ''} />)}</span>
        </Link>))}
      </div>
    </div>
  );
}

/* ---------- cart + demo checkout ---------- */
export function Cart() {
  const { t, lang, cart, removeFromCart, clearCart } = useApp(); const l = L(lang);
  const [done, setDone] = useState(null); const [f, setF] = useState({ name: '', email: '', phone: '', addr: '' });
  const sub = cart.reduce((a, c) => a + c.price, 0); const fee = !sub ? 0 : sub >= FREE_OVER ? 0 : FEE;
  const order = (e) => { e.preventDefault(); const n = 'AN-' + Math.floor(10000 + Math.random() * 89999); save('anush-demo-orders', { n, items: cart, total: sub + fee, ...f }); clearCart(); setDone(n); buzz(30); };
  return (
    <div className="wrap" style={{ maxWidth: 1000 }}>
      <Head k="cart_k" h="cart_k" />
      <div className="demo" role="note">{t('cart_demo')}</div>
      {done ? <div className="card"><h2 className="display" style={{ fontSize: 44 }}>{t('cart_done')}</h2><p className="lead" style={{ marginTop: 10 }}>{t('cart_done_p', { n: done })}</p><div className="row" style={{ marginTop: 18 }}><Link className="cta" href={`/${lang}/`}>Anush →</Link></div></div> : !cart.length ? (
        <div className="card"><p className="lead">{t('cart_empty')}</p><div className="row" style={{ marginTop: 16 }}><Link className="cta" href={`/${lang}/build/`}>{t('cart_go')} →</Link></div></div>
      ) : (
        <div className="two-col">
          <div className="cartlist">{cart.map((c) => (
            <div className="card ci" key={c.id}>
              <div className="mini">{c.items.slice(0, 9).map((s, i) => s ? <Orb key={i} b={BY_SLUG[s]} size={44} cup={false} /> : <span key={i} />)}</div>
              <div style={{ flex: 1 }}>
                <b className="display" style={{ fontSize: 24 }}>{c.size} {t('pieces')}</b>
                <div className="sm">{t('cart_ribbon', { r: (RIBBONS.find((r) => r.id === c.ribbon) || RIBBONS[0]).n[l] })}{c.card.msg ? ' · ' + t('cart_card', { c: c.card.msg.slice(0, 40) }) : ''}</div>
                <div className="row" style={{ marginTop: 8 }}><button className="ghost" onClick={() => removeFromCart(c.id)}>{t('cart_remove')}</button></div>
              </div>
              <b>{fmt(c.price)}</b>
            </div>))}
          </div>
          <form className="card form" onSubmit={order}>
            <ul className="lines"><li><span>{t('cart_sub')}</span><b>{fmt(sub)}</b></li><li><span>{t('cart_deliv')}</span><b>{fee ? fmt(fee) : '0'}</b></li><li className="big"><span>{t('total')}</span><b className="display">{fmt(sub + fee)}</b></li></ul>
            <div className="kick">{t('cart_checkout')}</div>
            <Field label={t('cart_name')}><input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
            <div className="two"><Field label={t('cart_email')}><input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field><Field label={t('cart_phone')}><input required type="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></Field></div>
            <Field label={t('cart_addr')}><input required value={f.addr} onChange={(e) => setF({ ...f, addr: e.target.value })} /></Field>
            <p className="note">{t('cart_demo')}</p>
            <button className="cta" type="submit">{t('cart_pay')}</button>
          </form>
        </div>)}
    </div>
  );
}
