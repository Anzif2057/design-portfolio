import { useId } from 'react'
import { Arrow, Handwritten, ScribbleUnderline } from '@/components/canvas/elements'
import { about } from '@/data/about'
import { usePageNavigation } from '@/hooks/usePageNavigation'
import { HOME_SECTION_ID } from '@/lib/scroll'
import { HeroBoard } from './HeroBoard'

const ROLE = 'Product and UI/UX Designer'
const TAGLINE = 'I design things people actually enjoy using.'

export function LandingHero() {
  const headingId = useId()
  const { scrollTo } = usePageNavigation()

  return (
    <section
      id={HOME_SECTION_ID}
      aria-labelledby={headingId}
      tabIndex={-1}
      className="hero relative flex min-h-svh w-full scroll-mt-20 flex-col focus:outline-none"
    >
      <div className="hero__layout">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted">00 · Home</p>
          <Handwritten
            as="h1"
            id={headingId}
            className="mt-3 whitespace-nowrap"
            style={{ fontSize: 'clamp(3.5rem, 4.5vw + 1.75rem, 7rem)', lineHeight: 1 }}
          >
            Hi, I&apos;m{' '}
            <span className="relative inline-block">
              {about.name}
              <ScribbleUnderline
                style={{
                  position: 'absolute',
                  left: '-2%',
                  bottom: '-0.08em',
                  width: '104%',
                  height: '0.2em',
                  color: 'var(--color-accent)',
                }}
              />
            </span>
          </Handwritten>
          <p className="mt-5 text-xl font-semibold text-foreground md:text-2xl">{ROLE}</p>
          <p className="mt-2 text-lg text-muted">{TAGLINE}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="chrome-interactive chrome-interactive-accent inline-flex min-h-11 items-center rounded-lg px-5 text-base font-semibold"
              onClick={() => scrollTo('work')}
            >
              See my work
            </button>
            <a
              href="/cv.pdf"
              download="Anzif-CV.pdf"
              className="chrome-interactive inline-flex min-h-11 items-center rounded-lg border border-border bg-background px-5 text-base font-semibold text-foreground"
            >
              Download CV
            </a>
          </div>
        </div>

        <HeroBoard />
      </div>

      <div className="hero__cue" aria-hidden="true">
        <Handwritten as="span" size={24} style={{ color: 'var(--color-muted)' }}>
          scroll to explore
        </Handwritten>
        <Arrow width={56} height={28} className="hero__cue-arrow" />
      </div>
    </section>
  )
}
