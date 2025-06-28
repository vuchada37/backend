import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('')

  // Mock de vagas em destaque
  const vagasDestaque = [
    {
      id: 1,
      titulo: 'Desenvolvedor Frontend',
      empresa: 'TechMoç',
      localizacao: 'Maputo',
      salario: '15.000 - 25.000 MT',
      tipo: 'CLT',
      categoria: 'tecnologia',
      prioridade: 'alta',
      candidatos: 12
    },
    {
      id: 2,
      titulo: 'Designer Gráfico',
      empresa: 'Criativa',
      localizacao: 'Beira',
      salario: '12.000 - 18.000 MT',
      tipo: 'Freelancer',
      categoria: 'design',
      prioridade: 'media',
      candidatos: 8
    },
    {
      id: 3,
      titulo: 'Analista de Marketing',
      empresa: 'DigitalMoç',
      localizacao: 'Nampula',
      salario: '18.000 - 25.000 MT',
      tipo: 'CLT',
      categoria: 'marketing',
      prioridade: 'alta',
      candidatos: 15
    }
  ]

  // Mock de chamados em destaque
  const chamadosDestaque = [
    {
      id: 1,
      titulo: 'Desenvolvimento de Website',
      categoria: 'tecnologia',
      localizacao: 'Maputo',
      orcamento: '25.000 - 35.000 MT',
      prazo: '30 dias',
      propostas: 5
    },
    {
      id: 2,
      titulo: 'Design de Logo e Identidade Visual',
      categoria: 'design',
      localizacao: 'Beira',
      orcamento: '8.000 - 15.000 MT',
      prazo: '15 dias',
      propostas: 3
    },
    {
      id: 3,
      titulo: 'Campanha de Marketing Digital',
      categoria: 'marketing',
      localizacao: 'Nampula',
      orcamento: '20.000 - 30.000 MT',
      prazo: '45 dias',
      propostas: 7
    }
  ]

  const categorias = [
    { id: 'tecnologia', nome: 'Tecnologia', icon: '💻', vagas: 45 },
    { id: 'design', nome: 'Design', icon: '🎨', vagas: 32 },
    { id: 'marketing', nome: 'Marketing', icon: '📈', vagas: 28 },
    { id: 'administrativo', nome: 'Administrativo', icon: '📊', vagas: 38 },
    { id: 'vendas', nome: 'Vendas', icon: '💰', vagas: 25 },
    { id: 'saude', nome: 'Saúde', icon: '🏥', vagas: 18 }
  ]

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
      case 'design': return '🎨'
      case 'marketing': return '📈'
      case 'administrativo': return '📊'
      case 'vendas': return '💰'
      case 'saude': return '🏥'
      default: return '💼'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Logo e Título */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <img src="/nevu.png" alt="Nevú" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Nevú
              </h1>
            </div>

            {/* Subtítulo */}
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Encontre oportunidades de emprego e serviços em Moçambique
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Conectamos talentos às melhores oportunidades. Busque vagas, candidate-se gratuitamente 
              ou encontre serviços profissionais para seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Vagas em Destaque */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Vagas em Destaque</h2>
              <p className="text-gray-600">As melhores oportunidades selecionadas para você</p>
            </div>
            <Link 
              to="/vagas" 
              className="mt-4 sm:mt-0 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Ver todas
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vagasDestaque.map(vaga => (
              <div key={vaga.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPrioridadeColor(vaga.prioridade)}`}>
                      {vaga.prioridade.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      {getCategoriaIcon(vaga.categoria)}
                      <span className="ml-1 capitalize">{vaga.categoria}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {vaga.titulo}
                  </h3>
                  
                  <p className="text-blue-600 font-semibold mb-4">{vaga.empresa}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {vaga.localizacao}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {vaga.salario}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {vaga.tipo}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {vaga.candidatos} candidatos
                    </span>
                    <Link 
                      to={`/vaga/${vaga.id}`}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chamados em Destaque */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Chamados de Serviço</h2>
              <p className="text-gray-600">Projetos e serviços solicitados por empresas</p>
            </div>
            <Link 
              to="/chamados" 
              className="mt-4 sm:mt-0 inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Ver todos
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chamadosDestaque.map(chamado => (
              <div key={chamado.id} className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      ABERTO
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      {getCategoriaIcon(chamado.categoria)}
                      <span className="ml-1 capitalize">{chamado.categoria}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {chamado.titulo}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {chamado.localizacao}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      {chamado.orcamento}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {chamado.prazo}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {chamado.propostas} propostas
                    </span>
                    <Link 
                      to={`/chamado/${chamado.id}`}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Categorias Populares</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore oportunidades por área de atuação e encontre o que melhor se adequa ao seu perfil
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categorias.map(categoria => (
              <Link
                key={categoria.id}
                to={`/vagas?categoria=${categoria.id}`}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 p-6 text-center group hover:border-blue-200"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {categoria.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {categoria.nome}
                </h3>
                <p className="text-sm text-gray-500">{categoria.vagas} vagas</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Números que inspiram</h2>
            <p className="text-blue-100 text-lg">Nossa plataforma em números</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">+1000</div>
              <div className="text-blue-100">Vagas publicadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">+500</div>
              <div className="text-blue-100">Empresas parceiras</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">+2000</div>
              <div className="text-blue-100">Candidatos ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">+300</div>
              <div className="text-blue-100">Chamados de serviço</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pronto para encontrar sua próxima oportunidade?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Junte-se a milhares de profissionais que já encontraram suas oportunidades no Nevú
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/vagas" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              Ver Vagas Disponíveis
            </Link>
            <Link 
              to="/chamados" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Ver Chamados de Serviço
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
