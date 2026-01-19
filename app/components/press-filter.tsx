'use client'

import { useState } from 'react'
import Image from 'next/image'

interface MediaAppearance {
  title: string
  type: 'podcast' | 'article' | 'talk' | 'video'
  source: string
  date: string
  link: string
  description: string
  image?: string
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getCtaText(type: MediaAppearance['type']) {
  switch (type) {
    case 'podcast':
      return 'Listen'
    case 'video':
      return 'Watch'
    case 'article':
      return 'Read'
    case 'talk':
      return 'View'
  }
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function FilteredAppearances({
  appearances,
  types
}: {
  appearances: MediaAppearance[]
  types: string[]
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filteredAppearances = selectedType
    ? appearances.filter(a => a.type === selectedType)
    : appearances

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          onClick={() => setSelectedType(null)}
          className={`px-3 py-1 text-sm rounded-full border transition-colors ${
            selectedType === null
              ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
              : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600'
          }`}
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type === selectedType ? null : type)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              selectedType === type
                ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            {capitalizeFirst(type)}s
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredAppearances.map((appearance, index) => (
          <a
            key={index}
            href={appearance.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <article className="group relative flex flex-col md:flex-row gap-6 rounded-lg border border-neutral-200 p-5 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
              {appearance.image && (
                <div className="relative w-full md:w-48 h-48 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={appearance.image}
                    alt={appearance.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <span className="capitalize">{appearance.type}</span>
                  <span>·</span>
                  <span>{appearance.source}</span>
                  <span>·</span>
                  <time dateTime={appearance.date}>{formatDate(appearance.date)}</time>
                </div>

                <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 mb-2">
                  {appearance.title}
                </h2>

                <p className="text-neutral-600 dark:text-neutral-400">
                  {appearance.description}
                </p>

                <div className="mt-4 flex items-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                  <span className="text-sm">{getCtaText(appearance.type)}</span>
                  <svg
                    className="ml-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </article>
          </a>
        ))}
      </div>

      {filteredAppearances.length === 0 && (
        <p className="text-neutral-600 dark:text-neutral-400 text-center py-8">
          No appearances found for that type.
        </p>
      )}
    </>
  )
}
