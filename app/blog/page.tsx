import { Suspense } from 'react'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Signals from the AI Agent Frontier',
  description: 'Notes, experiments, and insights on building, deploying, and scaling AI agents.',
}

export default async function Page() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8 text-neutral-900 dark:text-neutral-100">
        Signals from the AI Agent Frontier
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Notes, experiments, and insights on building, deploying, and scaling AI agents. Curated for builders, researchers, and the AI-curious.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <BlogPosts />
        </Suspense>
      </div>
    </section>
  )
}
