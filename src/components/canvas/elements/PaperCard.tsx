import type { ReactNode } from 'react'
import { placeStyle } from './place'
import type { WorldPlacement } from './types'

interface PaperCardProps {
  placement: WorldPlacement
  className?: string
  children: ReactNode
}

/** Clean sans text block on a paper-like card. */
export function PaperCard({ placement, className = '', children }: PaperCardProps) {
  return (
    <div
      className={['paper-card', className].filter(Boolean).join(' ')}
      style={placeStyle(placement)}
    >
      {children}
    </div>
  )
}
