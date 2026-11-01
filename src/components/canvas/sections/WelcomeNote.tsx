import { Arrow, Handwritten, StickyNote } from '@/components/canvas/elements'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { WELCOME_SIZE } from '@/lib/canvasWorld'

export function WelcomeNote() {
  const isMobile = useIsMobile()

  return (
    <div
      className="welcome-note"
      style={{ width: WELCOME_SIZE.width, height: WELCOME_SIZE.height }}
    >
      <StickyNote
        placement={{ x: 20, y: 10, width: 280, height: 170, rotation: -2 }}
        tone="yellow"
        pin="tape"
        handwrittenTitle
        title="Hi, I'm Anzif"
      >
        <p className="welcome-note__hint">
          {isMobile ? 'Tap anything to zoom in' : 'Hover over anything, click to zoom in'}
        </p>
      </StickyNote>
      <Handwritten
        placement={{ x: 40, y: 200, width: 160 }}
        size={28}
        style={{ color: 'var(--color-muted)' }}
      >
        Work →
      </Handwritten>
      <Arrow
        placement={{ x: 180, y: 190, width: 130, height: 70, rotation: 25 }}
        style={{ color: 'var(--color-accent)' }}
      />
    </div>
  )
}
