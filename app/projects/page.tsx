import { Projects } from '../components/projects'

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my recent projects and experiments.',
}

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-2xl font-medium mb-8 text-neutral-900 dark:text-neutral-100">
        my projects
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="mb-8 text-neutral-600 dark:text-neutral-400">
          here are some of the projects i've worked on. each project represents a unique challenge and learning experience.
          click on the project cards to view the live sites or explore the source code on github.
        </p>
      </div>
      <Projects />
    </section>
  )
}
