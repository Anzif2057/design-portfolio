import { experience } from '@/data/experience'

export function ExperienceContent() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold text-foreground">Experience</h2>
        <p className="mt-2 text-sm text-muted">Most recent roles first.</p>
      </header>

      <ol className="relative space-y-8 border-l border-border pl-6">
        {experience.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              className="absolute top-1.5 -left-[1.91rem] size-3 rounded-full border-2 border-accent bg-background"
              aria-hidden
            />
            <p className="text-xs text-muted">
              {entry.startDate} — {entry.endDate}
              {entry.location ? ` · ${entry.location}` : ''}
            </p>
            <h3 className="mt-1 text-base font-semibold text-foreground">{entry.role}</h3>
            <p className="text-sm text-muted">{entry.company}</p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-foreground">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}
