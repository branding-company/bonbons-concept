import { Gifting } from '@/components/Pages';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'gift/', t(params.lang, 'nav_gift'), t(params.lang, 'del_p')); }
export default function Page() { return <section className="page" data-tint="#fde4c8"><Gifting /></section>; }
