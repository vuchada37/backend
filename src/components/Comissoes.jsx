import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Comissoes() {
  const { user } = useAuth()
  const [comissoes, setComissoes] = useState([])
  const [estatisticas, setEstatisticas] = useState({
    totalGanho: 0,
    totalContratacoes: 0,
    mediaSalario: 0,
    comissaoMedia: 0
  })
  const [periodo, setPeriodo] = useState('mes')
  const [loading, setLoading] = useState(true)

  // Mock de dados de comissões
  const mockComissoes = [
    {
      id: 1,
      candidato: 'João Silva',
      empresa: 'TechCorp',
      vaga: 'Desenvolvedor Frontend',
      salario: 45000,
      comissao: 2250,
      dataContratacao: '2024-01-15',
      status: 'pago',
      metodoPagamento: 'M-Pesa'
    },
    {
      id: 2,
      candidato: 'Maria Santos',
      empresa: 'DesignStudio',
      vaga: 'Designer UX/UI',
      salario: 38000,
      comissao: 1900,
      dataContratacao: '2024-01-10',
      status: 'pendente',
      metodoPagamento: 'E-Mola'
    },
    {
      id: 3,
      candidato: 'Pedro Costa',
      empresa: 'DataTech',
      vaga: 'Desenvolvedor Backend',
      salario: 52000,
      comissao: 2600,
      dataContratacao: '2024-01-05',
      status: 'pago',
      metodoPagamento: 'Transferência'
    },
    {
      id: 4,
      candidato: 'Ana Mendes',
      empresa: 'InnovationLab',
      vaga: 'Product Manager',
      salario: 65000,
      comissao: 3250,
      dataContratacao: '2024-01-20',
      status: 'processando',
      metodoPagamento: 'M-Pesa'
    }
  ]

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setComissoes(mockComissoes)
      calcularEstatisticas(mockComissoes)
      setLoading(false)
    }, 1000)
  }, [])

  const calcularEstatisticas = (dados) => {
    const totalGanho = dados.reduce((acc, comissao) => acc + comissao.comissao, 0)
    const totalContratacoes = dados.length
    const mediaSalario = dados.reduce((acc, comissao) => acc + comissao.salario, 0) / totalContratacoes
    const comissaoMedia = totalGanho / totalContratacoes

    setEstatisticas({
      totalGanho,
      totalContratacoes,
      mediaSalario,
      comissaoMedia
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800'
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      case 'processando': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pago': return 'Pago'
      case 'pendente': return 'Pendente'
      case 'processando': return 'Processando'
      default: return 'Desconhecido'
    }
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-MZ', {
      style: 'currency',
      currency: 'MZN'
    }).format(valor)
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-MZ')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando comissões...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Comissões e Ganhos
          </h1>
          <p className="text-gray-600">
            Acompanhe suas comissões por contratações bem-sucedidas
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Ganho</p>
                <p className="text-2xl font-bold text-gray-900">{formatarMoeda(estatisticas.totalGanho)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Contratações</p>
                <p className="text-2xl font-bold text-gray-900">{estatisticas.totalContratacoes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Média Salário</p>
                <p className="text-2xl font-bold text-gray-900">{formatarMoeda(estatisticas.mediaSalario)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Comissão Média</p>
                <p className="text-2xl font-bold text-gray-900">{formatarMoeda(estatisticas.comissaoMedia)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
              Histórico de Comissões
            </h2>
            <div className="flex items-center space-x-4">
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mes">Último Mês</option>
                <option value="trimestre">Último Trimestre</option>
                <option value="ano">Último Ano</option>
                <option value="todos">Todos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Comissões */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vaga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comissão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pagamento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comissoes.map((comissao) => (
                  <tr key={comissao.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {comissao.candidato.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {comissao.candidato}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comissao.empresa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comissao.vaga}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarMoeda(comissao.salario)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {formatarMoeda(comissao.comissao)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarData(comissao.dataContratacao)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(comissao.status)}`}>
                        {getStatusText(comissao.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comissao.metodoPagamento}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Como Funciona
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Ganhe comissões por cada contratação bem-sucedida
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Comissões variam de 2% a 5% dependendo do seu plano
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Pagamentos processados automaticamente via M-Pesa ou E-Mola
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Relatórios detalhados de todas as suas comissões
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Próximos Pagamentos
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Maria Santos</p>
                  <p className="text-xs text-gray-500">Designer UX/UI - DesignStudio</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatarMoeda(1900)}</p>
                  <p className="text-xs text-gray-500">Pendente</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Ana Mendes</p>
                  <p className="text-xs text-gray-500">Product Manager - InnovationLab</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatarMoeda(3250)}</p>
                  <p className="text-xs text-gray-500">Processando</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 