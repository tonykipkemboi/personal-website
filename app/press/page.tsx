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
    title: "MLOps World Conference - Austin",
    type: "talk",
    source: "MLOps World",
    date: "2025-10-08",
    link: "https://mlopsworld.com/speakers/",
    description: "Speaker at MLOps World demonstrating how agent orchestration, paired with rigorous evaluation, accelerates the path from prototype to production.",
  },
  {
    title: "IBM TechXchange Conference",
    type: "talk",
    source: "IBM",
    date: "2025-10-06",
    link: "https://www.linkedin.com/posts/tonykipkemboi_ibmtechxchange-activity-7381001218820681728-Njde/",
    description: "Speaker at IBM TechXchange Conference 2025, discussing AI agents and enterprise AI adoption strategies.",
  },
  {
    title: "Building AI Agents with CrewAI - DataCamp Course",
    type: "video",
    source: "DataCamp",
    date: "2025-10-01",
    link: "https://www.datacamp.com/courses/building-ai-agents-with-crewai",
    description: "Published a comprehensive course teaching developers how to build AI agent systems with CrewAI, covering Agent, Task, and Crew components to create an AI content-generator pipeline.",
  },
  {
    title: "Creating a Podcast Generation AI Multi-Agent - DataCamp Code-Along",
    type: "video",
    source: "DataCamp",
    date: "2025-08-13",
    link: "https://www.datacamp.com/code-along/creating-a-podcast-generation-ai-multi-agent-with-crew-ai",
    description: "Interactive code-along tutorial teaching how to use CrewAI to build a multi-agent system that generates podcast-style audio from text.",
  },
  {
    title: "ODSC AI X Podcast - AI Agents",
    type: "podcast",
    source: "Open Data Science Conference",
    date: "2025-06-11",
    link: "https://podcasts.apple.com/us/podcast/odsc-east-2025-minisodes/id1721516836?i=1000712490491",
    description: "Featured on ODSC's AI X Podcast discussing foundational AI agent building skills, practical implementation strategies, and how AI agents are transforming business operations.",
  },
  {
    title: "Convergence 2025 - GenAI Engineering Conference",
    type: "talk",
    source: "Comet ML",
    date: "2025-05-13",
    link: "https://www.comet.com/site/about-us/news-and-events/events/convergence-2025/",
    description: "Speaking at Convergence 2025, Comet's virtual conference on GenAI Engineering, covering AI agent orchestration and multi-agent systems.",
  },
  {
    title: "Build agentic systems with CrewAI and Amazon Bedrock",
    type: "article",
    source: "AWS Machine Learning Blog",
    date: "2025-03-31",
    link: "https://aws.amazon.com/blogs/machine-learning/build-agentic-systems-with-crewai-and-amazon-bedrock/",
    description: "Co-authored an AWS ML Blog post on building agentic systems with CrewAI and Amazon Bedrock, empowering developers to build sophisticated AI agent workflows.",
  },
  {
    title: "ODSC East 2025 Workshop",
    type: "talk",
    source: "Open Data Science Conference",
    date: "2025-05-13",
    link: "https://odsc.com/boston/",
    description: "Led a highly attended workshop on 'Agentic AI in Action: Build Autonomous, Multi-Agent Systems Hands-On in Python' teaching foundational AI agent building skills.",
  },
  {
    title: "Guest Lecture at Harvard Kennedy School",
    type: "talk",
    source: "Harvard University",
    date: "2025-02-27",
    link: "https://www.linkedin.com/posts/tonykipkemboi_aiagents-hks-activity-7301069792810008576-H7os/",
    description: "Guest speaker on AI agents for Prof. Hu's data and information visualization class, discussing AI agent systems with students.",
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
    date: "2020-08-28",
    link: "https://blog.cis.upenn.edu/c-i-s-strong-meet-tony-kipkemboi/",
    description: "Featured in Penn Engineering's CIS Strong series, highlighting my journey in computer science and contributions to the tech community.",
  },
  {
    title: "Ripple Ventures Fellowship",
    type: "article",
    source: "Ripple Ventures",
    date: "2021-08-01",
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
        Online Footprint
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Some places I've appeared or spoken. Podcasts, interviews, articles, and talks.
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
