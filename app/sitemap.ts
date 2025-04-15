import { MetadataRoute } from 'next'
import { getBlogPosts } from './blog/utils'

export const baseUrl = 'https://tonykipkemboi.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blog posts
  const posts = await getBlogPosts()
  const blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
  }))

  // Static pages
  const routes = ['', '/blog', '/projects', '/press'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...blogs]
}
