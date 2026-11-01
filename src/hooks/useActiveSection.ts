import { useCallback, useEffect, useRef, useState } from 'react'
import { SECTION_ORDER } from '@/data/sections'
import { sectionElementId } from '@/lib/scroll'
import type { CanvasView } from '@/types'

const PAGE_ORDER: CanvasView[] = ['overview', ...SECTION_ORDER]

/** Fraction of the viewport height used as the "reading line". */
const READING_LINE = 0.4
/** Unlock after this long without scroll events once a programmatic scroll started. */
const SCROLL_IDLE_MS = 150
/** Unlock if a programmatic scroll never produced a scroll event (already in place). */
const SCROLL_START_MS = 400

function computeActiveSection(): CanvasView {
  const doc = document.documentElement
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
    return PAGE_ORDER[PAGE_ORDER.length - 1]
  }

  const line = window.innerHeight * READING_LINE
  let current: CanvasView = 'overview'
  for (const view of PAGE_ORDER) {
    const element = document.getElementById(sectionElementId(view))
    if (element && element.getBoundingClientRect().top <= line) {
      current = view
    }
  }
  return current
}

/**
 * Tracks the section under the reading line (last section at the page end).
 * `lockTo` pins the result while a programmatic scroll runs so highlights don't flicker.
 */
export function useActiveSection(initial: CanvasView) {
  const [active, setActive] = useState<CanvasView>(initial)
  const lockedRef = useRef(false)
  const unlockTimerRef = useRef<number | undefined>(undefined)

  const refresh = useCallback(() => setActive(computeActiveSection()), [])

  const unlock = useCallback(() => {
    window.clearTimeout(unlockTimerRef.current)
    lockedRef.current = false
    refresh()
  }, [refresh])

  const armUnlock = useCallback(
    (delay: number) => {
      window.clearTimeout(unlockTimerRef.current)
      unlockTimerRef.current = window.setTimeout(unlock, delay)
    },
    [unlock],
  )

  const lockTo = useCallback(
    (target: CanvasView) => {
      lockedRef.current = true
      setActive(target)
      armUnlock(SCROLL_START_MS)
    },
    [armUnlock],
  )

  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (lockedRef.current) {
        armUnlock(SCROLL_IDLE_MS)
        return
      }
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0
          refresh()
        })
      }
    }

    const onScrollEnd = () => {
      if (lockedRef.current) {
        unlock()
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('scrollend', onScrollEnd)
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(unlockTimerRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('scrollend', onScrollEnd)
      window.removeEventListener('resize', onScroll)
    }
  }, [armUnlock, refresh, unlock])

  return { active, lockTo }
}
