'use client'

import { useState } from 'react'

interface ShareButtonProps {
  slug: string
  baseUrl: string
}

export function ShareButton({ slug, baseUrl }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const utmUrl = `${baseUrl}/blog/${slug}?utm_source=blog&utm_medium=share&utm_campaign=${slug}`

  async function handleCopy() {
    await navigator.clipboard.writeText(utmUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
      title="Copy share link"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      {copied ? 'Copied' : 'Share'}
    </button>
  )
}
