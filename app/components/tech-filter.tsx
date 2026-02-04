'use client'

import { useState } from 'react'
import { ProjectCard } from './projects'

interface Project {
  title: string
  description: string
  link: string
  github?: string
  tech: string[]
  stars?: string
}

export function FilteredProjects({
  projects,
  techs,
}: {
  projects: Project[]
  techs: string[]
}) {
  const [showAllTechs, setShowAllTechs] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const visibleTechs = showAllTechs ? techs : techs.slice(0, 3)
  const hiddenCount = techs.length - 3

  const filteredProjects = selectedTech
    ? projects.filter((p) => p.tech.includes(selectedTech))
    : projects

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          onClick={() => setSelectedTech(null)}
          className={`px-3 py-1 text-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 ${
            selectedTech === null
              ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
              : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600'
          }`}
        >
          All
        </button>
        {visibleTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 ${
              selectedTech === tech
                ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            {tech}
          </button>
        ))}
        {techs.length > 3 && (
          <button
            onClick={() => setShowAllTechs(!showAllTechs)}
            className="px-3 py-1 text-sm text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 rounded-full"
          >
            {showAllTechs ? 'Show less' : `+${hiddenCount} more`}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-neutral-600 dark:text-neutral-400 text-center py-8">
          No projects found with that technology.
        </p>
      )}
    </>
  )
}
