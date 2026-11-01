import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'
import { Modal } from './Modal'

const SHORTCUTS = [
  { keys: '1 – 5', description: 'Jump to Updates, About Me, Skills, Experience, Work' },
  { keys: '← / →', description: 'Previous / next section' },
  { keys: 'Esc', description: 'Return to Overview' },
] as const

export function ShortcutsModal() {
  const { isShortcutsOpen, closeShortcuts } = useCanvasNavigation()

  return (
    <Modal open={isShortcutsOpen} title="Keyboard shortcuts" onClose={closeShortcuts}>
      <ul className="space-y-3">
        {SHORTCUTS.map((item) => (
          <li key={item.keys} className="flex items-start justify-between gap-4">
            <span className="text-muted">{item.description}</span>
            <kbd className="shrink-0 rounded-md border border-border bg-surface px-2 py-1 font-mono text-xs text-foreground">
              {item.keys}
            </kbd>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
