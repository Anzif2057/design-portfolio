import { createContext } from 'react'
import type { CanvasView } from '@/types/navigation'

export interface CanvasNavigationContextValue {
  view: CanvasView
  /** 0-based index when on a section; null in Overview. */
  sectionIndex: number | null
  navigateTo: (next: CanvasView) => void
  goNext: () => void
  goPrev: () => void
  isShortcutsOpen: boolean
  openShortcuts: () => void
  closeShortcuts: () => void
}

export const CanvasNavigationContext = createContext<CanvasNavigationContextValue | null>(
  null,
)
