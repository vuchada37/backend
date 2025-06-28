import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Chamados() {
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [busca, setBusca] = useState('')

  // Mock de chamados
  const chamados = [
    {
      id: 1,
      titulo: 'Manutenção de Computador',
      descricao: 'Computador não liga e faz barulho estranho',
      categoria: 'tecnologia',
      status: 'aberto',
      localizacao: 'Maputo',
      orcamento: '500-1000 MT',
      dataCriacao: '2024-01-15',
      cliente: 'João Silva',
      telefone: '(11) 99999-9999',
      prioridade: 'alta'
    },
    {
      id: 2,
      titulo: 'Limpeza de Casa',
      descricao: 'Preciso de limpeza completa de uma casa de 3 quartos',
      categoria: 'domestico',
      status: 'em_andamento',
      localizacao: 'Beira',
      orcamento: '300-500 MT',
      dataCriacao: '2024-01-14',
      cliente: 'Maria Santos',
      telefone: '(11) 88888-8888',
      prioridade: 'media'
    },
    {
      id: 3,
      titulo: 'Design de Logo',
      descricao: 'Criar logo para minha empresa de tecnologia',
      categoria: 'design',
      status: 'concluido',
      localizacao: 'Nampula',
      orcamento: '800-1200 MT',
      dataCriacao: '2024-01-13',
      cliente: 'Pedro Costa',
      telefone: '(11) 77777-7777',
      prioridade: 'baixa'
    },
    {
      id: 4,
      titulo: 'Aulas de Inglês',
      descricao: 'Aulas particulares de inglês para iniciantes',
      categoria: 'educacao',
      status: 'aberto',
      localizacao: 'Maputo',
      orcamento: '200-400 MT/hora',
      dataCriacao: '2024-01-12',
      cliente: 'Ana Oliveira',
      telefone: '(11) 66666-6666',
      prioridade: 'media'
    },
    {
      id: 5,
      titulo: 'Reparo de Ar Condicionado',
      descricao: 'Ar condicionado não está gelando',
      categoria: 'manutencao',
      status: 'aberto',
      localizacao: 'Beira',
      orcamento: '400-800 MT',
      dataCriacao: '2024-01-11',
      cliente: 'Carlos Lima',
      telefone: '(11) 55555-5555',
      prioridade: 'alta'
    },
    {
      id: 6,
      titulo: 'Fotografia de Evento',
      descricao: 'Fotógrafo para casamento no próximo mês',
      categoria: 'fotografia',
      status: 'em_andamento',
      localizacao: 'Maputo',
      orcamento: '1500-2500 MT',
      dataCriacao: '2024-01-10',
      cliente: 'Lucia Ferreira',
      telefone: '(11) 44444-4444',
      prioridade: 'alta'
    }
  ]

  const categorias = [
    { id: 'todas', nome: 'Todas as Categorias' },
    { id: 'tecnologia', nome: 'Tecnologia' },
    { id: 'domestico', nome: 'Doméstico' },
    { id: 'design', nome: 'Design' },
    { id: 'educacao', nome: 'Educação' },
    { id: 'manutencao', nome: 'Manutenção' },
    { id: 'fotografia', nome: 'Fotografia' }
  ]

  const statusOptions = [
    { id: 'todos', nome: 'Todos os Status' },
    { id: 'aberto', nome: 'Aberto' },
    { id: 'em_andamento', nome: 'Em Andamento' },
    { id: 'concluido', nome: 'Concluído' }
  ]

  const chamadosFiltrados = chamados.filter(chamado => {
    const matchCategoria = filtroCategoria === 'todas' || chamado.categoria === filtroCategoria
    const matchStatus = filtroStatus === 'todos' || chamado.status === filtroStatus
    const matchBusca = chamado.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                      chamado.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                      chamado.localizacao.toLowerCase().includes(busca.toLowerCase())
    
    return matchCategoria && matchStatus && matchBusca
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'aberto': return 'bg-green-100 text-green-800'
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800'
      case 'concluido': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'aberto': return 'Aberto'
      case 'em_andamento': return 'Em Andamento'
      case 'concluido': return 'Concluído'
      default: return status
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
      case 'domestico': return '🏠'
      case 'design': return '🎨'
      case 'educacao': return '📚'
      case 'manutencao': return '🔧'
      case 'fotografia': return '📷'
      default: return '📋'
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Chamados de Serviço</h1>
        <p className="text-gray-600">Encontre serviços ou ofereça seus talentos</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por título, descrição ou localização..."
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {chamadosFiltrados.length} chamado(s) encontrado(s)
        </div>
      </div>

      {/* Botão Novo Chamado */}
      <div className="mb-6">
        <Link
          to="/novo-chamado"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Chamado
        </Link>
      </div>

      {/* Lista de Chamados */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chamadosFiltrados.map(chamado => (
          <div key={chamado.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="p-6">
              {/* Header do Card */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getCategoriaIcon(chamado.categoria)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{chamado.titulo}</h3>
                    <p className="text-sm text-gray-500">{chamado.cliente}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(chamado.status)}`}>
                    {getStatusText(chamado.status)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(chamado.prioridade)}`}>
                    {chamado.prioridade.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{chamado.descricao}</p>

              {/* Informações */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {chamado.localizacao}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  {chamado.orcamento}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(chamado.dataCriacao).toLocaleDateString('pt-BR')}
                </div>
              </div>

              {/* Botões */}
              <div className="flex space-x-2">
                <Link
                  to={`/chamado/${chamado.id}`}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition text-center"
                >
                  Ver Detalhes
                </Link>
                <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {chamadosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum chamado encontrado</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou criar um novo chamado</p>
        </div>
      )}
    </div>
  )
} 