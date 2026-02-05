# tonykipkemboi.com

[![CI](https://github.com/tonykipkemboi/personal-website/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/tonykipkemboi/personal-website/actions/workflows/ci.yml)

My personal website and blog. Built with Next.js 16, Tailwind CSS v4, and deployed on Vercel.

🔗 **[tonykipkemboi.com](https://tonykipkemboi.com)**

## Features

- **Blog** — MDX-powered with syntax highlighting, reading time, and tag filtering
- **Projects** — Showcase with live GitHub star counts (auto-updated weekly)
- **Press** — Media appearances, talks, and podcast episodes
- **Search** — Real-time blog post filtering
- **SEO** — Sitemap, RSS feed, JSON-LD schema, dynamic OG images
- **Accessibility** — WCAG compliant with focus-visible states, skip links, reduced motion support
- **Easter Egg** — Try the Konami code ↑↑↓↓←→←→BA

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Content:** MDX via next-mdx-remote
- **Fonts:** IBM Plex Mono
- **Analytics:** Vercel Analytics + Google Analytics
- **CI/CD:** GitHub Actions + Vercel

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command          | Description            |
| ---------------- | ---------------------- |
| `npm run dev`    | Start dev server       |
| `npm run build`  | Production build       |
| `npm run lint`   | ESLint (zero warnings) |
| `npm run format` | Prettier formatting    |
| `npm run check`  | Run all checks         |

## Automated Updates

GitHub Actions runs weekly to update:

- GitHub star counts on projects
- YouTube video view counts
- YouTube subscriber count

## License

Content © Tony Kipkemboi. Code structure based on [Vercel's blog template](https://github.com/vercel/examples/tree/main/solutions/blog).
