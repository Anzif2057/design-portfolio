import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function slidesOf(list: HTMLElement): HTMLElement[] {
  return Array.from(list.children) as HTMLElement[]
}

/** Scroll position that start-snaps `slide` (the first slide's offset is the row's inset). */
function snapLeft(list: HTMLElement, slide: HTMLElement): number {
  return slide.offsetLeft - (slidesOf(list)[0]?.offsetLeft ?? 0)
}

/** Slide whose snap position is closest to the current scroll (the last one at the end). */
function nearestSlide(list: HTMLElement): number {
  let best = 0
  let bestDistance = Infinity
  slidesOf(list).forEach((slide, index) => {
    const distance = Math.abs(snapLeft(list, slide) - list.scrollLeft)
    if (distance < bestDistance) {
      best = index
      bestDistance = distance
    }
  })
  return best
}

/**
 * Index tracking + programmatic paging for a native start-aligned scroll-snap row.
 * The list must be the slides' offsetParent (position: relative).
 * When the list is not scrollable (desktop grid) paging is a no-op.
 */
export function useSnapSlider<T extends HTMLElement>() {
  const listRef = useRef<T>(null)
  const [index, setIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const list = listRef.current
    if (!list) {
      return
    }
    let frame = 0
    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0
          setIndex(nearestSlide(list))
        })
      }
    }
    list.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      list.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollToSlide = useCallback(
    (target: number) => {
      const list = listRef.current
      const slide = list ? slidesOf(list)[target] : undefined
      if (!list || !slide) {
        return
      }
      list.scrollTo({
        left: snapLeft(list, slide),
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
    },
    [reducedMotion],
  )

  return { listRef, index, scrollToSlide }
}
