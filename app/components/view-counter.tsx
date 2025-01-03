'use client'

import { useEffect } from 'react'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  return res.json()
}

export default function ViewCounter({ slug }: { slug: string }) {
  useEffect(() => {
    // Increment the view count when the component mounts
    fetch(`/api/views?slug=${slug}`, { method: 'POST' })
  }, [slug])

  return (
    <span className="text-neutral-600 dark:text-neutral-400" suppressHydrationWarning>
      <ViewCount slug={slug} />
    </span>
  )
}

function ViewCount({ slug }: { slug: string }) {
  const { data } = useSWR(`/api/views?slug=${slug}`, fetcher, {
    revalidateOnFocus: false,
  })

  return <>{data?.views ? `${data.views} views` : '-- views'}</>
} 