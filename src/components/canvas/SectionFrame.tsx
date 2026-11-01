import { type Node, type NodeProps } from '@xyflow/react'
import { SectionBody } from '@/components/content/SectionBody'
import type { SectionId } from '@/types'

export type SectionFrameData = {
  label: string
  sectionId: SectionId
  shortcut: string
  expanded: boolean
  annotation: string
  onNavigate: (sectionId: SectionId) => void
  onOpenProject?: (slug: string) => void
}

export type SectionFrameNode = Node<SectionFrameData, 'section'>

export function SectionFrame({ data }: NodeProps<SectionFrameNode>) {
  if (data.expanded) {
    return (
      <article
        className="sketch-frame sketch-frame--expanded nowheel nopan"
        aria-current="true"
        aria-label={data.label}
      >
        <p className="font-hand sketch-frame__annotation">{data.annotation}</p>
        <div className="sketch-frame__body nowheel">
          {/* Case-study frames are phase 2 — canvas Work shows the grid only. */}
          <SectionBody
            sectionId={data.sectionId}
            projectSlug={null}
            onOpenProject={data.onOpenProject}
          />
        </div>
      </article>
    )
  }

  return (
    <button
      type="button"
      className="sketch-frame sketch-frame--collapsed chrome-interactive"
      aria-label={`${data.label} (shortcut ${data.shortcut})`}
      onClick={() => data.onNavigate(data.sectionId)}
    >
      <span className="font-hand sketch-frame__annotation">{data.annotation}</span>
      <span className="font-hand sketch-frame__title">{data.label}</span>
      <span className="sketch-frame__hint">Open section</span>
    </button>
  )
}
