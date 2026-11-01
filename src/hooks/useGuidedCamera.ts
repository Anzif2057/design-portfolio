import { useReactFlow } from '@xyflow/react'
import { useEffect, useRef } from 'react'
import { ABOUT_MOBILE_BOUNDS } from '@/lib/canvasWorld'
import {
  getCameraDuration,
  OVERVIEW_FIT_PADDING,
  SECTION_FIT_PADDING,
} from '@/lib/camera'
import type { CanvasView } from '@/types/navigation'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface GuidedCameraOptions {
  ready: boolean
  /** Fit About Me’s left content crop so body text stays readable on small screens. */
  aboutMobileCrop?: boolean
}

/**
 * Sole programmatic camera mover. All guided navigation should change `view`
 * and rely on this hook — do not call fitView/setViewport elsewhere.
 */
export function useGuidedCamera(
  view: CanvasView,
  { ready, aboutMobileCrop = false }: GuidedCameraOptions,
): void {
  const { fitView, fitBounds, getNode } = useReactFlow()
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
          minZoom: 0.08,
        })
        return
      }

      const node = getNode(view)
      if (!node) {
        return
      }

      if (view === 'about' && aboutMobileCrop) {
        void fitBounds(
          {
            x: node.position.x + ABOUT_MOBILE_BOUNDS.x,
            y: node.position.y + ABOUT_MOBILE_BOUNDS.y,
            width: ABOUT_MOBILE_BOUNDS.width,
            height: ABOUT_MOBILE_BOUNDS.height,
          },
          {
            padding: 0.08,
            duration,
          },
        )
        return
      }

      void fitView({
        nodes: [node],
        padding: SECTION_FIT_PADDING,
        duration,
        maxZoom: 1.2,
        minZoom: 0.35,
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [view, ready, aboutMobileCrop, fitView, fitBounds, getNode, prefersReducedMotion])
}
