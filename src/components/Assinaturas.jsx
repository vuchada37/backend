import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Assinaturas() {
  const { user } = useAuth()
  const [assinatura, setAssinatura] = useState(null)
  const [historicoPagamentos, setHistoricoPagamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Mock de dados da assinatura atual
  const mockAssinatura = {
    plano: 'basico',
    nome: 'Básico',
    preco: 2500,
    moeda: 'MT',
    periodo: 'Mensal',
    dataInicio: '2024-01-01',
    proximoPagamento: '2024-02-01',
    status: 'ativa',
    limiteVagas: 10,
    vagasUsadas: 3,
    limiteMensagens: -1,
    mensagensUsadas: 45
  }

  // Mock de histórico de pagamentos
  const mockHistorico = [
    {
      id: 1,
      data: '2024-01-01',
      valor: 2500,
      moeda: 'MT',
      metodo: 'M-Pesa',
      status: 'pago',
      plano: 'Básico'
    },
    {
      id: 2,
      data: '2023-12-01',
      valor: 2500,
      moeda: 'MT',
      metodo: 'E-Mola',
      status: 'pago',
      plano: 'Básico'
    },
    {
      id: 3,
      data: '2023-11-01',
      valor: 2500,
      moeda: 'MT',
      metodo: 'M-Pesa',
      status: 'pago',
      plano: 'Básico'
    }
  ]

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setAssinatura(mockAssinatura)
      setHistoricoPagamentos(mockHistorico)
      setLoading(false)
    }, 1000)
  }, [])

  const calcularProgressoVagas = () => {
    if (assinatura.limiteVagas === -1) return 100
    return (assinatura.vagasUsadas / assinatura.limiteVagas) * 100
  }

  const calcularProgressoMensagens = () => {
    if (assinatura.limiteMensagens === -1) return 100
    return (assinatura.mensagensUsadas / assinatura.limiteMensagens) * 100
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800'
      case 'expirada': return 'bg-red-100 text-red-800'
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleUpgrade = () => {
    setShowUpgradeModal(true)
  }

  const handleCancelar = () => {
    if (confirm('Tem certeza que deseja cancelar sua assinatura?')) {
      alert('Assinatura cancelada com sucesso!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando assinatura...</p>
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
            Minha Assinatura
          </h1>
          <p className="text-gray-600">
            Gerencie seu plano e acompanhe o uso dos recursos
          </p>
        </div>

        {/* Status da Assinatura */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mr-4">{assinatura.nome}</h2>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(assinatura.status)}`}>
                  {assinatura.status === 'ativa' ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Valor Mensal</p>
                  <p className="text-lg font-semibold text-gray-900">{formatarMoeda(assinatura.preco)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Próximo Pagamento</p>
                  <p className="text-lg font-semibold text-gray-900">{formatarData(assinatura.proximoPagamento)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Início da Assinatura</p>
                  <p className="text-lg font-semibold text-gray-900">{formatarData(assinatura.dataInicio)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleUpgrade}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Fazer Upgrade
              </button>
              <button
                onClick={handleCancelar}
                className="px-6 py-3 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Cancelar Assinatura
              </button>
            </div>
          </div>
        </div>

        {/* Uso dos Recursos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Vagas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uso de Vagas</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Vagas utilizadas</span>
                <span className="text-sm font-semibold text-gray-900">
                  {assinatura.vagasUsadas} / {assinatura.limiteVagas === -1 ? '∞' : assinatura.limiteVagas}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calcularProgressoVagas()}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {assinatura.limiteVagas === -1 
                ? 'Vagas ilimitadas' 
                : `${assinatura.limiteVagas - assinatura.vagasUsadas} vagas restantes`
              }
            </p>
          </div>

          {/* Mensagens */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Uso de Mensagens</h3>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Mensagens enviadas</span>
                <span className="text-sm font-semibold text-gray-900">
                  {assinatura.mensagensUsadas} / {assinatura.limiteMensagens === -1 ? '∞' : assinatura.limiteMensagens}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calcularProgressoMensagens()}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {assinatura.limiteMensagens === -1 
                ? 'Mensagens ilimitadas' 
                : `${assinatura.limiteMensagens - assinatura.mensagensUsadas} mensagens restantes`
              }
            </p>
          </div>
        </div>

        {/* Histórico de Pagamentos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Histórico de Pagamentos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plano
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historicoPagamentos.map((pagamento) => (
                  <tr key={pagamento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatarData(pagamento.data)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pagamento.plano}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatarMoeda(pagamento.valor)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pagamento.metodo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        pagamento.status === 'pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {pagamento.status === 'pago' ? 'Pago' : 'Pendente'}
                      </span>
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
              Benefícios do Plano {assinatura.nome}
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                {assinatura.limiteVagas === -1 ? 'Vagas ilimitadas' : `Até ${assinatura.limiteVagas} vagas ativas`}
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Acesso completo a candidatos
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                {assinatura.limiteMensagens === -1 ? 'Mensagens ilimitadas' : `${assinatura.limiteMensagens} mensagens por mês`}
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Suporte prioritário
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Relatórios avançados
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Próximos Passos
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Fazer Upgrade</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Aproveite mais recursos e pague menos comissões
                </p>
                <button
                  onClick={handleUpgrade}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Planos
                </button>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Publicar Vagas</h4>
                <p className="text-sm text-green-700 mb-3">
                  Use suas vagas disponíveis para encontrar talentos
                </p>
                <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Publicar Vaga
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Upgrade */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Fazer Upgrade
              </h3>
              <p className="text-gray-600 mb-6">
                Escolha um plano superior para obter mais recursos e pagar menos comissões.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-semibold text-purple-900 mb-2">Premium - 4.500 MT/mês</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Vagas ilimitadas</li>
                    <li>• Comissão: 3% (vs 5% atual)</li>
                    <li>• Suporte 24/7</li>
                    <li>• Relatórios avançados</li>
                  </ul>
                </div>
                <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                  <h4 className="font-semibold text-green-900 mb-2">Empresarial - 8.500 MT/mês</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Tudo do Premium</li>
                    <li>• Comissão: 2% (vs 5% atual)</li>
                    <li>• Múltiplos usuários</li>
                    <li>• API personalizada</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert('Redirecionando para página de planos...')
                    setShowUpgradeModal(false)
                  }}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Ver Todos os Planos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 