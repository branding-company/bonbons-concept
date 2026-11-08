'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/lib/store';
import { LANGS, LANG_LABEL } from '@/data/i18n';

const LINKS = [['collection', 'nav_collection'], ['build', 'nav_build'], ['finder', 'nav_finder'], ['occasions', 'nav_occasions'], ['gift', 'nav_gift'], ['corporate', 'nav_corporate'], ['workshops', 'nav_workshops'], ['pairing', 'nav_pairing']];

export function Nav() {
  const { lang, t, cart } = useApp();
  const path = usePathname() || '';
  const [open, setOpen] = useState(false);
  const rest = path.replace(/^\/(en|ru|hy)/, '') || '/';
  return (
    <header className="nav" data-open={open}>
      <a className="skip" href="#main">{t('skip')}</a>
      <Link className="logo" href={`/${lang}/`} onClick={() => setOpen(false)}>Anush</Link>
      <nav className="links" aria-label="Main">
        {LINKS.map(([h, k]) => <Link key={h} href={`/${lang}/${h}/`} aria-current={path.includes('/' + h) ? 'page' : undefined} onClick={() => setOpen(false)}>{t(k)}</Link>)}
      </nav>
      <div className="right">
        <span className="tag">{t('concept')}</span>
        <div className="lang" role="group" aria-label={t('lang')}>
          {LANGS.map((l) => <Link key={l} href={`/${l}${rest}`} hrefLang={l} aria-pressed={l === lang} className={l === lang ? 'on' : ''}>{LANG_LABEL[l]}</Link>)}
        </div>
        <Link className="bag" href={`/${lang}/cart/`} aria-label={t('nav_cart')}>{cart.length}</Link>
        <button className="burger" aria-label={t('menu')} aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
      </div>
    </header>
  );
}
