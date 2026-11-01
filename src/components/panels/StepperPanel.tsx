import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SECTION_ORDER, getSectionLabel } from '@/data/sections'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'

export function StepperPanel() {
  const { view, sectionIndex, goNext, goPrev } = useCanvasNavigation()

  const label =
    view === 'overview'
      ? 'Overview'
      : `${(sectionIndex ?? 0) + 1} / ${SECTION_ORDER.length}`

  const detail = view === 'overview' ? 'All sections' : getSectionLabel(view)

  return (
    <div className="pointer-events-auto absolute right-4 bottom-4 z-20 flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm">
      <button
        type="button"
        className="rounded-md p-2 text-muted hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={goPrev}
        aria-label="Previous section"
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>

      <div className="min-w-28 px-1 text-center" aria-live="polite">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted">{detail}</div>
      </div>

      <button
        type="button"
        className="rounded-md p-2 text-muted hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={goNext}
        aria-label="Next section"
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </div>
  )
}
