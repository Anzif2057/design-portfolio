import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { SectionBody } from '@/components/content/SectionBody'
import { getSectionLabel } from '@/data/sections'
import { getProjectBySlug } from '@/data/work'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getFocusableElements } from '@/lib/focus'
import type { SectionId } from '@/types'

export function ContentPanel() {
  const { view, projectSlug, panelOpen, navigateTo, openProject, closeProject } =
    useCanvasNavigation()
  const isMobile = useIsMobile()
  const prefersReducedMotion = usePrefersReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocusRef = useRef<HTMLElement | null>(null)

  const sectionId = view === 'overview' ? null : (view as SectionId)

  useEffect(() => {
    if (panelOpen) {
      const active = document.activeElement
      if (active instanceof HTMLElement) {
        lastFocusRef.current = active
      }
      window.requestAnimationFrame(() => {
        closeRef.current?.focus()
      })
      return
    }

    const restore = lastFocusRef.current
    if (restore && document.contains(restore)) {
      restore.focus()
    }
    lastFocusRef.current = null
  }, [panelOpen])

  // Mobile focus trap
  useEffect(() => {
    if (!panelOpen || !isMobile) {
      return
    }

    const node = panelRef.current
    if (!node) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return
      }
      const focusable = getFocusableElements(node)
      if (focusable.length === 0) {
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => node.removeEventListener('keydown', onKeyDown)
  }, [panelOpen, isMobile, sectionId, projectSlug])

  const duration = prefersReducedMotion ? 0 : 0.35
  const project = projectSlug ? getProjectBySlug(projectSlug) : null
  const heading =
    sectionId === 'work' && project
      ? project.title
      : sectionId
        ? getSectionLabel(sectionId)
        : 'Section'

  return (
    <AnimatePresence>
      {panelOpen && sectionId ? (
        <motion.div
          key="content-panel"
          ref={panelRef}
          role="dialog"
          aria-modal={isMobile}
          aria-label={heading}
          data-canvas-panel="true"
          className={[
            'pointer-events-auto absolute z-30 flex flex-col border-border bg-background shadow-lg',
            isMobile
              ? 'inset-0 border-0'
              : 'top-0 right-0 h-full w-[min(45vw,720px)] border-l',
          ].join(' ')}
          initial={
            prefersReducedMotion
              ? false
              : isMobile
                ? { y: '100%', opacity: 1 }
                : { x: '100%', opacity: 1 }
          }
          animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          exit={
            prefersReducedMotion
              ? undefined
              : isMobile
                ? { y: '100%', opacity: 1 }
                : { x: '100%', opacity: 1 }
          }
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">{heading}</p>
            <button
              ref={closeRef}
              type="button"
              className="chrome-interactive rounded-md p-2 text-muted"
              aria-label="Close panel"
              onClick={() => navigateTo('overview')}
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6">
            <SectionBody
              sectionId={sectionId}
              projectSlug={projectSlug}
              onOpenProject={openProject}
              onBackToGrid={closeProject}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
