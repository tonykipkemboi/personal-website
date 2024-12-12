import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://tonykipkemboi.com'

export default async function sitemap() {
  // Blog posts with high priority and frequent updates
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'weekly',
    priority: 0.8
  }))

  // Main routes with different priorities
  let routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/press`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.6
    }
  ]

  return [...routes, ...blogs]
}
