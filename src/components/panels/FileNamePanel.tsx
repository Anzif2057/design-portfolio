import { Menu } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { about } from '@/data/about'
import { SECTIONS } from '@/data/sections'
import { usePageNavigation } from '@/hooks/usePageNavigation'
import { useDismissable } from '@/hooks/useDismissable'
import { AboutSiteModal } from '@/components/ui/AboutSiteModal'

export function FileNamePanel() {
  const { scrollTo, scrollToTop, openShortcuts } = usePageNavigation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useDismissable(menuOpen, closeMenu, rootRef)

  const goTop = () => {
    closeMenu()
    scrollToTop()
  }

  const jumpTo = (sectionId: (typeof SECTIONS)[number]['id']) => {
    closeMenu()
    scrollTo(sectionId)
  }

  return (
    <>
      <div
        ref={rootRef}
        className="pointer-events-auto fixed top-4 left-4 z-20 flex items-center gap-1 rounded-lg border border-border bg-background px-2 py-1.5 shadow-sm"
        data-shortcuts-blocked={menuOpen ? 'true' : undefined}
      >
        <button
          type="button"
          className="chrome-interactive rounded-md px-2 py-1 text-sm font-semibold text-foreground"
          onClick={goTop}
          aria-label="Anzif's Portfolio — back to top"
        >
          Anzif&apos;s Portfolio
        </button>

        <button
          type="button"
          className="chrome-interactive rounded-md p-1.5 text-muted"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Menu className="size-4" aria-hidden />
          <span className="sr-only">File menu</span>
        </button>

        {menuOpen ? (
          <div
            id={menuId}
            role="menu"
            className="absolute top-full left-0 mt-2 max-h-[min(70vh,28rem)] w-56 overflow-y-auto rounded-lg border border-border bg-background py-1 shadow-md"
          >
            <p className="px-3 pt-2 pb-1 text-xs font-medium tracking-wide text-muted uppercase">
              Jump to
            </p>
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                role="menuitem"
                className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                onClick={() => jumpTo(section.id)}
              >
                {section.label}
              </button>
            ))}

            <div className="my-1 border-t border-border" role="separator" />

            <Link
              to="/list"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              onClick={closeMenu}
            >
              List view
            </Link>
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              onClick={() => {
                closeMenu()
                openShortcuts()
              }}
            >
              Keyboard shortcuts
            </button>
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              onClick={() => {
                closeMenu()
                setAboutOpen(true)
              }}
            >
              About this site
            </button>

            <div className="my-1 border-t border-border" role="separator" />

            <p className="px-3 pt-2 pb-1 text-xs font-medium tracking-wide text-muted uppercase">
              Social
            </p>
            {about.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                role="menuitem"
                className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}

            <div className="my-1 border-t border-border" role="separator" />

            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              onClick={goTop}
            >
              Back to top
            </button>
          </div>
        ) : null}
      </div>

      <AboutSiteModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  )
}
