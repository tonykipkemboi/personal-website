import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export async function RecentPosts({ limit = 7 }: { limit?: number }) {
  const allBlogs = await getBlogPosts()
  const recentPosts = allBlogs.slice(0, limit)

  if (!recentPosts.length) return null

  return (
    <div>
      {recentPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex items-center gap-6 border-t border-neutral-200 py-5"
        >
          <time
            dateTime={post.metadata.publishedAt}
            className="w-24 shrink-0 text-sm tabular-nums text-neutral-400"
          >
            {formatDate(post.metadata.publishedAt)}
          </time>
          <span className="flex-1 text-[18px] tracking-tight text-[#0a0a0a] transition-opacity group-hover:opacity-60">
            {post.metadata.title}
          </span>
          {post.metadata.category && (
            <span className="hidden shrink-0 text-right text-[13px] text-neutral-400 sm:block">
              {post.metadata.category}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}
