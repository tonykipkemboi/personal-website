import { ProjectCard } from './projects'
import { projects } from './projects'

export function LatestProject() {
  const latestProject = projects[0] // Get the first project (Ollama PDF RAG)
  
  if (!latestProject) return null

  return <ProjectCard project={latestProject} />
}
