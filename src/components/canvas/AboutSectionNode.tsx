import { type Node, type NodeProps } from '@xyflow/react'
import { AboutMeWorld } from './sections/AboutMeWorld'

export type AboutSectionData = {
  highlighted: boolean
  opened: boolean
  hideDesktopAccents: boolean
  onOpen: () => void
  onHighlight: (on: boolean) => void
}

export type AboutSectionNodeType = Node<AboutSectionData, 'aboutWorld'>

export function AboutSectionNode({ data }: NodeProps<AboutSectionNodeType>) {
  return (
    <div
      className="about-section-node"
      onMouseEnter={() => {
        if (!data.opened) data.onHighlight(true)
      }}
      onMouseLeave={() => data.onHighlight(false)}
      onFocusCapture={() => {
        if (!data.opened) data.onHighlight(true)
      }}
      onBlurCapture={(event) => {
        const next = event.relatedTarget
        if (!(next instanceof Element) || !event.currentTarget.contains(next)) {
          data.onHighlight(false)
        }
      }}
    >
      <AboutMeWorld
        highlighted={data.highlighted}
        opened={data.opened}
        hideDesktopAccents={data.hideDesktopAccents}
        onOpen={data.onOpen}
      />
    </div>
  )
}
