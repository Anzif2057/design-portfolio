import type { SectionId } from './portfolio'

/** Camera / navigation target. Overview shows all clusters. */
export type CanvasView = 'overview' | SectionId

export interface SectionMeta {
  id: SectionId
  label: string
  /** Canvas node position */
  position: { x: number; y: number }
  shortcut: '1' | '2' | '3' | '4' | '5'
}
