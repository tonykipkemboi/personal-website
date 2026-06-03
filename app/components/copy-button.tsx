'use client'

import React from 'react'

export function CopyButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className={
        className ??
        'absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500'
      }
    >
      <span aria-live="polite">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}
