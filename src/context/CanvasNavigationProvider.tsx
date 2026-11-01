import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { SECTION_ORDER } from '@/data/sections'
import type { CanvasView } from '@/types/navigation'
import type { SectionId } from '@/types'
import { CanvasNavigationContext } from './canvasNavigationContext'

export function CanvasNavigationProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<CanvasView>('overview')
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  const navigateTo = useCallback((next: CanvasView) => {
    setView(next)
  }, [])

  const goNext = useCallback(() => {
    setView((current) => {
      if (current === 'overview') {
        return SECTION_ORDER[0]
      }
      const index = SECTION_ORDER.indexOf(current)
      const nextIndex = (index + 1) % SECTION_ORDER.length
      return SECTION_ORDER[nextIndex]
    })
  }, [])

  const goPrev = useCallback(() => {
    setView((current) => {
      if (current === 'overview') {
        return SECTION_ORDER[SECTION_ORDER.length - 1]
      }
      const index = SECTION_ORDER.indexOf(current)
      const prevIndex = (index - 1 + SECTION_ORDER.length) % SECTION_ORDER.length
      return SECTION_ORDER[prevIndex]
    })
  }, [])

  const openShortcuts = useCallback(() => setIsShortcutsOpen(true), [])
  const closeShortcuts = useCallback(() => setIsShortcutsOpen(false), [])

  const sectionIndex =
    view === 'overview' ? null : SECTION_ORDER.indexOf(view as SectionId)

  const value = useMemo(
    () => ({
      view,
      sectionIndex,
      navigateTo,
      goNext,
      goPrev,
      isShortcutsOpen,
      openShortcuts,
      closeShortcuts,
    }),
    [
      view,
      sectionIndex,
      navigateTo,
      goNext,
      goPrev,
      isShortcutsOpen,
      openShortcuts,
      closeShortcuts,
    ],
  )

  return (
    <CanvasNavigationContext.Provider value={value}>
      {children}
    </CanvasNavigationContext.Provider>
  )
}
