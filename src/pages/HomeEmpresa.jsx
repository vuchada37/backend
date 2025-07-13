import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function HomeEmpresa() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.tipo !== 'empresa') {
      navigate('/')
    }
  }, [user, navigate])

  // Estatísticas mockadas
  const stats = [
    { label: 'Vagas publicadas', value: 5, icon: '📋', color: 'text-blue-600' },
    { label: 'Candidaturas recebidas', value: 12, icon: '👥', color: 'text-green-600' },
    { label: 'Vagas ativas', value: 3, icon: '✅', color: 'text-orange-600' },
    { label: 'Mensagens', value: 2, icon: '📬', color: 'text-purple-600' },
    { label: 'Vagas expiradas', value: 1, icon: '⏰', color: 'text-red-600' },
  ]

  // Mock de alertas/notificações
  const alertas = [
    { tipo: 'info', texto: 'Você tem 2 vagas expirando em 3 dias.', icon: '⚠️' },
    { tipo: 'success', texto: 'Nova candidatura recebida para "Desenvolvedor Frontend".', icon: '🎉' },
  ]

  // Mock de dados da empresa
  const logoEmpresa = '/nevu.png'
  const nomeFantasia = user?.nome || 'Empresa Exemplo'
  const nuit = '123456789'
  const emailEmpresa = user?.email || 'empresa@email.com'

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 pb-24 md:pb-6">
      {/* Header com logo e dados da empresa */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-6">
          <div className="flex-shrink-0">
            <img src={logoEmpresa} alt="Logo da empresa" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-contain border-2 border-blue-200 shadow-sm" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 mb-2">{nomeFantasia}</h1>
            <div className="space-y-1 text-sm lg:text-base text-gray-600">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-gray-400">🏢</span>
                <span>NUIT: {nuit}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-gray-400">📧</span>
                <span>{emailEmpresa}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas e notificações */}
      <div className="mb-6 space-y-3">
        {alertas.map((alerta, i) => (
          <div key={i} className={`rounded-xl px-4 py-3 text-sm font-medium shadow-sm border-l-4 ${
            alerta.tipo === 'info' ? 'bg-blue-50 text-blue-700 border-blue-400' :
            alerta.tipo === 'success' ? 'bg-green-50 text-green-700 border-green-400' :
            'bg-gray-50 text-gray-700 border-gray-400'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-lg">{alerta.icon}</span>
              <span>{alerta.texto}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">📊 Estatísticas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, i) => (
                          <div key={i} className="bg-white rounded-xl shadow-sm border p-3 sm:p-4 lg:p-6 flex flex-col items-center text-center">
                              <div className="text-2xl sm:text-3xl lg:text-4xl mb-1">{stat.icon}</div>
                <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>



      {/* Seção de Dicas */}
      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <span className="text-2xl lg:text-3xl">💡</span>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700">Dicas para Empresas</h2>
        </div>
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-lg lg:text-xl">✓</span>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Publique vagas detalhadas para atrair os melhores candidatos.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-lg lg:text-xl">✓</span>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Responda rapidamente às candidaturas para não perder talentos.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-lg lg:text-xl">✓</span>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Mantenha suas vagas atualizadas e remova as expiradas.</p>
          </div>
        </div>
      </div>

      {/* Seção de Atividade Recente (Mobile-friendly) */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border p-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <span className="text-2xl lg:text-3xl">🕒</span>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Atividade Recente</h2>
        </div>
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-center gap-3 p-3 lg:p-4 bg-blue-50 rounded-lg">
            <span className="text-blue-600 text-lg lg:text-xl">👤</span>
            <div className="flex-1">
              <p className="text-sm lg:text-base font-medium text-gray-800">Nova candidatura recebida</p>
              <p className="text-xs lg:text-sm text-gray-600">Há 2 horas</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 lg:p-4 bg-green-50 rounded-lg">
            <span className="text-green-600 text-lg lg:text-xl">📢</span>
            <div className="flex-1">
              <p className="text-sm lg:text-base font-medium text-gray-800">Vaga "Designer UX/UI" publicada</p>
              <p className="text-xs lg:text-sm text-gray-600">Ontem</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 lg:p-4 bg-yellow-50 rounded-lg">
            <span className="text-yellow-600 text-lg lg:text-xl">⚠️</span>
            <div className="flex-1">
              <p className="text-sm lg:text-base font-medium text-gray-800">2 vagas expirando em breve</p>
              <p className="text-xs lg:text-sm text-gray-600">Há 1 dia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 