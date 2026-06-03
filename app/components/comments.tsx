'use client'

import Giscus from '@giscus/react'

const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY
const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

// Custom giscus theme (light + black primary button). Must be an absolute
// HTTPS URL — the giscus iframe blocks http (mixed content), so we point at
// the production origin; it serves the same CSS to preview/prod deploys.
const THEME = 'https://tonykipkemboi.com/giscus.css'

export function Comments() {
  // Until GitHub Discussions is enabled + the giscus app installed, show a note
  // instead of a broken widget. Set the four NEXT_PUBLIC_GISCUS_* env vars to go live.
  if (!repo || !repoId || !categoryId) {
    return (
      <p className="text-sm text-neutral-400">
        Discussion runs on GitHub Discussions — set the{' '}
        <code className="font-mono text-[0.85em]">NEXT_PUBLIC_GISCUS_*</code>{' '}
        env vars to enable it.
      </p>
    )
  }

  return (
    <Giscus
      repo={repo as `${string}/${string}`}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={THEME}
      lang="en"
      loading="lazy"
    />
  )
}
