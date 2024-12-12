import { Projects } from '../components/projects'

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my recent projects and experiments.',
}

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        my projects
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          Here are some of the projects I've worked on. Each project represents a unique challenge and learning experience.
          Click on the project cards to view the live sites or explore the source code on GitHub.
        </p>
      </div>
      <Projects />
    </section>
  )
}
