import { useNavigate } from 'react-router-dom'

export default function HeaderSimples() {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-md border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between w-full">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow">
          <span className="text-white text-base sm:text-lg font-bold">N</span>
        </div>
        <span className="text-lg sm:text-xl font-extrabold text-blue-700 tracking-tight">Nevú</span>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium shadow transition text-xs sm:text-sm"
        aria-label="Voltar"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Voltar
      </button>
    </header>
  )
} 