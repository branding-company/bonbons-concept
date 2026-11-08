'use client';
// Glossy bonbon drawn in SVG: whole (paper cup + shell) or cut open (shell ring, filling, core).
import { useId } from 'react';
export function Orb({ b, size = 120, cut = false, cup = true, style, className }) {
  const id = useId().replace(/:/g, '');
  const dark = (c, a) => `color-mix(in srgb, ${c} ${100 - a}%, #000)`;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={style} className={className} role="img" aria-label={b.en.n}>
      <defs>
        <radialGradient id={'g' + id} cx="34%" cy="28%" r="80%">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" /><stop offset=".08" stopColor="#fff" stopOpacity=".9" />
          <stop offset=".16" stopColor={b.shell} /><stop offset=".62" stopColor={b.shell} /><stop offset="1" stopColor={dark(b.shell, 52)} />
        </radialGradient>
        <radialGradient id={'f' + id} cx="40%" cy="35%" r="75%"><stop offset="0" stopColor={b.core} /><stop offset="1" stopColor={dark(b.core, 25)} /></radialGradient>
        <clipPath id={'c' + id}><circle cx="60" cy="58" r="42" /></clipPath>
      </defs>
      {cup && <path d="M14 70 Q60 128 106 70 L100 100 Q60 124 20 100Z" fill="#fff6e6" opacity=".9" stroke="rgba(42,20,12,.12)" />}
      <ellipse cx="60" cy="104" rx="38" ry="6" fill="rgba(42,20,12,.18)" />
      {!cut ? (
        <>
          <circle cx="60" cy="58" r="42" fill={`url(#g${id})`} />
          <ellipse cx="44" cy="38" rx="12" ry="7" fill="#fff" opacity=".75" transform="rotate(-30 44 38)" />
          <circle cx="78" cy="78" r="3" fill="#fff" opacity=".35" />
        </>
      ) : (
        <>
          <circle cx="60" cy="58" r="42" fill={dark(b.shell, 35)} />
          <circle cx="60" cy="58" r="37" fill={`url(#f${id})`} />
          <circle cx="60" cy="58" r="18" fill={dark(b.c, 20)} opacity=".95" />
          <circle cx="54" cy="52" r="6" fill="#fff" opacity=".35" />
          <g clipPath={`url(#c${id})`} opacity=".55">{[...Array(7)].map((_, i) => <circle key={i} cx={30 + ((i * 17) % 60)} cy={34 + ((i * 29) % 50)} r={1.5 + (i % 3)} fill={dark(b.c, 40)} />)}</g>
        </>
      )}
    </svg>
  );
}
