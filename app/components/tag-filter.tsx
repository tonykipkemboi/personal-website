'use client'

import { useState } from 'react'
import Link from 'next/link'

export function TagFilter({ tags }: { tags: string[] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleTags = showAll ? tags : tags.slice(0, 3)
  const hiddenCount = tags.length - 3

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visibleTags.map((tag) => (
        <Link
          key={tag}
          href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-3 py-1 text-sm rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          {tag}
        </Link>
      ))}
      {tags.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-3 py-1 text-sm text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          {showAll ? 'Show less' : `+${hiddenCount} more`}
        </button>
      )}
    </div>
  )
}
