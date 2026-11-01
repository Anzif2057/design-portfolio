import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  type Node,
  type NodeTypes,
} from '@xyflow/react'
import { useMemo, useRef, useState, type CSSProperties } from 'react'
import '@xyflow/react/dist/style.css'
import {
  getWelcomePosition,
  SECTION_FRAME,
  SECTION_WORLD_SIZE,
  SECTIONS,
} from '@/data/sections'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'
import { useCanvasShortcuts } from '@/hooks/useCanvasShortcuts'
import { useCanvasSwipe } from '@/hooks/useCanvasSwipe'
import { useGuidedCamera } from '@/hooks/useGuidedCamera'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useParallaxOffset } from '@/hooks/useParallaxOffset'
import { ActionPanel } from '@/components/panels/ActionPanel'
import { FileNamePanel } from '@/components/panels/FileNamePanel'
import { SideToolbar } from '@/components/panels/SideToolbar'
import { StepperPanel } from '@/components/panels/StepperPanel'
import { ShortcutsModal } from '@/components/ui/ShortcutsModal'
import { AboutSectionNode, type AboutSectionNodeType } from './AboutSectionNode'
import { SectionFrame, type SectionFrameNode } from './SectionFrame'
import { WelcomeNode, type WelcomeNodeType } from './WelcomeNode'
import type { SectionId } from '@/types'

const nodeTypes = {
  section: SectionFrame,
  aboutWorld: AboutSectionNode,
  welcome: WelcomeNode,
} satisfies NodeTypes

const ANNOTATIONS: Record<Exclude<SectionId, 'about'>, string> = {
  updates: 'lately…',
  skills: 'toolkit',
  experience: 'path so far',
  work: 'selected work',
}

function GuidedCamera({ ready }: { ready: boolean }) {
  const { view } = useCanvasNavigation()
  const isMobile = useIsMobile()
  useGuidedCamera(view, {
    ready,
    aboutMobileCrop: view === 'about' && isMobile,
  })
  return null
}

function CanvasStage() {
  const shellRef = useRef<HTMLDivElement>(null)
  const { view, navigateTo, openProject } = useCanvasNavigation()
  const isMobile = useIsMobile()
  const parallax = useParallaxOffset()
  const [flowReady, setFlowReady] = useState(false)
  const [aboutHighlighted, setAboutHighlighted] = useState(false)

  useCanvasShortcuts()
  useCanvasSwipe(shellRef)

  const nodes: Node[] = useMemo(() => {
    const welcomePos = getWelcomePosition()
    const list: Node[] = []

    for (const section of SECTIONS) {
      if (section.id === 'about') {
        const aboutNode: AboutSectionNodeType = {
          id: 'about',
          type: 'aboutWorld',
          position: section.position,
          style: {
            width: SECTION_WORLD_SIZE.width,
            height: SECTION_WORLD_SIZE.height,
          },
          data: {
            highlighted: aboutHighlighted && view === 'overview',
            opened: view === 'about',
            hideDesktopAccents: isMobile && view === 'about',
            onOpen: () => navigateTo('about'),
            onHighlight: setAboutHighlighted,
          },
          draggable: false,
          connectable: false,
          selectable: false,
        }
        list.push(aboutNode)
        continue
      }

      const expanded = view === section.id
      const size = expanded ? SECTION_FRAME.expanded : SECTION_FRAME.collapsed
      const frameNode: SectionFrameNode = {
        id: section.id,
        type: 'section',
        position: section.position,
        style: {
          width: size.width,
          height: size.height,
          opacity: aboutHighlighted && view === 'overview' ? 0.4 : 1,
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
      list.push(frameNode)
    }

    if (view === 'overview') {
      const welcome: WelcomeNodeType = {
        id: 'welcome',
        type: 'welcome',
        position: welcomePos,
        style: { width: 360, height: 280 },
        data: {},
        draggable: false,
        connectable: false,
        selectable: false,
      }
      list.push(welcome)
    }

    return list
  }, [view, navigateTo, openProject, aboutHighlighted, isMobile])

  const parallaxStyle = {
    '--parallax-x': `${parallax.x}px`,
    '--parallax-y': `${parallax.y}px`,
  } as CSSProperties

  return (
    <div
      ref={shellRef}
      className={[
        'canvas-shell relative h-full w-full overflow-hidden bg-background',
        aboutHighlighted && view === 'overview' ? 'canvas-shell--dim-peers' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={parallaxStyle}
    >
      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        minZoom={0.08}
        maxZoom={1.35}
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
