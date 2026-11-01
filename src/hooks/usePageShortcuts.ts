import { useEffect } from 'react'
import { SECTIONS } from '@/data/sections'
import { isShortcutBlockedTarget } from '@/lib/focus'
import { usePageNavigation } from '@/hooks/usePageNavigation'

/** Keyboard: 1–5 scroll to Updates…Work, 0 scrolls to Home. */
export function usePageShortcuts(): void {
  const { scrollTo, scrollToTop, isShortcutsOpen } = usePageNavigation()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isShortcutsOpen || isShortcutBlockedTarget(event.target)) {
        return
      }

      if (event.key === '0') {
        event.preventDefault()
        scrollToTop()
        return
      }

      const sectionMatch = SECTIONS.find((section) => section.shortcut === event.key)
      if (sectionMatch) {
        event.preventDefault()
        scrollTo(sectionMatch.id)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [scrollTo, scrollToTop, isShortcutsOpen])
}
