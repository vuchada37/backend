import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useRef, useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Vagas from './pages/Vagas';
import Chamados from './pages/Chamados';
import NovoChamado from './pages/NovoChamado';
import DetalheChamado from './pages/DetalheChamado';
import DetalheVaga from './pages/DetalheVaga';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Candidaturas from './pages/Candidaturas';
import HomeEmpresa from './pages/HomeEmpresa';
import PainelEmpresa from './pages/PainelEmpresa';
import PerfilEmpresa from './pages/PerfilEmpresa';
import VagasPublicadas from './pages/VagasPublicadas';
import PublicarVaga from './pages/PublicarVaga';
import Mensagens from './pages/MensagensMelhorada';
import Monetizacao from './components/Monetizacao';
import Assinaturas from './components/Assinaturas';
import Apoio from './pages/Apoio';
import Termos from './pages/Termos';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import FAQ from './pages/FAQ';
import './App.css';

export default function AppRoutes() {
  const location = useLocation();
  const hideHeader = ["/login", "/cadastro"].includes(location.pathname);
  const [loading, setLoading] = useState(false);
  const [visitedPages, setVisitedPages] = useState(() => new Set());

  useEffect(() => {
    setLoading(true);
    let timeout = 900;
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(location.pathname)) {
        timeout = 200;
      } else {
        timeout = 900;
        newSet.add(location.pathname);
      }
      const timer = setTimeout(() => setLoading(false), timeout);
      return newSet;
    });
    // O timer precisa ser limpo fora do setVisitedPages
    const timer = setTimeout(() => setLoading(false), timeout);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideHeader && <Header />}
      <main className={!hideHeader ? "pt-16" : ""}>
        {loading ? (
          <div className="route-loader flex items-center justify-center min-h-[60vh]">
            <div className="brand-spinner">
              <div className="spinner"></div>
              <div className="logo">
                <img src="/nevu.png" alt="Nevú" />
              </div>
            </div>
          </div>
        ) : (
          <Routes location={location}>
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
            <Route path="/perfil-empresa" element={<PerfilEmpresa />} />
            <Route path="/perfil-empresa/:id" element={<PerfilEmpresa />} />
            <Route path="/vagas-publicadas" element={<VagasPublicadas />} />
            <Route path="/publicar-vaga" element={<PublicarVaga />} />
            <Route path="/mensagens" element={<Mensagens />} />
            <Route path="/monetizacao" element={<Monetizacao />} />
            <Route path="/assinaturas" element={<Assinaturas />} />
            <Route path="/apoio" element={<Apoio />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        )}
      </main>
    </div>
  );
} 