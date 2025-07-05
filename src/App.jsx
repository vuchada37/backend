import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Home from './pages/Home'
import Vagas from './pages/Vagas'
import Chamados from './pages/Chamados'
import NovoChamado from './pages/NovoChamado'
import DetalheChamado from './pages/DetalheChamado'
import DetalheVaga from './pages/DetalheVaga'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Candidaturas from './pages/Candidaturas'
import HomeEmpresa from './pages/HomeEmpresa'
import PainelEmpresa from './pages/PainelEmpresa'
import PerfilEmpresa from './pages/PerfilEmpresa'
import VagasPublicadas from './pages/VagasPublicadas'
import Mensagens from './pages/MensagensMelhorada'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vagas" element={<Vagas />} />
              <Route path="/chamados" element={<Chamados />} />
              <Route path="/novo-chamado" element={<NovoChamado />} />
              <Route path="/chamado/:id" element={<DetalheChamado />} />
              <Route path="/vaga/:id" element={<DetalheVaga />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/perfil/:id" element={<Perfil />} />
              <Route path="/candidaturas" element={<Candidaturas />} />
              <Route path="/empresa-home" element={<HomeEmpresa />} />
              <Route path="/empresa" element={<PainelEmpresa />} />
              <Route path="/perfil-empresa" element={<PainelEmpresa />} />
              <Route path="/perfil-empresa/:id" element={<PerfilEmpresa />} />
              <Route path="/vagas-publicadas" element={<VagasPublicadas />} />
              <Route path="/mensagens" element={<Mensagens />} />
            </Routes>
          </main>
      </div>
      </Router>
    </AuthProvider>
  )
}

export default App
