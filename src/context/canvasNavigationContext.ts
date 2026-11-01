import { createContext } from 'react'
import type { CanvasView } from '@/types/navigation'

export interface CanvasNavigationContextValue {
  view: CanvasView
  projectSlug: string | null
  /** 0-based index when on a section; null in Overview. */
  sectionIndex: number | null
  panelOpen: boolean
  navigateTo: (next: CanvasView) => void
  openProject: (slug: string) => void
  closeProject: () => void
  goNext: () => void
  goPrev: () => void
  isShortcutsOpen: boolean
  openShortcuts: () => void
  closeShortcuts: () => void
}

export const CanvasNavigationContext = createContext<CanvasNavigationContextValue | null>(
  null,
)
