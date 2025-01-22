import { Suspense } from 'react'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default async function Page() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8">
        my blog
      </h1>
      <Suspense fallback={<div>Loading blog posts...</div>}>
        <BlogPosts />
      </Suspense>
    </section>
  )
}
