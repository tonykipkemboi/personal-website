import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press',
  description: 'Media appearances, talks, and press coverage.',
}

interface MediaAppearance {
  title: string
  type: 'podcast' | 'article' | 'talk' | 'video'
  source: string
  date: string
  link: string
  description: string
  image?: string
}

const appearances: MediaAppearance[] = [
  // items will be sorted below
]

// Unsorted list (copied from previous appearances array)
const unsortedAppearances: MediaAppearance[] = [
  {
    title: "Build agentic systems with CrewAI and Amazon Bedrock",
    type: "article",
    source: "AWS Machine Learning Blog",
    date: "2025-03-31",
    link: "https://aws.amazon.com/blogs/machine-learning/build-agentic-systems-with-crewai-and-amazon-bedrock/",
    description: "Co-authored an AWS ML Blog post on building agentic systems with CrewAI and Amazon Bedrock, empowering developers to build sophisticated AI agent workflows.",
  },
  {
    title: "PyCon US 2024 Speaker",
    type: "talk",
    source: "PyCon US",
    date: "2024-05-15",
    link: "https://us.pycon.org/2024/speaker/profile/90/index.html",
    description: "Selected speaker at PyCon US 2024, the largest annual gathering for the Python programming community.",
  },
  {
    title: "C.I.S. Strong: Meet Tony Kipkemboi",
    type: "article",
    source: "Penn Engineering Blog",
    date: "2023-11-15",
    link: "https://blog.cis.upenn.edu/c-i-s-strong-meet-tony-kipkemboi/",
    description: "Featured in Penn Engineering's CIS Strong series, highlighting my journey in computer science and contributions to the tech community.",
  },
  {
    title: "Ripple Ventures Fellowship",
    type: "article",
    source: "Ripple Ventures",
    date: "2023-09-01",
    link: "https://www.fellowship.rippleventures.com/school/university-of-pennsylvania",
    description: "Featured in Ripple Ventures' fellowship program at the University of Pennsylvania.",
  }
];

// Sort by date descending
unsortedAppearances.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
appearances.push(...unsortedAppearances);

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function PressPage() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8 text-neutral-900 dark:text-neutral-100">
        online footprint
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        some places i’ve appeared or spoken. podcasts, interviews, articles, and talks.
      </p>

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {appearances.map((appearance, index) => (
          <Link
            key={index}
            href={appearance.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <article className="group relative flex flex-col md:flex-row gap-6 rounded-lg border border-neutral-200 p-6 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
              {appearance.image && (
                <div className="relative w-full md:w-48 h-48 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={appearance.image}
                    alt={appearance.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <span className="capitalize">{appearance.type}</span>
                  <span>•</span>
                  <span>{appearance.source}</span>
                  <span>•</span>
                  <time dateTime={appearance.date}>{formatDate(appearance.date)}</time>
                </div>

                <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 mb-2">
                  {appearance.title}
                </h2>

                <p className="text-neutral-600 dark:text-neutral-400">
                  {appearance.description}
                </p>

                <div className="mt-4 flex items-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                  <span className="text-sm">Read more</span>
                  <svg
                    className="ml-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
