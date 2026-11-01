import { useEffect, useState, type RefObject } from 'react'

/** True from the first time `ref` is at least `threshold` visible; never resets. */
export function useInViewOnce(ref: RefObject<Element | null>, threshold = 0.25): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || inView) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold, inView])

  return inView
}
