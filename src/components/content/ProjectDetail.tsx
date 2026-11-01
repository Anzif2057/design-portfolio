import { useState } from 'react'
import { getAdjacentProjects } from '@/data/work'
import type { WorkProject } from '@/types'
import { Lightbox } from '@/components/ui/Lightbox'

interface ProjectDetailProps {
  project: WorkProject
  onBack?: () => void
  onOpenProject?: (slug: string) => void
}

const NARRATIVE_SECTIONS: { key: keyof WorkProject; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'research', label: 'Research' },
  { key: 'process', label: 'Process' },
  { key: 'solution', label: 'Solution' },
  { key: 'outcome', label: 'Outcome / Impact' },
  { key: 'learnings', label: 'Learnings' },
]

export function ProjectDetail({ project, onBack, onOpenProject }: ProjectDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { prev, next } = getAdjacentProjects(project.slug)
  const gallery = project.gallery ?? []

  return (
    <article className="space-y-8">
      {onBack ? (
        <button
          type="button"
          className="chrome-interactive rounded-md text-sm text-accent"
          onClick={onBack}
        >
          ← Back to work
        </button>
      ) : null}

      <header className="space-y-3">
        <p className="text-xs text-muted">
          {project.year}
          {project.timeline ? ` · ${project.timeline}` : ''}
        </p>
        <h2 className="text-2xl font-semibold text-foreground">{project.title}</h2>
        <p className="text-sm text-muted">{project.summary}</p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="text-foreground">{project.role}</dd>
          </div>
          {project.team ? (
            <div>
              <dt className="text-muted">Team</dt>
              <dd className="text-foreground">{project.team}</dd>
            </div>
          ) : null}
          {project.tools?.length ? (
            <div className="sm:col-span-2">
              <dt className="text-muted">Tools</dt>
              <dd className="text-foreground">{project.tools.join(', ')}</dd>
            </div>
          ) : null}
        </dl>
        {project.links?.length ? (
          <ul className="flex flex-wrap gap-2">
            {project.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="chrome-interactive inline-flex rounded-md border border-border px-3 py-1.5 text-sm text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <img
        src={project.coverImage.src}
        alt={project.coverImage.alt}
        className="w-full rounded-xl border border-border object-cover"
      />

      {NARRATIVE_SECTIONS.map(({ key, label }) => {
        const body = project[key]
        if (typeof body !== 'string' || !body) {
          return null
        }
        return (
          <section key={key} aria-labelledby={`project-${project.slug}-${key}`}>
            <h3
              id={`project-${project.slug}-${key}`}
              className="text-sm font-semibold text-foreground"
            >
              {label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
          </section>
        )
      })}

      {gallery.length > 0 ? (
        <section aria-labelledby={`project-${project.slug}-gallery`}>
          <h3
            id={`project-${project.slug}-gallery`}
            className="text-sm font-semibold text-foreground"
          >
            Gallery
          </h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <li key={`${image.src}-${image.alt}`}>
                <button
                  type="button"
                  className="chrome-interactive block w-full overflow-hidden rounded-lg border border-border"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Enlarge: ${image.alt}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[3/2] w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {onOpenProject && (prev || next) ? (
        <nav
          aria-label="Adjacent projects"
          className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6"
        >
          {prev ? (
            <button
              type="button"
              className="chrome-interactive rounded-md text-left text-sm text-accent"
              onClick={() => onOpenProject(prev.slug)}
            >
              ← {prev.title}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              className="chrome-interactive rounded-md text-right text-sm text-accent"
              onClick={() => onOpenProject(next.slug)}
            >
              {next.title} →
            </button>
          ) : null}
        </nav>
      ) : null}

      <Lightbox
        image={lightboxIndex === null ? null : (gallery[lightboxIndex] ?? null)}
        onClose={() => setLightboxIndex(null)}
      />
    </article>
  )
}
