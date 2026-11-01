import { useId } from 'react'

interface SectionStubProps {
  id: string
  index: number
  label: string
  heading: string
  isLanding?: boolean
}

export function SectionStub({
  id,
  index,
  label,
  heading,
  isLanding = false,
}: SectionStubProps) {
  const headingId = useId()
  const HeadingTag = isLanding ? 'h1' : 'h2'

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      tabIndex={-1}
      className={[
        'w-full scroll-mt-20 py-24 last:min-h-[calc(100svh-5rem)] focus:outline-none',
        isLanding ? 'flex min-h-svh flex-col justify-center' : '',
      ].join(' ')}
    >
      <p className="text-xs font-medium tracking-wide text-muted">
        {String(index).padStart(2, '0')} · {label}
      </p>
      <HeadingTag
        id={headingId}
        className={[
          'mt-2 font-semibold text-foreground',
          isLanding ? 'text-3xl' : 'text-2xl',
        ].join(' ')}
      >
        {heading}
      </HeadingTag>
      <p className="mt-4 max-w-prose text-base text-muted">
        Placeholder — {label} content will be designed in a later step.
      </p>
    </section>
  )
}
