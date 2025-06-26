import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between sticky top-0 z-50 w-full">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow">
          <span className="text-white text-base sm:text-lg font-bold">N</span>
        </div>
        <h1 className="text-lg sm:text-2xl font-extrabold text-blue-700 tracking-tight"><Link to="/">Nevú</Link></h1>
      </div>
      <nav className="flex gap-2 sm:gap-6 items-center">
        <Link to="/vagas" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Vagas</Link>
        <Link to="/chamados" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Chamados</Link>
        <Link to="/login" className="px-3 sm:px-4 py-1.5 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm sm:text-base whitespace-nowrap">Login</Link>
      </nav>
    </header>
  )
}
