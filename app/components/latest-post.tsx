import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function LatestPost() {
  const allBlogs = getBlogPosts()
  const latestPost = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })[0] // Get only the latest post

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
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
        
        <div>
          <h2 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
            {latestPost.metadata.title}
          </h2>
          {latestPost.metadata.summary && (
            <p className="mt-2 line-clamp-3 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
              {latestPost.metadata.summary}
            </p>
          )}
        </div>

        {latestPost.metadata.image && (
          <div className="relative h-48 overflow-hidden rounded-md">
            <img
              src={latestPost.metadata.image}
              alt={latestPost.metadata.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
