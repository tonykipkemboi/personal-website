import { Suspense } from 'react'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'signals from the ai agent frontier',
  description: 'notes, experiments, and insights on building, deploying, and scaling ai agents.',
}

export default async function Page() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8 text-neutral-900 dark:text-neutral-100">
        signals from the ai agent frontier
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        notes, experiments, and insights on building, deploying, and scaling ai agents. curated for builders, researchers, and the ai-curious.
      </p>
      <div className="w-full flex justify-center mb-8">
        <p className="text-xs text-neutral-500 dark:text-neutral-500 border border-neutral-200 dark:border-neutral-700 rounded-md p-3 bg-neutral-50 dark:bg-neutral-900 text-center inline-block">
          opinions are my own and do not represent the views of my employer.
        </p>
      </div>
      <div className="mt-8">
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <BlogPosts />
        </Suspense>
      </div>
    </section>
  )
}
