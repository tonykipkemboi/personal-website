import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'
import { projects } from 'app/components/projects'

const mediaAppearances = [
  {
    title: "MLOps World Conference - Austin",
    type: "talk",
    source: "MLOps World",
    date: "2025-10-08",
    link: "https://mlopsworld.com/speakers/",
    description: "Speaker demonstrating how agent orchestration, paired with rigorous evaluation, accelerates the path from prototype to production.",
  },
  {
    title: "IBM TechXchange Conference",
    type: "talk",
    source: "IBM",
    date: "2025-10-06",
    link: "https://www.linkedin.com/posts/tonykipkemboi_ibmtechxchange-activity-7381001218820681728-Njde/",
    description: "Speaker discussing AI agents and enterprise AI adoption strategies.",
  },
  {
    title: "Building AI Agents with CrewAI - DataCamp Course",
    type: "course",
    source: "DataCamp",
    date: "2025-10-01",
    link: "https://www.datacamp.com/courses/building-ai-agents-with-crewai",
    description: "Comprehensive course teaching developers how to build AI agent systems with CrewAI.",
  },
  {
    title: "Creating a Podcast Generation AI Multi-Agent - DataCamp Code-Along",
    type: "course",
    source: "DataCamp",
    date: "2025-08-13",
    link: "https://www.datacamp.com/code-along/creating-a-podcast-generation-ai-multi-agent-with-crew-ai",
    description: "Interactive code-along tutorial teaching how to use CrewAI to build a multi-agent system.",
  },
  {
    title: "ODSC AI X Podcast - AI Agents",
    type: "podcast",
    source: "Open Data Science Conference",
    date: "2025-06-11",
    link: "https://podcasts.apple.com/us/podcast/odsc-east-2025-minisodes/id1721516836?i=1000712490491",
    description: "Featured on ODSC's AI X Podcast discussing foundational AI agent building skills.",
  },
  {
    title: "Convergence 2025 - GenAI Engineering Conference",
    type: "talk",
    source: "Comet ML",
    date: "2025-05-13",
    link: "https://www.comet.com/site/about-us/news-and-events/events/convergence-2025/",
    description: "Speaking at Comet's virtual conference on GenAI Engineering.",
  },
  {
    title: "Build agentic systems with CrewAI and Amazon Bedrock",
    type: "article",
    source: "AWS Machine Learning Blog",
    date: "2025-03-31",
    link: "https://aws.amazon.com/blogs/machine-learning/build-agentic-systems-with-crewai-and-amazon-bedrock/",
    description: "Co-authored AWS ML Blog post on building agentic systems with CrewAI and Amazon Bedrock.",
  },
  {
    title: "ODSC East 2025 Workshop",
    type: "talk",
    source: "Open Data Science Conference",
    date: "2025-05-13",
    link: "https://odsc.com/boston/",
    description: "Led workshop on 'Agentic AI in Action: Build Autonomous, Multi-Agent Systems Hands-On in Python'.",
  },
  {
    title: "Guest Lecture at Harvard Kennedy School",
    type: "talk",
    source: "Harvard University",
    date: "2025-02-27",
    link: "https://www.linkedin.com/posts/tonykipkemboi_aiagents-hks-activity-7301069792810008576-H7os/",
    description: "Guest speaker on AI agents for Prof. Hu's data and information visualization class.",
  },
  {
    title: "PyCon US 2024",
    type: "talk",
    source: "PyCon US",
    date: "2024-05-15",
    link: "https://us.pycon.org/2024/speaker/profile/90/index.html",
    description: "Selected speaker at PyCon US 2024, the largest annual gathering for the Python programming community.",
  },
]

export async function GET() {
  const allBlogs = await getBlogPosts()

  // Build the full content
  let content = `# Tony Kipkemboi

> AI Engineer and Content Creator specializing in AI automations, agent systems, and developer education. US Army veteran. Former CrewAI, Snowflake, Bloomberg, Booz Allen Hamilton.

I build AI automations and agent systems that help teams work smarter. I create technical content about AI across social platforms including YouTube, where my most popular video on building PDF RAG systems with Ollama has 189K+ views.

I've spoken at PyCon US, ODSC, Harvard Kennedy School, IBM TechXchange, MLOps World, and more. I'm passionate about open-source software, AI agents, and developer education.

## Contact & Social

- Website: ${baseUrl}
- GitHub: https://github.com/tonykipkemboi
- YouTube: https://www.youtube.com/@tonykipkemboi
- LinkedIn: https://linkedin.com/in/tonykipkemboi
- X/Twitter: https://x.com/tonykipkemboi
- RSS Feed: ${baseUrl}/rss

## Expertise

- AI Agents & Multi-Agent Systems (CrewAI, LangChain, LlamaIndex)
- RAG (Retrieval-Augmented Generation)
- Python, Streamlit, Next.js
- Local LLMs (Ollama, Groq)
- Developer Education & Technical Content Creation

## Background

- US Army Veteran
- Former Developer Advocate at CrewAI
- Former Snowflake
- Former Bloomberg
- Former Booz Allen Hamilton
- University of Pennsylvania (Penn Engineering)

---

## Open Source Projects

`

  // Add projects
  for (const project of projects) {
    content += `### ${project.title}${project.stars ? ` (${project.stars} GitHub stars)` : ''}

${project.description}

- Link: ${project.link}
${project.github ? `- GitHub: ${project.github}` : ''}
- Tech: ${project.tech.join(', ')}

`
  }

  // Add speaking/media section
  content += `---

## Speaking & Media Appearances

`

  for (const appearance of mediaAppearances) {
    content += `### ${appearance.title}
- Type: ${appearance.type}
- Source: ${appearance.source}
- Date: ${appearance.date}
- Link: ${appearance.link}

${appearance.description}

`
  }

  // Add blog posts with full content
  content += `---

## Blog Posts

`

  const sortedBlogs = allBlogs.sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  )

  for (const post of sortedBlogs) {
    content += `### ${post.metadata.title}

- Published: ${post.metadata.publishedAt}
- Category: ${post.metadata.category || 'General'}
- Tags: ${post.metadata.tags?.join(', ') || 'None'}
- URL: ${baseUrl}/blog/${post.slug}

${post.metadata.summary || ''}

#### Full Content

${post.content}

---

`
  }

  content += `
## End of Document

This document was automatically generated and contains the full content of tonykipkemboi.com for AI/LLM consumption.
Last updated: ${new Date().toISOString()}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
