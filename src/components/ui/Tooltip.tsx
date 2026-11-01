import type { ReactNode } from 'react'

type TooltipSide = 'right' | 'top' | 'toolbar'

interface TooltipProps {
  label: string
  side?: TooltipSide
  children: ReactNode
}

const sideClass: Record<TooltipSide, string> = {
  right: 'left-full top-1/2 ml-2 -translate-y-1/2 origin-left',
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2 origin-bottom',
  /* Mobile bottom bar → above; desktop left rail → to the right */
  toolbar:
    'bottom-full left-1/2 mb-2 -translate-x-1/2 origin-bottom md:bottom-auto md:left-full md:top-1/2 md:mb-0 md:ml-2 md:translate-x-0 md:-translate-y-1/2 md:origin-left',
}

/** Visible on hover and keyboard focus (group-focus-within). */
export function Tooltip({ label, side = 'right', children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={[
          'pointer-events-none absolute z-30 whitespace-nowrap rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground shadow-sm',
          'opacity-0 scale-95 transition-[opacity,transform] duration-150',
          'group-hover:opacity-100 group-hover:scale-100',
          'group-focus-within:opacity-100 group-focus-within:scale-100',
          'motion-reduce:transition-none motion-reduce:scale-100',
          sideClass[side],
        ].join(' ')}
      >
        {label}
      </span>
    </span>
  )
}
