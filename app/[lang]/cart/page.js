import { Cart } from '@/components/Pages';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'cart/', t(params.lang, 'nav_cart'), t(params.lang, 'cart_demo')); }
export default function Page() { return <section className="page" data-tint="#fbf0e1"><Cart /></section>; }
