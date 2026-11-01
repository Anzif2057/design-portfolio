import { useId, useRef, type ReactNode } from 'react'
import {
  Annotate,
  Arrow,
  Handwritten,
  PaperCard,
  Squiggle,
  Star,
  StickyNote,
  TapedPhoto,
  type StickyTone,
} from '@/components/canvas/elements'
import { about } from '@/data/about'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { FrameHover } from './FrameHover'

/** Words from the bio to circle (only marked where they appear). */
const BIO_KEYWORDS = ['designing', 'collaboration', 'problems']

interface FunFact {
  title: string
  body: string
  tone: StickyTone
  pin: 'pushpin' | 'tape'
  rotation: number
}

const FUN_FACTS: FunFact[] = [
  {
    title: 'Fun fact',
    body: 'Sketches on paper before any pixels.',
    tone: 'yellow',
    pin: 'pushpin',
    rotation: -4,
  },
  {
    title: 'Also',
    body: 'Keeps a ridiculous number of browser tabs open.',
    tone: 'pink',
    pin: 'tape',
    rotation: 3,
  },
  { title: 'Now', body: about.status, tone: 'blue', pin: 'pushpin', rotation: -2 },
]

const KEYWORD_PATTERN = new RegExp(`(${BIO_KEYWORDS.join('|')})`, 'g')

function renderBio(paragraph: string, draw: boolean, startIndex: number): ReactNode[] {
  let markIndex = startIndex
  return paragraph.split(KEYWORD_PATTERN).map((part, index) => {
    if (!BIO_KEYWORDS.includes(part)) {
      return part
    }
    const delay = markIndex++ * 250
    return (
      <Annotate
        key={`${part}-${index}`}
        type="circle"
        active={draw}
        drawOn
        drawDelayMs={delay}
        className="about__keyword"
      >
        {part}
      </Annotate>
    )
  })
}

function countKeywords(paragraph: string): number {
  return paragraph.split(KEYWORD_PATTERN).filter((part) => BIO_KEYWORDS.includes(part))
    .length
}

/** Index of each paragraph's first mark, so draw-on delays stagger across paragraphs. */
const BIO_MARK_OFFSETS = about.bio.map((_, index) =>
  about.bio
    .slice(0, index)
    .reduce((total, paragraph) => total + countKeywords(paragraph), 0),
)

export function AboutSection() {
  const headingId = useId()
  const bioRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const bioInView = useInViewOnce(bioRef, 0.4)
  const draw = reducedMotion || bioInView

  return (
    <section
      id="about"
      aria-labelledby={headingId}
      tabIndex={-1}
      className="w-full scroll-mt-20 py-24 focus:outline-none"
    >
      <FrameHover label="About Me" className="about">
        <header className="about__header">
          <p className="text-xs font-medium tracking-wide text-muted">02 · About Me</p>
          <div className="relative mt-2 inline-block">
            <Handwritten as="h2" id={headingId} size={72}>
              About me
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
        </header>

        <div className="about__photo">
          <TapedPhoto
            rotation={-2.5}
            src="/placeholder-image.svg"
            alt={about.photoAlt}
            caption={about.name}
            className="about__polaroid"
          />
          <Star
            className="about__star"
            style={{ color: 'var(--color-accent)', transform: 'rotate(12deg)' }}
          />
        </div>

        <div ref={bioRef} className="about__bio">
          <PaperCard rotation={0.6}>
            <div className="space-y-4 text-lg leading-relaxed text-foreground">
              {about.bio.map((paragraph, index) => (
                <p key={paragraph}>
                  {renderBio(paragraph, draw, BIO_MARK_OFFSETS[index])}
                </p>
              ))}
            </div>
          </PaperCard>
        </div>

        <div className="about__facts">
          <PaperCard rotation={-0.5}>
            <Handwritten as="h3" size={34}>
              Quick facts
            </Handwritten>
            <dl className="mt-4 grid gap-4 text-base">
              <div>
                <dt className="font-semibold text-foreground">Location</dt>
                <dd className="mt-1 text-muted">{about.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Education</dt>
                <dd className="mt-1 text-muted">{about.education}</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Focus areas</dt>
                <dd className="mt-1 text-muted">{about.focusAreas.join(' · ')}</dd>
              </div>
            </dl>
          </PaperCard>
        </div>

        <div className="about__stickies">
          <ul className="about__sticky-list" aria-label="Fun facts">
            {FUN_FACTS.map((fact, index) => (
              <li key={fact.title} className="relative">
                {index === 0 ? (
                  <span className="about__arrow">
                    <Arrow width={90} height={45} />
                  </span>
                ) : null}
                <StickyNote
                  rotation={fact.rotation}
                  tone={fact.tone}
                  pin={fact.pin}
                  title={fact.title}
                  className="frame-hover__lift about__sticky"
                >
                  <p>{fact.body}</p>
                </StickyNote>
              </li>
            ))}
          </ul>
        </div>
      </FrameHover>
    </section>
  )
}
