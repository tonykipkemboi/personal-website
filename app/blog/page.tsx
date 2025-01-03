import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8">
        my blog
      </h1>
      <BlogPosts />
    </section>
  )
}
