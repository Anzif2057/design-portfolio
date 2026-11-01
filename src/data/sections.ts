import { SECTION_WORLD, WELCOME_SIZE } from '@/lib/canvasWorld'
import type { SectionMeta } from '@/types/navigation'
import type { SectionId } from '@/types'

/** Sections on the scrolling page (Updates is shown only in /list). */
export type PageSectionId = Exclude<SectionId, 'updates'>

export interface PageSection {
  id: PageSectionId
  label: string
  shortcut: '1' | '2' | '3' | '4'
}

/** Scrolling-page order after Home: drives sections, toolbar, menu, shortcuts, routes. */
export const PAGE_SECTIONS: readonly PageSection[] = [
  { id: 'work', label: 'Work', shortcut: '1' },
  { id: 'experience', label: 'Experience', shortcut: '2' },
  { id: 'skills', label: 'Skills', shortcut: '3' },
  { id: 'about', label: 'About Me', shortcut: '4' },
]

export const SECTION_ORDER: PageSectionId[] = PAGE_SECTIONS.map((section) => section.id)

/**
 * /list sections and legacy canvas positions (top-left of each node).
 * About Me uses a fixed 1400×900 world; other sections stay on interim sketch frames.
 */
export const SECTIONS: SectionMeta[] = [
  {
    id: 'updates',
    label: 'Updates',
    position: { x: 80, y: 120 },
    shortcut: '1',
  },
  {
    id: 'about',
    label: 'About Me',
    position: { x: 420, y: 40 },
    shortcut: '2',
  },
  {
    id: 'skills',
    label: 'Skills',
    position: { x: 80, y: 1100 },
    shortcut: '3',
  },
  {
    id: 'experience',
    label: 'Experience',
    position: { x: 1600, y: 1100 },
    shortcut: '4',
  },
  {
    id: 'work',
    label: 'Work',
    position: { x: 900, y: 1600 },
    shortcut: '5',
  },
]

export const SECTION_FRAME = {
  collapsed: { width: 260, height: 140 },
  expanded: { width: 640, height: 780 },
} as const

export const SECTION_WORLD_SIZE = SECTION_WORLD

/** Welcome sticky near overview center, with arrow aimed toward Work. */
export function getWelcomePosition(): { x: number; y: number } {
  const about = SECTIONS.find((section) => section.id === 'about')!
  const work = SECTIONS.find((section) => section.id === 'work')!
  return {
    x: about.position.x + SECTION_WORLD.width / 2 - WELCOME_SIZE.width / 2,
    y:
      (about.position.y + SECTION_WORLD.height + work.position.y) / 2 -
      WELCOME_SIZE.height / 2,
  }
}

export function getSectionMeta(id: SectionId): SectionMeta {
  const section = SECTIONS.find((entry) => entry.id === id)
  if (!section) {
    throw new Error(`Unknown section: ${id}`)
  }
  return section
}

export function getSectionLabel(id: SectionId): string {
  return getSectionMeta(id).label
}
