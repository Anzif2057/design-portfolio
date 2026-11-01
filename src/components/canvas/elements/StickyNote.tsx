import type { ReactNode } from 'react'
import { flowStyle, placeStyle } from './place'
import type { WorldPlacement } from './types'
import { Pushpin } from './marks'

export type StickyTone = 'yellow' | 'pink' | 'blue' | 'green'

interface StickyNoteProps {
  /** Omit to render in normal flow (size it with `className`). */
  placement?: WorldPlacement
  /** Tilt in degrees when rendered in flow. */
  rotation?: number
  tone?: StickyTone
  title?: string
  handwrittenTitle?: boolean
  pin?: 'pushpin' | 'tape' | 'none'
  lifted?: boolean
  className?: string
  children?: ReactNode
}

const TONE_VAR: Record<StickyTone, string> = {
  yellow: 'var(--sticky-yellow)',
  pink: 'var(--sticky-pink)',
  blue: 'var(--sticky-blue)',
  green: 'var(--sticky-green)',
}

export function StickyNote({
  placement,
  rotation: flowRotation = 0,
  tone = 'yellow',
  title,
  handwrittenTitle = true,
  pin = 'none',
  lifted = false,
  className = '',
  children,
}: StickyNoteProps) {
  const lift = lifted ? 1.5 : 0
  const layout = placement
    ? {
        ...placeStyle({ ...placement, rotation: (placement.rotation ?? 0) + lift }),
        width: placement.width ?? 180,
        minHeight: placement.height ?? 140,
      }
    : flowStyle(flowRotation + lift)

  return (
    <div
      className={['sticky-note', lifted ? 'sticky-note--lifted' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{ ...layout, background: TONE_VAR[tone] }}
    >
      {pin === 'pushpin' ? (
        <span className="sticky-note__pin" aria-hidden>
          <Pushpin />
        </span>
      ) : null}
      {pin === 'tape' ? <span className="sticky-note__tape" aria-hidden /> : null}
      {title ? (
        <p
          className={
            handwrittenTitle ? 'font-hand sticky-note__title' : 'sticky-note__title'
          }
          style={{ fontSize: handwrittenTitle ? 28 : 18 }}
        >
          {title}
        </p>
      ) : null}
      {children ? <div className="sticky-note__body">{children}</div> : null}
    </div>
  )
}
