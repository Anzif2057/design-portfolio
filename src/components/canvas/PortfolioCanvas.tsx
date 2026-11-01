import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  type NodeTypes,
} from '@xyflow/react'
import { useMemo, useRef, useState, type CSSProperties } from 'react'
import '@xyflow/react/dist/style.css'
import { SECTIONS } from '@/data/sections'
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
import { ClusterNode, type ClusterNodeType } from './ClusterNode'

const nodeTypes = {
  cluster: ClusterNode,
} satisfies NodeTypes

function GuidedCamera({ ready }: { ready: boolean }) {
  const { view } = useCanvasNavigation()
  useGuidedCamera(view, ready)
  return null
}

function CanvasStage() {
  const shellRef = useRef<HTMLDivElement>(null)
  const { view, navigateTo } = useCanvasNavigation()
  const parallax = useParallaxOffset()
  const [flowReady, setFlowReady] = useState(false)

  useCanvasShortcuts()
  useCanvasSwipe(shellRef)

  const nodes: ClusterNodeType[] = useMemo(
    () =>
      SECTIONS.map((section) => ({
        id: section.id,
        type: 'cluster' as const,
        position: section.position,
        data: {
          label: section.label,
          sectionId: section.id,
          active: view === section.id,
          onNavigate: navigateTo,
        },
        draggable: false,
        connectable: false,
        selectable: false,
      })),
    [view, navigateTo],
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
        minZoom={0.35}
        maxZoom={1.5}
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
