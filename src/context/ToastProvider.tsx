import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { ToastContext } from './toastContext'

interface ToastState {
  id: number
  message: string
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string) => {
    const id = Date.now()
    setToast({ id, message })
    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current))
    }, 2200)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground shadow-md md:bottom-8"
        >
          {toast.message}
        </div>
      ) : null}
    </ToastContext.Provider>
  )
}
