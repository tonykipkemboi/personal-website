'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type BlogPost = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary?: string
    image?: string
    tags?: string[]
  }
  readingTime: number
}

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState('')

  const filteredPosts = posts.filter((post) => {
    const searchContent =
      `${post.metadata.title} ${post.metadata.summary || ''} ${post.metadata.tags?.join(' ') || ''}`.toLowerCase()
    return searchContent.includes(query.toLowerCase())
  })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search posts…"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 text-sm border border-neutral-200 dark:border-neutral-800 rounded-lg bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 focus-visible:border-transparent transition-colors"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
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
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {query && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {filteredPosts.length}{' '}
          {filteredPosts.length === 1 ? 'result' : 'results'} for &ldquo;{query}
          &rdquo;
        </p>
      )}

      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            className="group relative block overflow-hidden rounded-lg border border-neutral-200 p-5 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <time
                    dateTime={post.metadata.publishedAt}
                    className="tabular-nums transition-colors duration-200 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"
                  >
                    {formatDate(post.metadata.publishedAt)}
                  </time>
                  <span className="text-neutral-300 dark:text-neutral-700">
                    ·
                  </span>
                  <span className="transition-colors duration-200 group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
                    {post.readingTime} min read
                  </span>
                </div>
                <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200 group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <h2 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 line-clamp-2">
                  {post.metadata.title}
                </h2>
                {post.metadata.summary && (
                  <p className="mt-2 text-sm line-clamp-2 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                    {post.metadata.summary}
                  </p>
                )}
              </div>
              {post.metadata.image && (
                <div className="relative h-36 overflow-hidden rounded-md">
                  <Image
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 336px"
                  />
                </div>
              )}
            </div>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-center py-8 text-neutral-500 dark:text-neutral-400">
            No posts found matching &ldquo;{query}&rdquo;
          </p>
        )}
      </div>
    </div>
  )
}
