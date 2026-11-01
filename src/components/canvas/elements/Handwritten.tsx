import type { CSSProperties, ReactNode } from 'react'
import { placeStyle } from './place'
import type { WorldPlacement } from './types'

interface HandwrittenProps {
  placement?: WorldPlacement
  as?: 'p' | 'span' | 'h2' | 'h3'
  size?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/** Caveat / hand font — titles and annotations only. */
export function Handwritten({
  placement,
  as: Tag = 'p',
  size = 32,
  className = '',
  style,
  children,
}: HandwrittenProps) {
  return (
    <Tag
      className={['font-hand', className].filter(Boolean).join(' ')}
      style={{
        ...(placement ? placeStyle(placement) : {}),
        margin: 0,
        fontSize: size,
        lineHeight: 1.05,
        fontWeight: 600,
        color: 'var(--color-foreground)',
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}
