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
    'AI engineer who builds AI agents, automations, and developer tools, writes about the agent space, and helps organizations figure out where AI fits in their workflows.',
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
    'AI engineer and content creator building AI agents, automations, and developer tools.',
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
      "Taught OpenAI's Whisper a 100th language on a weekend GPU budget. Open weights + write-up.",
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
      'A fast CLI dictation tool in Rust + Tauri. Like Wispr Flow, but it lives where I work.',
    links: [
      { text: 'Website ↗', href: 'https://rekody.com' },
      { text: 'GitHub ↗', href: 'https://github.com/rekody/rekody' },
    ],
  },
  {
    title: 'Kalenjin text LoRA — translation',
    description:
      'An adapter exploring Kalenjin ↔ English / Swahili translation. Early, ongoing.',
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
            <span className={LABEL}>AI Engineer · United States</span>
            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.035em] text-[#0a0a0a]">
              I build AI agents and the tools around them.
            </h1>
            <p className="max-w-[540px] text-lg leading-relaxed text-neutral-500">
              Agents, automations, and developer tools — with a bias for
              shipping. Previously CrewAI, Snowflake &amp; Bloomberg. US Army
              veteran. I write, speak, and teach about building with AI agents.
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

      {/* Selected writing */}
      <section className={`${SHELL} pb-20`}>
        <div className="mb-5 flex items-end justify-between">
          <span className={LABEL}>Selected writing</span>
          <Link
            href="/blog"
            className="border-b border-neutral-300 pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
          >
            All posts ↗
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

      {/* Learning paths */}
      <section className={`${SHELL} pb-20`}>
        <div className="mb-5 flex items-end justify-between">
          <span className={LABEL}>Learning paths</span>
          <Link
            href="/learn"
            className="border-b border-neutral-300 pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
          >
            All courses ↗
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
          <span className={LABEL}>Experiments I&apos;m running</span>
          <a
            href="https://github.com/tonykipkemboi"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-neutral-300 pb-0.5 text-sm text-[#0a0a0a] transition-opacity hover:opacity-60"
          >
            All on GitHub ↗
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
            Spoken at &amp; featured
          </span>
          <p className="max-w-[760px] text-2xl leading-snug tracking-tight text-[#0a0a0a]">
            {recognition}
          </p>
        </div>
      </section>
    </div>
  )
}
