import { SKILL_CATEGORY_ORDER, skills } from '@/data/skills'
import { getProjectBySlug } from '@/data/work'

interface SkillsContentProps {
  onOpenProject?: (slug: string) => void
}

export function SkillsContent({ onOpenProject }: SkillsContentProps) {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold text-foreground">Skills</h2>
        <p className="mt-2 text-sm text-muted">
          Grouped by practice. Related projects open the case study when available.
        </p>
      </header>

      {SKILL_CATEGORY_ORDER.map((category) => {
        const items = skills.filter((skill) => skill.category === category)
        if (items.length === 0) {
          return null
        }
        return (
          <section key={category} aria-labelledby={`skills-${category}`}>
            <h3
              id={`skills-${category}`}
              className="text-sm font-semibold tracking-wide text-muted uppercase"
            >
              {category}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {items.map((skill) => (
                <li key={skill.id} className="max-w-full">
                  <div className="inline-flex max-w-full flex-col gap-1 rounded-full border border-border bg-surface px-3 py-1.5">
                    <span className="text-sm font-medium text-foreground">
                      {skill.title}
                      <span className="ml-2 text-xs font-normal text-muted capitalize">
                        {skill.level}
                      </span>
                    </span>
                    {skill.relatedProjectSlugs?.length && onOpenProject ? (
                      <span className="flex flex-wrap gap-x-2 gap-y-1 pb-0.5">
                        {skill.relatedProjectSlugs.map((slug) => {
                          const project = getProjectBySlug(slug)
                          if (!project) {
                            return null
                          }
                          return (
                            <button
                              key={slug}
                              type="button"
                              className="chrome-interactive rounded-sm text-xs text-accent underline-offset-2 hover:underline focus-visible:underline"
                              onClick={() => onOpenProject(slug)}
                            >
                              {project.title}
                            </button>
                          )
                        })}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
