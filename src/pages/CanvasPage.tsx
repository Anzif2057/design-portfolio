import { PortfolioCanvas } from '@/components/canvas/PortfolioCanvas'
import { CanvasNavigationProvider } from '@/context/CanvasNavigationProvider'
import { ToastProvider } from '@/context/ToastProvider'

export function CanvasPage() {
  return (
    <CanvasNavigationProvider>
      <ToastProvider>
        <PortfolioCanvas />
      </ToastProvider>
    </CanvasNavigationProvider>
  )
}
