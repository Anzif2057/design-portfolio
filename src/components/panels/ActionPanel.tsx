import { Keyboard, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'

export function ActionPanel() {
  const { openShortcuts } = useCanvasNavigation()

  return (
    <div className="pointer-events-auto absolute top-4 right-4 z-20 flex items-center gap-1 rounded-lg border border-border bg-background p-1.5 shadow-sm">
      <button
        type="button"
        className="rounded-md p-2 text-muted hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={openShortcuts}
        aria-label="Keyboard shortcuts"
      >
        <Keyboard className="size-4" aria-hidden />
      </button>
      <Link
        to="/list"
        className="rounded-md p-2 text-muted hover:bg-surface hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="List view"
      >
        <List className="size-4" aria-hidden />
      </Link>
    </div>
  )
}
