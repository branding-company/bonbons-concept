# Anush: chocolate bonbons atelier (Concept)

Portfolio showcase by NUVV. A **fictional** premium Armenian bonbon atelier. All prices, dates, stock, delivery fees and origins are **sample data**; checkout is a demo and takes no payment.

- Live demo: https://branding-company.github.io/bonbons-concept/ (after the first deploy from `main`)
- Stack: Next.js 14 (static export), React, three.js (hero bonbon), plain CSS. No backend: demo forms save to the browser's `localStorage`.
- Languages: EN / RU / HY as separate static routes (`/en/`, `/ru/`, `/hy/`) with hreflang, sitemap and JSON-LD (FAQ, Store, Product per bonbon).

## What is in it
- **Hero:** paint a glossy 3D bonbon, "pour the filling", it cracks into shards and the colour floods into the page.
- **Build your box** (`/build/`): 4/9/16/25, tap or drag, spring-physics drops, ribbon colours, lid closes and the bow ties itself, handwritten-style gift card, share by link (the recipient opens the box).
- Collection (16 bonbons, cut-open view, ingredients, allergens, pairing, Product JSON-LD), flavour finder quiz, occasions, Yerevan delivery and "Send to Armenia" (AMD/USD/EUR/RUB), corporate logo-on-lid mock-up with quantity tiers and quote form, atelier story (scroll-driven), workshop calendar, pairing guide, cart and demo checkout.

## Develop
```bash
npm install
npm run dev            # http://localhost:3000/en/
BASE_PATH= npm run build   # static site in ./out
```
Deploy: Settings → Pages → Source: **GitHub Actions**, then merge to `main` (workflow in `.github/workflows/pages.yml`).

## Notes
- Armenian and Russian copy are drafts and need native review before any public use.
- `previews/` holds the three approved-stage opening previews and the brand board (static HTML).
- `playbook/` is the NUVV showcase playbook and style log.
