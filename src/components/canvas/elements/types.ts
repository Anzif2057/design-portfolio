import type { CSSProperties, ReactNode } from 'react'

/** Placement inside a section’s world coordinates (origin top-left). */
export interface WorldPlacement {
  x: number
  y: number
  /** Degrees clockwise */
  rotation?: number
  width?: number
  height?: number
  zIndex?: number
}

export interface PlacedProps {
  placement: WorldPlacement
  className?: string
  children?: ReactNode
  style?: CSSProperties
}
