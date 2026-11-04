# Catrina Latte — website

Single-page site for Catrina Latte, a Mexican-inspired café in Monastir, Tunisia.
Built with Vite + React + TypeScript + Framer Motion. Bilingual (FR / EN).

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run images   # regenerate optimised images from assets-src/
```

## Signature features

- **Intro** — a hand-drawn cup fills with coffee before the curtain lifts (once per visit; skipped with reduced motion). `src/components/Preloader.tsx`
- **Living hero** — drifting marigold petals, mouse-depth parallax, live “Open now” badge (Tunis time). `Hero.tsx`, `decor/Petals.tsx`, `ui/OpenBadge.tsx`
- **Un día en Catrina** — pinned scroll story from 07:00 to 01:00 with a changing sky and real menu picks. `DaySection.tsx`
- **Lotería cards** — signature items as flippable, tilting Mexican Lotería cards. `Loteria.tsx`, illustrations in `decor/Drinks.tsx`
- **Gallery lightbox** (swipe / arrow keys) and an Instagram call-to-action. `Gallery.tsx`
- **Custom cursor** on desktop. `ui/Cursor.tsx`

## Content

| What | Where |
| --- | --- |
| Menu (transcribed from the printed menu in `assets-src/menu/`) | `src/data/menu.ts` |
| All site wording, French and English | `src/i18n/strings.ts` |
| Address, phone/WhatsApp, Instagram, opening hours, map | `src/data/site.ts` |
| Gallery photos | `src/components/Gallery.tsx` → `TILES` (captions in `strings.ts`) |

The language defaults to French (English if the browser is set to English) and the visitor's choice is remembered.

## Images

Originals live in `assets-src/`. `scripts/optimize-images.mjs` cuts the logo off its white
background, exports WebP variants, crops gallery details, upscales and sharpens the small
café photos, and generates the favicon, touch icon and social share image into `public/`.
