'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { BONBONS, OCCASIONS, BY_SLUG } from '@/data/bonbons';
import { L } from '@/data/i18n';
import { Orb } from './Orb';

export function buzz(ms = 12) { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} }

export function BonbonCard({ b, i }) {
  const { t, lang, place } = useApp();
  const [cut, setCut] = useState(false); const [ok, setOk] = useState(false);
  const d = b[lang];
  return (
    <article className="bcard" style={{ '--c': b.c }}>
      <span className="num">{String(i + 1).padStart(2, '0')}</span>
      <button className="cutbtn" onClick={() => setCut(!cut)} aria-pressed={cut}>{cut ? t('col_whole') : t('col_cut')}</button>
      <div className="orbwrap"><Orb b={b} size={190} cut={cut} className="orbsvg" /></div>
      <h3>{d.n}</h3>
      <p>{d.f}</p>
      <div className="acts">
        <button className="mini" onClick={() => { place(b.slug); buzz(); setOk(true); setTimeout(() => setOk(false), 1100); }}>{ok ? '✓' : t('col_add')}</button>
        <Link className="mini o" href={`/${lang}/collection/${b.slug}/`}>{t('col_view')}</Link>
      </div>
    </article>
  );
}

export function Collection({ all = false }) {
  const { t, lang } = useApp();
  return (
    <section className="sec" id="collection" data-tint="#fff1de" style={{ paddingBottom: 30 }}>
      <div className="wrap col-head">
        <div><div className="kick">{t('col_k')}</div><h2 className="display" dangerouslySetInnerHTML={{ __html: t('col_h') }} /><p className="lead">{t('col_p')}</p></div>
        {!all && <Link className="ghost" href={`/${lang}/collection/`}>{t('col_all')}</Link>}
      </div>
      <div className="scroller" tabIndex={0} aria-label={t('col_k')}>{BONBONS.map((b, i) => <BonbonCard key={b.slug} b={b} i={i} />)}</div>
    </section>
  );
}

export function BuildTeaser() {
  const { t, lang } = useApp();
  const pick = ['apricot-thyme', 'pomegranate-ganache', 'pistachio', 'rose-petal-jam', 'honey-walnut', 'mulberry', 'tarragon-lime', 'gata-caramel', 'dark-70'].map((s) => BY_SLUG[s]);
  return (
    <section className="sec" id="build" data-tint="#f9d3d8">
      <div className="wrap teaser">
        <div>
          <div className="kick">{t('build_k')}</div>
          <h2 className="display" dangerouslySetInnerHTML={{ __html: t('build_h') }} />
          <p className="lead" style={{ marginBottom: 28 }}>{t('build_p')}</p>
          <Link className="cta" href={`/${lang}/build/`}>{t('build_cta')} →</Link>
        </div>
        <div className="mock" aria-hidden="true">
          <div style={{ position: 'absolute', inset: '4%', borderRadius: 36, background: '#3a1c10', boxShadow: '0 40px 70px -30px rgba(42,20,12,.8)', transform: 'rotate(-4deg)' }} />
          <div style={{ position: 'absolute', inset: '9%', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '4%', transform: 'rotate(-4deg)' }}>
            {pick.map((b, i) => <div key={i} style={{ display: 'grid', placeItems: 'center', animation: `bob 3.${i}s ease-in-out ${i * 0.2}s infinite alternate` }}><Orb b={b} size={110} /></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Occasions() {
  const { t, lang } = useApp(); const l = L(lang);
  return (
    <section className="sec" id="occasions" data-tint="#fff1de">
      <div className="wrap">
        <div className="kick">{t('occ_k')}</div><h2 className="display" dangerouslySetInnerHTML={{ __html: t('occ_h') }} /><p className="lead">{t('occ_p')}</p>
        <div className="occ">
          {OCCASIONS.map((o) => (
            <div className="oc" key={o.id} style={{ '--c': o.c }}>
              <h3>{o[lang][0]}</h3><p>{o[lang][1]}</p>
              <div className="dots">{[...new Set(o.items)].slice(0, 5).map((s) => <Orb key={s} b={BY_SLUG[s]} size={64} cup={false} />)}</div>
              <Link className="cta" href={`/${lang}/build/?occ=${o.id}`}>{t('occ_load')} →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useApp(); const items = t('faq');
  return (
    <section className="sec faq" id="faq" data-tint="#fbf0e1">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div className="kick">{t('faq_k')}</div><h2 className="display" dangerouslySetInnerHTML={{ __html: t('faq_h') }} />
        {items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </div>
    </section>
  );
}

export function Teasers() {
  const { t, lang } = useApp();
  const cards = [
    ['gift', 'del_k', 'del_h', 'del_p', '#fde4c8', '🎁'], ['corporate', 'corp_k', 'corp_h', 'corp_p', '#f3e6c4', '✦'], ['workshops', 'ws_k', 'ws_h', 'ws_p', '#e6f0cc', '✎'], ['pairing', 'pair_k', 'pair_h', 'pair_p', '#ecd3e6', '◐'],
  ];
  return (
    <section className="sec" data-tint="#fde4c8" id="more">
      <div className="wrap tz">
        {cards.map(([h, k, hh, p, c]) => (
          <Link key={h} href={`/${lang}/${h}/`} className="tc" style={{ '--c': c }}>
            <div className="kick">{t(k)}</div>
            <h3 className="display" dangerouslySetInnerHTML={{ __html: t(hh) }} />
            <p>{t(p)}</p><span className="arr">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
