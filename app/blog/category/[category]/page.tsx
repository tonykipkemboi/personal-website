import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogPostsByCategory,
  getAllCategories,
  formatDate,
} from '../../utils'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categoryParam } = await params
  const category = decodeURIComponent(categoryParam).replace(/-/g, ' ')
  const posts = await getBlogPostsByCategory(category)

  if (posts.length === 0) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category} | Tony Kipkemboi`,
    description: `Browse all ${category.toLowerCase()} posts. ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} in this category.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: categoryParam } = await params
  const category = decodeURIComponent(categoryParam).replace(/-/g, ' ')
  const posts = await getBlogPostsByCategory(category)

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
        Category
      </span>
      <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.03em] text-[#0a0a0a]">
        {category}
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
          </Link>
        ))}
      </div>
    </section>
  )
}
