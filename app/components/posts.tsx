import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8">
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="group relative block overflow-hidden rounded-lg border border-neutral-200 p-5 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <time
                  dateTime={post.metadata.publishedAt}
                  className="text-sm text-neutral-600 dark:text-neutral-400 tabular-nums transition-colors duration-200 group-hover:text-neutral-800 dark:group-hover:text-neutral-200"
                >
                  {formatDate(post.metadata.publishedAt, true)}
                </time>
                <div className="flex items-center space-x-1">
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
              </div>
              
              <div>
                <h2 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                  {post.metadata.title}
                </h2>
                {post.metadata.summary && (
                  <p className="mt-2 line-clamp-3 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                    {post.metadata.summary}
                  </p>
                )}
              </div>

              {post.metadata.image && (
                <div className="relative h-48 overflow-hidden rounded-md">
                  <img
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
    </div>
  )
}
