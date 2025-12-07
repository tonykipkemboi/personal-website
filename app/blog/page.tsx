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
      <div className="mt-8">
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <BlogPosts />
        </Suspense>
      </div>
    </section>
  )
}
