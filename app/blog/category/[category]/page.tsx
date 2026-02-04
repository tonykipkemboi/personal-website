import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogPostsByCategory,
  getAllCategories,
  formatDate,
  calculateReadingTime,
} from '../../utils'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const category = decodeURIComponent(params.category).replace(/-/g, ' ')
  const posts = await getBlogPostsByCategory(category)

  if (posts.length === 0) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category} | Tony Kipkemboi`,
    description: `Browse all ${category.toLowerCase()} posts. ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} in this category.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = decodeURIComponent(params.category).replace(/-/g, ' ')
  const posts = await getBlogPostsByCategory(category)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">{category}</h1>

      <div className="space-y-8">
        {posts.map((post) => {
          const readingTime = calculateReadingTime(post.content)
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-baseline">
                  <h2 className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                    {post.metadata.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm whitespace-nowrap ml-4">
                    {formatDate(post.metadata.publishedAt)}
                  </p>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {post.metadata.summary}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-neutral-500">
                    {readingTime} min read
                  </span>
                  {post.metadata.tags && post.metadata.tags.length > 0 && (
                    <>
                      <span className="text-neutral-500">•</span>
                      <div className="flex flex-wrap gap-2 text-neutral-500">
                        {post.metadata.tags.map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-12">
        <Link
          href="/blog"
          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
        >
          ← Back to all posts
        </Link>
      </div>
    </section>
  )
}
