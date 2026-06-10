---
name: blog-social-card
description: "Use when composing, adding, editing, or reviewing a blog post in this repo (app/blog/posts/*.mdx) before it ships — to review the post's hero image and its generated social-share (OG/Twitter) card and fix any issues before pushing. Trigger on any new or changed .mdx post, before commit/PR/merge to main."
---

# Blog hero image + social card review

Every blog post on tonykipkemboi.com gets an automatic 1200×630 social-share
card (the preview image on X/Twitter, LinkedIn, Slack, iMessage, Discord, etc.).
The card is **composited at request time** from the post's own hero image — you
do **not** design cards by hand. Your job before shipping a post is to make sure
the hero is good and the generated card looks right.

## How it works (don't break this)

- **`app/og/route.tsx`** — the card compositor. A dynamic route that renders a
  1200×630 PNG with `next/og` (Satori). Takes `?title=`, `?image=` (hero path),
  `?category=`. Two layouts: a **split card** (hero on top, title + byline below)
  when a hero exists, and a **full-bleed editorial card** (large title) when it
  doesn't. Fonts are Geist TTFs in `public/fonts/`, fetched over the request
  origin. Hero + avatar are also fetched over the request origin, so brand-new
  images render in local preview before they're on prod.
- **`app/blog/utils.ts`** — resolution helpers:
  - `getPostHeroImage(post)` → the hero path as authored, or `null`.
  - `getPostOgImage(post, baseUrl)` → absolute hero URL (or default
    `og-image.png`). Used for **JSON-LD** only.
  - `getPostOgCard(post, baseUrl)` → the `/og?...` card URL. Used for
    **og:image + twitter:image**.
- **`app/blog/[slug]/page.tsx`** `generateMetadata` wires the card into
  `openGraph.images` / `twitter.images`; JSON-LD keeps the raw hero.

**Hero resolution order** (first match wins):

1. `image:` in frontmatter (absolute URL or `/blog/...` path)
2. the first markdown image in the post body (the hero at the top of the post)
3. no hero → branded title-only card

So in practice: put a hero image as the **first image in the post body** (path
under `public/blog/`), and everything else is automatic.

## Pre-ship checklist for a new/edited post

Run through this before commit/PR/merge:

1. **Hero exists and is first.** The intended hero is the first `![...](...)`
   in the body (or set explicitly via frontmatter `image:`). Path lives under
   `public/blog/` and the file is actually committed.
2. **Hero is card-safe.** Landscape-ish (it's cropped to 1200×392 ≈ 3:1 in the
   split card — center-cropped, `objectFit: cover`). Key content shouldn't sit
   at the extreme top/bottom edges. Avoid tiny/portrait images and anything with
   important text near the edges.
3. **File weight is sane.** Heroes are fetched + decoded per first card render.
   Keep heroes ≲ ~1.5 MB where possible (some legacy ones are larger and still
   work, just slower on first render before CDN cache). Prefer optimized
   PNG/JPEG/WebP.
4. **Title length.** Card title auto-scales and clamps to 2 lines (split) / 3
   lines (no-hero). Very long titles shrink — eyeball the render.
5. **Category** (frontmatter `category:`) shows as the eyebrow. Optional but
   nice. Plain language only (no internal codes).
6. **Render and eyeball the card** (next section). Never ship a post without
   looking at its actual card PNG.

## How to verify the card locally (required)

From the repo root:

```bash
npm run build && (npm run start >/tmp/site.log 2>&1 &)
# wait for http://localhost:3000 to return 200, then:

# Pull the exact og:image the post emits:
curl -s http://localhost:3000/blog/<slug> \
  | grep -oE '<meta property="og:image" content="[^"]+"' | head -1

# Render that card to a PNG (swap in the URL from above, localhost origin):
curl -s "http://localhost:3000/og?title=...&image=/blog/<hero>&category=..." \
  -o /tmp/card.png
```

Then **open `/tmp/card.png`** (Read it) and check: hero not awkwardly cropped,
title fully visible and legible, byline row intact, nothing overflowing. For the
no-hero case, confirm the editorial fallback looks intentional, not empty.

Optional one-shot helper: `scripts/preview-og-card.sh <slug>` (builds if needed,
starts the server, renders the post's real card to `/tmp/og-<slug>.png`).

Stop the server when done: `pkill -f "next start"`.

## Common pitfalls

- **Hero not committed.** The `/blog/...` file must be in `public/blog/` and
  committed, or the card is blank on prod. Check `git status`.
- **Editing the compositor fonts.** Don't `fetch(new URL(..., import.meta.url))`
  for fonts/images in `app/og/route.tsx` — undici can't fetch `file:` URLs under
  this Turbopack/Node build (500s). Fetch over the request `origin` instead.
- **Forcing a non-landscape hero.** It will center-crop hard in the split card.
  Pick a different hero or set a dedicated `image:` in frontmatter.
- **Social cache.** After shipping, X/LinkedIn cache old cards. Use LinkedIn's
  Post Inspector "scrape again" to force a refresh when testing a re-shared URL.

## Shipping

Follow the repo's normal flow: feature branch, never push `main` directly,
`npm run build` clean, browser/PNG-verify the card, PR, then merge (auto-deploys
to Vercel). No `Co-Authored-By` lines in commits.
