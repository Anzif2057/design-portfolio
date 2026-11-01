import { useReactFlow } from '@xyflow/react'
import { useEffect, useRef } from 'react'
import {
  getCameraDuration,
  OVERVIEW_FIT_PADDING,
  SECTION_FIT_PADDING,
} from '@/lib/camera'
import type { CanvasView } from '@/types/navigation'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Sole programmatic camera mover. All guided navigation should change `view`
 * and rely on this hook — do not call fitView/setViewport elsewhere.
 */
export function useGuidedCamera(view: CanvasView, ready: boolean): void {
  const { fitView, getNode } = useReactFlow()
  const prefersReducedMotion = usePrefersReducedMotion()
  const isFirstFit = useRef(true)

  useEffect(() => {
    if (!ready) {
      return
    }

    const duration = isFirstFit.current ? 0 : getCameraDuration(prefersReducedMotion)
    isFirstFit.current = false

    const frame = window.requestAnimationFrame(() => {
      if (view === 'overview') {
        void fitView({
          padding: OVERVIEW_FIT_PADDING,
          duration,
          maxZoom: 1,
          minZoom: 0.25,
        })
        return
      }

      const node = getNode(view)
      if (!node) {
        return
      }

      void fitView({
        nodes: [node],
        padding: SECTION_FIT_PADDING,
        duration,
        maxZoom: 1.15,
        minZoom: 0.45,
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [view, ready, fitView, getNode, prefersReducedMotion])
}
