import type { SectionMeta } from '@/types/navigation'
import type { SectionId } from '@/types'

/** Canonical section order for stepper, shortcuts, and navbar. */
export const SECTION_ORDER: SectionId[] = [
  'updates',
  'about',
  'skills',
  'experience',
  'work',
]

/** Spread out so expanded sketch frames do not stack on top of each other. */
export const SECTIONS: SectionMeta[] = [
  {
    id: 'updates',
    label: 'Updates',
    position: { x: 80, y: 60 },
    shortcut: '1',
  },
  {
    id: 'about',
    label: 'About Me',
    position: { x: 820, y: 40 },
    shortcut: '2',
  },
  {
    id: 'skills',
    label: 'Skills',
    position: { x: 60, y: 980 },
    shortcut: '3',
  },
  {
    id: 'experience',
    label: 'Experience',
    position: { x: 860, y: 960 },
    shortcut: '4',
  },
  {
    id: 'work',
    label: 'Work',
    position: { x: 420, y: 1880 },
    shortcut: '5',
  },
]

export const SECTION_FRAME = {
  collapsed: { width: 260, height: 140 },
  expanded: { width: 640, height: 780 },
} as const

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
