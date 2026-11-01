import { useEffect } from 'react'
import { SECTIONS } from '@/data/sections'
import { isShortcutBlockedTarget } from '@/lib/focus'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'

/** Keyboard: 1–5 sections, ←/→ prev/next, Esc overview (or close modal). */
export function useCanvasShortcuts(): void {
  const { navigateTo, goNext, goPrev, isShortcutsOpen, closeShortcuts } =
    useCanvasNavigation()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isShortcutsOpen) {
        if (event.key === 'Escape') {
          event.preventDefault()
          closeShortcuts()
        }
        return
      }

      if (isShortcutBlockedTarget(event.target)) {
        return
      }

      const sectionMatch = SECTIONS.find((section) => section.shortcut === event.key)
      if (sectionMatch) {
        event.preventDefault()
        navigateTo(sectionMatch.id)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        navigateTo('overview')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigateTo, goNext, goPrev, isShortcutsOpen, closeShortcuts])
}
