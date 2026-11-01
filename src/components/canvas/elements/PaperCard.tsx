import type { ReactNode } from 'react'
import { elementStyle } from './place'
import type { WorldPlacement } from './types'

interface PaperCardProps {
  /** Omit to render in normal flow. */
  placement?: WorldPlacement
  /** Tilt in degrees when rendered in flow. */
  rotation?: number
  className?: string
  children: ReactNode
}

/** Clean sans text block on a paper-like card. */
export function PaperCard({
  placement,
  rotation,
  className = '',
  children,
}: PaperCardProps) {
  return (
    <div
      className={['paper-card', className].filter(Boolean).join(' ')}
      style={elementStyle(placement, rotation)}
    >
      {children}
    </div>
  )
}
