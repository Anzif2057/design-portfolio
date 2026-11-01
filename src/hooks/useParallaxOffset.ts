import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const MAX_SHIFT_PX = 4
const ZERO = { x: 0, y: 0 }

function isTouchPrimaryDevice(): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}

/** Tiny mouse-based offset for the dot grid. Disabled for reduced motion / touch. */
export function useParallaxOffset(): { x: number; y: number } {
  const prefersReducedMotion = usePrefersReducedMotion()
  const enabled = !prefersReducedMotion && !isTouchPrimaryDevice()
  const [offset, setOffset] = useState(ZERO)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      setOffset({
        x: Number((x * MAX_SHIFT_PX).toFixed(2)),
        y: Number((y * MAX_SHIFT_PX).toFixed(2)),
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  if (!enabled) {
    return ZERO
  }

  return offset
}
