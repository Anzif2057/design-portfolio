import { work } from '@/data/work'
import { getProjectBySlug } from '@/data/work'
import { ProjectDetail } from './ProjectDetail'

interface WorkContentProps {
  projectSlug?: string | null
  onOpenProject?: (slug: string) => void
  onBackToGrid?: () => void
}

export function WorkContent({
  projectSlug = null,
  onOpenProject,
  onBackToGrid,
}: WorkContentProps) {
  const project = projectSlug ? getProjectBySlug(projectSlug) : null

  if (project) {
    return (
      <ProjectDetail
        project={project}
        onBack={onBackToGrid}
        onOpenProject={onOpenProject}
      />
    )
  }

  const featured = work.filter((item) => item.featured)
  const rest = work.filter((item) => !item.featured)

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold text-foreground">Work</h2>
        <p className="mt-2 text-sm text-muted">Selected projects and case studies.</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {featured.map((item) => (
          <li key={item.slug} className="sm:col-span-2">
            <ProjectCard project={item} featured onOpenProject={onOpenProject} />
          </li>
        ))}
        {rest.map((item) => (
          <li key={item.slug}>
            <ProjectCard project={item} onOpenProject={onOpenProject} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectCard({
  project,
  featured = false,
  onOpenProject,
}: {
  project: (typeof work)[number]
  featured?: boolean
  onOpenProject?: (slug: string) => void
}) {
  return (
    <button
      type="button"
      className={[
        'chrome-interactive w-full overflow-hidden rounded-xl border border-border bg-background text-left shadow-sm',
        featured ? 'sm:grid sm:grid-cols-2' : '',
      ].join(' ')}
      onClick={() => onOpenProject?.(project.slug)}
    >
      <img
        src={project.coverImage.src}
        alt={project.coverImage.alt}
        className={
          featured
            ? 'aspect-[4/3] h-full w-full object-cover'
            : 'aspect-[16/10] w-full object-cover'
        }
      />
      <div className="space-y-2 p-4">
        {featured ? (
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Featured
          </p>
        ) : null}
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="text-sm text-muted">{project.summary}</p>
        <p className="text-xs text-muted">
          {project.role} · {project.year}
        </p>
        {project.tags?.length ? (
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </button>
  )
}
