import { MetadataRoute } from 'next'
import { getBlogPosts, getAllTags, getAllCategories } from './blog/utils'

export const baseUrl = 'https://tonykipkemboi.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Blog posts
  const posts = await getBlogPosts()
  const blogs = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Tag pages
  const tags = await getAllTags()
  const tagPages = tags.map((tag) => ({
    url: `${baseUrl}/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Category pages
  const categories = await getAllCategories()
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Static pages
  const routes = ['', '/blog', '/projects', '/press'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }))

  return [...routes, ...blogs, ...tagPages, ...categoryPages]
}
