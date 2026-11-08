import { Corporate } from '@/components/Pages';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'corporate/', t(params.lang, 'nav_corporate'), t(params.lang, 'corp_p')); }
export default function Page() { return <section className="page" data-tint="#f3e6c4"><Corporate /></section>; }
