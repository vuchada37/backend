import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Vagas() {
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroLocalizacao, setFiltroLocalizacao] = useState('todas')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [busca, setBusca] = useState('')

  // Vagas mockadas melhoradas
  const vagas = [
    { 
      id: 1, 
      titulo: 'Desenvolvedor Frontend', 
      empresa: 'TechMoç',
      localizacao: 'Maputo',
      categoria: 'tecnologia',
      tipo: 'Efetivo',
      salario: '15.000 - 25.000 MT',
      descricao: 'Desenvolva interfaces modernas e responsivas para nossos clientes.',
      beneficios: ['Seguro de saúde', 'Subsídio de alimentação', 'Acesso a ginásio'],
      dataPublicacao: '2024-01-15',
      experiencia: '2-4 anos',
      modalidade: 'Híbrido',
      prioridade: 'alta'
    },
    { 
      id: 2, 
      titulo: 'Designer Gráfico', 
      empresa: 'Criativa',
      localizacao: 'Beira',
      categoria: 'design',
      tipo: 'Prestador',
      salario: '8.000 - 12.000 MT',
      descricao: 'Crie materiais visuais impactantes para campanhas digitais.',
      beneficios: ['Remoto', 'Flexibilidade'],
      dataPublicacao: '2024-01-14',
      experiencia: '1-3 anos',
      modalidade: 'Remoto',
      prioridade: 'media'
    },
    { 
      id: 3, 
      titulo: 'Analista de Marketing', 
      empresa: 'DigitalMoç',
      localizacao: 'Nampula',
      categoria: 'marketing',
      tipo: 'Efetivo',
      salario: '10.000 - 18.000 MT',
      descricao: 'Gerencie campanhas de marketing digital e redes sociais.',
      beneficios: ['Seguro de saúde', 'Subsídio de alimentação'],
      dataPublicacao: '2024-01-13',
      experiencia: '2-5 anos',
      modalidade: 'Presencial',
      prioridade: 'baixa'
    },
    { 
      id: 4, 
      titulo: 'Contador', 
      empresa: 'ContaFácil',
      localizacao: 'Maputo',
      categoria: 'administrativo',
      tipo: 'Efetivo',
      salario: '12.000 - 20.000 MT',
      descricao: 'Responsável pela contabilidade e relatórios financeiros.',
      beneficios: ['Seguro de saúde', 'Subsídio de alimentação'],
      dataPublicacao: '2024-01-12',
      experiencia: '3-6 anos',
      modalidade: 'Presencial',
      prioridade: 'media'
    }
  ]

  const categorias = [
    { id: 'todas', nome: 'Todas as Categorias' },
    { id: 'tecnologia', nome: 'Tecnologia' },
    { id: 'design', nome: 'Design' },
    { id: 'marketing', nome: 'Marketing' },
    { id: 'administrativo', nome: 'Administrativo' }
  ]

  const localizacoes = [
    { id: 'todas', nome: 'Todas as Localizações' },
    { id: 'Maputo', nome: 'Maputo' },
    { id: 'Beira', nome: 'Beira' },
    { id: 'Nampula', nome: 'Nampula' }
  ]

  const tipos = [
    { id: 'todos', nome: 'Todos os Tipos' },
    { id: 'Efetivo', nome: 'Efetivo' },
    { id: 'Prestador', nome: 'Prestador' },
    { id: 'Freelancer', nome: 'Freelancer' }
  ]

  const vagasFiltradas = vagas.filter(vaga => {
    const matchCategoria = filtroCategoria === 'todas' || vaga.categoria === filtroCategoria
    const matchLocalizacao = filtroLocalizacao === 'todas' || vaga.localizacao === filtroLocalizacao
    const matchTipo = filtroTipo === 'todos' || vaga.tipo === filtroTipo
    const matchBusca = vaga.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                      vaga.empresa.toLowerCase().includes(busca.toLowerCase())
    
    return matchCategoria && matchLocalizacao && matchTipo && matchBusca
  })

  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case 'tecnologia': return '💻'
      case 'design': return '🎨'
      case 'marketing': return '📈'
      case 'administrativo': return '📊'
      default: return '💼'
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

  const getModalidadeColor = (modalidade) => {
    switch (modalidade) {
      case 'Remoto': return 'bg-blue-100 text-blue-800'
      case 'Híbrido': return 'bg-purple-100 text-purple-800'
      case 'Presencial': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Vagas Disponíveis</h1>
        <p className="text-gray-600">Encontre a oportunidade perfeita para sua carreira</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por título, empresa ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
            <select
              value={filtroLocalizacao}
              onChange={(e) => setFiltroLocalizacao(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {localizacoes.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.nome}</option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tipos.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {vagasFiltradas.length} vaga(s) encontrada(s)
        </div>
      </div>

      {/* Lista de Vagas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vagasFiltradas.map(vaga => (
          <div key={vaga.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="p-6">
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getCategoriaIcon(vaga.categoria)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{vaga.titulo}</h3>
                    <p className="text-sm text-gray-500">{vaga.empresa}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(vaga.prioridade)}`}>
                    {vaga.prioridade.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModalidadeColor(vaga.modalidade)}`}>
                    {vaga.modalidade}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-gray-600 text-sm mb-4">{vaga.descricao}</p>

              {/* Informações */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vaga.localizacao}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {vaga.salario}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  {vaga.tipo} • {vaga.experiencia}
                </div>
              </div>

              {/* Benefícios */}
              {vaga.beneficios.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Benefícios:</p>
                  <div className="flex flex-wrap gap-1">
                    {vaga.beneficios.slice(0, 2).map((beneficio, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {beneficio}
                      </span>
                    ))}
                    {vaga.beneficios.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{vaga.beneficios.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex space-x-2">
                <Link
                  to={`/vaga/${vaga.id}`}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition text-center"
                >
                  Ver Detalhes
                </Link>
                {/* Botão de enviar mensagem removido */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {vagasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhuma vaga encontrada</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou volte mais tarde</p>
        </div>
      )}
    </div>
  )
} 