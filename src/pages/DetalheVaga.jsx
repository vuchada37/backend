import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

export default function DetalheVaga() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [modalCandidatura, setModalCandidatura] = useState(false)
  const [candidatura, setCandidatura] = useState({
    telefone: '',
    linkedin: '',
    cv: null,
    disponibilidade: '',
    cartaApresentacao: ''
  })

  // Mock de detalhes da vaga
  const vaga = {
    id: parseInt(id),
    titulo: 'Desenvolvedor Frontend',
    empresa: 'TechMoç',
    localizacao: 'Maputo, Bairro Central',
    categoria: 'tecnologia',
    tipo: 'Efetivo',
    salario: '15.000 - 25.000 MT',
    descricao: 'Estamos procurando um desenvolvedor frontend apaixonado por criar interfaces modernas e responsivas. Você trabalhará com React, TypeScript e CSS moderno em projetos de grande escala.',
    requisitos: [
      'Experiência sólida com React e TypeScript',
      'Conhecimento em CSS moderno (Flexbox, Grid)',
      'Familiaridade com Git e controle de versão',
      'Experiência com testes automatizados (Jest, Testing Library)',
      'Boa comunicação e trabalho em equipe',
      'Inglês intermediário para leitura de documentação'
    ],
    responsabilidades: [
      'Desenvolver interfaces responsivas e acessíveis',
      'Colaborar com designers e backend developers',
      'Participar de code reviews e melhorias de código',
      'Manter e otimizar performance das aplicações',
      'Documentar componentes e processos'
    ],
    beneficios: [
      'Seguro de saúde completo',
      'Subsídio de alimentação',
      'Acesso a ginásio',
      'Horário flexível',
      'Home office híbrido',
      'Progressão de carreira',
      'Participação em eventos e conferências',
      'Acesso a cursos e certificações'
    ],
    dataPublicacao: '2024-01-15',
    experiencia: '2-4 anos',
    modalidade: 'Híbrido',
    prioridade: 'alta',
    candidatos: 12,
    visualizacoes: 45,
    empresaInfo: {
      id: '10',
      nome: 'TechMoç',
      descricao: 'Empresa de tecnologia focada em soluções digitais inovadoras para o mercado moçambicano.',
      funcionarios: '50-100',
      setor: 'Tecnologia',
      website: 'www.techmoc.co.mz',
      fundacao: '2018',
      localizacao: 'Maputo, Moçambique'
    }
  }

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'baixa': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case 'tecnologia': return '💻'
      case 'design': return '🎨'
      case 'marketing': return '📈'
      case 'administrativo': return '📊'
      default: return '💼'
    }
  }

  const enviarCandidatura = () => {
    alert('Candidatura enviada com sucesso! (Funcionalidade mockada)')
    setModalCandidatura(false)
    setCandidatura({ cartaApresentacao: '', salarioPretendido: '', disponibilidade: '' })
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-6">
        <Link to="/vagas" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar às Vagas
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{vaga.titulo}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPrioridadeColor(vaga.prioridade)}`}>
            {vaga.prioridade.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {getCategoriaIcon(vaga.categoria)} {vaga.categoria.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            {vaga.modalidade}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <span className="mr-4">👁️ {vaga.visualizacoes} visualizações</span>
          <span className="mr-4">👥 {vaga.candidatos} candidatos</span>
          <span>📅 Publicada em {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Informações principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descrição */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Descrição da Vaga</h2>
            <p className="text-gray-600 leading-relaxed mb-4">{vaga.descricao}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Responsabilidades</h3>
                <ul className="space-y-1">
                  {vaga.responsabilidades.map((resp, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Requisitos</h3>
                <ul className="space-y-1">
                  {vaga.requisitos.map((req, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Benefícios */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Benefícios</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {vaga.beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <span className="text-green-500 mr-2">🎁</span>
                  {beneficio}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informações da empresa */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Empresa</h2>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-800">{vaga.empresaInfo.nome}</div>
                <div className="text-sm text-gray-500">{vaga.empresaInfo.descricao}</div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Setor:</span>
                  <span className="font-medium">{vaga.empresaInfo.setor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Funcionários:</span>
                  <span className="font-medium">{vaga.empresaInfo.funcionarios}</span>
                </div>
                <div className="flex justify-between">
                  <span>Localização:</span>
                  <span className="font-medium">{vaga.empresaInfo.localizacao}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fundada em:</span>
                  <span className="font-medium">{vaga.empresaInfo.fundacao}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate(`/perfil-empresa/${vaga.empresaInfo.id || '1'}`)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Ver Perfil da Empresa
              </button>
            </div>
          </div>

          {/* Detalhes da vaga */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalhes</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Localização:</span>
                <span className="font-medium">{vaga.localizacao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Salário:</span>
                <span className="font-medium text-green-600">{vaga.salario}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className="font-medium">{vaga.tipo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Experiência:</span>
                <span className="font-medium">{vaga.experiencia}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Modalidade:</span>
                <span className="font-medium">{vaga.modalidade}</span>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ações</h2>
            <div className="space-y-3">
              <button
                onClick={() => setModalCandidatura(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Candidatar-se
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favoritar
              </button>
              <button className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Candidatura */}
      <Modal
        isOpen={modalCandidatura}
        onClose={() => setModalCandidatura(false)}
        title="Candidatar-se à Vaga"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone de Contato *</label>
            <input
              type="text"
              value={candidatura.telefone}
              onChange={e => setCandidatura(prev => ({ ...prev, telefone: e.target.value }))}
              placeholder="Ex: (+258) 84 123 4567"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn (opcional)</label>
            <input
              type="url"
              value={candidatura.linkedin}
              onChange={e => setCandidatura(prev => ({ ...prev, linkedin: e.target.value }))}
              placeholder="https://linkedin.com/in/seu-perfil"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CV (PDF, obrigatório)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setCandidatura(prev => ({ ...prev, cv: e.target.files[0] }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {candidatura.cv && (
              <p className="text-xs text-green-700 mt-1">Arquivo selecionado: {candidatura.cv.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidade *</label>
            <select
              value={candidatura.disponibilidade}
              onChange={e => setCandidatura(prev => ({ ...prev, disponibilidade: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione</option>
              <option value="imediata">Imediata</option>
              <option value="15_dias">15 dias</option>
              <option value="30_dias">30 dias</option>
              <option value="60_dias">60 dias</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Carta de Apresentação *</label>
            <textarea
              value={candidatura.cartaApresentacao}
              onChange={e => setCandidatura(prev => ({ ...prev, cartaApresentacao: e.target.value }))}
              placeholder="Conte-nos por que você seria ideal para esta vaga..."
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={enviarCandidatura}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Enviar Candidatura
            </button>
            <button
              onClick={() => setModalCandidatura(false)}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 