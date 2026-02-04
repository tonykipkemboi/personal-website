import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogPostsByTag,
  getAllTags,
  formatDate,
  calculateReadingTime,
} from '../../utils'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string }
}) {
  const tag = decodeURIComponent(params.tag).replace(/-/g, ' ')
  const posts = await getBlogPostsByTag(tag)

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `Posts tagged with "${tag}" | Tony Kipkemboi`,
    description: `Browse all blog posts tagged with ${tag}. ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} about ${tag}.`,
  }
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag).replace(/-/g, ' ')
  const posts = await getBlogPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        Posts Tagged: {tag}
      </h1>

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
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <span>{readingTime} min read</span>
                  {post.metadata.category && (
                    <>
                      <span>•</span>
                      <span className="text-neutral-500">
                        {post.metadata.category}
                      </span>
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
