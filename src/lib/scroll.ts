import type { CanvasView } from '@/types'

export const HOME_SECTION_ID = 'home'

export function sectionElementId(view: CanvasView): string {
  return view === 'overview' ? HOME_SECTION_ID : view
}

interface ScrollOptions {
  behavior: ScrollBehavior
  focus: boolean
}

/** Scrolls the page to a section ('overview' = top of page). */
export function scrollToView(view: CanvasView, { behavior, focus }: ScrollOptions): void {
  const element = document.getElementById(sectionElementId(view))

  if (view === 'overview') {
    window.scrollTo({ top: 0, behavior })
  } else {
    element?.scrollIntoView({ behavior, block: 'start' })
  }

  if (focus) {
    element?.focus({ preventScroll: true })
  }
}
