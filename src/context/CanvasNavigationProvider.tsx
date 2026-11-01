import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProjectBySlug } from '@/data/work'
import { SECTION_ORDER } from '@/data/sections'
import { pathFromState, stateFromPath } from '@/lib/paths'
import type { CanvasView } from '@/types/navigation'
import type { SectionId } from '@/types'
import { CanvasNavigationContext } from './canvasNavigationContext'

export function CanvasNavigationProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  const route = stateFromPath(location.pathname)
  const view = route.view
  const projectSlug =
    route.projectSlug && getProjectBySlug(route.projectSlug) ? route.projectSlug : null

  useEffect(() => {
    if (route.projectSlug && !getProjectBySlug(route.projectSlug)) {
      navigate('/work', { replace: true })
    }
  }, [route.projectSlug, navigate])

  const navigateTo = useCallback(
    (next: CanvasView) => {
      navigate(pathFromState({ view: next, projectSlug: null }))
    },
    [navigate],
  )

  const openProject = useCallback(
    (slug: string) => {
      if (!getProjectBySlug(slug)) {
        return
      }
      navigate(pathFromState({ view: 'work', projectSlug: slug }))
    },
    [navigate],
  )

  const closeProject = useCallback(() => {
    navigate(pathFromState({ view: 'work', projectSlug: null }))
  }, [navigate])

  const goNext = useCallback(() => {
    const nextView: CanvasView =
      view === 'overview'
        ? SECTION_ORDER[0]
        : SECTION_ORDER[
            (SECTION_ORDER.indexOf(view as SectionId) + 1) % SECTION_ORDER.length
          ]
    navigate(pathFromState({ view: nextView, projectSlug: null }))
  }, [navigate, view])

  const goPrev = useCallback(() => {
    const nextView: CanvasView =
      view === 'overview'
        ? SECTION_ORDER[SECTION_ORDER.length - 1]
        : SECTION_ORDER[
            (SECTION_ORDER.indexOf(view as SectionId) - 1 + SECTION_ORDER.length) %
              SECTION_ORDER.length
          ]
    navigate(pathFromState({ view: nextView, projectSlug: null }))
  }, [navigate, view])

  const openShortcuts = useCallback(() => setIsShortcutsOpen(true), [])
  const closeShortcuts = useCallback(() => setIsShortcutsOpen(false), [])

  const sectionIndex =
    view === 'overview' ? null : SECTION_ORDER.indexOf(view as SectionId)

  const value = useMemo(
    () => ({
      view,
      projectSlug,
      sectionIndex,
      panelOpen: view !== 'overview',
      navigateTo,
      openProject,
      closeProject,
      goNext,
      goPrev,
      isShortcutsOpen,
      openShortcuts,
      closeShortcuts,
    }),
    [
      view,
      projectSlug,
      sectionIndex,
      navigateTo,
      openProject,
      closeProject,
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
