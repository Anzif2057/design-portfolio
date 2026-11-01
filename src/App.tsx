import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CanvasPage } from '@/pages/CanvasPage'
import { ListPage } from '@/pages/ListPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CanvasPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
