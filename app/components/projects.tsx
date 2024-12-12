interface Project {
  title: string;
  description: string;
  link: string;
  github?: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: 'Ollama PDF RAG',
    description: 'A locally-hosted RAG (Retrieval-Augmented Generation) system that allows users to chat with their PDF documents using Ollama and LangChain. Features include document chunking, vector embeddings, and semantic search.',
    link: 'https://github.com/tonykipkemboi/ollama_pdf_rag',
    github: 'https://github.com/tonykipkemboi/ollama_pdf_rag',
    tech: ['Python', 'Ollama', 'LangChain', 'Streamlit', 'FAISS'],
  },
  {
    title: 'KenyaDAO',
    description: 'A decentralized autonomous organization (DAO) platform for Kenyans. Features member voting, proposal creation, and transparent governance mechanisms.',
    link: 'https://kenyadao.vercel.app/',
    tech: ['Next.js', 'Ethereum', 'Solidity', 'TailwindCSS', 'Web3'],
  },
  {
    title: 'Kenya Name Service',
    description: 'A web3 domain name service for Kenyan identities, allowing users to register and manage .ke domains on the blockchain.',
    link: 'https://kenyanameservice.vercel.app/',
    tech: ['Next.js', 'Ethereum', 'Smart Contracts', 'TailwindCSS'],
  },
  // Add more projects here
];

export { projects };

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col space-y-2 rounded-lg border border-neutral-200 p-4 transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
          {project.title}
        </h3>
        <div className="flex space-x-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          )}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
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
            className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
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
