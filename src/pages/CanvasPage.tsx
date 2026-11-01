import { PortfolioCanvas } from '@/components/canvas/PortfolioCanvas'
import { CanvasNavigationProvider } from '@/context/CanvasNavigationProvider'
import { ToastProvider } from '@/context/ToastProvider'
import { getCanvasDocumentMeta } from '@/data/seo'
import { useCanvasNavigation } from '@/hooks/useCanvasNavigation'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'

function CanvasDocumentMeta() {
  const { view, projectSlug } = useCanvasNavigation()
  useDocumentMeta(getCanvasDocumentMeta(view, projectSlug))
  return null
}

export function CanvasPage() {
  return (
    <CanvasNavigationProvider>
      <ToastProvider>
        <CanvasDocumentMeta />
        <PortfolioCanvas />
      </ToastProvider>
    </CanvasNavigationProvider>
  )
}
