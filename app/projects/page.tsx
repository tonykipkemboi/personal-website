import { projects } from '../components/projects'
import { FilteredProjects } from '../components/tech-filter'

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my recent projects and experiments.',
}

// Get unique tech tags from all projects
function getAllTech(): string[] {
  const techSet = new Set<string>()
  projects.forEach((project) => {
    project.tech.forEach((tech) => techSet.add(tech))
  })
  return Array.from(techSet).sort()
}

export default function ProjectsPage() {
  const allTech = getAllTech()

  return (
    <section>
      <h1 className="text-2xl font-medium mb-2 text-neutral-900 dark:text-neutral-100">
        Things I&apos;ve Built
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Open source projects and experiments. Click a card to explore.
      </p>
      <FilteredProjects projects={projects} techs={allTech} />
    </section>
  )
}
