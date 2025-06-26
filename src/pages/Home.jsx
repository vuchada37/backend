import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">N</span>
          </div>
          <h1 className="text-5xl font-extrabold text-blue-700 tracking-tight">Nevú</h1>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Encontre oportunidades de emprego em Moçambique
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Conectamos talentos às melhores oportunidades. Busque e candidate-se gratuitamente. 
          Para recursos exclusivos como destaque e notificações em primeira mão, conheça nossos planos!
        </p>
        <Link 
          to="/vagas" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition"
        >
          Ver Vagas Disponíveis
        </Link>
      </section>

      {/* Vantagens */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher o Nevú?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Busca Inteligente</h3>
              <p className="text-gray-600">Encontre vagas que combinam com seu perfil e experiência</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Candidatura Rápida</h3>
              <p className="text-gray-600">Candidate-se com apenas alguns cliques</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Vagas Verificadas</h3>
              <p className="text-gray-600">Todas as vagas são verificadas e atualizadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Números que inspiram</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">+1000</div>
              <div className="text-gray-600">Vagas publicadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">+500</div>
              <div className="text-gray-600">Empresas parceiras</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">+2000</div>
              <div className="text-gray-600">Candidatos ativos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">O que nossos usuários dizem</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 mb-4">"Consegui meu primeiro estágio graças ao Nevú!"</p>
              <div className="font-semibold">Ana, Maputo</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 mb-4">"Processo muito simples e eficiente."</p>
              <div className="font-semibold">João, Beira</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 mb-4">"Encontrei a oportunidade perfeita para minha carreira."</p>
              <div className="font-semibold">Maria, Nampula</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
