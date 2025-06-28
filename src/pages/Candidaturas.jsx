import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Candidaturas() {
  const { user } = useAuth()
  const [filtroStatus, setFiltroStatus] = useState('todas')
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null)

  // Mock de candidaturas
  const candidaturas = [
    {
      id: 1,
      candidato: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 99999-9999',
      vaga: 'Desenvolvedor Frontend',
      dataCandidatura: '2024-01-15',
      status: 'pendente',
      experiencia: '3 anos',
      formacao: 'Ciência da Computação',
      curriculo: 'joao_silva_cv.pdf',
      cartaApresentacao: 'Sou desenvolvedor apaixonado por criar interfaces intuitivas...'
    },
    {
      id: 2,
      candidato: 'Maria Santos',
      email: 'maria@email.com',
      telefone: '(11) 88888-8888',
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

  const candidaturasFiltradas = candidaturas.filter(candidatura => {
    if (filtroStatus === 'todas') return true
    return candidatura.status === filtroStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      case 'aprovada': return 'bg-green-100 text-green-800'
      case 'rejeitada': return 'bg-red-100 text-red-800'
      case 'entrevista': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pendente': return 'Pendente'
      case 'aprovada': return 'Aprovada'
      case 'rejeitada': return 'Rejeitada'
      case 'entrevista': return 'Entrevista'
      default: return status
    }
  }

  const alterarStatus = (id, novoStatus) => {
    alert(`Status alterado para ${novoStatus}! (Funcionalidade mockada)`)
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Candidaturas Recebidas</h1>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">Filtrar por status:</label>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todas">Todas</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovada">Aprovadas</option>
            <option value="rejeitada">Rejeitadas</option>
            <option value="entrevista">Entrevista</option>
          </select>
          <span className="text-sm text-gray-600">
            {candidaturasFiltradas.length} candidatura(s) encontrada(s)
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lista de candidaturas */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-bold text-gray-800">Candidaturas</h2>
            </div>
            <div className="divide-y">
              {candidaturasFiltradas.map((candidatura) => (
                <div
                  key={candidatura.id}
                  onClick={() => setCandidatoSelecionado(candidatura)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                    candidatoSelecionado?.id === candidatura.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{candidatura.candidato}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidatura.status)}`}>
                      {getStatusText(candidatura.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{candidatura.vaga}</p>
                  <p className="text-sm text-gray-500">{candidatura.email}</p>
                  <p className="text-xs text-gray-400 mt-1">Candidatura em {candidatura.dataCandidatura}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detalhes do candidato */}
        <div className="bg-white rounded-lg shadow">
          {candidatoSelecionado ? (
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Detalhes do Candidato</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">{candidatoSelecionado.candidato}</h4>
                  <p className="text-sm text-gray-600">{candidatoSelecionado.email}</p>
                  <p className="text-sm text-gray-600">{candidatoSelecionado.telefone}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Vaga</h5>
                  <p className="text-sm text-gray-600">{candidatoSelecionado.vaga}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Experiência</h5>
                  <p className="text-sm text-gray-600">{candidatoSelecionado.experiencia}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Formação</h5>
                  <p className="text-sm text-gray-600">{candidatoSelecionado.formacao}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Carta de Apresentação</h5>
                  <p className="text-sm text-gray-600">{candidatoSelecionado.cartaApresentacao}</p>
                </div>

                <div className="space-y-2">
                  <button className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                    📄 Baixar Currículo
                  </button>
                  <button className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                    💬 Enviar Mensagem
                  </button>
                </div>

                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Alterar Status</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => alterarStatus(candidatoSelecionado.id, 'aprovada')}
                      className="p-2 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => alterarStatus(candidatoSelecionado.id, 'rejeitada')}
                      className="p-2 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition"
                    >
                      Rejeitar
                    </button>
                    <button
                      onClick={() => alterarStatus(candidatoSelecionado.id, 'entrevista')}
                      className="p-2 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition"
                    >
                      Entrevista
                    </button>
                    <button
                      onClick={() => alterarStatus(candidatoSelecionado.id, 'pendente')}
                      className="p-2 bg-yellow-100 text-yellow-700 rounded text-xs hover:bg-yellow-200 transition"
                    >
                      Pendente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <span className="text-4xl mb-4 block">👤</span>
              <p>Selecione um candidato para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 