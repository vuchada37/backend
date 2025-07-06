import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VagasPublicadas() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [filtroStatus, setFiltroStatus] = useState('todas')

  // Mock de vagas publicadas
  const vagas = [
    {
      id: 1,
      titulo: 'Desenvolvedor Frontend',
      empresa: user?.nome || 'Empresa Exemplo',
      localizacao: 'Beira, Moçambique',
      tipo: 'CLT',
      salario: 'MT 4.000 - 6.000',
      dataPublicacao: '2024-01-10',
      dataExpiracao: '2024-02-10',
      status: 'ativa',
      candidaturas: 5,
      descricao: 'Desenvolvedor frontend com experiência em React, TypeScript e CSS moderno.'
    },
    {
      id: 2,
      titulo: 'Designer UX/UI',
      empresa: user?.nome || 'Empresa Exemplo',
      localizacao: 'Remoto',
      tipo: 'PJ',
      salario: 'MT 5.000 - 7.000',
      dataPublicacao: '2024-01-08',
      dataExpiracao: '2024-02-08',
      status: 'ativa',
      candidaturas: 3,
      descricao: 'Designer com foco em experiência do usuário e interfaces intuitivas.'
    },
    {
      id: 3,
      titulo: 'Desenvolvedor Backend',
      empresa: user?.nome || 'Empresa Exemplo',
      localizacao: 'Maputo, Moçambique',
      tipo: 'CLT',
      salario: 'MT 6.000 - 8.000',
      dataPublicacao: '2024-01-05',
      dataExpiracao: '2024-02-05',
      status: 'expirada',
      candidaturas: 8,
      descricao: 'Desenvolvedor backend com experiência em Node.js, Python e bancos de dados.'
    },
    {
      id: 4,
      titulo: 'Analista de Marketing',
      empresa: user?.nome || 'Empresa Exemplo',
      localizacao: 'Moçambique, Maputo',
      tipo: 'CLT',
      salario: 'MT 3.500 - 5.000',
      dataPublicacao: '2024-01-12',
      dataExpiracao: '2024-02-12',
      status: 'pausada',
      candidaturas: 2,
      descricao: 'Analista de marketing digital com experiência em campanhas online.'
    }
  ]

  const vagasFiltradas = vagas.filter(vaga => {
    if (filtroStatus === 'todas') return true
    return vaga.status === filtroStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800'
      case 'expirada': return 'bg-red-100 text-red-800'
      case 'pausada': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'ativa': return 'Ativa'
      case 'expirada': return 'Expirada'
      case 'pausada': return 'Pausada'
      default: return status
    }
  }

  const editarVaga = (id) => {
    alert(`Editando vaga ${id}... (Funcionalidade mockada)`)
  }

  const alterarStatus = (id, novoStatus) => {
    alert(`Status da vaga ${id} alterado para ${novoStatus}! (Funcionalidade mockada)`)
  }

  const verCandidaturas = (id) => {
    navigate('/candidaturas')
  }

  const calcularDiasRestantes = (dataExpiracao) => {
    const hoje = new Date()
    const expiracao = new Date(dataExpiracao)
    const diffTime = expiracao - hoje
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">Vagas Publicadas</h1>
        <button
                      onClick={() => navigate('/publicar-vaga')}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
        >
          📢 Publicar Nova Vaga
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filtrar por status:</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="todas">Todas</option>
              <option value="ativa">Ativas</option>
              <option value="expirada">Expiradas</option>
              <option value="pausada">Pausadas</option>
            </select>
          </div>
          <span className="text-sm text-gray-600">
            {vagasFiltradas.length} vaga(s) encontrada(s)
          </span>
        </div>
      </div>

      {/* Lista de vagas */}
      <div className="space-y-4">
        {vagasFiltradas.map((vaga) => {
          const diasRestantes = calcularDiasRestantes(vaga.dataExpiracao)
          const isExpirada = diasRestantes < 0
          const isExpirando = diasRestantes <= 7 && diasRestantes >= 0

          return (
            <div key={vaga.id} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{vaga.titulo}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaga.status)}`}>
                      {getStatusText(vaga.status)}
                    </span>
                    {isExpirando && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Expira em {diasRestantes} dias
                      </span>
                    )}
                    {isExpirada && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Expirada
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Localização:</strong> {vaga.localizacao}</p>
                      <p><strong>Tipo:</strong> {vaga.tipo}</p>
                      <p><strong>Salário:</strong> {vaga.salario}</p>
                    </div>
                    <div>
                      <p><strong>Publicada em:</strong> {vaga.dataPublicacao}</p>
                      <p><strong>Expira em:</strong> {vaga.dataExpiracao}</p>
                      <p><strong>Candidaturas:</strong> {vaga.candidaturas}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mt-3 text-sm sm:text-base">{vaga.descricao}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <button
                  onClick={() => verCandidaturas(vaga.id)}
                  className="flex-1 sm:flex-none px-3 py-2 bg-blue-600 text-white rounded text-xs sm:text-sm hover:bg-blue-700 transition"
                >
                  👥 Ver Candidaturas ({vaga.candidaturas})
                </button>
                <button
                  onClick={() => editarVaga(vaga.id)}
                  className="flex-1 sm:flex-none px-3 py-2 bg-yellow-600 text-white rounded text-xs sm:text-sm hover:bg-yellow-700 transition"
                >
                  ✏️ Editar
                </button>
                {vaga.status === 'ativa' && (
                  <button
                    onClick={() => alterarStatus(vaga.id, 'pausada')}
                    className="flex-1 sm:flex-none px-3 py-2 bg-orange-600 text-white rounded text-xs sm:text-sm hover:bg-orange-700 transition"
                  >
                    ⏸️ Pausar
                  </button>
                )}
                {vaga.status === 'pausada' && (
                  <button
                    onClick={() => alterarStatus(vaga.id, 'ativa')}
                    className="flex-1 sm:flex-none px-3 py-2 bg-green-600 text-white rounded text-xs sm:text-sm hover:bg-green-700 transition"
                  >
                    ▶️ Ativar
                  </button>
                )}
                <button
                  onClick={() => alterarStatus(vaga.id, 'expirada')}
                  className="flex-1 sm:flex-none px-3 py-2 bg-red-600 text-white rounded text-xs sm:text-sm hover:bg-red-700 transition"
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {vagasFiltradas.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <span className="text-6xl mb-4 block">📄</span>
          <p className="text-xl">Nenhuma vaga encontrada</p>
          <p className="text-sm">Publique sua primeira vaga para começar!</p>
        </div>
      )}
    </div>
  )
} 