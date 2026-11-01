import { useEffect, useRef } from 'react'

/** Thin decorative bar at the top of the screen showing page scroll progress. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0
      barRef.current?.style.setProperty('transform', `scaleX(${progress})`)
    }

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-30 h-0.5"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
