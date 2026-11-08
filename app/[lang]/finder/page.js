import { Finder } from '@/components/Pages';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'finder/', t(params.lang, 'nav_finder'), t(params.lang, 'finder_p')); }
export default function Page() { return <section className="page" data-tint="#f6e3c6"><Finder /></section>; }
