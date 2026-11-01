import { ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'

export function FileNamePanel() {
  const { navigateTo } = useCanvasNavigation()
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const goOverview = () => {
    navigateTo('overview')
    setMenuOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto absolute top-4 left-4 z-20 flex items-center gap-1 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm"
      data-shortcuts-blocked={menuOpen ? 'true' : undefined}
    >
      <button
        type="button"
        className="rounded-md px-2 py-1 text-sm font-semibold text-foreground hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={goOverview}
        aria-label="Anzif's Portfolio — return to overview"
      >
        Anzif&apos;s Portfolio
      </button>

      <button
        type="button"
        className="rounded-md p-1 text-muted hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <ChevronDown className="size-4" aria-hidden />
        <span className="sr-only">File menu</span>
      </button>

      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute top-full left-0 mt-2 min-w-44 rounded-lg border border-border bg-background py-1 shadow-md"
        >
          <button
            type="button"
            role="menuitem"
            className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
            onClick={goOverview}
          >
            Reset view
          </button>
        </div>
      ) : null}
    </div>
  )
}
