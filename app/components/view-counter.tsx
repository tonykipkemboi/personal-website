'use client'

import { useEffect } from 'react'
import useSWR, { mutate } from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export default function ViewCounter({ slug, trackView }: { slug: string; trackView?: boolean }) {
  const { data, error, isLoading } = useSWR(`/api/views?slug=${slug}`, fetcher)
  const views = data?.views || 0

  useEffect(() => {
    if (trackView) {
      // Optimistically update the count
      mutate(`/api/views?slug=${slug}`, { views: views + 1 }, false)
      
      fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({ slug }),
      }).then((res) => res.json()).then((data) => {
        // Update with the real count from the server
        mutate(`/api/views?slug=${slug}`, { views: data.views }, false)
      })
    }
  }, [slug, trackView, views])

  if (isLoading) return <span className="text-neutral-600 dark:text-neutral-400">...</span>
  if (error) return null

  return (
    <span className="text-neutral-600 dark:text-neutral-400">
      {`${views.toLocaleString()} ${views === 1 ? 'view' : 'views'}`}
    </span>
  )
}
