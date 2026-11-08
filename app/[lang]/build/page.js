import { BuildPage } from '@/components/Builder';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'build/', t(params.lang, 'nav_build'), t(params.lang, 'build_p')); }
export default function Page() { return <section className="page" data-tint="#fbe3d0"><BuildPage /></section>; }
