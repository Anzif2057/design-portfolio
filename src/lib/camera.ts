/** Shared camera timing for all programmatic viewport moves. */
export const CAMERA_DURATION_MS = 800

export function getCameraDuration(prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? 0 : CAMERA_DURATION_MS
}

/**
 * Fit padding for an opened section — clears top chrome, left toolbar,
 * and bottom stepper (no side-panel offset).
 */
export const SECTION_FIT_PADDING = {
  top: 0.14,
  right: 0.1,
  bottom: 0.18,
  left: 0.14,
} as const

export const OVERVIEW_FIT_PADDING = 0.2
