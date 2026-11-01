import { useId } from 'react'

interface SectionStubProps {
  id: string
  index: number
  label: string
  heading: string
}

export function SectionStub({ id, index, label, heading }: SectionStubProps) {
  const headingId = useId()

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      tabIndex={-1}
      className="w-full scroll-mt-20 py-24 last:min-h-[calc(100svh-5rem)] focus:outline-none"
    >
      <p className="text-xs font-medium tracking-wide text-muted">
        {String(index).padStart(2, '0')} · {label}
      </p>
      <h2 id={headingId} className="mt-2 text-2xl font-semibold text-foreground">
        {heading}
      </h2>
      <p className="mt-4 max-w-prose text-base text-muted">
        Placeholder — {label} content will be designed in a later step.
      </p>
    </section>
  )
}
