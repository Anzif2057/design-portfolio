import { useEffect, type RefObject } from 'react'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'

const SWIPE_THRESHOLD_PX = 56

/** Mobile swipe left/right on the canvas → next/previous section. */
export function useCanvasSwipe(targetRef: RefObject<HTMLElement | null>): void {
  const { goNext, goPrev } = useCanvasNavigation()

  useEffect(() => {
    const node = targetRef.current
    if (!node) {
      return
    }

    let startX = 0
    let startY = 0
    let tracking = false

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        tracking = false
        return
      }
      tracking = true
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking || event.changedTouches.length !== 1) {
        tracking = false
        return
      }
      tracking = false

      const endX = event.changedTouches[0].clientX
      const endY = event.changedTouches[0].clientY
      const deltaX = endX - startX
      const deltaY = endY - startY

      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) {
        return
      }
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        return
      }

      if (deltaX < 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    const onTouchCancel = () => {
      tracking = false
    }

    node.addEventListener('touchstart', onTouchStart, { passive: true })
    node.addEventListener('touchend', onTouchEnd, { passive: true })
    node.addEventListener('touchcancel', onTouchCancel, { passive: true })

    return () => {
      node.removeEventListener('touchstart', onTouchStart)
      node.removeEventListener('touchend', onTouchEnd)
      node.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [targetRef, goNext, goPrev])
}
