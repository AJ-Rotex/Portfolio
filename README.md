# Arshin Joseph Giril — Portfolio (React + Vite)

React conversion of the original single-file HTML portfolio, rebuilt for performance.

## Setup

```bash
npm install
```

Copy your media files into `public/assets/` (same filenames as before — they're
listed in `src/data/works.js`). Then:

```bash
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  data/works.js          single source of truth for every portfolio card
  hooks/
    useReveal.js          scroll-triggered fade-in (IntersectionObserver)
    useLenis.js            smooth-scroll setup
  components/
    CustomCursor.jsx      dot + ring cursor, one rAF loop, event delegation
    ScrollProgress.jsx
    Nav.jsx / Hero.jsx / Marquee.jsx / About.jsx / Tools.jsx / Stats.jsx
    Contact.jsx / Footer.jsx
    Works/
      Works.jsx           grid + filters, owns which lightbox item is open
      WorkCard.jsx         one card: lazy video, 3D tilt
      Lightbox.jsx          full-screen preview, code-split (React.lazy)
      Works.css
```

## What changed vs. the original HTML, and why

**Videos no longer download on page load.** The original had 8 `<video autoplay>`
tags that all started fetching the instant the page rendered. Each `WorkCard`
now uses `preload="none"` and only sets the video's `src` via an
`IntersectionObserver` once the card is about to enter the viewport
(`rootMargin: 200px`), and pauses it again once it scrolls out. This is the
single biggest load-time win.

**Images are natively lazy.** Every `<img>` has `loading="lazy" decoding="async"`,
so the browser defers off-screen images without any JS.

**The lightbox is code-split.** `Lightbox.jsx` is loaded with `React.lazy` +
`Suspense`, so its code isn't in the initial bundle at all — it's fetched only
the first time someone clicks a card.

**Vendor code is split from app code.** `vite.config.js` puts React/ReactDOM in
their own chunk (`manualChunks`), so it can be cached independently and
doesn't get invalidated every time you change your own components.

**Build output is pre-compressed.** `vite-plugin-compression2` generates `.gz`
files at build time for JS/CSS.

**Cursor and tilt effects use delegation, not per-card listeners.** The
original attached a `mousemove`/`mouseenter` listener to *every* work card,
skill card, and tool pill. `CustomCursor.jsx` now listens once on `document`
and reads `closest('[data-cursor-text]')`, so the cost doesn't grow with the
number of cards. Tilt is still per-card (it needs each card's own bounding
box) but is scoped with cleanup in a `useEffect`.

**`prefers-reduced-motion` is respected** (the original had no such guard).

## Media optimization (do this next)

The code fixes *when* things load — it can't shrink the files themselves.
Before deploying:
- Run your `.mp4` files through `ffmpeg -crf 28` (or HandBrake) — background
  loop clips rarely need bitrates above a couple Mbps.
- Compress `.jpg`/`.png` assets through Squoosh or TinyPNG; several of the
  original exports look uncompressed.
- Consider converting the largest videos to `.webm` for a smaller footprint,
  with the `.mp4` as a fallback `<source>`.

## Deploying

`npm run build` outputs a static `dist/` folder — deploy it to Vercel,
Netlify, Cloudflare Pages, or any static host.
