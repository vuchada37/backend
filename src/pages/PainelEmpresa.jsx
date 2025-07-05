import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalCandidaturasRecebidas } from '../components/Modal'

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

  // Mock de candidaturas recebidas (copiado do Candidaturas.jsx)
  const candidaturasRecebidas = [
    {
      id: 1,
      candidato: 'Hëlder Alves',
      email: 'helderalves@email.com',
      telefone: '(+258) 843390749',
      vaga: 'Desenvolvedor Frontend',
      dataCandidatura: '2024-01-15',
      status: 'pendente',
      experiencia: '3 anos',
      formacao: 'Ciência da Computação',
      curriculo: 'helderalves_cv.pdf',
      cartaApresentacao: 'Sou desenvolvedor apaixonado por criar interfaces intuitivas...'
    },
    {
      id: 2,
      candidato: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(+258) 872554074',
      vaga: 'Designer UX/UI',
      dataCandidatura: '2024-01-14',
      status: 'aprovada',
      experiencia: '5 anos',
      formacao: 'Design Gráfico',
      curriculo: 'maria_santos_cv.pdf',
      cartaApresentacao: 'Designer com foco em experiência do usuário...'
    },
    {
      id: 3,
      candidato: 'Pedro Costa',
      email: 'pedro@email.com',
      telefone: '(11) 77777-7777',
      vaga: 'Desenvolvedor Backend',
      dataCandidatura: '2024-01-13',
      status: 'rejeitada',
      experiencia: '2 anos',
      formacao: 'Sistemas de Informação',
      curriculo: 'pedro_costa_cv.pdf',
      cartaApresentacao: 'Desenvolvedor backend com experiência em Node.js...'
    },
    {
      id: 4,
      candidato: 'Ana Oliveira',
      email: 'ana@email.com',
      telefone: '(11) 66666-6666',
      vaga: 'Desenvolvedor Frontend',
      dataCandidatura: '2024-01-12',
      status: 'entrevista',
      experiencia: '4 anos',
      formacao: 'Engenharia de Software',
      curriculo: 'ana_oliveira_cv.pdf',
      cartaApresentacao: 'Desenvolvedora frontend com experiência em React...'
    }
  ]
  const [showModalCandidaturas, setShowModalCandidaturas] = useState(false)

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header fixo */}
      <header className="sticky top-0 z-30 bg-white shadow-md flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏢</span>
          <span className="font-bold text-lg text-blue-700">Painel da Empresa</span>
        </div>
      </header>
      <main className="flex-1 w-full max-w-md mx-auto px-2 sm:px-0 pt-2 pb-4">
        {/* Botão para abrir modal de candidaturas recebidas */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModalCandidaturas(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm shadow hover:bg-green-700 transition"
          >
            📥 Ver candidaturas recebidas
          </button>
        </div>
        {/* Formulário de nova vaga */}
        <section className="mb-6">
          <h3 className="text-base font-semibold mb-2 text-gray-800">Publicar nova vaga</h3>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 flex flex-col gap-3 shadow-md border">
            <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título da vaga" className="bg-gray-50 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição da vaga" className="bg-gray-50 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm resize-none min-h-[60px]" />
            <input type="text" value={local} onChange={e => setLocal(e.target.value)} placeholder="Localização" className="bg-gray-50 rounded-lg px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" />
            <select value={tipoVaga} onChange={e => setTipoVaga(e.target.value)} className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-sm">
              <option value="Tempo Integral">Tempo Integral</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Estágio">Estágio</option>
            </select>
            {erro && <div className="text-red-500 text-sm">{erro}</div>}
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition">Publicar vaga</button>
          </form>
        </section>
        {/* Vagas publicadas */}
        <section>
          <h3 className="text-base font-semibold mb-2 text-gray-800">Vagas publicadas</h3>
          {vagas.length === 0 ? (
            <p className="text-gray-500">Nenhuma vaga publicada ainda.</p>
          ) : (
            <ul className="space-y-4">
              {vagas.map(vaga => (
                <li key={vaga.id} className="border rounded-2xl p-4 shadow bg-white flex flex-col gap-2 transition hover:shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">💼</span>
                    <span className="font-bold text-blue-700 text-lg">{vaga.titulo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                    <span className="text-lg">📍</span>
                    <span>{vaga.local}</span>
                    <span className="mx-1">•</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">{vaga.tipo}</span>
                  </div>
                  <div className="text-gray-700 text-sm mb-1">{vaga.descricao}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      {/* Modal de candidaturas recebidas */}
      <ModalCandidaturasRecebidas
        isOpen={showModalCandidaturas}
        onClose={() => setShowModalCandidaturas(false)}
        candidaturas={candidaturasRecebidas}
      />
    </div>
  )
}
  