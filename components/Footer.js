'use client';
import Link from 'next/link';
import { useApp } from '@/lib/store';
export function Footer() {
  const { lang, t } = useApp();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="logo big">Anush</div>
        <p>{t('foot_p')}</p>
        <div className="fl">
          {[['collection', 'nav_collection'], ['build', 'nav_build'], ['gift', 'nav_gift'], ['corporate', 'nav_corporate'], ['workshops', 'nav_workshops'], ['pairing', 'nav_pairing'], ['cart', 'nav_cart']].map(([h, k]) => <Link key={h} href={`/${lang}/${h}/`}>{t(k)}</Link>)}
        </div>
        <small>{t('foot_by')}</small>
      </div>
    </footer>
  );
}
