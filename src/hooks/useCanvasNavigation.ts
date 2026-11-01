import { useContext } from 'react'
import { CanvasNavigationContext } from '@/context/canvasNavigationContext'

export function useCanvasNavigation() {
  const context = useContext(CanvasNavigationContext)
  if (!context) {
    throw new Error('useCanvasNavigation must be used within CanvasNavigationProvider')
  }
  return context
}
