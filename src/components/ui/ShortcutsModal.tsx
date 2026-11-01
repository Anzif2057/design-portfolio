import { usePageNavigation } from '@/hooks/usePageNavigation'
import { Modal } from './Modal'

const SHORTCUTS = [
  { keys: '1 – 5', description: 'Jump to Updates, About Me, Skills, Experience, Work' },
  { keys: '0', description: 'Jump to Home' },
] as const

export function ShortcutsModal() {
  const { isShortcutsOpen, closeShortcuts } = usePageNavigation()

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
