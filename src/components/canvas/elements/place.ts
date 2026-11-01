import type { CSSProperties } from 'react'
import type { WorldPlacement } from './types'

/** Absolute placement in section world space. */
export function placeStyle(placement: WorldPlacement): CSSProperties {
  const { x, y, rotation = 0, width, height, zIndex } = placement
  return {
    position: 'absolute',
    left: x,
    top: y,
    width,
    height,
    zIndex,
    transform: rotation ? `rotate(${rotation}deg)` : undefined,
    transformOrigin: 'center center',
  }
}
