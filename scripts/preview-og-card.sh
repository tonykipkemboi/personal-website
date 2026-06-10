#!/usr/bin/env bash
# Preview the social-share (OG) card for a blog post.
# Usage: scripts/preview-og-card.sh <slug>
# Renders the post's real card to /tmp/og-<slug>.png using the same title,
# hero, and category the live <meta og:image> would use.
#
# See .claude/skills/blog-social-card/SKILL.md for the full review workflow.
set -euo pipefail

SLUG="${1:-}"
if [ -z "$SLUG" ]; then
  echo "usage: scripts/preview-og-card.sh <slug>" >&2
  echo "  (slug = filename of app/blog/posts/<slug>.mdx, without .mdx)" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PORT=3000
BASE="http://localhost:$PORT"
OUT="/tmp/og-${SLUG}.png"

if [ ! -f "app/blog/posts/${SLUG}.mdx" ]; then
  echo "✗ no post at app/blog/posts/${SLUG}.mdx" >&2
  exit 1
fi

# Start a prod server if one isn't already answering.
STARTED=0
if ! curl -s -o /dev/null "$BASE/" 2>/dev/null; then
  echo "→ building + starting server..."
  npm run build >/tmp/og-preview-build.log 2>&1 || {
    echo "✗ build failed — see /tmp/og-preview-build.log" >&2
    exit 1
  }
  npm run start >/tmp/og-preview-server.log 2>&1 &
  STARTED=1
  for _ in $(seq 1 30); do
    curl -s -o /dev/null "$BASE/" 2>/dev/null && break || sleep 1
  done
fi

# Pull the exact og:image URL the post emits, rewrite the origin to localhost,
# and render it.
OG_URL="$(curl -s "$BASE/blog/${SLUG}" \
  | grep -oE '<meta property="og:image" content="[^"]+"' \
  | head -1 | sed -E 's/.*content="([^"]+)".*/\1/' \
  | sed 's/&amp;/\&/g')"

if [ -z "$OG_URL" ]; then
  echo "✗ couldn't find og:image meta for /blog/${SLUG}" >&2
  [ "$STARTED" = "1" ] && pkill -f "next start" 2>/dev/null || true
  exit 1
fi

LOCAL_URL="${OG_URL/https:\/\/tonykipkemboi.com/$BASE}"
echo "→ card url: $OG_URL"
CODE="$(curl -s -o "$OUT" -w "%{http_code}" "$LOCAL_URL")"

if [ "$STARTED" = "1" ]; then
  pkill -f "next start" 2>/dev/null || true
fi

if [ "$CODE" != "200" ]; then
  echo "✗ render failed (HTTP $CODE)" >&2
  exit 1
fi

echo "✓ rendered → $OUT"
echo "  open it and eyeball: hero crop, title legibility, byline row."
