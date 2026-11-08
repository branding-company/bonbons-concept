'use client';
// Sticky colour transitions: the page background takes the tint of the section under the middle of the viewport.
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function Tint() {
  const path = usePathname();
  useEffect(() => {
    const els = () => [...document.querySelectorAll('[data-tint]')];
    let raf = 0;
    const run = () => {
      raf = 0; const mid = innerHeight * 0.5; let cur = null;
      for (const el of els()) { const r = el.getBoundingClientRect(); if (r.top <= mid && r.bottom >= mid) cur = el; }
      document.documentElement.style.setProperty('--tint', cur ? cur.dataset.tint : '#fbf0e1');
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    const mo = new MutationObserver(on); mo.observe(document.getElementById('main') || document.body, { childList: true, subtree: true });
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); mo.disconnect(); };
  }, [path]);
  return null;
}
