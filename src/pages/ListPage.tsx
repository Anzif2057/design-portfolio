import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionBody } from '@/components/content/SectionBody'
import { SECTIONS } from '@/data/sections'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import type { SectionId } from '@/types'

export function ListPage() {
  const [projectSlug, setProjectSlug] = useState<string | null>(null)

  useDocumentMeta({
    title: "List view — Anzif's Portfolio",
    description:
      'All sections of Anzif’s portfolio in a single readable page: updates, about, skills, experience, and work.',
  })

  const navItems = useMemo(
    () =>
      SECTIONS.map((section) => ({
        id: section.id,
        label: section.label,
        href: `#${section.id}`,
      })),
    [],
  )

  const openProject = (slug: string) => {
    setProjectSlug(slug)
    const work = document.getElementById('work')
    work?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-full bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link
            to="/"
            className="chrome-interactive rounded-md px-2 py-1 text-sm font-medium text-accent"
          >
            Back to canvas
          </Link>
          <nav aria-label="Sections" className="flex flex-wrap gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="chrome-interactive rounded-md px-2 py-1 text-sm text-muted"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-16 px-4 py-10">
        <div>
          <h1 className="text-3xl font-semibold">Anzif&apos;s Portfolio</h1>
          <p className="mt-2 text-sm text-muted">
            List view — the same content as the canvas panels, in one column.
          </p>
        </div>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-label={section.label}
            className="scroll-mt-24"
          >
            <SectionBody
              sectionId={section.id as SectionId}
              projectSlug={section.id === 'work' ? projectSlug : null}
              onOpenProject={openProject}
              onBackToGrid={() => setProjectSlug(null)}
            />
          </section>
        ))}
      </main>
    </div>
  )
}
