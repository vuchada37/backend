import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useMonetizacao } from '../context/MonetizacaoContext'

export default function Monetizacao() {
  const { user } = useAuth()
  const { planosCandidato, planos } = useMonetizacao()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')

  // Determinar se é candidato ou empresa
  const isEmpresa = user && user.tipo === 'empresa'
  const planosParaMostrar = isEmpresa ? Object.values(planos) : Object.values(planosCandidato)

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

  // Sistema de comissões por contratação (apenas para empresas)
  const comissoes = isEmpresa ? {
    gratuito: 0,
    basico: 0.05, // 5%
    premium: 0.03, // 3%
    empresarial: 0.02 // 2%
  } : null

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setShowPaymentModal(true)
  }

  const handlePayment = async () => {
    // Simular processo de pagamento
    alert('Pagamento processado com sucesso!')
    setShowPaymentModal(false)
  }

  const calcularComissao = (salario) => {
    if (!user?.plano || user.plano === 'gratuito') return 0
    return salario * comissoes[user.plano]
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
          {planosParaMostrar.map((plano) => (
            <div
              key={plano.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plano.popular ? 'border-purple-500 scale-105' : 'border-gray-200 hover:border-blue-300'
              } flex flex-col overflow-hidden min-h-[320px] sm:min-h-[380px] sm:max-h-[480px]`}
              style={{height: '100%'}}
            >
              {plano.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}
              <div className="p-4 sm:p-5 flex-1 flex flex-col overflow-y-auto">
                <div className="text-center mb-3 sm:mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plano.nome}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {plano.preco === 0 ? 'Grátis' : `${plano.preco.toLocaleString()} MT`}
                  </div>
                  <p className="text-gray-500 text-sm">{isEmpresa ? plano.periodo : 'Mensal'}</p>
                </div>
                <ul className="space-y-2 mb-3 sm:mb-4 text-sm flex-1 overflow-y-auto">
                  {isEmpresa ? (
                    plano.recursos.map((recurso, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {recurso}
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {plano.limiteCandidaturas === -1 ? 'Candidaturas ilimitadas' : `Até ${plano.limiteCandidaturas} candidaturas simultâneas`}
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {plano.limiteMensagens === -1 ? 'Mensagens ilimitadas' : `Até ${plano.limiteMensagens} mensagens por mês`}
                      </li>
                      <li className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {plano.destaque ? 'Perfil em destaque nas buscas' : 'Perfil padrão'}
                      </li>
                    </>
                  )}
                </ul>
                <button
                  onClick={() => handleSelectPlan(plano)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors mt-auto ${
                    plano.id === 'gratuito'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : plano.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {plano.id === 'gratuito' ? 'Começar Grátis' : 'Escolher Plano'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sistema de Comissões - apenas para empresas */}
        {isEmpresa && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Sistema de Comissões
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Ganhe dinheiro com cada contratação bem-sucedida. Quanto maior o plano, menor a comissão que cobramos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Object.entries(comissoes).map(([plano, comissao]) => (
                <div key={plano} className="text-center p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                    {plano === 'gratuito' ? 'Gratuito' : plano}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {comissao === 0 ? '0%' : `${(comissao * 100)}%`}
                  </div>
                  <p className="text-gray-600 text-sm">
                    {comissao === 0 
                      ? 'Sem comissão' 
                      : `Comissão por contratação`
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {selectedPlan.preco === 0 ? 'Ativar Grátis' : 'Pagar Agora'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 