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

/** Normal document flow with an optional tilt (no world coordinates). */
export function flowStyle(rotation = 0): CSSProperties {
  return {
    position: 'relative',
    transform: rotation ? `rotate(${rotation}deg)` : undefined,
    transformOrigin: 'center center',
  }
}

/** World placement when given, otherwise flow layout. */
export function elementStyle(
  placement?: WorldPlacement,
  rotation?: number,
): CSSProperties {
  return placement ? placeStyle(placement) : flowStyle(rotation)
}
