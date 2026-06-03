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
  // If the giscus env vars aren't configured, render nothing (no dev-only note
  // leaks to visitors). Set the four NEXT_PUBLIC_GISCUS_* vars to enable it.
  if (!repo || !repoId || !categoryId) {
    return null
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
