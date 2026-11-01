import { Briefcase, CircleUser, FolderKanban, House, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PAGE_SECTIONS, type PageSectionId } from '@/data/sections'
import { usePageNavigation } from '@/hooks/usePageNavigation'
import { Tooltip } from '@/components/ui/Tooltip'
import type { CanvasView } from '@/types'

interface ToolbarItem {
  id: CanvasView
  label: string
  shortcut: string
  icon: LucideIcon
}

const SECTION_ICONS: Record<PageSectionId, LucideIcon> = {
  work: FolderKanban,
  experience: Briefcase,
  skills: Sparkles,
  about: CircleUser,
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: 'overview', label: 'Home', shortcut: '0', icon: House },
  ...PAGE_SECTIONS.map((section) => ({
    id: section.id,
    label: section.id === 'about' ? 'About' : section.label,
    shortcut: section.shortcut,
    icon: SECTION_ICONS[section.id],
  })),
]

export function SideToolbar() {
  const { activeSection, scrollTo } = usePageNavigation()

  return (
    <nav
      aria-label="Sections"
      className={[
        'pointer-events-auto fixed z-20 flex gap-1 rounded-lg border border-border bg-background p-1.5 shadow-sm',
        'bottom-4 left-1/2 -translate-x-1/2 flex-row',
        'md:top-1/2 md:bottom-auto md:left-4 md:translate-x-0 md:-translate-y-1/2 md:flex-col',
      ].join(' ')}
    >
      {TOOLBAR_ITEMS.map((item) => {
        const Icon = item.icon
        const active = activeSection === item.id
        return (
          <Tooltip
            key={item.id}
            label={`${item.label} (${item.shortcut})`}
            side="toolbar"
          >
            <button
              type="button"
              className={[
                'chrome-interactive rounded-md p-2',
                active ? 'bg-surface text-accent' : 'text-muted',
              ].join(' ')}
              aria-current={active ? 'true' : undefined}
              aria-label={`${item.label} (shortcut ${item.shortcut})`}
              onClick={() => scrollTo(item.id)}
            >
              <Icon className="size-4" aria-hidden />
            </button>
          </Tooltip>
        )
      })}
    </nav>
  )
}
