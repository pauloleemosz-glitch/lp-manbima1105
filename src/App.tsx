import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CaptacaoPage from './pages/CaptacaoPage'
import ObrigadoPage from './pages/ObrigadoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CaptacaoPage />} />
        <Route path="/manbima-convite" element={<CaptacaoPage />} />
        <Route path="/parabens-manbima" element={<ObrigadoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
