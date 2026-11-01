import { PortfolioPage } from '@/components/page/PortfolioPage'
import { PageNavigationProvider } from '@/context/PageNavigationProvider'
import { ToastProvider } from '@/context/ToastProvider'
import { getCanvasDocumentMeta } from '@/data/seo'
import { useDocumentMeta } from '@/hooks/useDocumentMeta'
import { usePageNavigation } from '@/hooks/usePageNavigation'

function PageDocumentMeta() {
  const { view, projectSlug } = usePageNavigation()
  useDocumentMeta(getCanvasDocumentMeta(view, projectSlug))
  return null
}

export function HomePage() {
  return (
    <PageNavigationProvider>
      <ToastProvider>
        <PageDocumentMeta />
        <PortfolioPage />
      </ToastProvider>
    </PageNavigationProvider>
  )
}
