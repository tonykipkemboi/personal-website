import { Suspense } from 'react'
import Link from 'next/link'
import { RecentPosts } from './components/recent-posts'
import { HeroBackdrop } from './components/hero-backdrop'
import { baseUrl } from './sitemap'
import { getCourseReadingTime, getCourses } from './learn/utils'

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Tony Kipkemboi',
  url: baseUrl,
  image: `${baseUrl}/headshot.jpg`,
  jobTitle: 'AI Engineer',
  description:
    'AI engineer who builds practical agent systems, model fine-tuning experiments, and developer tools, then turns the lessons into writing, courses, and talks.',
  sameAs: [
    'https://github.com/tonykipkemboi',
    'https://linkedin.com/in/tonykipkemboi',
    'https://x.com/tonykipkemboi',
    'https://www.youtube.com/@tonykipkemboi',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tony Kipkemboi',
  url: baseUrl,
  description:
    'Field notes, courses, and experiments from Tony Kipkemboi on AI agents, model fine-tuning, and developer tools.',
  author: { '@type': 'Person', name: 'Tony Kipkemboi', url: baseUrl },
}

const socialLinks = [
  { href: 'https://github.com/tonykipkemboi', text: 'GitHub' },
  { href: 'https://www.youtube.com/@tonykipkemboi', text: 'YouTube' },
  { href: 'https://linkedin.com/in/tonykipkemboi', text: 'LinkedIn' },
]

const experiments = [
  {
    title: 'Whisper × Kalenjin — a $25 LoRA',
    description:
      "Taught OpenAI's Whisper to hear Kalenjin on a weekend GPU budget. Open weights, real numbers, and the full write-up.",
    links: [
      { text: 'Website ↗', href: 'https://chamgei.com' },
      {
        text: 'GitHub ↗',
        href: 'https://github.com/tonykipkemboi/whisper-kalenjin-lora',
      },
      { text: 'Hugging Face ↗', href: 'https://huggingface.co/Tonykip' },
    ],
  },
  {
    title: 'Rekody — dictation in your terminal',
    description:
      'A fast CLI dictation tool in Rust and Tauri. Like Wispr Flow, but it lives where I actually write and build.',
    links: [
      { text: 'Website ↗', href: 'https://rekody.com' },
      { text: 'GitHub ↗', href: 'https://github.com/rekody/rekody' },
    ],
  },
  {
    title: 'Kalenjin text LoRA — translation',
    description:
      'A small adapter exploring Kalenjin, English, and Swahili translation. Early, useful, still learning.',
    links: [
      { text: 'Website ↗', href: 'https://chamgei.com' },
      { text: 'Hugging Face ↗', href: 'https://huggingface.co/Tonykip' },
    ],
  },
]

const recognition = [
  'PyCon US',
  'Harvard Kennedy School',
  'IBM TechXchange',
  "O'Reilly",
  'MLOps World',
  'ODSC',
  'AWS ML Blog',
  'DataCamp',
].join(' · ')

const SHELL = 'mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-20'
const LABEL = 'text-xs font-medium uppercase tracking-[0.18em] text-neutral-400'

export default async function Page() {
  const courses = await getCourses()

  return (
    <div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <section className="relative">
        <HeroBackdrop />
        <div className={`${SHELL} pt-12 pb-24`}>
          <div className="flex max-w-[820px] flex-col items-start gap-8">
            <span className={LABEL}>AI engineer · builder · writer</span>
            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.035em] text-[#0a0a0a]">
              I make things, learn in public, and mostly use AI to do it.
            </h1>
            <p className="max-w-[540px] text-lg leading-relaxed text-neutral-500">
              This is where I keep what I&apos;m building, learning, and
              thinking through: agents, fine-tuning, small tools, field notes,
              talks, and the experiments I want to remember. Previously CrewAI,
              Snowflake, and Bloomberg. US Army veteran.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-1">
              {socialLinks.map((l) => (
                <a
                  key={l.text}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-neutral-300 pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
                >
                  {l.text} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent field notes */}
      <section className={`${SHELL} pb-20`}>
        <div className="mb-5 flex items-end justify-between">
          <span className={LABEL}>Recent field notes</span>
          <Link
            href="/blog"
            className="border-b border-neutral-300 pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
          >
            All writing ↗
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="space-y-3">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between border-t border-neutral-200 py-5"
                >
                  <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-100" />
                  <div className="h-4 w-20 animate-pulse rounded bg-neutral-100" />
                </div>
              ))}
            </div>
          }
        >
          <RecentPosts limit={7} />
        </Suspense>
      </section>

      {/* Learning guides */}
      <section className={`${SHELL} pb-20`}>
        <div className="mb-5 flex items-end justify-between">
          <span className={LABEL}>Guides I am building</span>
          <Link
            href="/learn"
            className="border-b border-neutral-300 pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
          >
            All guides ↗
          </Link>
        </div>
        <div>
          {courses.map((course) => (
            <Link
              key={course.metadata.slug}
              href={`/learn/${course.metadata.slug}`}
              className="group flex flex-col gap-3 border-t border-neutral-200 py-6 md:flex-row md:items-center md:justify-between md:gap-10"
            >
              <div className="flex flex-col gap-1.5 md:max-w-[680px]">
                <span className="text-[19px] tracking-tight text-[#0a0a0a] transition-opacity group-hover:opacity-60">
                  {course.metadata.title}
                </span>
                <span className="text-sm leading-relaxed text-neutral-500">
                  {course.metadata.summary}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-5 text-sm text-neutral-400">
                <span>{course.lessons.length} lessons</span>
                <span>{getCourseReadingTime(course)} min</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Experiments */}
      <section className={`${SHELL} pb-20`}>
        <div className="mb-5 flex items-end justify-between">
          <span className={LABEL}>Current experiments</span>
          <a
            href="https://github.com/tonykipkemboi"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-neutral-300 pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
          >
            More on GitHub ↗
          </a>
        </div>
        <div>
          {experiments.map((exp) => (
            <div
              key={exp.title}
              className="flex flex-col gap-3 border-t border-neutral-200 py-6 md:flex-row md:items-center md:justify-between md:gap-10"
            >
              <div className="flex flex-col gap-1.5 md:max-w-[680px]">
                <span className="text-[19px] tracking-tight text-[#0a0a0a]">
                  {exp.title}
                </span>
                <span className="text-sm leading-relaxed text-neutral-500">
                  {exp.description}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                {exp.links.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className={`${SHELL} pb-24`}>
        <div className="flex flex-col gap-6 md:flex-row md:gap-20">
          <span className={`${LABEL} md:w-48 md:shrink-0 md:pt-1`}>
            Taught, spoken &amp; featured
          </span>
          <p className="max-w-[760px] text-2xl leading-snug tracking-tight text-[#0a0a0a]">
            {recognition}
          </p>
        </div>
      </section>
    </div>
  )
}
