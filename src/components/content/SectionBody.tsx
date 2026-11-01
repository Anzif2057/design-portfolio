import type { SectionId } from '@/types'
import { AboutContent } from './AboutContent'
import { ExperienceContent } from './ExperienceContent'
import { SkillsContent } from './SkillsContent'
import { UpdatesContent } from './UpdatesContent'
import { WorkContent } from './WorkContent'

interface SectionBodyProps {
  sectionId: SectionId
  projectSlug?: string | null
  onOpenProject?: (slug: string) => void
  onBackToGrid?: () => void
}

/** Shared section renderer for the canvas panel and list view. */
export function SectionBody({
  sectionId,
  projectSlug = null,
  onOpenProject,
  onBackToGrid,
}: SectionBodyProps) {
  switch (sectionId) {
    case 'updates':
      return <UpdatesContent />
    case 'about':
      return <AboutContent />
    case 'skills':
      return <SkillsContent onOpenProject={onOpenProject} />
    case 'experience':
      return <ExperienceContent />
    case 'work':
      return (
        <WorkContent
          projectSlug={projectSlug}
          onOpenProject={onOpenProject}
          onBackToGrid={onBackToGrid}
        />
      )
    default: {
      const _exhaustive: never = sectionId
      return _exhaustive
    }
  }
}
