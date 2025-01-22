import { Suspense } from 'react'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default async function Page() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8 text-neutral-900 dark:text-neutral-100">
        my blog
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        my thoughts on technology + ai agents, and emerging tech. i talk about what i'm learning and building and how it's changing the world. sometimes random fun stuff too.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <BlogPosts />
        </Suspense>
      </div>
    </section>
  )
}
