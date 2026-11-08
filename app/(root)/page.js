import Script from 'next/script';
const base = process.env.NEXT_PUBLIC_BASE || '';
export default function Root() {
  // Static export cannot redirect on the server: pick a language on the client, with a plain link as fallback.
  return (
    <main style={{ padding: 40, textAlign: 'center' }}>
      <Script id="go" strategy="beforeInteractive">{`var l=(navigator.language||'en').slice(0,2);l=l==='ru'||l==='hy'?l:'en';try{l=localStorage.getItem('anush-lang')||l}catch(e){}location.replace('${base}/'+l+'/');`}</Script>
      <noscript>Anush Concept</noscript>
      <p><a href={`${base}/en/`}>English</a> · <a href={`${base}/ru/`}>Русский</a> · <a href={`${base}/hy/`}>Հայերեն</a></p>
    </main>
  );
}
