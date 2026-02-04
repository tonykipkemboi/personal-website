import { Suspense } from 'react'
import { getBlogPosts, getAllTags, calculateReadingTime } from './utils'
import { TagFilter } from 'app/components/tag-filter'
import { BlogSearch } from 'app/components/blog-search'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on AI agents, automation, and building things.',
}

async function TagFilterWrapper() {
  const tags = await getAllTags()
  return (
    <div className="mb-6">
      <TagFilter tags={tags} />
    </div>
  )
}

async function BlogPostsWithSearch() {
  const posts = await getBlogPosts()
  const postsWithReadingTime = posts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata,
    readingTime: calculateReadingTime(post.content),
  }))

  return <BlogSearch posts={postsWithReadingTime} />
}

function BlogSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-1 gap-6">
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

      <Suspense
        fallback={
          <div className="flex gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        }
      >
        <TagFilterWrapper />
      </Suspense>

      <Suspense fallback={<BlogSkeleton />}>
        <BlogPostsWithSearch />
      </Suspense>
    </section>
  )
}
