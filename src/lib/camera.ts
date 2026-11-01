/** Shared camera timing for all programmatic viewport moves. */
export const CAMERA_DURATION_MS = 800

export function getCameraDuration(prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? 0 : CAMERA_DURATION_MS
}

/** Extra right padding so the active cluster sits in the visible left band. */
export const PANEL_DESKTOP_FIT_PADDING = {
  top: 0.18,
  right: 0.52,
  bottom: 0.18,
  left: 0.1,
} as const
