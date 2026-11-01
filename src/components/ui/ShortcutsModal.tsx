import { useEffect, useId, useRef } from 'react'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'

const SHORTCUTS = [
  { keys: '1 – 5', description: 'Jump to Updates, About Me, Skills, Experience, Work' },
  { keys: '← / →', description: 'Previous / next section' },
  { keys: 'Esc', description: 'Return to Overview' },
] as const

export function ShortcutsModal() {
  const { isShortcutsOpen, closeShortcuts } = useCanvasNavigation()
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isShortcutsOpen) {
      return
    }
    closeRef.current?.focus()
  }, [isShortcutsOpen])

  if (!isShortcutsOpen) {
    return null
  }

  return (
    <div
      className="pointer-events-auto absolute inset-0 z-40 flex items-center justify-center bg-foreground/20 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeShortcuts()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md rounded-xl border border-border bg-background p-5 shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold text-foreground">
            Keyboard shortcuts
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="rounded-md px-2 py-1 text-sm text-muted hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={closeShortcuts}
          >
            Close
          </button>
        </div>

        <ul className="mt-4 space-y-3">
          {SHORTCUTS.map((item) => (
            <li
              key={item.keys}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <span className="text-muted">{item.description}</span>
              <kbd className="shrink-0 rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-foreground">
                {item.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
