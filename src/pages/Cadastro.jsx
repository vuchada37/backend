import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('usuario')
  const [erro, setErro] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!nome || !email || !senha) {
      setErro('Preencha todos os campos.')
      return
    }
    // Simulação de cadastro
    login({ nome, email, tipo })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-2 sm:px-0">
      <div className="w-full pt-8 sm:pt-12 md:flex md:items-center md:justify-center md:py-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-xs sm:max-w-md md:max-w-lg flex flex-col items-center transition-transform duration-200 hover:scale-[1.025] mx-auto">
          <img src="/nevu.png" alt="Nevú" className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 drop-shadow-lg" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2 tracking-tight drop-shadow">Cadastro</h1>
          <p className="text-gray-600 mb-6 sm:mb-8 text-center text-base sm:text-lg">Crie sua conta para acessar todas as oportunidades.</p>
          <form className="w-full" onSubmit={handleSubmit} autoComplete="on">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} className="mb-4 sm:mb-5 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition text-base shadow-sm" placeholder="Digite seu nome" />
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mb-4 sm:mb-5 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition text-base shadow-sm" placeholder="Digite seu e-mail" />
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} className="mb-4 sm:mb-5 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition text-base shadow-sm" placeholder="Digite sua senha" />
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de conta</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="mb-6 sm:mb-8 px-3 py-2 sm:py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition text-base shadow-sm">
              <option value="usuario">Sou candidato</option>
              <option value="empresa">Sou empresa</option>
            </select>
            {erro && <div className="text-red-500 text-sm mb-2">{erro}</div>}
            <button type="submit" className="w-full py-2 sm:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-green-500 transition flex items-center justify-center gap-2 text-base sm:text-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              Cadastrar
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">Já tem conta? <a href="/login" className="text-blue-600 hover:underline">Entrar</a></p>
          <div className="mt-6 text-center text-gray-400 text-sm select-none w-full">
            from <span className="font-semibold text-blue-700">Neotrix</span>
          </div>
        </div>
      </div>
    </div>
  )
} 