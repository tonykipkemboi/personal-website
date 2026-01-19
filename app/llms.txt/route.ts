import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'
import { projects } from 'app/components/projects'

export async function GET() {
  const allBlogs = await getBlogPosts()
  const topProjects = projects.slice(0, 5) // Top 5 by stars

  const sortedBlogs = allBlogs
    .sort((a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 5) // Latest 5 posts

  let content = `# Tony Kipkemboi

> AI Engineer and Content Creator. Building AI automations and agent systems. US Army veteran. Speaker at PyCon US, ODSC, Harvard. Former CrewAI, Snowflake, Bloomberg.

## Links

- [Website](${baseUrl})
- [Blog](${baseUrl}/blog): Technical articles on AI agents and tutorials
- [Projects](${baseUrl}/projects): Open source AI projects
- [Press](${baseUrl}/press): Talks, podcasts, and media appearances
- [GitHub](https://github.com/tonykipkemboi)
- [YouTube](https://www.youtube.com/@tonykipkemboi)
- [LinkedIn](https://linkedin.com/in/tonykipkemboi)
- [X/Twitter](https://x.com/tonykipkemboi)

## Full Content

- [Complete AI-readable content](${baseUrl}/llms-full.txt): Full machine-readable version with all blog posts, projects, and details

## Latest Blog Posts

`

  for (const post of sortedBlogs) {
    content += `- [${post.metadata.title}](${baseUrl}/blog/${post.slug}): ${post.metadata.summary || ''}\n`
  }

  content += `
## Top Projects

`

  for (const project of topProjects) {
    content += `- [${project.title}](${project.link})${project.stars ? ` (${project.stars} stars)` : ''}: ${project.description.slice(0, 100)}...\n`
  }

  content += `
## Expertise

AI Agents, CrewAI, LangChain, RAG, Python, Streamlit, Local LLMs (Ollama, Groq), Developer Education
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
