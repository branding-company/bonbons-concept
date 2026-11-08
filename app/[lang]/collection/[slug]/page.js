import { ProductDetail } from '@/components/Pages';
import { BONBONS, BY_SLUG, PRICE, ING, ALLERGEN } from '@/data/bonbons';
import { LANGS, L } from '@/data/i18n';
import { metaFor, ld, SITE } from '@/lib/seo';
export function generateStaticParams() { return LANGS.flatMap((lang) => BONBONS.map((b) => ({ lang, slug: b.slug }))); }
export const dynamicParams = false;
export function generateMetadata({ params }) { const b = BY_SLUG[params.slug]; const d = b[params.lang]; return metaFor(params.lang, `collection/${b.slug}/`, d.n, `${d.f} ${d.t}`); }
export default function Page({ params }) {
  const b = BY_SLUG[params.slug], d = b[params.lang], l = L(params.lang);
  const jsonld = { '@context': 'https://schema.org', '@type': 'Product', name: d.n, description: `${d.f} ${d.t}`, brand: { '@type': 'Brand', name: 'Anush (Concept)' }, category: 'Chocolate bonbon', color: b.c,
    additionalProperty: [{ '@type': 'PropertyValue', name: 'Ingredients', value: b.ing.map((k) => ING[k][l]).join(', ') }, { '@type': 'PropertyValue', name: 'Allergens', value: b.all.map((k) => ALLERGEN[k][l]).join(', ') }],
    offers: { '@type': 'Offer', priceCurrency: 'AMD', price: PRICE[4] / 4, availability: 'https://schema.org/InStock', url: `${SITE}/${params.lang}/collection/${b.slug}/`, description: 'Sample price (concept brand, no real sales)' } };
  return <section className="page" data-tint="#fff1de"><script type="application/ld+json" dangerouslySetInnerHTML={ld(jsonld)} /><ProductDetail slug={params.slug} /></section>;
}
