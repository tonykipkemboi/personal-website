import { Suspense } from 'react'
import Link from 'next/link'
import { LatestPost } from './components/latest-post'
import { LatestProject } from './components/latest-project'
import { PopularVideo } from './components/latest-video'

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

export default async function Page() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter">
          Tony Kipkemboi
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
          I build <u className="underline decoration-dotted decoration-2 underline-offset-2">AI automations and agent systems</u> that help teams work smarter and create <u className="underline decoration-dotted decoration-2 underline-offset-2">technical content</u> about AI across social platforms. I'm a veteran of the <u className="underline decoration-dotted decoration-2 underline-offset-2">US Army</u>, and have previously worked at <u className="underline decoration-dotted decoration-2 underline-offset-2">CrewAI</u>, <u className="underline decoration-dotted decoration-2 underline-offset-2">Snowflake</u>, <u className="underline decoration-dotted decoration-2 underline-offset-2">Bloomberg</u>, and <u className="underline decoration-dotted decoration-2 underline-offset-2">Booz Allen Hamilton</u>. I've spoken at <u className="underline decoration-dotted decoration-2 underline-offset-2">PyCon US</u>, <u className="underline decoration-dotted decoration-2 underline-offset-2">ODSC</u>, <u className="underline decoration-dotted decoration-2 underline-offset-2">Harvard</u>, and more. I'm passionate about <u className="underline decoration-dotted decoration-2 underline-offset-2">open-source</u>, <u className="underline decoration-dotted decoration-2 underline-offset-2">AI agents</u>, and <u className="underline decoration-dotted decoration-2 underline-offset-2">developer education</u>.
        </p>
      </section>

      {/* Latest Post Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">Latest Post</h2>
          <Link
            href="/blog"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            Read All
          </Link>
        </div>
        <Suspense fallback={<div>Loading latest post...</div>}>
          <LatestPost />
        </Suspense>
      </section>

      {/* Latest Project Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">Latest Project</h2>
          <Link
            href="/projects"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            See All
          </Link>
        </div>
        <LatestProject />
      </section>

      {/* Popular Video Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">Most Popular Video</h2>
          <Link
            href="https://www.youtube.com/@tonykipkemboi"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe <ArrowIcon />
          </Link>
        </div>
        <PopularVideo />
      </section>
    </div>
  )
}
