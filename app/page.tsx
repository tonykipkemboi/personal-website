import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RecentPosts } from './components/recent-posts'
import { PopularVideo } from './components/latest-video'
import { ArrowIcon } from './components/icons'

export default async function Page() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-5">
          <Image
            src="/headshot.jpg"
            alt="Tony Kipkemboi"
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700 grayscale"
            priority
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">
              Tony Kipkemboi
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              AI Engineer & Content Creator
            </p>
          </div>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
          I build{' '}
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">
            AI agents and automations
          </span>{' '}
          that help teams work smarter. Previously at CrewAI, Snowflake,
          Bloomberg. US Army veteran. Speaker at PyCon US, ODSC, Harvard, and
          more.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://linkedin.com/in/tonykipkemboi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-3 rounded-md font-medium hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
          >
            Get in Touch
          </a>
          <a
            href="https://www.youtube.com/@tonykipkemboi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-4 py-3 rounded-md font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current text-red-600"
              aria-hidden="true"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube (8K+ subs)
          </a>
          <a
            href="https://github.com/tonykipkemboi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-neutral-300 dark:border-neutral-700 px-4 py-3 rounded-md font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </section>

      {/* Writing Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
            Writing
          </h2>
          <Link
            href="/blog"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
          >
            View All
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b border-neutral-100 dark:border-neutral-800"
                >
                  <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
              ))}
            </div>
          }
        >
          <RecentPosts />
        </Suspense>
      </section>

      {/* Shipped Apps */}
      <section>
        <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-6">
          Shipped Apps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://www.kaarada.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-5 rounded-lg border border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 transition-all"
          >
            <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
              Kaa Rada
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Pomodoro app with music, tasks, and Hacker News
            </span>
          </a>
          <a
            href="https://www.downloadthumbnails.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-5 rounded-lg border border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 transition-all"
          >
            <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
              Download Thumbnails
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Extract thumbnails from any YouTube video
            </span>
          </a>
          <a
            href="https://www.bienaimesol.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-5 rounded-lg border border-neutral-200 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600 transition-all"
          >
            <span className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
              Bienaime Sol
            </span>
            <span className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Fan site for Kenyan artist Bien Aime
            </span>
          </a>
        </div>
      </section>

      {/* Popular Video Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
            Most Popular Video
          </h2>
          <a
            href="https://www.youtube.com/@tonykipkemboi"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe <ArrowIcon />
          </a>
        </div>
        <PopularVideo />
      </section>
    </div>
  )
}
