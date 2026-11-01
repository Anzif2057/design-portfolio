import { SECTION_ORDER } from '@/data/sections'
import type { CanvasView, SectionId } from '@/types'

export interface RouteState {
  view: CanvasView
  projectSlug: string | null
}

export function isSectionId(value: string): value is SectionId {
  return (SECTION_ORDER as string[]).includes(value)
}

export function pathFromState(state: RouteState): string {
  if (state.view === 'overview') {
    return '/'
  }
  if (state.view === 'work' && state.projectSlug) {
    return `/work/${state.projectSlug}`
  }
  return `/${state.view}`
}

export function stateFromPath(pathname: string): RouteState {
  if (pathname === '/' || pathname === '') {
    return { view: 'overview', projectSlug: null }
  }

  const projectMatch = pathname.match(/^\/work\/([^/]+)\/?$/)
  if (projectMatch) {
    return { view: 'work', projectSlug: decodeURIComponent(projectMatch[1]) }
  }

  const section = pathname.replace(/^\//, '').replace(/\/$/, '')
  if (isSectionId(section)) {
    return { view: section, projectSlug: null }
  }

  return { view: 'overview', projectSlug: null }
}
