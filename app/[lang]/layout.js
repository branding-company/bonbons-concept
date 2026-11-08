import '../globals.css';
import { Providers } from '@/lib/store';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Tint } from '@/components/Tint';
import { LANGS } from '@/data/i18n';

export const SITE = process.env.NEXT_PUBLIC_SITE || 'https://branding-company.github.io/bonbons-concept';
export function generateStaticParams() { return LANGS.map((lang) => ({ lang })); }
export const dynamicParams = false;

export default function LangLayout({ children, params }) {
  const { lang } = params;
  return (
    <html lang={lang}>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <meta name="theme-color" content="#fbf0e1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Nunito:wght@400;600;700;800&family=Noto+Serif:ital,wght@0,500..900;1,500..900&family=Noto+Serif+Armenian:wght@500..900&family=Noto+Sans+Armenian:wght@400..800&family=Caveat:wght@500;700&display=swap" />
      </head>
      <body>
        <Providers lang={lang}>
          <Tint />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
