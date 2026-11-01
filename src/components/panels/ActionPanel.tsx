import { Copy, Download, Mail, Share2 } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { about } from '@/data/about'
import { copyText } from '@/lib/clipboard'
import { useDismissable } from '@/hooks/useDismissable'
import { useToast } from '@/hooks/useToast'

type PopoverId = 'contact' | 'avatar' | null

export function ActionPanel() {
  const { showToast } = useToast()
  const [openPopover, setOpenPopover] = useState<PopoverId>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const contactMenuId = useId()
  const avatarMenuId = useId()

  const closePopovers = useCallback(() => setOpenPopover(null), [])

  useDismissable(openPopover === 'contact', closePopovers, contactRef)
  useDismissable(openPopover === 'avatar', closePopovers, avatarRef)

  const copyEmail = async () => {
    const ok = await copyText(about.email)
    showToast(ok ? 'Email copied' : 'Could not copy email')
    closePopovers()
  }

  const shareLink = async () => {
    const ok = await copyText(window.location.href)
    showToast(ok ? 'Link copied' : 'Could not copy link')
  }

  return (
    <div
      className="pointer-events-auto absolute top-4 right-4 z-20 flex items-center gap-1 rounded-lg border border-border bg-background p-1.5 shadow-sm"
      data-shortcuts-blocked={openPopover ? 'true' : undefined}
    >
      <a
        href="/cv.pdf"
        download="Anzif-CV.pdf"
        className="chrome-interactive hidden rounded-md p-2 text-muted md:inline-flex"
        aria-label="Download CV"
      >
        <Download className="size-4" aria-hidden />
      </a>

      <div ref={contactRef} className="relative hidden md:block">
        <button
          type="button"
          className="chrome-interactive rounded-md p-2 text-muted"
          aria-label="Contact"
          aria-haspopup="dialog"
          aria-expanded={openPopover === 'contact'}
          aria-controls={contactMenuId}
          onClick={() =>
            setOpenPopover((current) => (current === 'contact' ? null : 'contact'))
          }
        >
          <Mail className="size-4" aria-hidden />
        </button>

        {openPopover === 'contact' ? (
          <div
            id={contactMenuId}
            role="dialog"
            aria-label="Contact"
            className="absolute top-full right-0 mt-2 w-56 rounded-lg border border-border bg-background p-3 shadow-md"
            data-shortcuts-blocked="true"
          >
            <p className="text-xs text-muted">Email</p>
            <a
              href={`mailto:${about.email}`}
              className="mt-1 block break-all text-sm text-foreground underline-offset-2 hover:underline focus-visible:underline"
            >
              {about.email}
            </a>
            <button
              type="button"
              className="chrome-interactive mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-2 py-1.5 text-sm text-foreground"
              onClick={() => void copyEmail()}
            >
              <Copy className="size-3.5" aria-hidden />
              Copy email
            </button>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        className="chrome-interactive chrome-interactive-accent rounded-md p-2"
        aria-label="Share — copy page link"
        onClick={() => void shareLink()}
      >
        <Share2 className="size-4" aria-hidden />
      </button>

      <div ref={avatarRef} className="relative">
        <button
          type="button"
          className="chrome-interactive rounded-full p-0.5"
          aria-label={`${about.name} profile`}
          aria-haspopup="dialog"
          aria-expanded={openPopover === 'avatar'}
          aria-controls={avatarMenuId}
          onClick={() =>
            setOpenPopover((current) => (current === 'avatar' ? null : 'avatar'))
          }
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-surface text-xs font-semibold text-foreground ring-1 ring-border">
            {about.name.slice(0, 1)}
          </span>
        </button>

        {openPopover === 'avatar' ? (
          <div
            id={avatarMenuId}
            role="dialog"
            aria-label="Profile"
            className="absolute top-full right-0 mt-2 w-60 rounded-lg border border-border bg-background p-3 shadow-md"
            data-shortcuts-blocked="true"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-muted ring-1 ring-border"
                aria-hidden
              >
                Photo
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {about.name}
                </p>
                <p className="truncate text-xs text-muted">{about.location}</p>
              </div>
            </div>
            <p className="mt-3 rounded-md bg-surface px-2 py-1.5 text-xs text-foreground">
              {about.status}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
