import { getBlogPosts } from 'app/blog/utils'
import { MetadataRoute } from 'next'

export const baseUrl = 'https://tonykipkemboi.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blog posts
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
  }))

  // Main routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date().toISOString(),
    }
  ]

  return [...routes, ...blogs]
}
