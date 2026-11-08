import { Occasions } from '@/components/Sections';
import { metaFor } from '@/lib/seo';
import { t } from '@/data/i18n';
export function generateMetadata({ params }) { return metaFor(params.lang, 'occasions/', t(params.lang, 'nav_occasions'), t(params.lang, 'occ_p')); }
export default function Page() { return <section className="page" style={{ paddingTop: 40 }}><Occasions /></section>; }
