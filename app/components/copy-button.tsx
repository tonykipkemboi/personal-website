'use client'

import React from 'react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:text-neutral-400 dark:hover:bg-neutral-800"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}
