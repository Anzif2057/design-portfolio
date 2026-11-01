import { Briefcase, CircleUser, FolderKanban, Newspaper, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SECTIONS } from '@/data/sections'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'
import { Tooltip } from '@/components/ui/Tooltip'
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
      className={[
        'pointer-events-auto absolute z-20 flex gap-1 rounded-lg border border-border bg-background p-1.5 shadow-sm',
        'bottom-4 left-1/2 -translate-x-1/2 flex-row',
        'md:top-1/2 md:bottom-auto md:left-4 md:translate-x-0 md:-translate-y-1/2 md:flex-col',
      ].join(' ')}
    >
      {SECTIONS.map((section) => {
        const Icon = SECTION_ICONS[section.id]
        const active = view === section.id
        return (
          <Tooltip
            key={section.id}
            label={`${section.label} (${section.shortcut})`}
            side="toolbar"
          >
            <button
              type="button"
              className={[
                'chrome-interactive rounded-md p-2',
                active ? 'bg-surface text-accent' : 'text-muted',
              ].join(' ')}
              aria-current={active ? 'page' : undefined}
              aria-label={`${section.label} (shortcut ${section.shortcut})`}
              onClick={() => navigateTo(section.id)}
            >
              <Icon className="size-4" aria-hidden />
            </button>
          </Tooltip>
        )
      })}
    </nav>
  )
}
