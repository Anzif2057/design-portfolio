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
    position: { x: 520, y: 180 },
    shortcut: '2',
  },
  {
    id: 'skills',
    label: 'Skills',
    position: { x: 160, y: 420 },
    shortcut: '3',
  },
  {
    id: 'experience',
    label: 'Experience',
    position: { x: 620, y: 480 },
    shortcut: '4',
  },
  {
    id: 'work',
    label: 'Work',
    position: { x: 980, y: 140 },
    shortcut: '5',
  },
]

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
