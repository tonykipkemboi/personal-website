import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export async function BlogPosts() {
  const allBlogs = await getBlogPosts() // Posts are already sorted by date in getBlogPosts

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8">
      {allBlogs.map((post) => (
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
