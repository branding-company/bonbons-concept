import { LANGS, STR } from '@/data/i18n';
export const SITE = process.env.NEXT_PUBLIC_SITE || 'https://branding-company.github.io/bonbons-concept';
export const BASE = process.env.NEXT_PUBLIC_BASE || '';
const TITLES = {
  en: ['Anush · Hand-painted Armenian bonbons (Concept)', 'Hand-painted Armenian bonbons in Yerevan. Build your own gift box, send it to Armenia, or order corporate gifts with your logo. A fictional concept brand: sample data, no real payments.'],
  ru: ['Anush · Армянские конфеты ручной росписи (концепт)', 'Армянские конфеты ручной росписи в Ереване. Соберите свою коробку, отправьте подарок в Армению или закажите корпоративные подарки с логотипом. Вымышленный концепт: примерные данные, без реальных платежей.'],
  hy: ['Anush · Հայկական ձեռքի նկարով բոնբոններ (կոնցեպտ)', 'Ձեռքի նկարով հայկական բոնբոններ Երևանում։ Հավաքեք ձեր տուփը, նվեր ուղարկեք Հայաստան կամ պատվիրեք կորպորատիվ նվերներ ձեր լոգոյով։ Գեղարվեստական կոնցեպտ՝ նմուշային տվյալներ, առանց իրական վճարման։'],
};
export function metaFor(lang, path = '', title, desc) {
  const [T0, D0] = TITLES[lang];
  const url = `${SITE}/${lang}/${path}`;
  return {
    metadataBase: new URL(SITE),
    title: title ? `${title} · Anush` : T0, description: desc || D0,
    alternates: { canonical: url, languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE}/${l}/${path}`])) },
    openGraph: { title: title ? `${title} · Anush` : T0, description: desc || D0, url, siteName: 'Anush (Concept)', locale: lang, type: 'website' },
    robots: { index: true, follow: true },
  };
}
export const ld = (obj) => ({ __html: JSON.stringify(obj) });
export const faqLd = (lang) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: STR[lang].faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
