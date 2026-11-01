import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProjectBySlug } from '@/data/work'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { pathFromState, stateFromPath } from '@/lib/paths'
import { scrollToView } from '@/lib/scroll'
import type { CanvasView } from '@/types'
import { PageNavigationContext } from './pageNavigationContext'

export function PageNavigationProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const reducedMotion = usePrefersReducedMotion()
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  const route = stateFromPath(location.pathname)
  const view = route.view
  const projectSlug =
    route.projectSlug && getProjectBySlug(route.projectSlug) ? route.projectSlug : null

  const initialView = useRef(view)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    scrollToView(initialView.current, { behavior: 'auto', focus: false })
  }, [])

  useEffect(() => {
    if (route.projectSlug && !getProjectBySlug(route.projectSlug)) {
      navigate('/work', { replace: true })
    }
  }, [route.projectSlug, navigate])

  const scrollTo = useCallback(
    (target: CanvasView) => {
      navigate(pathFromState({ view: target, projectSlug: null }), { replace: true })
      scrollToView(target, { behavior: reducedMotion ? 'auto' : 'smooth', focus: true })
    },
    [navigate, reducedMotion],
  )

  const scrollToTop = useCallback(() => scrollTo('overview'), [scrollTo])
  const openShortcuts = useCallback(() => setIsShortcutsOpen(true), [])
  const closeShortcuts = useCallback(() => setIsShortcutsOpen(false), [])

  const value = useMemo(
    () => ({
      view,
      projectSlug,
      scrollTo,
      scrollToTop,
      isShortcutsOpen,
      openShortcuts,
      closeShortcuts,
    }),
    [
      view,
      projectSlug,
      scrollTo,
      scrollToTop,
      isShortcutsOpen,
      openShortcuts,
      closeShortcuts,
    ],
  )

  return (
    <PageNavigationContext.Provider value={value}>
      {children}
    </PageNavigationContext.Provider>
  )
}
