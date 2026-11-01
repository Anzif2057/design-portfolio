import { Background, BackgroundVariant, ReactFlow, type Node } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes: Node[] = [
  {
    id: 'placeholder',
    position: { x: 0, y: 0 },
    data: { label: 'Placeholder cluster' },
    style: {
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid var(--color-border)',
      background: 'var(--color-background)',
      color: 'var(--color-foreground)',
      fontSize: '14px',
      boxShadow: 'var(--shadow-sm)',
    },
  },
]

export function PortfolioCanvas() {
  return (
    <div className="h-full w-full bg-background">
      <ReactFlow
        nodes={initialNodes}
        edges={[]}
        fitView
        minZoom={0.25}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          id="dots"
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color="var(--canvas-dot)"
        />
      </ReactFlow>
    </div>
  )
}
