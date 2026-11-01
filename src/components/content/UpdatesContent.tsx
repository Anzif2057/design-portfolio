import { updatesContent } from '@/data/updates'

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`)
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function UpdatesContent() {
  const entries = [...updatesContent.entries].sort((a, b) => b.date.localeCompare(a.date))
  const { currently, availability } = updatesContent

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-semibold text-foreground">Updates</h2>
        <p className="mt-2 text-sm text-muted">{availability}</p>
      </header>

      <section
        aria-labelledby="currently-heading"
        className="rounded-lg border border-border bg-surface p-4"
      >
        <h3 id="currently-heading" className="text-sm font-semibold text-foreground">
          Currently
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-foreground">
          {currently.studying ? (
            <li>
              <span className="text-muted">Studying — </span>
              {currently.studying}
            </li>
          ) : null}
          {currently.building ? (
            <li>
              <span className="text-muted">Building — </span>
              {currently.building}
            </li>
          ) : null}
          {currently.lookingFor ? (
            <li>
              <span className="text-muted">Looking for — </span>
              {currently.lookingFor}
            </li>
          ) : null}
        </ul>
      </section>

      <section aria-labelledby="updates-list-heading">
        <h3 id="updates-list-heading" className="sr-only">
          Recent updates
        </h3>
        <ol className="space-y-5">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="border-b border-border pb-5 last:border-b-0 last:pb-0"
            >
              <p className="text-xs text-muted">{formatDate(entry.date)}</p>
              <h4 className="mt-1 text-base font-semibold text-foreground">
                {entry.title}
              </h4>
              <p className="mt-1 text-sm text-muted">{entry.summary}</p>
              {entry.tags?.length ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
