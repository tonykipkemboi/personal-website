interface Project {
  title: string;
  description: string;
  link: string;
  github?: string;
  tech: string[];
  stars?: string;
}

const projects: Project[] = [
  {
    title: 'Ollama PDF RAG',
    description: 'A locally-hosted RAG (Retrieval-Augmented Generation) system that allows users to chat with their PDF documents using Ollama and LangChain. Features include document chunking, vector embeddings, and semantic search.',
    link: 'https://github.com/tonykipkemboi/ollama_pdf_rag',
    github: 'https://github.com/tonykipkemboi/ollama_pdf_rag',
    tech: ['Python', 'Ollama', 'LangChain', 'Streamlit', 'ChromaDB'],
    stars: '383',
  },
  {
    title: 'Trip Planner Agent',
    description: 'CrewAI agents that can plan your vacation. Uses multi-agent collaboration to create detailed itineraries based on your preferences.',
    link: 'https://github.com/tonykipkemboi/trip_planner_agent',
    github: 'https://github.com/tonykipkemboi/trip_planner_agent',
    tech: ['Python', 'CrewAI', 'Streamlit', 'LangChain'],
    stars: '122',
  },
  {
    title: 'CrewAI Streamlit Demo',
    description: 'Demo showcasing how to output CrewAI agent task outputs on the Streamlit UI.',
    link: 'https://github.com/tonykipkemboi/crewai-streamlit-demo',
    github: 'https://github.com/tonykipkemboi/crewai-streamlit-demo',
    tech: ['Python', 'CrewAI', 'Streamlit'],
    stars: '48',
  },
  {
    title: 'Research Paper to Podcast',
    description: 'Automated system that transforms academic research papers into engaging podcast conversations using CrewAI and ElevenLabs.',
    link: 'https://github.com/tonykipkemboi/research-paper-to-podcast',
    github: 'https://github.com/tonykipkemboi/research-paper-to-podcast',
    tech: ['Python', 'CrewAI', 'ElevenLabs'],
    stars: '47',
  },
  {
    title: 'Kaa Rada',
    description: 'A modern Pomodoro web app to secure your focus and execute your tasks. Features a timer, music player (add YouTube tracks), task list, and live Hacker News feed. Built with Vercel v0.',
    link: 'https://v0-kaa-rada-qohixj.vercel.app/',
    tech: ['Next.js', 'Vercel v0', 'Pomodoro', 'YouTube', 'Hacker News'],
  },
  {
    title: 'YouTube Thumbnail Extractor',
    description: 'Extract high-quality thumbnails from any YouTube video. Simply paste the URL to get started.',
    link: 'https://www.downloadthumbnails.com/',
    tech: ['Next.js', 'YouTube', 'Web App'],
  },
];

export { projects };

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col space-y-2 rounded-lg border border-neutral-200 p-4 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
          {project.title}
        </h3>
        <div className="flex space-x-2 items-center">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-neutral-900 dark:text-white dark:hover:text-neutral-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          )}
          {project.stars && (
            <span className="flex items-center text-sm text-black dark:text-white ml-1">
              <span role="img" aria-label="star">⭐</span> {project.stars}
            </span>
          )}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-neutral-900 dark:text-white dark:hover:text-neutral-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-black dark:bg-neutral-800 dark:text-white"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Projects({ limit }: { limit?: number }) {
  const displayProjects = limit ? projects.slice(0, limit) : projects;
  
  return (
    <div className="flex flex-col space-y-4">
      {displayProjects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
