import {
  Arrow,
  Squiggle,
  Star,
  StickyNote,
  TapedPhoto,
} from '@/components/canvas/elements'
import { about } from '@/data/about'

/** Decorative design-board cluster beside the landing text (460×460 board, scaled by CSS). */
export function HeroBoard() {
  return (
    <div className="hero-board">
      <div className="hero-board__canvas">
        <TapedPhoto
          placement={{ x: 140, y: 30, width: 220, rotation: 3 }}
          src="/placeholder-image.svg"
          alt={about.photoAlt}
          caption="that's me"
        />

        <div aria-hidden="true">
          <StickyNote
            placement={{ x: 0, y: 270, width: 170, height: 110, rotation: -5, zIndex: 2 }}
            tone="yellow"
            pin="tape"
            title="UX research"
            className="hero-sticky"
          />
          <StickyNote
            placement={{
              x: 290,
              y: 320,
              width: 160,
              height: 104,
              rotation: 4,
              zIndex: 2,
            }}
            tone="blue"
            pin="pushpin"
            title="Front-end"
            className="hero-sticky"
          />
          <Star
            placement={{ x: 400, y: 10, rotation: 12 }}
            style={{ color: 'var(--color-accent)' }}
          />
          <Squiggle placement={{ x: 0, y: 190, width: 110, height: 22, rotation: -8 }} />
          <Arrow placement={{ x: 30, y: 70, width: 96, height: 48, rotation: 18 }} />
        </div>
      </div>
    </div>
  )
}
