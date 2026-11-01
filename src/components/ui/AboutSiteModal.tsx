import { Modal } from './Modal'

interface AboutSiteModalProps {
  open: boolean
  onClose: () => void
}

export function AboutSiteModal({ open, onClose }: AboutSiteModalProps) {
  return (
    <Modal open={open} title="About this site" onClose={onClose}>
      <p className="text-muted">
        Placeholder — a portfolio built as a design canvas with React and TypeScript.
      </p>
    </Modal>
  )
}
