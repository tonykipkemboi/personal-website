import { StarIcon } from './icons'

interface Project {
  title: string
  description: string
  link: string
  github?: string
  tech: string[]
  stars?: string
}

const projects: Project[] = [
  {
    title: 'Ollama PDF RAG',
    description:
      'A locally-hosted RAG (Retrieval-Augmented Generation) system that allows users to chat with their PDF documents using Ollama and LangChain. Features include document chunking, vector embeddings, and semantic search.',
    link: 'https://github.com/tonykipkemboi/ollama_pdf_rag',
    github: 'https://github.com/tonykipkemboi/ollama_pdf_rag',
    tech: ['Python', 'Ollama', 'LangChain', 'Streamlit', 'ChromaDB'],
    stars: '527',
  },
  {
    title: 'CrewAI Gmail Automation',
    description:
      'Automate Gmail inbox management using CrewAI agents. Intelligently categorizes, responds to, and organizes emails using AI-powered workflows.',
    link: 'https://github.com/tonykipkemboi/crewai-gmail-automation',
    github: 'https://github.com/tonykipkemboi/crewai-gmail-automation',
    tech: ['Python', 'CrewAI', 'Gmail API', 'LangChain'],
    stars: '191',
  },
  {
    title: 'Resume Optimization Crew',
    description:
      'AI-powered resume optimization system using CrewAI. Analyzes and enhances resumes to match job descriptions and ATS requirements.',
    link: 'https://github.com/tonykipkemboi/resume-optimization-crew',
    github: 'https://github.com/tonykipkemboi/resume-optimization-crew',
    tech: ['Python', 'CrewAI', 'AI Optimization'],
    stars: '151',
  },
  {
    title: 'Trip Planner Agent',
    description:
      'CrewAI agents that can plan your vacation. Uses multi-agent collaboration to create detailed itineraries based on your preferences.',
    link: 'https://github.com/tonykipkemboi/trip_planner_agent',
    github: 'https://github.com/tonykipkemboi/trip_planner_agent',
    tech: ['Python', 'CrewAI', 'Streamlit', 'LangChain'],
    stars: '143',
  },
  {
    title: 'Streamlit Replicate Image App',
    description:
      'Image generation application built with Streamlit and Replicate API. Generate AI images using various models through an intuitive interface.',
    link: 'https://github.com/tonykipkemboi/streamlit-replicate-img-app',
    github: 'https://github.com/tonykipkemboi/streamlit-replicate-img-app',
    tech: ['Python', 'Streamlit', 'Replicate', 'Image Generation'],
    stars: '103',
  },
  {
    title: 'Groq Streamlit Demo',
    description:
      "Demo showcasing Groq's ultra-fast LLM inference with Streamlit. Experience lightning-fast AI responses in an interactive web interface.",
    link: 'https://github.com/tonykipkemboi/groq_streamlit_demo',
    github: 'https://github.com/tonykipkemboi/groq_streamlit_demo',
    tech: ['Python', 'Groq', 'Streamlit', 'LLM'],
    stars: '85',
  },
  {
    title: 'Ollama Streamlit Demos',
    description:
      'Collection of Streamlit demos showcasing various Ollama local LLM capabilities. Run AI models locally with no API keys required.',
    link: 'https://github.com/tonykipkemboi/ollama_streamlit_demos',
    github: 'https://github.com/tonykipkemboi/ollama_streamlit_demos',
    tech: ['Python', 'Ollama', 'Streamlit', 'Local LLM'],
    stars: '82',
  },
  {
    title: 'CrewAI Streamlit Demo',
    description:
      'Demo showcasing how to output CrewAI agent task outputs on the Streamlit UI.',
    link: 'https://github.com/tonykipkemboi/crewai-streamlit-demo',
    github: 'https://github.com/tonykipkemboi/crewai-streamlit-demo',
    tech: ['Python', 'CrewAI', 'Streamlit'],
    stars: '73',
  },
  {
    title: 'Research Paper to Podcast',
    description:
      'Automated system that transforms academic research papers into engaging podcast conversations using CrewAI and ElevenLabs.',
    link: 'https://github.com/tonykipkemboi/research-paper-to-podcast',
    github: 'https://github.com/tonykipkemboi/research-paper-to-podcast',
    tech: ['Python', 'CrewAI', 'ElevenLabs'],
    stars: '70',
  },
  {
    title: 'YouTube Yapper Trapper',
    description:
      'Extract and analyze YouTube video transcripts. Perfect for researchers, content creators, and anyone who wants to quickly digest video content.',
    link: 'https://github.com/tonykipkemboi/youtube_yapper_trapper',
    github: 'https://github.com/tonykipkemboi/youtube_yapper_trapper',
    tech: ['Python', 'YouTube API', 'Transcription'],
    stars: '68',
  },
]

export { projects }

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col space-y-3 rounded-lg border border-neutral-200 p-5 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
          {project.title}
        </h3>
        <div className="flex items-center gap-3">
          {project.stars && (
            <span className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              {project.stars}
            </span>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          )}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
            aria-label={`Visit ${project.title}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Projects({ limit }: { limit?: number }) {
  const displayProjects = limit ? projects.slice(0, limit) : projects

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {displayProjects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  )
}
