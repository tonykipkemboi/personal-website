import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export async function LatestPost() {
  const allBlogs = await getBlogPosts()
  const latestPost = allBlogs[0] // Posts are already sorted by date in getBlogPosts

  if (!latestPost) return null

  return (
    <Link
      href={`/blog/${latestPost.slug}`}
      className="group relative flex flex-col space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg border border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 transition-all"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <time
            dateTime={latestPost.metadata.publishedAt}
            className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums transition-colors duration-200 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"
          >
            {formatDate(latestPost.metadata.publishedAt, true)}
          </time>
          <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200 group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="font-medium text-xl tracking-tight text-neutral-900 dark:text-neutral-100">
            {latestPost.metadata.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {latestPost.metadata.summary}
          </p>
        </div>
      </div>
    </Link>
  )
}
