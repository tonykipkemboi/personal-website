import { Suspense } from 'react'
import Link from 'next/link'
import { BlogPosts } from 'app/components/posts'
import { getAllTags } from './utils'
import { TagFilter } from 'app/components/tag-filter'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on AI agents, automation, and building things.',
}

async function TagFilterWrapper() {
  const tags = await getAllTags()
  return (
    <div className="mb-8">
      <TagFilter tags={tags} />
    </div>
  )
}

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-5 animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          </div>
          <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
          </div>
          <div className="h-40 w-full bg-neutral-200 dark:bg-neutral-800 rounded mt-4"></div>
        </div>
      ))}
    </div>
  )
}

export default async function Page() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-2 text-neutral-900 dark:text-neutral-100">
        Writing
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Thoughts on AI agents, automation, and building things.
      </p>

      <Suspense fallback={<div className="flex gap-2 mb-8">{[...Array(3)].map((_, i) => <div key={i} className="h-7 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse"></div>)}</div>}>
        <TagFilterWrapper />
      </Suspense>

      <Suspense fallback={<BlogSkeleton />}>
        <BlogPosts />
      </Suspense>
    </section>
  )
}
