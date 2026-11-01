import { PortfolioCanvas } from '@/components/canvas/PortfolioCanvas'
import { CanvasNavigationProvider } from '@/context/CanvasNavigationProvider'

export function CanvasPage() {
  return (
    <CanvasNavigationProvider>
      <PortfolioCanvas />
    </CanvasNavigationProvider>
  )
}
