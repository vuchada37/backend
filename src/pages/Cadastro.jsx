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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center transition-transform duration-200 hover:scale-[1.025] mx-2">
          <img src="/nevu.png" alt="Nevú" className="w-16 h-16 object-contain mb-4" />
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight">Cadastro</h1>
          <p className="text-gray-600 mb-6 text-center">Crie sua conta para acessar todas as oportunidades.</p>
          <form className="w-full" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition" placeholder="Digite seu nome" />
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition" placeholder="Digite seu e-mail" />
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} className="mb-4 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition" placeholder="Digite sua senha" />
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de conta</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="mb-6 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition">
              <option value="usuario">Sou candidato</option>
              <option value="empresa">Sou empresa</option>
            </select>
            {erro && <div className="text-red-500 text-sm mb-2">{erro}</div>}
            <button type="submit" className="w-full py-2 rounded bg-gradient-to-r from-blue-600 to-green-400 text-white font-semibold shadow hover:from-blue-700 hover:to-green-500 transition flex items-center justify-center gap-2 mb-2">
              Cadastrar
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-2">Já tem conta? <a href="/login" className="text-blue-600 hover:underline">Entrar</a></p>
        </div>
      </div>
    </div>
  )
} 