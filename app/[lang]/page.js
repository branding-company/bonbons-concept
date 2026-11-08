import { Hero } from '@/components/Hero';
import { Arrive } from '@/components/Arrive';
import { Collection, BuildTeaser, Occasions, Faq, Teasers } from '@/components/Sections';
import { Story } from '@/components/Story';
import { metaFor, ld, faqLd } from '@/lib/seo';

export function generateMetadata({ params }) { return metaFor(params.lang, ''); }

export default function Home({ params }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqLd(params.lang))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld({ '@context': 'https://schema.org', '@type': 'Store', name: 'Anush (Concept)', description: 'Fictional concept brand: hand-painted Armenian bonbons.', address: { '@type': 'PostalAddress', addressLocality: 'Yerevan', addressCountry: 'AM' }, priceRange: '4,800–26,500 AMD (sample)' })} />
      <Hero />
      <Arrive />
      <Collection />
      <BuildTeaser />
      <Occasions />
      <Story />
      <Teasers />
      <Faq />
    </>
  );
}
