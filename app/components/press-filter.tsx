'use client'

import { useState } from 'react'

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
    month: 'short',
    year: 'numeric',
  })
}

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function FilteredAppearances({
  appearances,
  types,
}: {
  appearances: MediaAppearance[]
  types: string[]
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const filtered = selectedType
    ? appearances.filter((a) => a.type === selectedType)
    : appearances

  return (
    <div>
      {/* Filters */}
      <div className="mb-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          onClick={() => setSelectedType(null)}
          className={`text-sm transition-colors ${
            selectedType === null
              ? 'border-b border-[#0a0a0a] pb-0.5 text-[#0a0a0a]'
              : 'text-neutral-400 hover:text-[#0a0a0a]'
          }`}
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type === selectedType ? null : type)}
            className={`text-sm transition-colors ${
              selectedType === type
                ? 'border-b border-[#0a0a0a] pb-0.5 text-[#0a0a0a]'
                : 'text-neutral-400 hover:text-[#0a0a0a]'
            }`}
          >
            {capitalizeFirst(type)}s
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-4">
        {filtered.map((a, index) => (
          <a
            key={index}
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-6 border-t border-neutral-200 py-5"
          >
            <time
              dateTime={a.date}
              className="w-20 shrink-0 text-sm tabular-nums text-neutral-400"
            >
              {formatDate(a.date)}
            </time>
            <span className="flex-1 text-[18px] tracking-tight text-[#0a0a0a] transition-opacity group-hover:opacity-60">
              {a.title}
            </span>
            <span className="hidden shrink-0 text-right text-[13px] text-neutral-400 sm:block">
              {a.source} · {capitalizeFirst(a.type)}
            </span>
          </a>
        ))}

        {filtered.length === 0 && (
          <p className="border-t border-neutral-200 py-10 text-center text-neutral-400">
            No appearances found for that type.
          </p>
        )}
      </div>
    </div>
  )
}
