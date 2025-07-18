import { Link, useNavigate, useLocation, matchPath } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState, useRef } from 'react'

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const drawerTimeout = useRef(null);

  const openDrawer = () => {
    setDrawerOpen(true);
    setDrawerClosing(false);
  };
  const closeDrawer = () => {
    setDrawerClosing(true);
    drawerTimeout.current = setTimeout(() => {
      setDrawerOpen(false);
      setDrawerClosing(false);
    }, 320);
  };

  const isEmpresa = user && user.tipo === 'empresa';
  // Função utilitária para saber se a rota está ativa (inclui subrotas)
  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    if (to === '/chamados') {
      // Ativo em /chamados e em qualquer /chamado/:id
      return !!matchPath({ path: '/chamados', end: true }, location.pathname) ||
             !!matchPath({ path: '/chamado/:id', end: true }, location.pathname);
    }
    return !!matchPath({ path: to + '/*', end: false }, location.pathname);
  };
  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between sticky top-0 z-50 w-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/nevu.png" alt="Nevú" className="h-8 sm:h-10 w-auto" />
            <span className="ml-2 text-xl sm:text-2xl font-bold text-blue-700">Nevú</span>
          </Link>
        </div>
        {/* Botão menu mobile à direita */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
            onClick={openDrawer}
            aria-label="Abrir menu"
          >
            <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          {!isEmpresa ? (
            // Menu desktop para candidatos
            user ? (
              <>
                <Link to="/" className={`font-medium text-sm sm:text-base ${isActive('/') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Início</Link>
                <Link to="/vagas" className={`font-medium text-sm sm:text-base ${isActive('/vagas') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Vagas</Link>
                <Link to="/candidaturas" className={`font-medium text-sm sm:text-base ${isActive('/candidaturas') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Candidaturas</Link>
                <Link to="/mensagens" className={`font-medium text-sm sm:text-base ${isActive('/mensagens') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Mensagens</Link>
                <Link to="/chamados" className={`font-medium text-sm sm:text-base ${isActive('/chamados') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Chamados</Link>
                <Link to="/perfil" className={`font-medium text-sm sm:text-base ${isActive('/perfil') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Perfil</Link>
                <Link to="/monetizacao" className={`font-medium text-sm sm:text-base ${isActive('/monetizacao') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Planos</Link>
                <Link to="/assinaturas" className={`font-medium text-sm sm:text-base ${isActive('/assinaturas') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Assinatura</Link>
                <Link to="/apoio" className={`font-medium text-sm sm:text-base ${isActive('/apoio') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Apoio</Link>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="ml-2 px-3 py-1.5 rounded bg-red-100 text-red-700 font-semibold shadow hover:bg-red-200 transition text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className={`font-medium text-sm sm:text-base ${isActive('/') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Início</Link>
                <Link to="/apoio" className={`font-medium text-sm sm:text-base ${isActive('/apoio') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Apoio</Link>
                <Link to="/login" className="px-3 sm:px-4 py-1 sm:py-1.5 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm sm:text-base">Login</Link>
              </>
            )
          ) : (
            // Menu desktop para empresas
            <>
              <Link to="/empresa-home" className={`font-medium text-sm sm:text-base ${isActive('/empresa-home') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Dashboard</Link>
              <Link to="/publicar-vaga" className={`font-medium text-sm sm:text-base ${isActive('/publicar-vaga') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Publicar Vaga</Link>
              <Link to="/vagas-publicadas" className={`font-medium text-sm sm:text-base ${isActive('/vagas-publicadas') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Minhas Vagas</Link>
              <Link to="/candidaturas" className={`font-medium text-sm sm:text-base ${isActive('/candidaturas') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Candidaturas</Link>
              <Link to="/mensagens" className={`font-medium text-sm sm:text-base ${isActive('/mensagens') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Mensagens</Link>
              <Link to="/chamados" className={`font-medium text-sm sm:text-base ${isActive('/chamados') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Chamados</Link>
              <Link to="/perfil-empresa" className={`font-medium text-sm sm:text-base ${isActive('/perfil-empresa') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Perfil</Link>
              <Link to="/monetizacao" className={`font-medium text-sm sm:text-base ${isActive('/monetizacao') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Planos</Link>
              <Link to="/assinaturas" className={`font-medium text-sm sm:text-base ${isActive('/assinaturas') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Assinatura</Link>
              <Link to="/apoio" className={`font-medium text-sm sm:text-base ${isActive('/apoio') ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-600 transition-colors'}`}>Apoio</Link>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="ml-2 px-3 py-1.5 rounded bg-red-100 text-red-700 font-semibold shadow hover:bg-red-200 transition text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sair</span>
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Drawer lateral mobile */}
      {(drawerOpen || drawerClosing) && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ${drawerClosing ? 'opacity-0' : 'opacity-100'}`} onClick={closeDrawer}></div>
          {/* Drawer à direita com efeito personalizado */}
          <nav className={`relative bg-white w-72 max-w-full h-full shadow-2xl rounded-l-3xl p-0 flex flex-col animate-drawer-fade-slide-${drawerClosing ? 'out' : 'in'} transition-all duration-400`}
            style={{padding: 0}}>
            <div className="flex flex-col h-full">
          <button 
                className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow-md transition"
                onClick={closeDrawer}
                aria-label="Fechar menu"
                style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
              {/* Navegação */}
              <div className="flex-1 flex flex-col gap-3 mt-20 px-7 pb-8 overflow-y-auto">
          {user ? (
            <>
                    {/* Menu para empresa */}
                    {user.tipo === 'empresa' ? (
                      <>
                        <Link to="/empresa-home" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Dashboard</Link>
                        <Link to="/publicar-vaga" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Publicar Vaga</Link>
                        <Link to="/vagas-publicadas" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Minhas Vagas</Link>
                        <Link to="/candidaturas" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Candidaturas</Link>
                        <Link to="/mensagens" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Mensagens</Link>
                        <Link to="/chamados" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Chamados</Link>
                        <Link to="/perfil-empresa" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Perfil</Link>
                        <Link to="/monetizacao" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Planos</Link>
                        <Link to="/assinaturas" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Assinatura</Link>
                        <Link to="/apoio" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Apoio</Link>
                      </>
                    ) : (
                      <>
                        {/* Menu para candidato */}
                        <Link to="/" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Início</Link>
                        <Link to="/vagas" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Vagas</Link>
                        <Link to="/candidaturas" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Candidaturas</Link>
                        <Link to="/mensagens" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Mensagens</Link>
                        <Link to="/chamados" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Chamados</Link>
                        <Link to="/perfil" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Perfil</Link>
                        <Link to="/monetizacao" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Planos</Link>
                        <Link to="/assinaturas" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Assinatura</Link>
                        <Link to="/apoio" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Apoio</Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Link to="/" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Início</Link>
                    <Link to="/apoio" className="py-2 px-3 rounded text-base font-medium hover:bg-blue-50 text-gray-700" onClick={() => setDrawerOpen(false)}>Apoio</Link>
                    <Link to="/login" className="py-2 px-3 rounded text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition" onClick={() => setDrawerOpen(false)}>Login</Link>
                    <Link to="/cadastro" className="py-2 px-3 rounded text-base font-medium bg-green-600 text-white hover:bg-green-700 transition" onClick={() => setDrawerOpen(false)}>Cadastrar</Link>
                  </>
                )}
                {user && (
                  <button
                    onClick={() => { logout(); navigate('/'); closeDrawer(); }}
                    className="mt-6 py-2 px-3 rounded-lg bg-red-100 text-red-700 font-semibold shadow hover:bg-red-200 transition text-base flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    Sair
                  </button>
                )}
              </div>
            </div>
        </nav>
      </div>
      )}

      {/* Remover menu fixo inferior mobile */}
      {/* (menu mobile removido) */}
      {/* Drawer animação fade + slide personalizada com bounce forte */}
      <style>{`
        @keyframes drawer-fade-slide-in {
          0% { opacity: 0; transform: translateX(100%) scale(0.96); }
          80% { opacity: 1; transform: translateX(-8%) scale(1.04); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes drawer-fade-slide-out {
          0% { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(100%) scale(0.96); }
        }
        .animate-drawer-fade-slide-in {
          animation: drawer-fade-slide-in 0.65s cubic-bezier(0.68,-0.55,0.27,1.25);
        }
        .animate-drawer-fade-slide-out {
          animation: drawer-fade-slide-out 0.38s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  )
}
 