import { about } from '@/data/about'

export function AboutContent() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
          <img
            src="/placeholder-image.svg"
            alt={about.photoAlt}
            className="size-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{about.name}</h2>
          <p className="mt-1 text-sm text-muted">{about.role}</p>
          <p className="mt-3 text-xs font-medium text-accent">{about.status}</p>
        </div>
      </header>

      <section aria-labelledby="about-bio-heading" className="space-y-3">
        <h3 id="about-bio-heading" className="text-sm font-semibold text-foreground">
          About
        </h3>
        {about.bio.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </section>

      <section aria-labelledby="about-facts-heading">
        <h3 id="about-facts-heading" className="text-sm font-semibold text-foreground">
          Quick facts
        </h3>
        <dl className="mt-3 space-y-3 text-sm">
          <div>
            <dt className="text-muted">Location</dt>
            <dd className="text-foreground">{about.location}</dd>
          </div>
          <div>
            <dt className="text-muted">Education</dt>
            <dd className="text-foreground">{about.education}</dd>
          </div>
          <div>
            <dt className="text-muted">Focus areas</dt>
            <dd>
              <ul className="mt-1 flex flex-wrap gap-2">
                {about.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-border px-2 py-0.5 text-xs text-foreground"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="about-links-heading">
        <h3 id="about-links-heading" className="text-sm font-semibold text-foreground">
          Links
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          <li>
            <a
              href={`mailto:${about.email}`}
              className="chrome-interactive inline-flex rounded-md border border-border px-3 py-1.5 text-sm text-foreground"
            >
              Email
            </a>
          </li>
          {about.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="chrome-interactive inline-flex rounded-md border border-border px-3 py-1.5 text-sm text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
