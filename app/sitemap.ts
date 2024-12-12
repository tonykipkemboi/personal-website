import { getBlogPosts } from 'app/blog/utils'
import { MetadataRoute } from 'next'

export const baseUrl = 'https://tonykipkemboi.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blog posts with high priority and frequent updates
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  // Main routes with different priorities
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }
  ]

  return [...routes, ...blogs]
}
