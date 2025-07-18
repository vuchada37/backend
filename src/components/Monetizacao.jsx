import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useMonetizacao } from '../context/MonetizacaoContext'

export default function Monetizacao() {
  const { user } = useAuth()
  const { planosCandidato, planos, loading } = useMonetizacao()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Determinar se é candidato ou empresa
  const isEmpresa = user && user.tipo === 'empresa'
  const planosParaMostrar = isEmpresa 
    ? (planos ? Object.values(planos) : [])
    : (planosCandidato ? Object.values(planosCandidato) : [])

  // Métodos de pagamento disponíveis em Moçambique
  const metodosPagamento = [
    {
      id: 'mpesa',
      nome: 'M-Pesa',
      descricao: 'Pagamento móvel',
      icone: '📱',
      popular: true
    },
    {
      id: 'emola',
      nome: 'E-Mola',
      descricao: 'Pagamento móvel',
      icone: '💳',
      popular: true
    },
    {
      id: 'transferencia',
      nome: 'Transferência Bancária',
      descricao: 'Transferência direta',
      icone: '🏦',
      popular: false
    },
    {
      id: 'cartao',
      nome: 'Cartão de Crédito/Débito',
      descricao: 'Visa, Mastercard',
      icone: '💳',
      popular: false
    }
  ]

  // Mapeamento de cores por plano
  const borderColors = {
    gratuito: 'border-green-500',
    basico: 'border-blue-500',
    premium: 'border-purple-500',
    empresarial: 'border-orange-500',
  }

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setShowPaymentModal(true)
  }

  const handlePayment = async () => {
    setPaymentLoading(true)
    setPaymentSuccess(false)
    // Simular processamento
    setTimeout(() => {
      setPaymentLoading(false)
      setPaymentSuccess(true)
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentSuccess(false)
      }, 1800)
    }, 2000)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando planos...</p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isEmpresa ? 'Planos e Preços para Empresas' : 'Planos e Benefícios para Candidatos'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isEmpresa
              ? 'Escolha o plano ideal para sua empresa e comece a contratar os melhores talentos de Moçambique'
              : 'Escolha um plano para se destacar, candidatar-se a mais vagas e acessar benefícios exclusivos.'}
          </p>
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12">
          {planosParaMostrar && planosParaMostrar.length > 0 ? (
            planosParaMostrar.map((plano) => (
              <div key={plano.id} className="relative flex flex-col items-center mb-8">
                {/* Badge, se houver */}
              {plano.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow z-10">
                    Mais Popular
                  </span>
                )}
                {/* Card do Plano */}
                <div
                  className={`w-full bg-white border-2 rounded-xl shadow p-6 pt-10 flex flex-col items-center transition-all duration-300 hover:shadow-xl ${borderColors[plano.id] || 'border-gray-200'} min-h-[380px] sm:min-h-[420px]`}
                  style={{ height: '100%' }}
                >
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">{plano.nome}</h3>
                  <div className="text-3xl font-extrabold text-gray-900 mb-1 text-center">
                    {plano.preco === 0 ? 'Grátis' : `${plano.preco.toLocaleString()} MT`}
                  </div>
                  <div className="text-sm text-gray-500 mb-4 text-center">{isEmpresa ? plano.periodo : 'Mensal'}</div>
                  <ul className="text-sm text-gray-700 space-y-2 mb-6 w-full">
                    {isEmpresa
                      ? plano.recursos && plano.recursos.slice(0, 8).map((recurso, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                            <span>{recurso}</span>
                      </li>
                    ))
                      : plano.recursos && plano.recursos.slice(0, 8).map((recurso, index) => (
                          <li key={index} className="flex items-start text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                            <span>{recurso}</span>
                      </li>
                        ))}
                </ul>
                  {plano.id === 'gratuito' ? (
                    <button
                      className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Plano Ativo
                    </button>
                  ) : (
                <button
                  onClick={() => handleSelectPlan(plano)}
                      className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                      Escolher Plano
                </button>
                  )}
                  {plano.id === 'gratuito' && (
                    <p className="text-xs text-gray-500 text-center mt-1">
                      Sem cartão de crédito necessário
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <p className="text-lg font-medium">Nenhum plano disponível</p>
                <p className="text-sm">Tente novamente mais tarde.</p>
              </div>
            </div>
          )}
        </div>

        {/* Comparação de Planos - Mobile (cards) */}
        <div className="block md:hidden space-y-4 mb-8">
          {planosParaMostrar.map((plano) => (
            <div key={plano.id} className="bg-white rounded-xl shadow p-4">
              <h4 className="font-bold text-lg mb-2">{plano.nome}</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {isEmpresa ? (
                  <>
                    <li>Vagas por mês: {plano.limiteVagas === -1 ? 'Ilimitadas' : plano.limiteVagas}</li>
                    <li>Mensagens por mês: {plano.limiteMensagens === -1 ? 'Ilimitadas' : plano.limiteMensagens}</li>
                    <li>Destaque nas buscas: {plano.destaque ? 'Sim' : 'Não'}</li>
                    <li>Suporte prioritário: {plano.id !== 'gratuito' ? 'Sim' : 'Não'}</li>
                  </>
                ) : (
                  <>
                    <li>Candidaturas simultâneas: {plano.limiteCandidaturas === -1 ? 'Ilimitadas' : plano.limiteCandidaturas}</li>
                    <li>Mensagens por mês: {plano.limiteMensagens === -1 ? 'Ilimitadas' : plano.limiteMensagens}</li>
                    <li>Perfil em destaque: {plano.destaque ? 'Sim' : 'Não'}</li>
                    <li>Notificações prioritárias: {plano.id !== 'gratuito' ? 'Sim' : 'Não'}</li>
                    <li>Suporte 24/7: {plano.id !== 'gratuito' ? 'Sim' : 'Não'}</li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
        {/* Comparação de Planos - Desktop (tabela) */}
        <div className="hidden md:block bg-white rounded-2xl shadow-lg p-8 mb-12 overflow-x-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Comparação Detalhada
            </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Recursos</th>
                  {planosParaMostrar && planosParaMostrar.map((plano) => (
                    <th key={plano.id} className="text-center py-4 px-6 font-semibold text-gray-900">
                      {plano.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isEmpresa ? (
                  <>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Vagas por mês</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.limiteVagas === -1 ? 'Ilimitadas' : plano.limiteVagas}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Mensagens por mês</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.limiteMensagens === -1 ? 'Ilimitadas' : plano.limiteMensagens}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Destaque nas buscas</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.destaque ? '✅' : '❌'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Suporte prioritário</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.id !== 'gratuito' ? '✅' : '❌'}
                        </td>
                      ))}
                    </tr>
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Candidaturas simultâneas</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.limiteCandidaturas === -1 ? 'Ilimitadas' : plano.limiteCandidaturas}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Mensagens por mês</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.limiteMensagens === -1 ? 'Ilimitadas' : plano.limiteMensagens}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Perfil em destaque</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.destaque ? '✅' : '❌'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Notificações prioritárias</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.id !== 'gratuito' ? '✅' : '❌'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-gray-700">Suporte 24/7</td>
                      {planosParaMostrar.map((plano) => (
                        <td key={plano.id} className="text-center py-4 px-6">
                          {plano.id !== 'gratuito' ? '✅' : '❌'}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Métodos de Pagamento */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Métodos de Pagamento
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Aceitamos todos os principais métodos de pagamento de Moçambique
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {metodosPagamento.map((metodo) => (
              <div key={metodo.id} className="flex flex-col items-center justify-between text-center p-3 sm:p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors h-full min-h-[120px] break-words">
                <div className="text-3xl mb-2">{metodo.icone}</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 break-words">{metodo.nome}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-1 break-words">{metodo.descricao}</p>
                {metodo.popular && (
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Popular
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
            <div className="p-4 sm:p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Finalizar Assinatura
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedPlan.nome}</h4>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedPlan.preco === 0 ? 'Grátis' : `${selectedPlan.preco.toLocaleString()} MT`}
                  <span className="text-sm font-normal text-gray-500">/Mensal</span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Método de Pagamento
                </label>
                <div className="space-y-3">
                  {metodosPagamento.map((metodo) => (
                    <label key={metodo.id} className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={metodo.id}
                        checked={paymentMethod === metodo.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                        disabled={paymentLoading || paymentSuccess}
                      />
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{metodo.icone}</span>
                        <div>
                          <div className="font-medium text-gray-900">{metodo.nome}</div>
                          <div className="text-sm text-gray-500">{metodo.descricao}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              {/* Feedback visual de pagamento */}
              {paymentLoading && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-blue-700 font-medium">Processando pagamento...</span>
                </div>
              )}
              {paymentSuccess && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="text-green-700 font-medium">Pagamento realizado com sucesso!</span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  disabled={paymentLoading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePayment}
                  className={`flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${paymentLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={paymentLoading || paymentSuccess}
                >
                  {selectedPlan.preco === 0 ? 'Ativar Grátis' : paymentLoading ? 'Processando...' : 'Pagar Agora'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 