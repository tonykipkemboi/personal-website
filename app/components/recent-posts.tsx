import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export async function RecentPosts() {
  const allBlogs = await getBlogPosts()
  const recentPosts = allBlogs.slice(0, 5)

  if (!recentPosts.length) return null

  return (
    <div>
      {recentPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex justify-between items-baseline py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-900 -mx-2 px-2 rounded transition-colors"
        >
          <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {post.metadata.title}
          </span>
          <time
            dateTime={post.metadata.publishedAt}
            className="text-sm text-neutral-500 dark:text-neutral-500 tabular-nums shrink-0 ml-4"
          >
            {formatDate(post.metadata.publishedAt)}
          </time>
        </Link>
      ))}
    </div>
  )
}
