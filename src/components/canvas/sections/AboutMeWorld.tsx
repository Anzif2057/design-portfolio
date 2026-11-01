import { about } from '@/data/about'
import {
  Annotate,
  Arrow,
  Handwritten,
  PaperCard,
  ScribbleUnderline,
  Star,
  StickyNote,
  TapedPhoto,
} from '@/components/canvas/elements'
import { SECTION_WORLD } from '@/lib/canvasWorld'
import { SectionSelectionChrome } from './SectionSelectionChrome'

interface AboutMeWorldProps {
  highlighted: boolean
  opened: boolean
  /** Hide desktop-only accents (stickies / arrow) while mobile crop is active. */
  hideDesktopAccents?: boolean
  onOpen: () => void
}

export function AboutMeWorld({
  highlighted,
  opened,
  hideDesktopAccents = false,
  onOpen,
}: AboutMeWorldProps) {
  const draw = highlighted || opened
  const interactive = !opened
  const showAccents = !hideDesktopAccents

  return (
    <div
      className={[
        'section-world',
        highlighted ? 'section-world--highlighted' : '',
        opened ? 'section-world--opened' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: SECTION_WORLD.width, height: SECTION_WORLD.height }}
    >
      {interactive ? (
        <button
          type="button"
          className="section-world__hit"
          aria-label="About Me — click to open"
          onClick={onOpen}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpen()
            }
          }}
        />
      ) : null}

      {highlighted && !opened ? (
        <SectionSelectionChrome label="About Me · click to open" />
      ) : null}

      {/* Readable cluster — kept inside ABOUT_MOBILE_BOUNDS */}
      <Handwritten placement={{ x: 48, y: 20, zIndex: 2 }} size={96}>
        About me
      </Handwritten>
      <ScribbleUnderline
        placement={{ x: 56, y: 112, width: 360, height: 22, zIndex: 2 }}
        style={{ color: 'var(--color-accent)' }}
      />

      <TapedPhoto
        placement={{ x: 48, y: 148, width: 200, height: 250, rotation: -2.5 }}
        src="/placeholder-image.svg"
        alt={about.photoAlt}
        caption={about.name}
      />

      <PaperCard placement={{ x: 278, y: 148, width: 310, height: 250 }}>
        <p className="section-world__eyebrow">{about.role}</p>
        {about.bio.map((paragraph) => (
          <p key={paragraph} className="section-world__body">
            {paragraph}
          </p>
        ))}
      </PaperCard>

      {about.focusAreas.map((area, index) => (
        <Annotate
          key={area}
          type="circle"
          active={draw}
          className="section-world__keyword"
          placement={{
            x: 278,
            y: 420 + index * 48,
            width: 300,
            zIndex: 4,
          }}
        >
          {area}
        </Annotate>
      ))}

      <PaperCard placement={{ x: 48, y: 575, width: 540, height: 290 }}>
        <p className="font-hand section-world__facts-title">Quick facts</p>
        <dl className="section-world__facts">
          <div>
            <dt>Location</dt>
            <dd>{about.location}</dd>
          </div>
          <div>
            <dt>Education</dt>
            <dd>{about.education}</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>{about.focusAreas.join(' · ')}</dd>
          </div>
        </dl>
      </PaperCard>

      {showAccents ? (
        <>
          <StickyNote
            placement={{ x: 720, y: 60, width: 200, height: 145, rotation: -7 }}
            tone="yellow"
            title="Fun fact"
            pin="pushpin"
            lifted={draw}
          >
            <p>Sketches on paper before any pixels.</p>
          </StickyNote>

          {/* Curved arrow: sticky → polaroid */}
          <Arrow
            placement={{ x: 480, y: 140, width: 220, height: 110, zIndex: 3 }}
            style={{
              color: 'var(--color-accent)',
              transform: 'scaleX(-1) rotate(-12deg)',
            }}
          />

          <StickyNote
            placement={{ x: 960, y: 240, width: 200, height: 150, rotation: 5 }}
            tone="pink"
            title="Also"
            pin="tape"
            lifted={draw}
          >
            <p>Keeps a ridiculous number of browser tabs open.</p>
          </StickyNote>

          <StickyNote
            placement={{ x: 740, y: 500, width: 210, height: 150, rotation: -3.5 }}
            tone="blue"
            title="Now"
            pin="pushpin"
            lifted={draw}
          >
            <p>{about.status}</p>
          </StickyNote>

          <Star
            placement={{ x: 1160, y: 80, width: 36, height: 36, rotation: 12 }}
            style={{ color: 'var(--color-accent)' }}
          />
          <Star
            placement={{ x: 620, y: 800, width: 26, height: 26, rotation: -18 }}
            style={{ color: 'var(--color-muted)' }}
          />
        </>
      ) : null}
    </div>
  )
}
