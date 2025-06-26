import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeaderSimples from './components/HeaderSimples'
import Home from './pages/Home'
import Vagas from './pages/Vagas'
import DetalheVaga from './pages/DetalheVaga'
import Login from './pages/Login'
import PainelEmpresa from './pages/PainelEmpresa'
import Chamados from './pages/Chamados'
import DetalheChamado from './pages/DetalheChamado'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <>
            <HeaderSimples />
            <Login />
          </>
        } />
        <Route path="/" element={
          <>
            <Header />
            <Home />
          </>
        } />
        <Route path="/vagas" element={
          <>
            <Header />
            <Vagas />
          </>
        } />
        <Route path="/vaga/:id" element={
          <>
            <Header />
            <DetalheVaga />
          </>
        } />
        <Route path="/empresa" element={
          <>
            <Header />
            <PainelEmpresa />
          </>
        } />
        <Route path="/chamados" element={
          <>
            <Header />
            <Chamados />
          </>
        } />
        <Route path="/chamados/:id" element={
          <>
            <Header />
            <DetalheChamado />
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App
