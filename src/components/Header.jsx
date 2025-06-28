import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Header() {
  const { user, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false)

  const toggleMenu = () => {
    setMenuAberto(!menuAberto)
  }

  const isEmpresa = user && user.tipo === 'empresa';
  return (
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
          <Link to="/empresa" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Painel da Empresa</Link>
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

      {/* Botão hambúrguer mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuAberto ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menu mobile */}
      {menuAberto && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-b border-gray-200 md:hidden">
          <nav className="px-4 py-2 space-y-2">
            {user ? (
              <>
                {user.tipo === 'empresa' ? (
                  <>
                    <Link 
                      to="/empresa-home" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/empresa" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Publicar Vaga
                    </Link>
                    <Link 
                      to="/vagas-publicadas" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Minhas Vagas
                    </Link>
                    <Link 
                      to="/candidaturas" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Candidaturas
                    </Link>
                    <Link 
                      to="/mensagens" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Mensagens
                    </Link>
                    <Link 
                      to="/perfil-empresa" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Perfil
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Vagas
                    </Link>
                    <Link 
                      to="/chamados" 
                      className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                      onClick={() => setMenuAberto(false)}
                    >
                      Chamados
                    </Link>
                  </>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Olá, {user.nome || user.email}
                  </div>
                  <button
                    onClick={() => {
                      logout()
                      setMenuAberto(false)
                    }}
                    className="w-full text-left py-2 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 px-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded transition"
                  onClick={() => setMenuAberto(false)}
                >
                  Entrar
                </Link>
                <Link 
                  to="/cadastro" 
                  className="block py-2 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition mx-3"
                  onClick={() => setMenuAberto(false)}
                >
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
