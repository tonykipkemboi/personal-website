import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'
import { projects } from 'app/components/projects'
import { getCourses } from 'app/learn/utils'

export async function GET() {
  const allBlogs = await getBlogPosts()
  const courses = await getCourses()
  const topProjects = projects.slice(0, 5) // Top 5 by stars

  const sortedBlogs = allBlogs
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 5) // Latest 5 posts

  let content = `# Tony Kipkemboi

> AI engineer building practical agent systems, fine-tuning experiments, and developer tools, then sharing the lessons through field notes, courses, and talks. US Army veteran. Speaker at PyCon US, ODSC, Harvard. Former CrewAI, Snowflake, Bloomberg.

## Links

- [Website](${baseUrl})
- [Blog](${baseUrl}/blog): Field notes on AI agents, fine-tuning, and developer tools
- [Learn](${baseUrl}/learn): Distilled guides from what I am learning and building
- [Projects](${baseUrl}/projects): Open source AI projects
- [Press](${baseUrl}/press): Talks, courses, podcasts, and features
- [GitHub](https://github.com/tonykipkemboi)
- [YouTube](https://www.youtube.com/@tonykipkemboi)
- [LinkedIn](https://linkedin.com/in/tonykipkemboi)
- [X/Twitter](https://x.com/tonykipkemboi)

## Full Content

- [Complete AI-readable content](${baseUrl}/llms-full.txt): Full machine-readable version with all blog posts, projects, and details

## Learning Paths

`

  for (const course of courses) {
    content += `- [${course.metadata.title}](${baseUrl}/learn/${course.metadata.slug}): ${course.metadata.summary}\n`
  }

  content += `
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

AI Agents, CrewAI, LangChain, RAG, Python, Streamlit, Local LLMs (Ollama, Groq), Fine-tuning, Developer Education
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
