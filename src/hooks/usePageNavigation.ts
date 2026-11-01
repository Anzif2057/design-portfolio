import { useContext } from 'react'
import { PageNavigationContext } from '@/context/pageNavigationContext'

export function usePageNavigation() {
  const context = useContext(PageNavigationContext)
  if (!context) {
    throw new Error('usePageNavigation must be used within PageNavigationProvider')
  }
  return context
}
