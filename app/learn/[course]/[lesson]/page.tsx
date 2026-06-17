import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { baseUrl } from 'app/sitemap'
import { courseCatalog, getCourseLessons, getLesson } from '../../utils'

type PageParams = {
  params: Promise<{
    course: string
    lesson: string
  }>
}

export async function generateStaticParams() {
  const params = await Promise.all(
    courseCatalog.map(async (course) => {
      const lessons = await getCourseLessons(course.slug)

      return lessons.map((lesson) => ({
        course: course.slug,
        lesson: lesson.slug,
      }))
    })
  )

  return params.flat()
}

export async function generateMetadata({ params }: PageParams) {
  const { course: courseSlug, lesson: lessonSlug } = await params
  const result = await getLesson(courseSlug, lessonSlug)

  if (!result) {
    return {}
  }

  const { course, lesson } = result
  const description = lesson.metadata.description || lesson.metadata.summary

  return {
    title: `${lesson.metadata.title} - ${course.metadata.title}`,
    description,
    openGraph: {
      title: lesson.metadata.title,
      description,
      type: 'article',
      url: `${baseUrl}/learn/${course.metadata.slug}/${lesson.slug}`,
      images: lesson.metadata.image
        ? [
            {
              url: lesson.metadata.image,
              width: 1536,
              height: 864,
              alt: `${lesson.metadata.title} illustration`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: lesson.metadata.title,
      description,
      creator: '@tonykipkemboi',
      images: lesson.metadata.image ? [lesson.metadata.image] : undefined,
    },
  }
}

export default async function LessonPage({ params }: PageParams) {
  const { course: courseSlug, lesson: lessonSlug } = await params
  const result = await getLesson(courseSlug, lessonSlug)

  if (!result) {
    notFound()
  }

  const { course, lesson } = result
  const index = course.lessons.findIndex((item) => item.slug === lesson.slug)
  const previousLesson = index > 0 ? course.lessons[index - 1] : null
  const nextLesson =
    index < course.lessons.length - 1 ? course.lessons[index + 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lesson.metadata.title,
    description: lesson.metadata.description || lesson.metadata.summary,
    url: `${baseUrl}/learn/${course.metadata.slug}/${lesson.slug}`,
    dateModified: lesson.metadata.updatedAt,
    isPartOf: {
      '@type': 'Course',
      name: course.metadata.title,
      url: `${baseUrl}/learn/${course.metadata.slug}`,
    },
    author: {
      '@type': 'Person',
      name: 'Tony Kipkemboi',
      url: baseUrl,
    },
  }

  return (
    <section className="mx-auto w-full max-w-[1120px] px-6 pt-10 pb-20 sm:px-8 lg:px-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href={`/learn/${course.metadata.slug}`}
        className="text-sm text-neutral-400 transition-colors hover:text-[#0a0a0a]"
      >
        ← {course.metadata.title}
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-[220px_minmax(0,720px)]">
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              Lessons
            </span>
            <nav className="mt-5 space-y-3" aria-label="Course lessons">
              {course.lessons.map((item) => {
                const active = item.slug === lesson.slug

                return (
                  <Link
                    key={item.slug}
                    href={`/learn/${course.metadata.slug}/${item.slug}`}
                    className={`block text-sm leading-relaxed transition-colors ${
                      active
                        ? 'text-[#0a0a0a]'
                        : 'text-neutral-400 hover:text-[#0a0a0a]'
                    }`}
                  >
                    {String(item.metadata.order).padStart(2, '0')}.{' '}
                    {item.metadata.title}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
            Lesson {lesson.metadata.order} · {lesson.readingTime} min
          </div>

          <h1 className="mt-4 text-[clamp(2rem,4vw,2.875rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[#0a0a0a]">
            {lesson.metadata.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-neutral-500">
            {lesson.metadata.summary}
          </p>

          <article className="prose mt-12">
            <CustomMDX source={lesson.content} />
          </article>

          <div className="mt-12 border-t border-neutral-200 pt-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {previousLesson ? (
                <Link
                  href={`/learn/${course.metadata.slug}/${previousLesson.slug}`}
                  className="text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
                >
                  ← {previousLesson.metadata.title}
                </Link>
              ) : (
                <span />
              )}

              {nextLesson ? (
                <Link
                  href={`/learn/${course.metadata.slug}/${nextLesson.slug}`}
                  className="text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
                >
                  {nextLesson.metadata.title} →
                </Link>
              ) : (
                <Link
                  href={`/learn/${course.metadata.slug}`}
                  className="text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
                >
                  Course overview →
                </Link>
              )}
            </div>

            <p className="mt-8 text-sm text-neutral-400">
              © 2026 Tony Kipkemboi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
