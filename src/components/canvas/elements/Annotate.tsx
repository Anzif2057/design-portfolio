import { annotate } from 'rough-notation'
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { placeStyle } from './place'
import type { WorldPlacement } from './types'

export type AnnotateType = 'circle' | 'underline' | 'bracket' | 'highlight'

interface AnnotateProps {
  placement?: WorldPlacement
  type?: AnnotateType
  active: boolean
  /**
   * `static` — SVG sketch marks (reliable inside React Flow transforms).
   * `rough` — rough-notation (can misalign under CSS transforms).
   */
  engine?: 'static' | 'rough'
  color?: string
  /** Static engine: play a one-off draw-on stroke when `active` turns on. */
  drawOn?: boolean
  drawDelayMs?: number
  className?: string
  children: ReactNode
}

/** Annotation wrapper — prefers static sketch marks on the canvas. */
export function Annotate({
  placement,
  type = 'circle',
  active,
  engine = 'static',
  color = 'var(--color-accent)',
  drawOn = false,
  drawDelayMs = 0,
  className = '',
  children,
}: AnnotateProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<ReturnType<typeof annotate> | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (engine !== 'rough') {
      return
    }

    const el = ref.current
    if (!el) {
      return
    }

    annotationRef.current?.remove()
    annotationRef.current = null

    if (!active) {
      return
    }

    const resolvedColor =
      color.startsWith('var(') && typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement)
            .getPropertyValue(color.slice(4, -1))
            .trim() || '#2563eb'
        : color

    const annotation = annotate(el, {
      type,
      color: resolvedColor,
      animate: !prefersReducedMotion,
      animationDuration: prefersReducedMotion ? 0 : 600,
      multiline: true,
      padding: type === 'circle' ? 4 : 3,
    })
    annotationRef.current = annotation
    annotation.show()

    return () => {
      annotation.remove()
      annotationRef.current = null
    }
  }, [active, type, color, prefersReducedMotion, engine])

  return (
    <span
      ref={ref}
      className={[
        'annotate-target',
        engine === 'static' && active ? `annotate-static annotate-static--${type}` : '',
        engine === 'static' && active && drawOn ? 'annotate-static--draw' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          ...(placement ? placeStyle(placement) : undefined),
          color,
          '--annotate-delay': `${drawDelayMs}ms`,
        } as CSSProperties
      }
    >
      {engine === 'static' && active && type === 'circle' ? (
        <svg
          className="annotate-static__mark"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <ellipse
            cx="50"
            cy="20"
            rx="46"
            ry="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            vectorEffect="non-scaling-stroke"
            transform="rotate(-2 50 20)"
          />
        </svg>
      ) : null}
      {engine === 'static' && active && type === 'underline' ? (
        <svg className="annotate-static__underline" viewBox="0 0 100 8" aria-hidden>
          <path
            d="M2 5 C 20 2, 40 7, 60 4 S 90 2, 98 5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            pathLength={1}
          />
        </svg>
      ) : null}
      <span className="annotate-target__label">{children}</span>
    </span>
  )
}
