'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type BlogPost = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    category?: string
    tags?: string[]
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((p) => p.metadata.category && set.add(p.metadata.category))
    return Array.from(set).sort()
  }, [posts])

  const filtered = posts.filter((post) => {
    const matchesCategory = !category || post.metadata.category === category
    const haystack =
      `${post.metadata.title} ${post.metadata.summary || ''} ${post.metadata.tags?.join(' ') || ''}`.toLowerCase()
    const matchesQuery = haystack.includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <svg
          className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          name="search"
          placeholder="Search field notes..."
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border-b border-neutral-200 bg-transparent py-3 pl-7 text-base text-[#0a0a0a] placeholder:text-neutral-400 focus:border-[#0a0a0a] focus:outline-none"
        />
      </div>

      {/* Category filters */}
      <div className="mb-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          onClick={() => setCategory(null)}
          className={`text-sm transition-colors ${
            category === null
              ? 'border-b border-[#0a0a0a] pb-0.5 text-[#0a0a0a]'
              : 'text-neutral-400 hover:text-[#0a0a0a]'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c === category ? null : c)}
            className={`text-sm transition-colors ${
              category === c
                ? 'border-b border-[#0a0a0a] pb-0.5 text-[#0a0a0a]'
                : 'text-neutral-400 hover:text-[#0a0a0a]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-4">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center gap-6 border-t border-neutral-200 py-5"
          >
            <time
              dateTime={post.metadata.publishedAt}
              className="w-28 shrink-0 text-sm tabular-nums text-neutral-400"
            >
              {formatDate(post.metadata.publishedAt)}
            </time>
            <span className="flex-1 text-[18px] tracking-tight text-[#0a0a0a] transition-opacity group-hover:opacity-60">
              {post.metadata.title}
            </span>
            {post.metadata.category && (
              <span className="hidden shrink-0 text-right text-[13px] text-neutral-400 sm:block">
                {post.metadata.category}
              </span>
            )}
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="border-t border-neutral-200 py-10 text-center text-neutral-400">
            No field notes found.
          </p>
        )}
      </div>
    </div>
  )
}
