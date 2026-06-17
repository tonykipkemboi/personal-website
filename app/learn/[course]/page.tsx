import Link from 'next/link'
import { notFound } from 'next/navigation'
import { courseCatalog, getCourse, getCourseReadingTime } from '../utils'
import { baseUrl } from 'app/sitemap'

const SHELL = 'mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-20'
const LABEL = 'text-xs font-medium uppercase tracking-[0.18em] text-neutral-400'

type PageParams = {
  params: Promise<{
    course: string
  }>
}

export async function generateStaticParams() {
  return courseCatalog.map((course) => ({
    course: course.slug,
  }))
}

export async function generateMetadata({ params }: PageParams) {
  const { course: courseSlug } = await params
  const course = await getCourse(courseSlug)

  if (!course) {
    return {}
  }

  return {
    title: course.metadata.title,
    description: course.metadata.description,
    openGraph: {
      title: course.metadata.title,
      description: course.metadata.description,
      type: 'article',
      url: `${baseUrl}/learn/${course.metadata.slug}`,
      images: [
        {
          url: '/learn/lora-101/01-lora-sidecar-tony.png',
          width: 1536,
          height: 864,
          alt: `${course.metadata.title} course illustration`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: course.metadata.title,
      description: course.metadata.description,
      creator: '@tonykipkemboi',
      images: ['/learn/lora-101/01-lora-sidecar-tony.png'],
    },
  }
}

export default async function CoursePage({ params }: PageParams) {
  const { course: courseSlug } = await params
  const course = await getCourse(courseSlug)

  if (!course) {
    notFound()
  }

  const firstLesson = course.lessons[0]
  const readingTime = getCourseReadingTime(course)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.metadata.title,
    description: course.metadata.description,
    url: `${baseUrl}/learn/${course.metadata.slug}`,
    datePublished: course.metadata.publishedAt,
    dateModified: course.metadata.updatedAt,
    provider: {
      '@type': 'Person',
      name: 'Tony Kipkemboi',
      url: baseUrl,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `PT${readingTime}M`,
    },
  }

  return (
    <section className={`${SHELL} pt-10 pb-24`}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/learn"
        className="text-sm text-neutral-400 transition-colors hover:text-[#0a0a0a]"
      >
        ← All courses
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <span className={LABEL}>Learning path</span>
          <h1 className="mt-5 max-w-[760px] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]">
            {course.metadata.title}
          </h1>
          <p className="mt-5 max-w-[680px] text-lg leading-relaxed text-neutral-500">
            {course.metadata.description}
          </p>

          {firstLesson && (
            <Link
              href={`/learn/${course.metadata.slug}/${firstLesson.slug}`}
              className="mt-8 inline-flex border-b border-[#0a0a0a] pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
            >
              Start course →
            </Link>
          )}
        </div>

        <aside className="border-t border-neutral-200 pt-6 lg:mt-11">
          <dl className="grid grid-cols-2 gap-y-5 text-sm lg:grid-cols-1">
            <div>
              <dt className="text-neutral-400">Level</dt>
              <dd className="mt-1 text-[#0a0a0a]">{course.metadata.level}</dd>
            </div>
            <div>
              <dt className="text-neutral-400">Length</dt>
              <dd className="mt-1 text-[#0a0a0a]">
                {course.lessons.length} lessons · {readingTime} min
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Updated</dt>
              <dd className="mt-1 text-[#0a0a0a]">
                {course.metadata.updatedAt}
              </dd>
            </div>
            <div>
              <dt className="text-neutral-400">Rights</dt>
              <dd className="mt-1 text-[#0a0a0a]">© 2026 Tony Kipkemboi</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <span className={LABEL}>Lessons</span>
          <span className="text-sm text-neutral-400">
            Add future lessons as MDX files
          </span>
        </div>

        <div>
          {course.lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/learn/${course.metadata.slug}/${lesson.slug}`}
              className="group flex flex-col gap-3 border-t border-neutral-200 py-6 sm:flex-row sm:items-start sm:gap-8"
            >
              <span className="w-12 shrink-0 text-sm tabular-nums text-neutral-400">
                {String(lesson.metadata.order).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-medium tracking-tight text-[#0a0a0a] transition-opacity group-hover:opacity-60">
                  {lesson.metadata.title}
                </h2>
                <p className="mt-2 max-w-[680px] text-sm leading-relaxed text-neutral-500">
                  {lesson.metadata.summary}
                </p>
              </div>
              <span className="shrink-0 text-sm text-neutral-400">
                {lesson.readingTime} min
              </span>
            </Link>
          ))}
        </div>
      </div>

      {course.metadata.sources && course.metadata.sources.length > 0 && (
        <div className="mt-16">
          <span className={LABEL}>Sources</span>
          <div className="mt-5">
            {course.metadata.sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-t border-neutral-200 py-5"
              >
                <h2 className="text-base font-medium tracking-tight text-[#0a0a0a] transition-opacity group-hover:opacity-60">
                  {source.title} ↗
                </h2>
                <p className="mt-2 max-w-[700px] text-sm leading-relaxed text-neutral-500">
                  {source.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
