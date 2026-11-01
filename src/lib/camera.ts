/** Shared camera timing for all programmatic viewport moves. */
export const CAMERA_DURATION_MS = 800

export function getCameraDuration(prefersReducedMotion: boolean): number {
  return prefersReducedMotion ? 0 : CAMERA_DURATION_MS
}
