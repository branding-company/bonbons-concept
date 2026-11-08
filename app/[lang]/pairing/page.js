import { Pairing } from '@/components/Pages';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'pairing/', t(params.lang, 'nav_pairing'), t(params.lang, 'pair_p')); }
export default function Page() { return <section className="page" data-tint="#ecd3e6"><Pairing /></section>; }
