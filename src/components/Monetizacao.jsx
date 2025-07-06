import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Monetizacao() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('mpesa')

  // Planos de assinatura em Meticais (MT)
  const planos = [
    {
      id: 'gratuito',
      nome: 'Gratuito',
      preco: 0,
      moeda: 'MT',
      periodo: 'Sempre',
      recursos: [
        'Até 3 vagas ativas',
        'Acesso básico a candidatos',
        'Mensagens limitadas',
        'Suporte por email'
      ],
      limiteVagas: 3,
      limiteMensagens: 50,
      cor: 'gray'
    },
    {
      id: 'basico',
      nome: 'Básico',
      preco: 2500,
      moeda: 'MT',
      periodo: 'Mensal',
      recursos: [
        'Até 10 vagas ativas',
        'Acesso completo a candidatos',
        'Mensagens ilimitadas',
        'Suporte prioritário',
        'Relatórios básicos',
        'Comissão: 5% por contratação'
      ],
      limiteVagas: 10,
      limiteMensagens: -1, // Ilimitado
      cor: 'blue',
      popular: false
    },
    {
      id: 'premium',
      nome: 'Premium',
      preco: 4500,
      moeda: 'MT',
      periodo: 'Mensal',
      recursos: [
        'Vagas ilimitadas',
        'Acesso completo a candidatos',
        'Mensagens ilimitadas',
        'Suporte 24/7',
        'Relatórios avançados',
        'Comissão: 3% por contratação',
        'Destaque nas buscas',
        'Análise de candidatos'
      ],
      limiteVagas: -1, // Ilimitado
      limiteMensagens: -1,
      cor: 'purple',
      popular: true
    },
    {
      id: 'empresarial',
      nome: 'Empresarial',
      preco: 8500,
      moeda: 'MT',
      periodo: 'Mensal',
      recursos: [
        'Tudo do Premium',
        'Múltiplos usuários',
        'API personalizada',
        'Comissão: 2% por contratação',
        'Consultoria especializada',
        'Integração com sistemas'
      ],
      limiteVagas: -1,
      limiteMensagens: -1,
      cor: 'green',
      popular: false
    }
  ]

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

  // Sistema de comissões por contratação
  const comissoes = {
    gratuito: 0,
    basico: 0.05, // 5%
    premium: 0.03, // 3%
    empresarial: 0.02 // 2%
  }

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setShowPaymentModal(true)
  }

  const handlePayment = async () => {
    // Simular processo de pagamento
    console.log('Processando pagamento:', {
      plano: selectedPlan,
      metodo: paymentMethod,
      usuario: user
    })
    
    // Aqui seria integrado com gateway de pagamento real
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
            Planos e Preços
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o plano ideal para sua empresa e comece a contratar os melhores talentos de Moçambique
          </p>
        </div>

        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {planos.map((plano) => (
            <div
              key={plano.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plano.popular ? 'border-purple-500 scale-105' : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plano.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plano.nome}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {plano.preco === 0 ? 'Grátis' : `${plano.preco.toLocaleString()} ${plano.moeda}`}
                  </div>
                  <p className="text-gray-500">{plano.periodo}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plano.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {recurso}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plano)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
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

        {/* Sistema de Comissões */}
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

        {/* Métodos de Pagamento */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Métodos de Pagamento
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Aceitamos todos os principais métodos de pagamento de Moçambique
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metodosPagamento.map((metodo) => (
              <div key={metodo.id} className="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                <div className="text-4xl mb-3">{metodo.icone}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{metodo.nome}</h3>
                <p className="text-gray-600 text-sm">{metodo.descricao}</p>
                {metodo.popular && (
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Finalizar Assinatura
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">{selectedPlan.nome}</h4>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedPlan.preco === 0 ? 'Grátis' : `${selectedPlan.preco.toLocaleString()} ${selectedPlan.moeda}`}
                  <span className="text-sm font-normal text-gray-500">/{selectedPlan.periodo}</span>
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

              <div className="flex gap-3">
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