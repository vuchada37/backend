import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src="/src/assets/nevu.png" alt="Nevú" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
        <h1 className="text-xl sm:text-2xl font-extrabold text-blue-700 tracking-tight"><Link to="/">Nevú</Link></h1>
      </div>
      <nav className="flex gap-3 sm:gap-6 items-center">
        <Link to="/vagas" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Vagas</Link>
        <Link to="/chamados" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm sm:text-base">Chamados</Link>
        <Link to="/login" className="px-3 sm:px-4 py-1 sm:py-1.5 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-sm sm:text-base">Login</Link>
      </nav>
    </header>
  )
}
