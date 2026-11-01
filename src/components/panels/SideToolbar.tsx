import { Briefcase, CircleUser, FolderKanban, Newspaper, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SECTIONS } from '@/data/sections'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'
import type { SectionId } from '@/types'

const SECTION_ICONS: Record<SectionId, LucideIcon> = {
  updates: Newspaper,
  about: CircleUser,
  skills: Sparkles,
  experience: Briefcase,
  work: FolderKanban,
}

export function SideToolbar() {
  const { view, navigateTo } = useCanvasNavigation()

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-auto absolute top-1/2 left-4 z-20 flex -translate-y-1/2 flex-col gap-1 rounded-lg border border-border bg-background p-1.5 shadow-sm"
    >
      {SECTIONS.map((section) => {
        const Icon = SECTION_ICONS[section.id]
        const active = view === section.id
        return (
          <button
            key={section.id}
            type="button"
            className={[
              'rounded-md p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
              active
                ? 'bg-surface text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground',
            ].join(' ')}
            aria-current={active ? 'page' : undefined}
            aria-label={`${section.label}${section.shortcut ? ` (shortcut ${section.shortcut})` : ''}`}
            onClick={() => navigateTo(section.id)}
          >
            <Icon className="size-4" aria-hidden />
          </button>
        )
      })}
    </nav>
  )
}
