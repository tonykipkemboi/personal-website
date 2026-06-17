import type { Metadata } from 'next'
import { FilteredAppearances } from '../components/press-filter'

export const metadata: Metadata = {
  title: 'Press',
  description:
    'Talks, courses, podcasts, and features from Tony Kipkemboi on AI agents, fine-tuning, and production AI systems.',
}

export interface MediaAppearance {
  title: string
  type: 'podcast' | 'article' | 'talk' | 'video'
  source: string
  date: string
  link: string
  description: string
  image?: string
}

const appearancesData: MediaAppearance[] = [
  {
    title: "Guest Lecture at Harvard Kennedy School — Prof. Hong Qu's class",
    type: 'talk',
    source: 'Harvard University',
    date: '2026-03-15',
    link: 'https://www.linkedin.com/posts/tonykipkemboi_back-at-harvard-kennedy-school-today-for-activity-7435380054898925568-IzQw',
    description:
      "Returned to Harvard Kennedy School as a guest lecturer for Professor Hong Qu's class, speaking on AI agents and how they reshape real-world workflows.",
  },
  {
    title: "O'Reilly AI Catalyst: Enterprise Agent Deployments",
    type: 'video',
    source: "O'Reilly Media",
    date: '2025-11-18',
    link: 'https://www.oreilly.com/live-events/ai-catalyst-enterprise-agent-deployments/0642572250188/',
    description:
      "Presented 'How Enterprises Operationalize Multi-Agent Teams with CrewAI' covering architectural patterns, agent collaboration strategies, and operational scaling for enterprise deployments.",
  },
  {
    title: 'MLOps World Conference - Austin',
    type: 'talk',
    source: 'MLOps World',
    date: '2025-10-08',
    link: 'https://mlopsworld.com/speakers/',
    description:
      'Speaker at MLOps World demonstrating how agent orchestration, paired with rigorous evaluation, accelerates the path from prototype to production.',
  },
  {
    title: "O'Reilly AI Superstream: AI Agents",
    type: 'video',
    source: "O'Reilly Media",
    date: '2025-06-15',
    link: 'https://www.oreilly.com/live-events/ai-superstream-ai-agents/0642572016299/',
    description:
      "Presented 'Putting Multiple AI Agent Systems in Production' covering interagent communication, resource management, scalability, and system reliability with real-world deployment patterns.",
  },
  {
    title: 'IBM TechXchange Conference',
    type: 'talk',
    source: 'IBM',
    date: '2025-10-06',
    link: 'https://www.linkedin.com/posts/tonykipkemboi_ibmtechxchange-activity-7381001218820681728-Njde/',
    description:
      'Speaker at IBM TechXchange Conference 2025, discussing AI agents and enterprise AI adoption strategies.',
  },
  {
    title: 'Building AI Agents with CrewAI - DataCamp Course',
    type: 'video',
    source: 'DataCamp',
    date: '2025-10-01',
    link: 'https://www.datacamp.com/courses/building-ai-agents-with-crewai',
    description:
      'Published a comprehensive course teaching developers how to build AI agent systems with CrewAI, covering Agent, Task, and Crew components to create an AI content-generator pipeline.',
  },
  {
    title: 'Creating a Podcast Generation AI Multi-Agent - DataCamp Code-Along',
    type: 'video',
    source: 'DataCamp',
    date: '2025-08-13',
    link: 'https://www.datacamp.com/code-along/creating-a-podcast-generation-ai-multi-agent-with-crew-ai',
    description:
      'Interactive code-along tutorial teaching how to use CrewAI to build a multi-agent system that generates podcast-style audio from text.',
  },
  {
    title: 'ODSC AI X Podcast - AI Agents',
    type: 'podcast',
    source: 'Open Data Science Conference',
    date: '2025-06-11',
    link: 'https://podcasts.apple.com/us/podcast/odsc-east-2025-minisodes/id1721516836?i=1000712490491',
    description:
      "Featured on ODSC's AI X Podcast discussing foundational AI agent building skills, practical implementation strategies, and how AI agents are transforming business operations.",
  },
  {
    title: 'Convergence 2025 - GenAI Engineering Conference',
    type: 'talk',
    source: 'Comet ML',
    date: '2025-05-13',
    link: 'https://www.comet.com/site/about-us/news-and-events/events/convergence-2025/',
    description:
      "Speaking at Convergence 2025, Comet's virtual conference on GenAI Engineering, covering AI agent orchestration and multi-agent systems.",
  },
  {
    title: 'Build agentic systems with CrewAI and Amazon Bedrock',
    type: 'article',
    source: 'AWS Machine Learning Blog',
    date: '2025-03-31',
    link: 'https://aws.amazon.com/blogs/machine-learning/build-agentic-systems-with-crewai-and-amazon-bedrock/',
    description:
      'Co-authored an AWS ML Blog post on building agentic systems with CrewAI and Amazon Bedrock, empowering developers to build sophisticated AI agent workflows.',
  },
  {
    title: 'ODSC East 2025 Workshop',
    type: 'talk',
    source: 'Open Data Science Conference',
    date: '2025-05-13',
    link: 'https://odsc.com/boston/',
    description:
      "Led a highly attended workshop on 'Agentic AI in Action: Build Autonomous, Multi-Agent Systems Hands-On in Python' teaching foundational AI agent building skills.",
  },
  {
    title: 'Guest Lecture at Harvard Kennedy School',
    type: 'talk',
    source: 'Harvard University',
    date: '2025-02-27',
    link: 'https://www.linkedin.com/posts/tonykipkemboi_aiagents-hks-activity-7301069792810008576-H7os/',
    description:
      "Guest speaker on AI agents for Prof. Hu's data and information visualization class, discussing AI agent systems with students.",
  },
  {
    title: 'PyCon US 2024 Speaker',
    type: 'talk',
    source: 'PyCon US',
    date: '2024-05-15',
    link: 'https://us.pycon.org/2024/speaker/profile/90/index.html',
    description:
      'Selected speaker at PyCon US 2024, the largest annual gathering for the Python programming community.',
  },
  {
    title: 'C.I.S. Strong: Meet Tony Kipkemboi',
    type: 'article',
    source: 'Penn Engineering Blog',
    date: '2020-08-28',
    link: 'https://blog.cis.upenn.edu/c-i-s-strong-meet-tony-kipkemboi/',
    description:
      "Featured in Penn Engineering's CIS Strong series, highlighting my journey in computer science and contributions to the tech community.",
  },
  {
    title: 'Ripple Ventures Fellowship',
    type: 'article',
    source: 'Ripple Ventures',
    date: '2021-08-01',
    link: 'https://www.fellowship.rippleventures.com/school/university-of-pennsylvania',
    description:
      "Featured in Ripple Ventures' fellowship program at the University of Pennsylvania.",
  },
]

const appearances = appearancesData.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

const types: MediaAppearance['type'][] = ['talk', 'video', 'podcast', 'article']

export default function PressPage() {
  return (
    <section className="mx-auto w-full max-w-[1240px] px-6 pt-10 pb-24 sm:px-10 lg:px-20">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
        Press &amp; speaking
      </span>
      <h1 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[#0a0a0a]">
        Talks, courses &amp; conversations
      </h1>
      <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-neutral-500">
        Places I have taught or talked through agent systems, fine-tuning, and
        the practical work of getting AI into production.
      </p>
      <div className="mt-10">
        <FilteredAppearances appearances={appearances} types={types} />
      </div>
    </section>
  )
}
