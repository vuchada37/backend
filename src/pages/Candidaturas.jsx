import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import Modal from '../components/Modal'

export default function Candidaturas() {
  const { user } = useAuth()
  const [filtroStatus, setFiltroStatus] = useState('todas')
  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null)
  const [modalVaga, setModalVaga] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [vagaSelecionada, setVagaSelecionada] = useState(null)

  const isEmpresa = user && user.tipo === 'empresa'

  // Mock de candidaturas para empresas (candidatos que se candidataram às vagas da empresa)
  const candidaturasEmpresa = [
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

  // Mock de candidaturas para candidatos (suas próprias candidaturas enviadas)
  const candidaturasCandidato = [
    {
      id: 1,
      empresa: 'TechCorp',
      vaga: 'Desenvolvedor Frontend',
      dataCandidatura: '2024-01-15',
      status: 'pendente',
      salario: 'MZN 4.000 - 6.000',
      localizacao: 'Gurue, Mozambique',
      tipo: 'CLT'
    },
    {
      id: 2,
      empresa: 'DesignStudio',
      vaga: 'Designer UX/UI',
      dataCandidatura: '2024-01-14',
      status: 'aprovada',
      salario: 'MZN 5.000 - 7.000',
      localizacao: 'Remoto',
      tipo: 'PJ'
    },
    {
      id: 3,
      empresa: 'StartupXYZ',
      vaga: 'Desenvolvedor Full Stack',
      dataCandidatura: '2024-01-13',
      status: 'rejeitada',
      salario: 'MZN 6.000 - 8.000',
      localizacao: 'Milange, Mozambique',
      tipo: 'CLT'
    },
    {
      id: 4,
      empresa: 'BigTech',
      vaga: 'Desenvolvedor React',
      dataCandidatura: '2024-01-12',
      status: 'entrevista',
      salario: 'MZN 7.000 - 9.000',
      localizacao: 'Híbrido',
      tipo: 'CLT'
    }
  ]

  // Mock de detalhes das vagas
  const detalhesVagas = {
    'TechCorp': {
      empresa: 'TechCorp',
      vaga: 'Desenvolvedor Frontend',
      descricao: 'Estamos procurando um desenvolvedor frontend apaixonado por criar interfaces modernas e responsivas. Você trabalhará com React, TypeScript e CSS moderno.',
      requisitos: [
        'Experiência com React e TypeScript',
        'Conhecimento em CSS moderno (Flexbox, Grid)',
        'Familiaridade com Git',
        'Boa comunicação e trabalho em equipe'
      ],
      beneficios: [
        'Plano de saúde',
        'Vale refeição',
        'Gympass',
        'Horário flexível'
      ],
      salario: 'MZN 4.000 - 6.000',
      localizacao: 'Maputo, Mozambique',
      tipo: 'CLT',
      modalidade: 'Híbrido'
    },
    'DesignStudio': {
      empresa: 'DesignStudio',
      vaga: 'Designer UX/UI',
      descricao: 'Designer criativo para criar experiências digitais incríveis. Foco em design de interfaces e experiência do usuário.',
      requisitos: [
        'Portfólio com projetos de UX/UI',
        'Experiência com Figma',
        'Conhecimento em design systems',
        'Experiência com pesquisa de usuários'
      ],
      beneficios: [
        'Plano de saúde',
        'Vale alimentação',
        'Home office',
        'Flexibilidade de horários'
      ],
      salario: 'MZN 5.000 - 7.000',
      localizacao: 'Remoto',
      tipo: 'PJ',
      modalidade: 'Remoto'
    },
    'StartupXYZ': {
      empresa: 'StartupXYZ',
      vaga: 'Desenvolvedor Full Stack',
      descricao: 'Desenvolvedor full stack para uma startup em crescimento. Você trabalhará com tecnologias modernas e terá impacto direto no produto.',
      requisitos: [
        'Experiência com Node.js e React',
        'Conhecimento em bancos de dados',
        'Experiência com APIs REST',
        'Vontade de aprender novas tecnologias'
      ],
      beneficios: [
        'Plano de saúde',
        'Participação nos lucros',
        'Stock options',
        'Ambiente descontraído'
      ],
      salario: 'MZN 6.000 - 8.000',
      localizacao: 'Milange, Mozambique',
      tipo: 'CLT',
      modalidade: 'Presencial'
    },
    'BigTech': {
      empresa: 'BigTech',
      vaga: 'Desenvolvedor React',
      descricao: 'Desenvolvedor React para uma das maiores empresas de tecnologia do Brasil. Trabalhe em projetos de grande escala.',
      requisitos: [
        'Experiência sólida com React',
        'Conhecimento em testes automatizados',
        'Experiência com microfrontends',
        'Inglês intermediário'
      ],
      beneficios: [
        'Plano de saúde premium',
        'Vale refeição e alimentação',
        'Gympass',
        'Plano de carreira estruturado'
      ],
      salario: 'MZN 7.000 - 9.000',
      localizacao: 'Beira, Mozambique',
      tipo: 'CLT',
      modalidade: 'Híbrido'
    }
  }

  const candidaturas = isEmpresa ? candidaturasEmpresa : candidaturasCandidato

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

  const verVaga = (empresa) => {
    setVagaSelecionada(detalhesVagas[empresa])
    setModalVaga(true)
  }

  const verDetalhesCandidatura = (candidatura) => {
    setCandidatoSelecionado(candidatura)
    setModalDetalhes(true)
  }

  const handleCandidaturaClick = (candidatura) => {
    setCandidatoSelecionado(candidatura)
    if (!isEmpresa) {
      // Para candidatos, abrir modal de detalhes automaticamente
      verDetalhesCandidatura(candidatura)
    }
  }

  const cancelarCandidatura = (id) => {
    if (confirm('Tem certeza que deseja cancelar esta candidatura?')) {
      alert('Candidatura cancelada com sucesso! (Funcionalidade mockada)')
    }
  }

  const podeCancelar = (status) => {
    return status === 'pendente' || status === 'aprovada' || status === 'entrevista'
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        {isEmpresa ? 'Candidaturas Recebidas' : 'Minhas Candidaturas'}
      </h1>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
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

      <div className="grid md:grid-cols-3 gap-4">
        {/* Lista de candidaturas */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-bold text-gray-800">
                {isEmpresa ? 'Candidatos' : 'Vagas Candidatadas'}
              </h2>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {candidaturasFiltradas.map((candidatura) => (
                <div
                  key={candidatura.id}
                  onClick={() => handleCandidaturaClick(candidatura)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                    candidatoSelecionado?.id === candidatura.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {isEmpresa ? candidatura.candidato : candidatura.empresa}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidatura.status)}`}>
                      {getStatusText(candidatura.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{candidatura.vaga}</p>
                  {isEmpresa ? (
                    <p className="text-sm text-gray-500">{candidatura.email}</p>
                  ) : (
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>💰 {candidatura.salario}</p>
                      <p>📍 {candidatura.localizacao}</p>
                      <p>📋 {candidatura.tipo}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Candidatura em {candidatura.dataCandidatura}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detalhes - apenas para empresas */}
        {isEmpresa && (
          <div className="bg-white rounded-lg shadow">
            {candidatoSelecionado ? (
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Detalhes do Candidato
                </h3>
                
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
                        onClick={() => alterarStatus(candidatoSelecionado.id, 'entrevista')}
                        className="p-2 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition"
                      >
                        Entrevista
                      </button>
                      <button
                        onClick={() => alterarStatus(candidatoSelecionado.id, 'rejeitada')}
                        className="p-2 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition"
                      >
                        Rejeitar
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
                <span className="text-4xl mb-4 block">📋</span>
                <p>Selecione uma candidatura para ver os detalhes</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal para ver vaga */}
      <Modal
        isOpen={modalVaga}
        onClose={() => setModalVaga(false)}
        title={`Vaga: ${vagaSelecionada?.vaga} - ${vagaSelecionada?.empresa}`}
        size="lg"
      >
        {vagaSelecionada && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Descrição da Vaga</h4>
              <p className="text-gray-600">{vagaSelecionada.descricao}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Requisitos</h4>
                <ul className="space-y-2">
                  {vagaSelecionada.requisitos.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Benefícios</h4>
                <ul className="space-y-2">
                  {vagaSelecionada.beneficios.map((ben, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">🎁</span>
                      <span className="text-gray-600">{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">💰</div>
                <div className="text-sm text-gray-600">Salário</div>
                <div className="font-medium">{vagaSelecionada.salario}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">📍</div>
                <div className="text-sm text-gray-600">Localização</div>
                <div className="font-medium">{vagaSelecionada.localizacao}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">📋</div>
                <div className="text-sm text-gray-600">Tipo</div>
                <div className="font-medium">{vagaSelecionada.tipo}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">🏢</div>
                <div className="text-sm text-gray-600">Modalidade</div>
                <div className="font-medium">{vagaSelecionada.modalidade}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal para detalhes da candidatura */}
      <Modal
        isOpen={modalDetalhes}
        onClose={() => setModalDetalhes(false)}
        title="Detalhes da Candidatura"
        size="md"
      >
        {candidatoSelecionado && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Informações da Candidatura</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidatoSelecionado.status)}`}>
                    {getStatusText(candidatoSelecionado.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data da Candidatura:</span>
                  <span className="font-medium">{candidatoSelecionado.dataCandidatura}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vaga:</span>
                  <span className="font-medium">{candidatoSelecionado.vaga}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Empresa:</span>
                  <span className="font-medium">{candidatoSelecionado.empresa}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Detalhes da Vaga</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salário:</span>
                  <span className="font-medium">{candidatoSelecionado.salario}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Localização:</span>
                  <span className="font-medium">{candidatoSelecionado.localizacao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de Contrato:</span>
                  <span className="font-medium">{candidatoSelecionado.tipo}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button 
                onClick={() => {
                  setModalDetalhes(false)
                  verVaga(candidatoSelecionado.empresa)
                }}
                className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                👁️ Ver Vaga Completa
              </button>
              <button className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                💬 Ver Mensagens
              </button>
              {podeCancelar(candidatoSelecionado.status) && (
                <button 
                  onClick={() => {
                    cancelarCandidatura(candidatoSelecionado.id)
                    setModalDetalhes(false)
                  }}
                  className="w-full p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  ❌ Cancelar Candidatura
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 