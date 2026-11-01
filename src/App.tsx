import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CanvasPage } from '@/pages/CanvasPage'
import { ListPage } from '@/pages/ListPage'
import { SECTION_ORDER } from '@/data/sections'

function SectionRoute() {
  return <CanvasPage />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CanvasPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/work/:slug" element={<CanvasPage />} />
        {SECTION_ORDER.map((section) => (
          <Route key={section} path={`/${section}`} element={<SectionRoute />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
