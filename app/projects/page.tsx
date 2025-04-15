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
          some of the stuff i’ve built or shipped for fun. click a card to see more.
        </p>
      </div>
      <Projects />
    </section>
  )
}
