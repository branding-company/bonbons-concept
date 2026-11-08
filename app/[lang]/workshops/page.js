import { Workshops } from '@/components/Pages';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'workshops/', t(params.lang, 'nav_workshops'), t(params.lang, 'ws_p')); }
export default function Page() { return <section className="page" data-tint="#e6f0cc"><Workshops /></section>; }
