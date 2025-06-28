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
    { label: 'Vagas publicadas', value: 5 },
    { label: 'Candidaturas recebidas', value: 12 },
    { label: 'Vagas ativas', value: 3 },
    { label: 'Mensagens', value: 2 },
    { label: 'Vagas expiradas', value: 1 },
  ]

  // Mock de alertas/notificações
  const alertas = [
    { tipo: 'info', texto: 'Você tem 2 vagas expirando em 3 dias.' },
    { tipo: 'success', texto: 'Nova candidatura recebida para "Desenvolvedor Frontend".' },
  ]

  // Mock de dados da empresa
  const logoEmpresa = '/nevu.png'
  const nomeFantasia = user?.nome || 'Empresa Exemplo'
  const cnpj = '12.345.678/0001-99'
  const emailEmpresa = user?.email || 'empresa@email.com'

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Personalização: logo e dados da empresa */}
      <div className="flex items-center gap-4 mb-8">
        <img src={logoEmpresa} alt="Logo da empresa" className="w-16 h-16 rounded-full object-contain border-2 border-blue-200" />
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-1">{nomeFantasia}</h1>
          <div className="text-gray-600 text-sm">CNPJ: {cnpj}</div>
          <div className="text-gray-600 text-sm">E-mail: {emailEmpresa}</div>
        </div>
      </div>

      {/* Alertas e notificações */}
      <div className="mb-8 space-y-2">
        {alertas.map((alerta, i) => (
          <div key={i} className={`rounded px-4 py-2 text-sm font-medium shadow ${
            alerta.tipo === 'info' ? 'bg-blue-50 text-blue-700' :
            alerta.tipo === 'success' ? 'bg-green-50 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {alerta.texto}
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="grid md:grid-cols-5 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-700 text-center font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Cards de atalhos */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <button onClick={() => navigate('/empresa')} className="flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-r from-blue-600 to-green-400 text-white font-bold rounded-lg shadow hover:scale-105 hover:shadow-xl transition text-lg">
          <span className="text-3xl mb-2">📢</span>
          Publicar nova vaga
        </button>
        <button onClick={() => navigate('/vagas-publicadas')} className="flex flex-col items-center justify-center px-6 py-8 bg-blue-100 text-blue-700 font-bold rounded-lg shadow hover:bg-blue-200 transition text-lg">
          <span className="text-3xl mb-2">📄</span>
          Ver vagas publicadas
        </button>
        <button onClick={() => navigate('/candidaturas')} className="flex flex-col items-center justify-center px-6 py-8 bg-green-100 text-green-700 font-bold rounded-lg shadow hover:bg-green-200 transition text-lg">
          <span className="text-3xl mb-2">👥</span>
          Ver candidaturas
        </button>
        <button onClick={() => navigate('/perfil-empresa')} className="flex flex-col items-center justify-center px-6 py-8 bg-yellow-100 text-yellow-700 font-bold rounded-lg shadow hover:bg-yellow-200 transition text-lg">
          <span className="text-3xl mb-2">✏️</span>
          Editar perfil
        </button>
        <button onClick={() => navigate('/mensagens')} className="flex flex-col items-center justify-center px-6 py-8 bg-purple-100 text-purple-700 font-bold rounded-lg shadow hover:bg-purple-200 transition text-lg md:col-span-2">
          <span className="text-3xl mb-2">📬</span>
          Mensagens/Contatos
        </button>
        <button onClick={() => alert('Funcionalidade em breve!')} className="flex flex-col items-center justify-center px-6 py-8 bg-gray-100 text-gray-700 font-bold rounded-lg shadow hover:bg-gray-200 transition text-lg md:col-span-2">
          <span className="text-3xl mb-2">📊</span>
          Exportar relatórios
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2 text-blue-700">Dicas para empresas</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Publique vagas detalhadas para atrair os melhores candidatos.</li>
          <li>Responda rapidamente às candidaturas para não perder talentos.</li>
          <li>Mantenha suas vagas atualizadas e remova as expiradas.</li>
        </ul>
      </div>
    </div>
  )
} 