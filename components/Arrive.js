'use client';
import { useApp } from '@/lib/store';
export function Arrive() {
  const { t } = useApp();
  return <section id="arrive" className="arrive" ><div className="wrap"><p>{t('hero_next')}</p></div></section>;
}
