// import HeaderSimples from '../components/HeaderSimples'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('usuario')
  const [erro, setErro] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }
    // Simulação de login (qualquer email/senha aceita)
    login({ email, nome: email.split('@')[0], tipo })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-2 sm:px-0">
      {/* <HeaderSimples /> */}
      <div className="w-full pt-8 sm:pt-12 md:flex md:items-center md:justify-center md:py-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center transition-transform duration-200 hover:scale-[1.025] mx-auto">
          <img src="/nevu.png" alt="Nevú" className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 drop-shadow-lg" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2 tracking-tight drop-shadow">Nevú</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-center text-base sm:text-lg">Bem-vindo de volta!<br/>Acesse sua conta para encontrar novas oportunidades.</p>
          <form className="w-full" onSubmit={handleSubmit} autoComplete="on">
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuário ou E-mail</label>
            <div className="relative mb-4 sm:mb-5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v7m0 0H9m3 0h3" /></svg>
              </span>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition text-base shadow-sm" placeholder="Digite seu usuário ou e-mail" />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <div className="relative mb-4 sm:mb-5">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3Zm0 0v2m0 4h.01" /></svg>
              </span>
              <input type="password" value={senha} onChange={e => setSenha(e.target.value)} className="pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition text-base shadow-sm" placeholder="Digite sua senha" />
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de conta</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="mb-6 sm:mb-8 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition text-base shadow-sm">
              <option value="usuario">Sou candidato</option>
              <option value="empresa">Sou empresa</option>
            </select>
            {erro && <div className="text-red-500 text-sm mb-2">{erro}</div>}
            <button type="submit" className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-green-500 transition flex items-center justify-center gap-2 text-base sm:text-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              Entrar
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">Não tem conta? <Link to="/cadastro" className="text-blue-600 hover:underline">Cadastre-se</Link></p>
          <div className="mt-6 text-center text-gray-400 text-sm select-none w-full">
            from <span className="font-semibold text-blue-700">Neotrix</span>
          </div>
        </div>
      </div>
    </div>
  )
} 