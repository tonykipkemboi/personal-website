import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  description?: string
  author?: string
  category?: string
  tags?: string[]
  keywords?: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: any = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    const trimmedKey = key.trim()

    // Handle array values (e.g., tags: ['AI Agents', 'Security'])
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayValue = value.slice(1, -1).split(',').map(item =>
        item.trim().replace(/^['"]|['"]$/g, '')
      )
      metadata[trimmedKey] = arrayValue
    } else {
      metadata[trimmedKey] = value
    }
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

async function readMDXFile(filePath: string) {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

async function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  const postsPromises = mdxFiles.map(async (file) => {
    const slug = path.basename(file, '.mdx')
    const { metadata, content } = await readMDXFile(path.join(dir, file))
    return {
      metadata,
      slug,
      content,
    }
  })
  return Promise.all(postsPromises)
}

export async function getBlogPosts() {
  const posts = await getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
  return posts.sort((a, b) => {
    if (a.metadata.publishedAt > b.metadata.publishedAt) return -1
    if (a.metadata.publishedAt < b.metadata.publishedAt) return 1
    return 0
  })
}

export async function getBlogPostsByTag(tag: string) {
  const posts = await getBlogPosts()
  return posts.filter(post =>
    post.metadata.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export async function getBlogPostsByCategory(category: string) {
  const posts = await getBlogPosts()
  return posts.filter(post =>
    post.metadata.category?.toLowerCase() === category.toLowerCase()
  )
}

export async function getAllTags() {
  const posts = await getBlogPosts()
  const tagsSet = new Set<string>()
  posts.forEach(post => {
    post.metadata.tags?.forEach(tag => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

export async function getAllCategories() {
  const posts = await getBlogPosts()
  const categoriesSet = new Set<string>()
  posts.forEach(post => {
    if (post.metadata.category) {
      categoriesSet.add(post.metadata.category)
    }
  })
  return Array.from(categoriesSet).sort()
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return readingTime
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  // Calculate time difference in milliseconds
  let timeDiff = currentDate.getTime() - targetDate.getTime()
  let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

  let formattedDate = ''

  if (daysDiff < 0) {
    formattedDate = 'Future'
  } else if (daysDiff === 0) {
    formattedDate = 'Today'
  } else {
    formattedDate = `${daysDiff}d ago`
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
