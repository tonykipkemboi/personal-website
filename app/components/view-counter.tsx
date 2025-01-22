'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export default function ViewCounter({ slug, trackView }: { slug: string; trackView?: boolean }) {
  const { data } = useSWR(`/api/views?slug=${slug}`, fetcher)
  const views = data?.views || 0

  useEffect(() => {
    if (trackView) {
      fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({ slug }),
      })
    }
  }, [slug, trackView])

  return (
    <span className="text-neutral-600 dark:text-neutral-400">
      {`${views.toLocaleString()} views`}
    </span>
  )
}
