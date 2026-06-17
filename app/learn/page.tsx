import Link from 'next/link'
import { getCourseReadingTime, getCourses } from './utils'

export const metadata = {
  title: 'Learn',
  description:
    'Distilled guides from what Tony Kipkemboi is learning and testing in AI agents, fine-tuning, and developer tools.',
}

const SHELL = 'mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-20'
const LABEL = 'text-xs font-medium uppercase tracking-[0.18em] text-neutral-400'

export default async function Page() {
  const courses = await getCourses()

  return (
    <section className={`${SHELL} pt-10 pb-24`}>
      <span className={LABEL}>Learning</span>
      <h1 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]">
        Guides from what I am learning
      </h1>
      <p className="mt-5 max-w-[620px] text-lg leading-relaxed text-neutral-500">
        These are the notes I wish I had at the start: small courses, mental
        models, diagrams, and practical tradeoffs from things I am actively
        learning or building.
      </p>

      <div className="mt-12">
        {courses.map((course) => {
          const lessonCount = course.lessons.length
          const readingTime = getCourseReadingTime(course)

          return (
            <Link
              key={course.metadata.slug}
              href={`/learn/${course.metadata.slug}`}
              className="group block border-t border-neutral-200 py-7"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-10">
                <div className="max-w-[720px]">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">
                    <span>{course.metadata.level}</span>
                    <span>{course.metadata.status}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-medium tracking-tight text-[#0a0a0a] transition-opacity group-hover:opacity-60">
                    {course.metadata.title}
                  </h2>
                  <p className="mt-3 max-w-[620px] text-base leading-relaxed text-neutral-500">
                    {course.metadata.summary}
                  </p>
                </div>

                <div className="flex shrink-0 gap-6 text-sm text-neutral-400 md:pt-9">
                  <span>{lessonCount} lessons</span>
                  <span>{readingTime} min</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
