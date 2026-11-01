import { type Node, type NodeProps } from '@xyflow/react'
import type { SectionId } from '@/types'

export type ClusterNodeData = {
  label: string
  sectionId: SectionId
  active: boolean
  onNavigate: (sectionId: SectionId) => void
}

export type ClusterNodeType = Node<ClusterNodeData, 'cluster'>

export function ClusterNode({ data }: NodeProps<ClusterNodeType>) {
  return (
    <button
      type="button"
      className={[
        'min-w-40 cursor-pointer rounded-lg border bg-background px-4 py-3 text-left shadow-sm',
        'transition-[border-color,box-shadow] duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        data.active ? 'border-accent shadow-md' : 'border-border hover:border-muted',
      ].join(' ')}
      aria-current={data.active ? 'true' : undefined}
      onClick={() => data.onNavigate(data.sectionId)}
    >
      <span className="block text-sm font-semibold text-foreground">{data.label}</span>
      <span className="mt-1 block text-xs text-muted">Open section</span>
    </button>
  )
}
