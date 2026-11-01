import { createContext } from 'react'
import type { CanvasView } from '@/types'

export interface PageNavigationContextValue {
  /** Section matching the current URL ('overview' = Home). */
  view: CanvasView
  projectSlug: string | null
  scrollTo: (target: CanvasView) => void
  scrollToTop: () => void
  isShortcutsOpen: boolean
  openShortcuts: () => void
  closeShortcuts: () => void
}

export const PageNavigationContext = createContext<PageNavigationContextValue | null>(
  null,
)
