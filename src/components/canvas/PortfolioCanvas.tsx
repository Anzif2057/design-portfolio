import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  type NodeTypes,
} from '@xyflow/react'
import { useMemo, useRef, useState, type CSSProperties } from 'react'
import '@xyflow/react/dist/style.css'
import { SECTION_FRAME, SECTIONS } from '@/data/sections'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'
import { useCanvasShortcuts } from '@/hooks/useCanvasShortcuts'
import { useCanvasSwipe } from '@/hooks/useCanvasSwipe'
import { useGuidedCamera } from '@/hooks/useGuidedCamera'
import { useParallaxOffset } from '@/hooks/useParallaxOffset'
import { ActionPanel } from '@/components/panels/ActionPanel'
import { FileNamePanel } from '@/components/panels/FileNamePanel'
import { SideToolbar } from '@/components/panels/SideToolbar'
import { StepperPanel } from '@/components/panels/StepperPanel'
import { ShortcutsModal } from '@/components/ui/ShortcutsModal'
import { SectionFrame, type SectionFrameNode } from './SectionFrame'
import type { SectionId } from '@/types'

const nodeTypes = {
  section: SectionFrame,
} satisfies NodeTypes

const ANNOTATIONS: Record<SectionId, string> = {
  updates: 'lately…',
  about: "who's here",
  skills: 'toolkit',
  experience: 'path so far',
  work: 'selected work',
}

function GuidedCamera({ ready }: { ready: boolean }) {
  const { view } = useCanvasNavigation()
  useGuidedCamera(view, ready)
  return null
}

function CanvasStage() {
  const shellRef = useRef<HTMLDivElement>(null)
  const { view, navigateTo, openProject } = useCanvasNavigation()
  const parallax = useParallaxOffset()
  const [flowReady, setFlowReady] = useState(false)

  useCanvasShortcuts()
  useCanvasSwipe(shellRef)

  const nodes: SectionFrameNode[] = useMemo(
    () =>
      SECTIONS.map((section) => {
        const expanded = view === section.id
        const size = expanded ? SECTION_FRAME.expanded : SECTION_FRAME.collapsed
        return {
          id: section.id,
          type: 'section' as const,
          position: section.position,
          style: {
            width: size.width,
            height: size.height,
          },
          data: {
            label: section.label,
            sectionId: section.id,
            shortcut: section.shortcut,
            expanded,
            annotation: ANNOTATIONS[section.id],
            onNavigate: navigateTo,
            onOpenProject: openProject,
          },
          draggable: false,
          connectable: false,
          selectable: false,
        }
      }),
    [view, navigateTo, openProject],
  )

  const parallaxStyle = {
    '--parallax-x': `${parallax.x}px`,
    '--parallax-y': `${parallax.y}px`,
  } as CSSProperties

  return (
    <div
      ref={shellRef}
      className="canvas-shell relative h-full w-full overflow-hidden bg-background"
      style={parallaxStyle}
    >
      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        minZoom={0.25}
        maxZoom={1.25}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        selectNodesOnDrag={false}
        preventScrolling
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{ focusable: false }}
        onInit={() => setFlowReady(true)}
      >
        <Background
          id="dots"
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color="var(--canvas-dot)"
        />
        <GuidedCamera ready={flowReady} />
      </ReactFlow>

      <FileNamePanel />
      <SideToolbar />
      <ActionPanel />
      <StepperPanel />
      <ShortcutsModal />
    </div>
  )
}

export function PortfolioCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasStage />
    </ReactFlowProvider>
  )
}
