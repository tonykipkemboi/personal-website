import { Suspense } from 'react'
import { getBlogPosts } from './utils'
import { BlogSearch } from 'app/components/blog-search'

export const metadata = {
  title: 'Blog',
  description:
    'Field notes from Tony Kipkemboi on building AI agents, fine-tuning models, and shipping developer tools.',
}

const SHELL = 'mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-20'
const LABEL = 'text-xs font-medium uppercase tracking-[0.18em] text-neutral-400'

async function BlogList() {
  const posts = await getBlogPosts()
  const data = posts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata,
  }))
  return <BlogSearch posts={data} />
}

export default function Page() {
  return (
    <section className={`${SHELL} pt-10 pb-24`}>
      <span className={LABEL}>Writing</span>
      <h1 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]">
        Field notes from the workbench
      </h1>
      <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-neutral-500">
        I write down what I am building, what broke, what surprised me, and the
        mental models I want to keep. Some tutorials, some opinions,
        occasionally both.
      </p>

      <div className="mt-10">
        <Suspense
          fallback={
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between border-t border-neutral-200 py-5"
                >
                  <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-100" />
                  <div className="h-4 w-20 animate-pulse rounded bg-neutral-100" />
                </div>
              ))}
            </div>
          }
        >
          <BlogList />
        </Suspense>
      </div>
    </section>
  )
}
