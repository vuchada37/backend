import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import HeaderSimples from './components/HeaderSimples'
import Home from './pages/Home'
import HomeEmpresa from './pages/HomeEmpresa'
import Vagas from './pages/Vagas'
import DetalheVaga from './pages/DetalheVaga'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import PainelEmpresa from './pages/PainelEmpresa'
import Chamados from './pages/Chamados'
import DetalheChamado from './pages/DetalheChamado'
import Mensagens from './pages/Mensagens'
import PerfilEmpresa from './pages/PerfilEmpresa'
import Candidaturas from './pages/Candidaturas'
import VagasPublicadas from './pages/VagasPublicadas'
import { useAuth } from './context/AuthContext'

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={
        <>
          <HeaderSimples />
          <Login />
        </>
      } />
      <Route path="/cadastro" element={
        <>
          <HeaderSimples />
          <Cadastro />
        </>
      } />
      <Route path="/empresa-home" element={
        <>
          <Header />
          <HomeEmpresa />
        </>
      } />
      <Route path="/" element={
        user && user.tipo === 'empresa' ? <Navigate to="/empresa-home" /> : <><Header /><Home /></>
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
      <Route path="/mensagens" element={
        <>
          <Header />
          <Mensagens />
        </>
      } />
      <Route path="/perfil-empresa" element={
        <>
          <Header />
          <PerfilEmpresa />
        </>
      } />
      <Route path="/candidaturas" element={
        <>
          <Header />
          <Candidaturas />
        </>
      } />
      <Route path="/vagas-publicadas" element={
        <>
          <Header />
          <VagasPublicadas />
        </>
      } />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
