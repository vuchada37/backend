import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth();

  const isEmpresa = user && user.tipo === 'empresa';
  return (
    <>
      <header className="bg-white shadow-md border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between sticky top-0 z-50 w-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/nevu.png" alt="Nevú" className="h-8 sm:h-10 w-auto" />
            <span className="ml-2 text-xl sm:text-2xl font-bold text-blue-700">Nevú</span>
          </Link>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {!isEmpresa && (
            <Link to="/vagas" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Vagas</Link>
          )}
          <Link to="/chamados" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Chamados</Link>
          {isEmpresa && (
            <>
              <Link to="/empresa" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Painel da Empresa</Link>
              <Link to="/mensagens" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Mensagens</Link>
            </>
          )}
          {user ? (
            <>
              <span className="text-gray-700 font-medium text-sm sm:text-base">Olá, {user.nome || user.email}</span>
              <button onClick={logout} className="px-3 sm:px-4 py-1 sm:py-1.5 rounded bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition text-sm sm:text-base">Sair</button>
            </>
          ) : (
            <Link to="/login" className="px-3 sm:px-4 py-1 sm:py-1.5 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm sm:text-base">Login</Link>
          )}
        </nav>
      </header>

      {/* Navegação mobile fixa na parte inferior */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex justify-around items-center py-2">
          {user ? (
            isEmpresa ? (
              // Menu para empresas
              <>
                <Link to="/empresa-home" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                  <span className="text-xs">Dashboard</span>
                </Link>
                <Link to="/empresa" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-xs">Publicar</span>
                </Link>
                <Link to="/vagas-publicadas" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs">Minhas Vagas</span>
                </Link>
                <Link to="/candidaturas" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span className="text-xs">Candidaturas</span>
                </Link>
                <Link to="/mensagens" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-xs">Mensagens</span>
                </Link>
              </>
            ) : (
              // Menu para candidatos
              <>
                <Link to="/" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-xs">Início</span>
                </Link>
                <Link to="/vagas" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  <span className="text-xs">Vagas</span>
                </Link>
                <Link to="/chamados" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs">Chamados</span>
                </Link>
                <Link to="/perfil" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-xs">Perfil</span>
                </Link>
                <Link to="/candidaturas" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span className="text-xs">Candidaturas</span>
                </Link>
              </>
            )
          ) : (
            // Menu para usuários não logados
            <>
              <Link to="/" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-xs">Início</span>
              </Link>
              <Link to="/vagas" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
                <span className="text-xs">Vagas</span>
              </Link>
              <Link to="/chamados" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">Chamados</span>
              </Link>
              <Link to="/login" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="text-xs">Entrar</span>
              </Link>
              <Link to="/cadastro" className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition">
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className="text-xs">Cadastrar</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  )
}
