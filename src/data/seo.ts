import { getSectionLabel } from './sections'
import { getProjectBySlug } from './work'
import type { CanvasView } from '@/types'

const BASE_DESCRIPTION =
  "Anzif's portfolio — a design-canvas experience with work, experience, skills, and more about me."

export function getCanvasDocumentMeta(
  view: CanvasView,
  projectSlug: string | null,
): { title: string; description: string } {
  if (view === 'overview') {
    return {
      title: "Anzif's Portfolio",
      description: BASE_DESCRIPTION,
    }
  }

  if (view === 'work' && projectSlug) {
    const project = getProjectBySlug(projectSlug)
    if (project) {
      return {
        title: `${project.title} — Anzif's Portfolio`,
        description: project.summary,
      }
    }
  }

  const label = getSectionLabel(view)
  return {
    title: `${label} — Anzif's Portfolio`,
    description: `${label} from Anzif's portfolio. ${BASE_DESCRIPTION}`,
  }
}
