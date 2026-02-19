# CLAUDE.md

Instructions and context for Claude Code when working in this repository.

## Project Overview

Tony Kipkemboi's personal website — a Next.js 16 App Router site with a file-system MDX blog, deployed on Vercel.

- **Live site:** https://tonykipkemboi.com
- **Stack:** Next.js 16.1.6 · React 19 · TypeScript · Tailwind CSS v4 · next-mdx-remote v6
- **Font:** IBM Plex Mono (Google Fonts)
- **Deployment:** Vercel (auto-deploy on push to `main`)

---

## Development Commands

```bash
npm run dev        # Start dev server (Turbopack) at http://localhost:3000
npm run build      # Production build
npm run start      # Serve production build
npm run lint       # ESLint (0 warnings allowed)
npm run lint:fix   # ESLint with auto-fix
npm run format     # Prettier format all files
npm run format:check  # Check formatting without writing
npm run audit      # npm audit --audit-level=low
npm run check      # lint + format:check + audit (full CI check)
```

Pre-commit hooks (Husky + lint-staged) run ESLint and Prettier automatically on staged files.

---

## Project Structure

```
app/
├── blog/
│   ├── posts/          ← MDX blog post files (add new posts here)
│   ├── [slug]/page.tsx ← Individual post page
│   ├── category/[category]/page.tsx
│   ├── tags/[tag]/page.tsx
│   ├── page.tsx        ← Blog index
│   └── utils.ts        ← getBlogPosts(), formatDate(), etc.
├── components/         ← Shared UI components
│   ├── mdx.tsx         ← MDX component overrides (headings, links, code, etc.)
│   ├── nav.tsx
│   ├── footer.tsx
│   └── ...
├── og/route.tsx        ← Dynamic OG image generation
├── rss/route.ts        ← RSS feed
├── llms.txt/           ← LLM-readable site summary
├── layout.tsx          ← Root layout (IBM Plex Mono, Analytics, GA)
├── sitemap.ts          ← Auto-generated sitemap (exports `baseUrl`)
└── page.tsx            ← Home page
public/                 ← Static assets
scripts/                ← Utility scripts
```

---

## Adding a Blog Post

Create a `.mdx` file in `app/blog/posts/`. Required frontmatter:

```mdx
---
title: 'Your Post Title'
publishedAt: '2025-01-15'
summary: 'One-line summary used in listings and meta tags.'
description: 'Longer SEO description (optional, falls back to summary).'
author: 'Tony Kipkemboi'
category: 'Tutorials'
tags: ['AI Agents', 'CrewAI', 'LLMs']
keywords: 'comma separated, seo keywords'
image: 'https://...' # optional OG image override
---

Post content here...
```

The slug is derived from the filename (e.g. `my-post.mdx` → `/blog/my-post`).

---

## Critical: Next.js 15+ `params` Must Be Awaited

Dynamic route pages receive `params` as a **Promise**, not a plain object. Always await it:

```typescript
// CORRECT
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  ...
}

// WRONG — causes 404 for every request
export default async function BlogPost({ params }) {
  const post = posts.find(p => p.slug === params.slug) // params.slug is undefined!
}
```

This applies to `generateMetadata` as well.

---

## React Version

The project uses **React 19** (required). Next.js 16 bundles React 19-canary internally for its RSC pipeline. Using React 18 causes a runtime crash:

> "A React Element from an older version of React was rendered."

Do not downgrade React to 18.

---

## Code Style

Enforced by Prettier + ESLint (run automatically on commit):

| Setting         | Value    |
| --------------- | -------- |
| Quotes          | Single   |
| Semicolons      | None     |
| Trailing commas | ES5      |
| Tab width       | 2 spaces |
| Print width     | 80       |
| Line endings    | LF       |

TypeScript: `strict: false`, `strictNullChecks: true`. Do not enable full strict mode without reviewing existing code.

---

## ESLint

- Config: `eslint.config.mjs` (flat config format)
- Extends `eslint-config-next` + `eslint-config-prettier`
- All `jsx-a11y` rules set to `error` (strict accessibility)
- Max warnings: 0 — any warning fails CI

---

## Dependency Notes

- **npm overrides** are set for `minimatch >= 10.2.1` to fix high-severity transitive ReDoS vulnerabilities in the ESLint toolchain. Do not remove this override. The remaining 11 moderate `ajv` vulnerabilities in `@eslint/eslintrc` and `eslint` are unavoidable — the only npm-suggested fix would downgrade `eslint-config-next` to `0.2.4`, which would break the project entirely. These are dev-toolchain-only, moderate severity, and accepted.
- `@types/react` and `@types/react-dom` must stay on `^19.0.0` to match the React 19 runtime.
- `next-mdx-remote` must be v6+ for compatibility with Next.js 16's RSC runtime.

---

## Public Assets

Only these icon files currently exist in `public/`:

```
favicon.ico, favicon-16x16.png, favicon-32x32.png, favicon-96x96.png
apple-icon.png, apple-icon-color.png
favicon-{16,32,96}x{16,32,96}-color.png
og-image.png, headshot.jpg
manifest.json, browserconfig.xml, robots.txt
```

Note: `layout.tsx` references several apple-icon and android-icon sizes that don't exist yet (they produce 404s in dev logs but don't affect functionality).

---

## Vercel Deployment

- Auto-deploys on push to `main`
- `vercel.json` sets `NEXT_VERSION` env var (currently stale at 14.1.0 — does not affect the build)
- Environment variables for Edge Config and other Vercel services are set in the Vercel dashboard
