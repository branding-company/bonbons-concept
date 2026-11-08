import { BONBONS } from '@/data/bonbons';
import { LANGS } from '@/data/i18n';
import { SITE } from '@/lib/seo';
export const dynamic = 'force-static';
export default function sitemap() {
  const pages = ['', 'build/', 'collection/', 'finder/', 'occasions/', 'gift/', 'corporate/', 'workshops/', 'pairing/', 'cart/', ...BONBONS.map((b) => `collection/${b.slug}/`)];
  return LANGS.flatMap((l) => pages.map((p) => ({ url: `${SITE}/${l}/${p}`, changeFrequency: 'weekly', priority: p ? 0.6 : 1, alternates: { languages: Object.fromEntries(LANGS.map((x) => [x, `${SITE}/${x}/${p}`])) } })));
}
