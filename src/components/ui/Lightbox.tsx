import { useEffect, useId, useRef } from 'react'
import type { ProjectImage } from '@/types'

interface LightboxProps {
  image: ProjectImage | null
  onClose: () => void
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!image) {
      return
    }
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [image, onClose])

  if (!image) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-full w-full max-w-4xl overflow-auto rounded-xl border border-border bg-background p-3 shadow-lg"
        data-shortcuts-blocked="true"
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p id={titleId} className="text-sm text-muted">
            {image.alt}
          </p>
          <button
            ref={closeRef}
            type="button"
            className="chrome-interactive rounded-md px-2 py-1 text-sm text-muted"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-[75vh] w-full rounded-lg object-contain"
        />
      </div>
    </div>
  )
}
