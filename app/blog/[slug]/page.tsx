import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { ElevenLabsPlayer } from 'app/components/elevenlabs-player'
import { formatDate, getBlogPosts, calculateReadingTime } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface PageParams {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageParams) {
  const posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    return {}
  }

  const {
    title,
    publishedAt: publishedTime,
    summary,
    description,
    keywords,
    image,
  } = post.metadata

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
      ...(image
        ? {
            images: [
              {
                url: image,
                width: 1200,
                height: 630,
                alt: `${title} - Tony Kipkemboi's Blog`,
              },
            ],
          }
        : {
            images: [
              {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Tony Kipkemboi - Developer Advocate and Community Builder',
              },
            ],
          }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || summary,
      creator: '@tonykipkemboi',
      ...(image
        ? {
            images: [image],
          }
        : {
            images: [`${baseUrl}/og-image.png`],
          }),
    },
  }
}

export default async function BlogPost({ params }: PageParams) {
  const posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.publishedAt,
    description: post.metadata.description || post.metadata.summary,
    image: post.metadata.image || `${baseUrl}/og-image.png`,
    url: `${baseUrl}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: post.metadata.author || 'Tony Kipkemboi',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Tony Kipkemboi',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
    ...(post.metadata.keywords && { keywords: post.metadata.keywords }),
    ...(post.metadata.category && { articleSection: post.metadata.category }),
    wordCount: post.content.trim().split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <h1 className="text-2xl font-medium tracking-tighter max-w-[650px]">
        {post.metadata.title}
      </h1>
      <div className="flex flex-col gap-2 mt-2 mb-8 text-sm max-w-[650px]">
        <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
          <p>{formatDate(post.metadata.publishedAt)}</p>
          <span>•</span>
          <p>{readingTime} min read</p>
          {post.metadata.category && (
            <>
              <span>•</span>
              <Link
                href={`/blog/category/${post.metadata.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                {post.metadata.category}
              </Link>
            </>
          )}
        </div>
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
      <ElevenLabsPlayer publicUserId="4d1408eed0a43d9837f0ae1fca22c2d6c41b9797ff457b7c74dbc66105fd238f" />
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
