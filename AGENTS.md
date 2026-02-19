# AGENTS.md

Instructions and context for AI coding agents working in this repository.

## Project

Tony Kipkemboi's personal website — https://tonykipkemboi.com

Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · MDX blog · Vercel deployment.

---

## Essential Commands

```bash
npm run dev          # Dev server at http://localhost:3000 (Turbopack)
npm run build        # Production build — run this to verify no build errors
npm run lint         # ESLint — must pass with 0 warnings
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format
npm run format:check # Check formatting (used in CI)
npm run check        # Full check: lint + format:check + audit
```

Always run `npm run build` after making significant changes to catch TypeScript and Next.js errors before committing.

---

## Architecture

```
app/
  blog/posts/*.mdx          Blog content (MDX with frontmatter)
  blog/[slug]/page.tsx      Individual post page (dynamic route)
  blog/category/[]/page.tsx Category filter (dynamic route)
  blog/tags/[]/page.tsx     Tag filter (dynamic route)
  blog/utils.ts             getBlogPosts(), formatting helpers
  components/               Shared React components
  components/mdx.tsx        MDX component overrides
  sitemap.ts                Exports `baseUrl` — import from here for URLs
  layout.tsx                Root layout with font, analytics, metadata
```

---

## Non-Negotiable Rules

### 1. Always `await params` in dynamic routes

Next.js 15+ changed `params` to a Promise. Accessing it synchronously returns `undefined` and causes 404s.

```typescript
// Every dynamic route page MUST do this:
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // now use slug
}
```

Same applies to `generateMetadata`.

### 2. React 19 is required

Do not change `react` or `react-dom` below `^19`. Next.js 16 uses a React 19-canary RSC runtime internally — mixing with React 18 crashes the app with a version mismatch error.

### 3. Keep npm overrides

`package.json` has an override for `minimatch >= 10.2.1`. This fixes the high-severity transitive ReDoS vulnerabilities in the ESLint toolchain. Never remove it. The remaining 11 moderate `ajv` vulnerabilities in `@eslint/eslintrc`/`eslint` are unavoidable — the only npm-suggested fix would downgrade `eslint-config-next` to `0.2.4`, which breaks the project. These are dev-toolchain-only and accepted.

### 4. ESLint is strict

`--max-warnings 0` — no warnings allowed. All `jsx-a11y` rules are set to `error`. Any new JSX must be accessible.

---

## Blog Posts

Posts live at `app/blog/posts/*.mdx`. The slug is the filename without `.mdx`.

Required frontmatter fields:

- `title` — post title
- `publishedAt` — ISO date string (`YYYY-MM-DD`)
- `summary` — short description for listings

Optional frontmatter fields:

- `description` — longer SEO description (falls back to `summary`)
- `author` — defaults to "Tony Kipkemboi"
- `category` — single string
- `tags` — array, e.g. `['AI', 'CrewAI']`
- `keywords` — comma-separated string for SEO
- `image` — URL to override the default OG image

---

## MDX Components

Custom components available inside MDX (defined in `app/components/mdx.tsx`):

- `<Table data={{ headers: [], rows: [] }} />` — renders a table
- `<AiOutput>` — styled block for AI-generated content samples
- Standard elements (`h1`–`h6`, `a`, `code`, `pre`, `img`) are overridden with custom styles

---

## Code Style

| Setting         | Value    |
| --------------- | -------- |
| Quotes          | Single   |
| Semicolons      | None     |
| Trailing commas | ES5      |
| Indentation     | 2 spaces |
| Max line length | 80       |
| Line endings    | LF       |

Prettier and ESLint run automatically on commit via Husky. Do not disable hooks.

---

## Key Dependencies and Versions

| Package           | Version | Note                                           |
| ----------------- | ------- | ---------------------------------------------- |
| next              | ^16.1.6 | App Router, Turbopack dev                      |
| react / react-dom | ^19     | Must be 19+ (RSC runtime requirement)          |
| next-mdx-remote   | ^6.0.0  | v6+ required for Next.js 16 RSC                |
| tailwindcss       | ^4.0.0  | v4 — config via PostCSS, no tailwind.config.js |
| typescript        | 5.3.3   | strict: false, strictNullChecks: true          |

---

## What Lives Where

| Need                   | Location                                  |
| ---------------------- | ----------------------------------------- |
| Add/edit a blog post   | `app/blog/posts/`                         |
| Change site metadata   | `app/layout.tsx`                          |
| Change nav links       | `app/components/nav.tsx`                  |
| Change footer          | `app/components/footer.tsx`               |
| Add MDX component      | `app/components/mdx.tsx`                  |
| Canonical base URL     | `app/sitemap.ts` → `export const baseUrl` |
| OG image endpoint      | `app/og/route.tsx`                        |
| RSS feed               | `app/rss/route.ts`                        |
| Blog utility functions | `app/blog/utils.ts`                       |

---

## Deployment

- **Platform:** Vercel
- **Trigger:** Push to `main` auto-deploys
- **Env vars:** Managed in Vercel dashboard (Edge Config, Analytics)
- **Domain:** tonykipkemboi.com
