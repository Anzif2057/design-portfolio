import { about } from '@/data/about'
import { SECTIONS } from '@/data/sections'
import { usePageShortcuts } from '@/hooks/usePageShortcuts'
import { HOME_SECTION_ID } from '@/lib/scroll'
import { ActionPanel } from '@/components/panels/ActionPanel'
import { FileNamePanel } from '@/components/panels/FileNamePanel'
import { SideToolbar } from '@/components/panels/SideToolbar'
import { ShortcutsModal } from '@/components/ui/ShortcutsModal'
import { SectionStub } from './SectionStub'

export function PortfolioPage() {
  usePageShortcuts()

  return (
    <div className="dot-grid min-h-full px-4 pb-24 md:px-24 md:pb-0">
      <main className="mx-auto w-full max-w-[1200px]">
        <SectionStub
          id={HOME_SECTION_ID}
          index={0}
          label="Home"
          heading={`Hi, I'm ${about.name}`}
          isLanding
        />
        {SECTIONS.map((section, index) => (
          <SectionStub
            key={section.id}
            id={section.id}
            index={index + 1}
            label={section.label}
            heading={section.label}
          />
        ))}
      </main>

      <FileNamePanel />
      <SideToolbar />
      <ActionPanel />
      <ShortcutsModal />
    </div>
  )
}
