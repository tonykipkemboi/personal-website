import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CustomMDX } from 'app/components/mdx'
import { Comments } from 'app/components/comments'
import {
  formatDate,
  getBlogPosts,
  calculateReadingTime,
  getPostOgImage,
  getPostOgCard,
} from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface PageParams {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params
  const posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return {}
  }

  const {
    title,
    publishedAt: publishedTime,
    summary,
    description,
    keywords,
  } = post.metadata

  // Composite the post's hero into a pixel-perfect 1200x630 social card.
  const ogCard = getPostOgCard(post, baseUrl)

  return {
    title,
    description: description || summary,
    keywords,
    openGraph: {
      title,
      description: description || summary,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogCard,
          width: 1200,
          height: 630,
          alt: `${title} - Tony Kipkemboi`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || summary,
      creator: '@tonykipkemboi',
      images: [ogCard],
    },
  }
}

export default async function BlogPost({ params }: PageParams) {
  const { slug } = await params
  const posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.content)
  const category = post.metadata.category

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.description || post.metadata.summary,
    image: getPostOgImage(post, baseUrl),
    url: `${baseUrl}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: post.metadata.author || 'Tony Kipkemboi',
      url: baseUrl,
    },
    publisher: { '@type': 'Person', name: 'Tony Kipkemboi', url: baseUrl },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    ...(post.metadata.keywords && { keywords: post.metadata.keywords }),
    ...(category && { articleSection: category }),
    wordCount: post.content.trim().split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
  }

  return (
    <section className="mx-auto w-full max-w-[720px] px-6 pt-10 pb-20 sm:px-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/blog"
        className="text-sm text-neutral-400 transition-colors hover:text-[#0a0a0a]"
      >
        ← All writing
      </Link>

      {category && (
        <Link
          href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="mt-7 block text-xs font-medium uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-[#0a0a0a]"
        >
          {category}
        </Link>
      )}

      <h1 className="mt-4 text-[clamp(2rem,4vw,2.875rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#0a0a0a]">
        {post.metadata.title}
      </h1>

      <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500">
        <Image
          src="/headshot.jpg"
          alt="Tony Kipkemboi"
          width={28}
          height={28}
          className="rounded-full object-cover"
        />
        <span className="text-[#0a0a0a]">Tony Kipkemboi</span>
        <span className="text-neutral-300">·</span>
        <time dateTime={post.metadata.publishedAt}>
          {formatDate(post.metadata.publishedAt)}
        </time>
        <span className="text-neutral-300">·</span>
        <span>{readingTime} min read</span>
      </div>

      <article className="prose mt-12">
        <CustomMDX source={post.content} />
      </article>

      <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-8">
        <span className="text-sm text-neutral-400">Thanks for reading.</span>
        <Link
          href="/blog"
          className="text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
        >
          ← All writing
        </Link>
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-medium tracking-tight text-[#0a0a0a]">
            Discussion
          </h2>
          <span className="text-[13px] text-neutral-400">
            via GitHub Discussions
          </span>
        </div>
        <Comments />
      </div>
    </section>
  )
}
