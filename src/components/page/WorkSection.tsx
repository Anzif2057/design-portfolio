import { useId, type CSSProperties, type FocusEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Handwritten, Squiggle } from '@/components/canvas/elements'
import { showcaseProjects as projects, workIntro } from '@/data/work'
import { useSnapSlider } from '@/hooks/useSnapSlider'
import { WorkItem } from './WorkItem'

export function WorkSection({ index }: { index: number }) {
  const headingId = useId()
  const { listRef, index: current, scrollToSlide } = useSnapSlider<HTMLUListElement>()
  const last = projects.length - 1

  const onSlideFocus = (slide: number) => (event: FocusEvent<HTMLLIElement>) => {
    if (event.target.matches(':focus-visible')) {
      scrollToSlide(slide)
    }
  }

  return (
    <section
      id="work"
      aria-labelledby={headingId}
      tabIndex={-1}
      className="w-full scroll-mt-20 py-24 last:min-h-[calc(100svh-5rem)] focus:outline-none"
    >
      <header>
        <p className="text-xs font-medium tracking-wide text-muted">
          {String(index).padStart(2, '0')} · Work
        </p>
        <div className="relative mt-2 inline-block">
          <Handwritten as="h2" id={headingId} size={72}>
            Work
          </Handwritten>
          <Squiggle
            style={{
              position: 'absolute',
              left: 0,
              bottom: -18,
              width: '100%',
              height: 26,
              color: 'var(--color-accent)',
            }}
          />
        </div>
        <p className="mt-8 text-lg text-muted">{workIntro}</p>
      </header>

      <div className="work__showcase">
        <ul ref={listRef} className="work__list" aria-label="Projects">
          {projects.map((project, slide) => (
            <li
              key={project.slug}
              className="work__slide"
              style={{ '--angle': `${project.angle ?? 0}deg` } as CSSProperties}
              onFocus={onSlideFocus(slide)}
            >
              <WorkItem project={project} />
            </li>
          ))}
        </ul>

        <div className="work__controls">
          <button
            type="button"
            className="work__arrow chrome-interactive"
            aria-label="Previous project"
            disabled={current === 0}
            onClick={() => scrollToSlide(current - 1)}
          >
            <ChevronLeft size={20} aria-hidden />
          </button>
          <p className="work__count" aria-live="polite">
            <span aria-hidden>
              {current + 1} / {projects.length}
            </span>
            <span className="sr-only">
              Project {current + 1} of {projects.length}
            </span>
          </p>
          <button
            type="button"
            className="work__arrow chrome-interactive"
            aria-label="Next project"
            disabled={current === last}
            onClick={() => scrollToSlide(current + 1)}
          >
            <ChevronRight size={20} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
