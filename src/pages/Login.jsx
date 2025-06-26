// import HeaderSimples from '../components/HeaderSimples'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* <HeaderSimples /> */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center transition-transform duration-200 hover:scale-[1.025] mx-2">
          <img src="/nevu.png" alt="Nevú" className="w-16 h-16 object-contain mb-4" />
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight">Nevú</h1>
          <p className="text-gray-600 mb-6 text-center">Bem-vindo de volta!<br/>Acesse sua conta para encontrar novas oportunidades.</p>
          <form className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário ou E-mail</label>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v7m0 0H9m3 0h3" /></svg>
              </span>
              <input type="text" className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition" placeholder="Digite seu usuário ou e-mail" />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3Zm0 0v2m0 4h.01" /></svg>
              </span>
              <input type="password" className="pl-10 pr-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition" placeholder="Digite sua senha" />
            </div>
            <button type="submit" className="w-full py-2 rounded bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold shadow hover:from-blue-700 hover:to-green-500 transition flex items-center justify-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              Entrar
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">Não tem conta? <a href="#" className="text-blue-600 hover:underline">Cadastre-se</a></p>
        </div>
      </div>
    </div>
  )
} 