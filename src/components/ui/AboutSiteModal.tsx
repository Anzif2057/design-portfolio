import { Modal } from './Modal'

interface AboutSiteModalProps {
  open: boolean
  onClose: () => void
}

export function AboutSiteModal({ open, onClose }: AboutSiteModalProps) {
  return (
    <Modal open={open} title="About this site" onClose={onClose}>
      <p className="text-muted">
        Placeholder — this portfolio is presented as a guided design canvas. Replace this
        copy with a short note about how the site works, how it was built, or what to
        explore first.
      </p>
    </Modal>
  )
}
