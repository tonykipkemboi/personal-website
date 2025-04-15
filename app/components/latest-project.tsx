import { ProjectCard } from './projects'
import { projects } from './projects'

export function LatestProject() {
  // Get the 'Research Paper to Podcast' project
  const latestProject = projects.find(p => p.title === 'Research Paper to Podcast');

  if (!latestProject) return null;

  return <ProjectCard project={latestProject} />;
}
