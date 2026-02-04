import { ProjectCard } from './projects'
import { projects } from './projects'

export function LatestProject() {
  // Show the first project (most starred)
  const featuredProject = projects[0]

  if (!featuredProject) return null

  return <ProjectCard project={featuredProject} />
}
