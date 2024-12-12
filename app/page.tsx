import Link from 'next/link'
import { LatestPost } from './components/latest-post'
import { LatestProject } from './components/latest-project'
import { LatestVideo } from './components/latest-video'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block ml-1"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Page() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          tony kipkemboi
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          i'm a developer advocate, software developer, and community builder. i
          work at a startup called{' '}
          <a
            href="https://www.crewai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            crewai
          </a>
          , where i teach developers how to build ai agents.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://github.com/tonykipkemboi"
            className="inline-flex items-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 fill-current"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z"
              />
            </svg>
          </Link>
          <Link
            href="https://www.youtube.com/@tonykipkemboi"
            className="inline-flex items-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="YouTube Channel"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 fill-current"
            >
              <path
                fillRule="evenodd"
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
          </Link>
          <Link
            href="https://linkedin.com/in/tonykipkemboi"
            className="inline-flex items-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="LinkedIn Profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 fill-current"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </Link>
          <Link
            href="https://x.com/tonykipkemboi"
            className="inline-flex items-center p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="X (Twitter) Profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-6 w-6 fill-current"
            >
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Latest Post Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tighter">latest post</h2>
          <Link
            href="/blog"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            read all
          </Link>
        </div>
        <LatestPost />
      </section>

      {/* Latest Project Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tighter">latest project</h2>
          <Link
            href="/projects"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            see all
          </Link>
        </div>
        <LatestProject />
      </section>

      {/* Latest Video Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tighter">latest video</h2>
          <Link
            href="https://www.youtube.com/@tonykipkemboi"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            subscribe <ArrowIcon />
          </Link>
        </div>
        <LatestVideo />
      </section>
    </div>
  )
}
