import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProjectBySlug } from '@/data/work'
import { useActiveSection } from '@/hooks/useActiveSection'
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
  const routeViewRef = useRef(view)

  useEffect(() => {
    routeViewRef.current = view
  }, [view])

  // Must run before the tracker's first measurement so deep links measure in place.
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    scrollToView(initialView.current, { behavior: 'auto', focus: false })
  }, [])

  const { active: activeSection, lockTo } = useActiveSection(view)

  useEffect(() => {
    if (activeSection !== routeViewRef.current) {
      navigate(pathFromState({ view: activeSection, projectSlug: null }), {
        replace: true,
      })
    }
  }, [activeSection, navigate])

  useEffect(() => {
    if (route.projectSlug && !getProjectBySlug(route.projectSlug)) {
      navigate('/work', { replace: true })
    }
  }, [route.projectSlug, navigate])

  const scrollTo = useCallback(
    (target: CanvasView) => {
      lockTo(target)
      navigate(pathFromState({ view: target, projectSlug: null }), { replace: true })
      scrollToView(target, { behavior: reducedMotion ? 'auto' : 'smooth', focus: true })
    },
    [lockTo, navigate, reducedMotion],
  )

  const scrollToTop = useCallback(() => scrollTo('overview'), [scrollTo])
  const openShortcuts = useCallback(() => setIsShortcutsOpen(true), [])
  const closeShortcuts = useCallback(() => setIsShortcutsOpen(false), [])

  const value = useMemo(
    () => ({
      view,
      projectSlug,
      activeSection,
      scrollTo,
      scrollToTop,
      isShortcutsOpen,
      openShortcuts,
      closeShortcuts,
    }),
    [
      view,
      projectSlug,
      activeSection,
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
