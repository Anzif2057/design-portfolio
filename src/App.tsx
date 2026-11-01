import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ListPage } from '@/pages/ListPage'
import { SECTION_ORDER } from '@/data/sections'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* One layout route so section deep links never remount the page. */}
        <Route element={<HomePage />}>
          <Route index element={null} />
          <Route path="work/:slug" element={null} />
          {SECTION_ORDER.map((section) => (
            <Route key={section} path={section} element={null} />
          ))}
        </Route>
        <Route path="/list" element={<ListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
