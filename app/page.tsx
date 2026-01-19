import { Suspense } from 'react'
import Link from 'next/link'
import { LatestPost } from './components/latest-post'
import { LatestProject } from './components/latest-project'
import { PopularVideo } from './components/latest-video'
import { ArrowIcon } from './components/icons'

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
      <section>
        <div className="flex justify-between items-center mb-6">
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

      {/* Featured Project Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">Featured Project</h2>
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
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">Most Popular Video</h2>
          <a
            href="https://www.youtube.com/@tonykipkemboi"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1"
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
