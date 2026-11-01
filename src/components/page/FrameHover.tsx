import type { ReactNode } from 'react'
import { SectionSelectionChrome } from '@/components/canvas/sections/SectionSelectionChrome'

interface FrameHoverProps {
  label: string
  className?: string
  children: ReactNode
}

/**
 * Design-tool "selected frame" feel: on desktop hover / focus-within, shows a dashed
 * outline with corner handles and a name label, and lifts children marked
 * `frame-hover__lift`. Purely decorative — nothing depends on it.
 */
export function FrameHover({ label, className = '', children }: FrameHoverProps) {
  return (
    <div className={['frame-hover', className].filter(Boolean).join(' ')}>
      <SectionSelectionChrome label={label} />
      {children}
    </div>
  )
}
