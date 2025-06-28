import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PainelEmpresa() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Proteger rota
  useEffect(() => {
    if (!user || user.tipo !== 'empresa') {
      navigate('/')
    }
  }, [user, navigate])

  // Estado local para vagas mockadas
  const [vagas, setVagas] = useState([
    {
      id: 1,
      titulo: 'Desenvolvedor Frontend',
      local: 'Maputo',
      tipo: 'Tempo Integral',
      descricao: 'Desenvolva interfaces modernas e responsivas para nossos clientes.'
    }
  ])
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [local, setLocal] = useState('')
  const [tipoVaga, setTipoVaga] = useState('Tempo Integral')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!titulo || !descricao || !local) {
      setErro('Preencha todos os campos.')
      return
    }
    setVagas(vs => [
      ...vs,
      {
        id: Date.now(),
        titulo,
        descricao,
        local,
        tipo: tipoVaga
      }
    ])
    setTitulo('')
    setDescricao('')
    setLocal('')
    setTipoVaga('Tempo Integral')
    setErro('')
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Painel da Empresa</h2>
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2">Publicar nova vaga</h3>
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded p-4 flex flex-col gap-3 shadow">
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título da vaga" className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição da vaga" className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="text" value={local} onChange={e => setLocal(e.target.value)} placeholder="Localização" className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <select value={tipoVaga} onChange={e => setTipoVaga(e.target.value)} className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="Tempo Integral">Tempo Integral</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Estágio">Estágio</option>
          </select>
          {erro && <div className="text-red-500 text-sm">{erro}</div>}
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Publicar vaga</button>
        </form>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Vagas publicadas</h3>
        {vagas.length === 0 ? (
          <p className="text-gray-500">Nenhuma vaga publicada ainda.</p>
        ) : (
          <ul className="space-y-4">
            {vagas.map(vaga => (
              <li key={vaga.id} className="border rounded p-4 shadow bg-white">
                <div className="font-bold text-blue-700 text-lg">{vaga.titulo}</div>
                <div className="text-gray-600 text-sm mb-1">{vaga.local} • {vaga.tipo}</div>
                <div className="text-gray-700 text-sm mb-2">{vaga.descricao}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
  