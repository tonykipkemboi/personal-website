import fs from 'fs'
import path from 'path'
import { calculateReadingTime } from 'app/blog/utils'

export type CourseMetadata = {
  slug: string
  title: string
  summary: string
  description: string
  level: string
  status: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  sources?: {
    title: string
    href: string
    description: string
  }[]
}

export type LessonMetadata = {
  title: string
  summary: string
  description?: string
  order: number
  updatedAt: string
  image?: string
}

export type Lesson = {
  slug: string
  metadata: LessonMetadata
  content: string
  readingTime: number
}

export type Course = {
  metadata: CourseMetadata
  lessons: Lesson[]
}

export const courseCatalog: CourseMetadata[] = [
  {
    slug: 'lora-101',
    title: 'LoRA 101',
    summary:
      'A plain-English guide to how Low-Rank Adaptation makes fine-tuning smaller, cheaper, and easier to swap.',
    description:
      'Start with the mental model, then learn why low-rank adapters work, how LoRA training differs from full fine-tuning, and when QLoRA or full fine-tuning makes more sense.',
    level: 'Beginner',
    status: 'First pass',
    publishedAt: '2026-06-17',
    updatedAt: '2026-06-17',
    tags: ['LoRA', 'Fine-tuning', 'Adapters', 'QLoRA'],
    sources: [
      {
        title: 'LoRA: Low-Rank Adaptation of Large Language Models',
        href: 'https://arxiv.org/abs/2106.09685',
        description: 'The original LoRA paper from Hu et al.',
      },
      {
        title: 'QLoRA: Efficient Finetuning of Quantized LLMs',
        href: 'https://arxiv.org/abs/2305.14314',
        description: 'The QLoRA paper from Dettmers et al.',
      },
      {
        title: 'Hugging Face PEFT LoRA Guide',
        href: 'https://huggingface.co/docs/peft/en/developer_guides/lora',
        description: 'Practical implementation documentation for PEFT LoRA.',
      },
      {
        title: 'Thinking Machines LoRA Primer',
        href: 'https://tinker-docs.thinkingmachines.ai/tinker/lora-primer/',
        description:
          'Product-oriented LoRA guidance on rank, capacity, target modules, and tuning.',
      },
      {
        title: 'Thinking Machines: LoRA Without Regret',
        href: 'https://thinkingmachines.ai/blog/lora/',
        description:
          'A deeper discussion of when LoRA can match full fine-tuning.',
      },
    ],
  },
]

const coursesDir = path.join(process.cwd(), 'app', 'learn', 'courses')

function parseValue(value: string) {
  const trimmed = value.trim().replace(/^['"](.*)['"]$/, '$1')

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed)
  }

  return trimmed
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match) {
    return { metadata: {} as LessonMetadata, content: fileContent.trim() }
  }

  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: any = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    const value = valueArr.join(': ')

    if (!key || !value) return

    metadata[key.trim()] = parseValue(value)
  })

  return { metadata: metadata as LessonMetadata, content }
}

function getLessonFiles(courseSlug: string) {
  const dir = path.join(coursesDir, courseSlug, 'lessons')

  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir)
    .filter((file) => path.extname(file) === '.mdx')
    .map((file) => path.join(dir, file))
}

async function readLessonFile(filePath: string) {
  const rawContent = await fs.promises.readFile(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

export async function getCourseLessons(courseSlug: string): Promise<Lesson[]> {
  const files = getLessonFiles(courseSlug)
  const lessons = await Promise.all(
    files.map(async (filePath) => {
      const slug = path.basename(filePath, '.mdx')
      const { metadata, content } = await readLessonFile(filePath)

      return {
        slug,
        metadata,
        content,
        readingTime: calculateReadingTime(content),
      }
    })
  )

  return lessons.sort((a, b) => a.metadata.order - b.metadata.order)
}

export async function getCourses(): Promise<Course[]> {
  return Promise.all(
    courseCatalog.map(async (metadata) => ({
      metadata,
      lessons: await getCourseLessons(metadata.slug),
    }))
  )
}

export async function getCourse(courseSlug: string): Promise<Course | null> {
  const metadata = courseCatalog.find((course) => course.slug === courseSlug)

  if (!metadata) {
    return null
  }

  return {
    metadata,
    lessons: await getCourseLessons(courseSlug),
  }
}

export async function getLesson(
  courseSlug: string,
  lessonSlug: string
): Promise<{ course: Course; lesson: Lesson } | null> {
  const course = await getCourse(courseSlug)

  if (!course) {
    return null
  }

  const lesson = course.lessons.find((item) => item.slug === lessonSlug)

  if (!lesson) {
    return null
  }

  return { course, lesson }
}

export function getCourseReadingTime(course: Course) {
  return course.lessons.reduce((total, lesson) => total + lesson.readingTime, 0)
}
