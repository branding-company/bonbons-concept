import { CollectionGrid } from '@/components/Pages';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'collection/', t(params.lang, 'nav_collection'), t(params.lang, 'col_p')); }
export default function Page() { return <section className="page" data-tint="#fff1de"><CollectionGrid /></section>; }
