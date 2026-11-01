import { type Node } from '@xyflow/react'
import { WelcomeNote } from './sections/WelcomeNote'

export type WelcomeNodeType = Node<Record<string, never>, 'welcome'>

export function WelcomeNode() {
  return <WelcomeNote />
}
