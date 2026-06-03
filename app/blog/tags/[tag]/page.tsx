import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPostsByTag, getAllTags, formatDate } from '../../utils'

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag: tagParam } = await params
  const tag = decodeURIComponent(tagParam).replace(/-/g, ' ')
  const posts = await getBlogPostsByTag(tag)

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `Posts tagged with "${tag}" | Tony Kipkemboi`,
    description: `Browse all blog posts tagged with ${tag}. ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} about ${tag}.`,
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag: tagParam } = await params
  const tag = decodeURIComponent(tagParam).replace(/-/g, ' ')
  const posts = await getBlogPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <section className="mx-auto w-full max-w-[1240px] px-6 pt-10 pb-24 sm:px-10 lg:px-20">
      <Link
        href="/blog"
        className="text-sm text-neutral-400 transition-colors hover:text-[#0a0a0a]"
      >
        ← All writing
      </Link>
      <span className="mt-7 block text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
        Tagged
      </span>
      <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
        #{tag}
      </h1>

      <div className="mt-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center gap-6 border-t border-neutral-200 py-5"
          >
            <time
              dateTime={post.metadata.publishedAt}
              className="w-28 shrink-0 text-sm tabular-nums text-neutral-400"
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
    </section>
  )
}
