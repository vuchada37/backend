import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMonetizacao } from '../context/MonetizacaoContext';

export default function Vagas() {
  const { assinatura } = useMonetizacao();
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroLocalizacao, setFiltroLocalizacao] = useState('todas')
  const [filtroTipo, setFiltroTipo] = useState('todos')
  const [busca, setBusca] = useState('')

  // Vagas mockadas melhoradas
  const vagas = [
    {
      id: 1,
      titulo: 'Desenvolvedor Frontend',
      empresa: 'TechMoç',
      categoria: 'tecnologia',
      prioridade: 'alta',
      modalidade: 'Remoto',
      descricao: 'Desenvolva interfaces modernas.',
      localizacao: 'Maputo',
      salario: '60.000 MT',
      tipo: 'Tempo Integral',
      experiencia: 'Pleno',
      beneficios: ['Vale alimentação', 'Plano de saúde'],
      premium: true,
      dataPublicacao: '2024-06-01',
      visualizacoes: 120,
      candidatos: 8,
      empresaInfo: { nome: 'TechMoç', descricao: 'Empresa de tecnologia', setor: 'TI', funcionarios: 50, localizacao: 'Maputo', fundacao: 2015 }
    },
    {
      id: 2,
      titulo: 'Designer UI/UX',
      empresa: 'DesignPro',
      categoria: 'design',
      prioridade: 'media',
      modalidade: 'Híbrido',
      descricao: 'Crie experiências incríveis.',
      localizacao: 'Matola',
      salario: '45.000 MT',
      tipo: 'Tempo Integral',
      experiencia: 'Júnior',
      beneficios: ['Vale transporte'],
      premium: false,
      dataPublicacao: '2024-06-02',
      visualizacoes: 80,
      candidatos: 5,
      empresaInfo: { nome: 'DesignPro', descricao: 'Agência criativa', setor: 'Design', funcionarios: 20, localizacao: 'Matola', fundacao: 2018 }
    },
    {
      id: 3,
      titulo: 'Analista de Dados',
      empresa: 'DataMoz',
      categoria: 'tecnologia',
      prioridade: 'alta',
      modalidade: 'Remoto',
      descricao: 'Analise grandes volumes de dados.',
      localizacao: 'Maputo',
      salario: '70.000 MT',
      tipo: 'Tempo Integral',
      experiencia: 'Sênior',
      beneficios: ['Plano odontológico'],
      premium: true,
      dataPublicacao: '2024-06-03',
      visualizacoes: 150,
      candidatos: 12,
      empresaInfo: { nome: 'DataMoz', descricao: 'Consultoria em dados', setor: 'TI', funcionarios: 30, localizacao: 'Maputo', fundacao: 2012 }
    },
    {
      id: 4,
      titulo: 'Gestor de Projetos',
      empresa: 'Projeta',
      categoria: 'administrativo',
      prioridade: 'baixa',
      modalidade: 'Presencial',
      descricao: 'Gerencie projetos inovadores.',
      localizacao: 'Beira',
      salario: '55.000 MT',
      tipo: 'Tempo Integral',
      experiencia: 'Pleno',
      beneficios: ['Seguro de vida'],
      premium: true,
      dataPublicacao: '2024-06-04',
      visualizacoes: 60,
      candidatos: 3,
      empresaInfo: { nome: 'Projeta', descricao: 'Gestão de projetos', setor: 'Administração', funcionarios: 15, localizacao: 'Beira', fundacao: 2017 }
    },
    {
      id: 5,
      titulo: 'Assistente Administrativo',
      empresa: 'OfficePlus',
      categoria: 'administrativo',
      prioridade: 'media',
      modalidade: 'Presencial',
      descricao: 'Auxilie nas rotinas administrativas.',
      localizacao: 'Maputo',
      salario: '30.000 MT',
      tipo: 'Meio Período',
      experiencia: 'Júnior',
      beneficios: ['Vale refeição'],
      premium: false,
      dataPublicacao: '2024-06-05',
      visualizacoes: 40,
      candidatos: 2,
      empresaInfo: { nome: 'OfficePlus', descricao: 'Serviços administrativos', setor: 'Administração', funcionarios: 10, localizacao: 'Maputo', fundacao: 2020 }
    },
    {
      id: 6,
      titulo: 'Engenheiro de Software Sênior',
      empresa: 'SoftPlus',
      categoria: 'tecnologia',
      prioridade: 'alta',
      modalidade: 'Remoto',
      descricao: 'Lidere projetos de software inovadores.',
      localizacao: 'Maputo',
      salario: '120.000 MT',
      tipo: 'Tempo Integral',
      experiencia: 'Sênior',
      beneficios: ['Bônus anual', 'Plano de saúde premium'],
      premium: true,
      dataPublicacao: '2024-06-06',
      visualizacoes: 200,
      candidatos: 4,
      empresaInfo: { nome: 'SoftPlus', descricao: 'Desenvolvimento de software', setor: 'TI', funcionarios: 80, localizacao: 'Maputo', fundacao: 2010 }
    },
    {
      id: 7,
      titulo: 'Especialista em Segurança da Informação',
      empresa: 'SecureIT',
      categoria: 'tecnologia',
      prioridade: 'media',
      modalidade: 'Remoto',
      descricao: 'Implemente políticas de segurança e proteja dados sensíveis.',
      localizacao: 'Matola',
      salario: '90.000 MT',
      tipo: 'Tempo Integral',
      experiencia: 'Pleno',
      beneficios: ['Home office', 'Seguro de vida'],
      premium: true,
      dataPublicacao: '2024-06-07',
      visualizacoes: 110,
      candidatos: 6,
      empresaInfo: { nome: 'SecureIT', descricao: 'Segurança digital', setor: 'TI', funcionarios: 40, localizacao: 'Matola', fundacao: 2016 }
    }
  ]

  const categorias = [
    { id: 'todas', nome: 'Todas as Categorias' },
    { id: 'tecnologia', nome: 'Tecnologia' },
    { id: 'design', nome: 'Design' },
    { id: 'marketing', nome: 'Marketing' },
    { id: 'administrativo', nome: 'Administrativo' }
  ]

  const localizacoes = [
    { id: 'todas', nome: 'Todas as Localizações' },
    { id: 'Maputo', nome: 'Maputo' },
    { id: 'Beira', nome: 'Beira' },
    { id: 'Nampula', nome: 'Nampula' }
  ]

  const tipos = [
    { id: 'todos', nome: 'Todos os Tipos' },
    { id: 'Efetivo', nome: 'Efetivo' },
    { id: 'Prestador', nome: 'Prestador' },
    { id: 'Freelancer', nome: 'Freelancer' }
  ]

  // Filtro de vagas premium
  // const isPremium = assinatura?.plano === 'premium';
  const vagasFiltradas = vagas.filter(vaga => {
    // Remover filtro de exibição de vagas premium
    const matchCategoria = filtroCategoria === 'todas' || vaga.categoria === filtroCategoria
    const matchLocalizacao = filtroLocalizacao === 'todas' || vaga.localizacao === filtroLocalizacao
    const matchTipo = filtroTipo === 'todos' || vaga.tipo === filtroTipo
    const matchBusca = vaga.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                      vaga.empresa.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchLocalizacao && matchTipo && matchBusca
  })

  // Ordenar vagas: premium primeiro
  const vagasOrdenadas = [...vagasFiltradas].sort((a, b) => (b.premium === true) - (a.premium === true));

  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case 'tecnologia': return '💻'
      case 'design': return '🎨'
      case 'marketing': return '📈'
      case 'administrativo': return '📊'
      default: return '💼'
    }
  }

  const getPrioridadeColor = (prioridade) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'baixa': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getModalidadeColor = (modalidade) => {
    switch (modalidade) {
      case 'Remoto': return 'bg-blue-100 text-blue-800'
      case 'Híbrido': return 'bg-purple-100 text-purple-800'
      case 'Presencial': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Vagas Disponíveis</h1>
        <p className="text-gray-600">Encontre a oportunidade perfeita para sua carreira</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por título, empresa ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
            <select
              value={filtroLocalizacao}
              onChange={(e) => setFiltroLocalizacao(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {localizacoes.map(loc => (
                <option key={loc.id} value={loc.id}>{loc.nome}</option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tipos.map(tipo => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {vagasFiltradas.length} vaga(s) encontrada(s)
        </div>
      </div>

      {/* Lista de Vagas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
         {vagasOrdenadas.map(vaga => {
           // Selo visual para vagas premium
           const isPremiumVaga = vaga.premium;
           const podeVerPremium = assinatura?.plano === 'premium' || assinatura?.plano === 'basico';
           if (isPremiumVaga && !podeVerPremium) {
             // Card de convite para upgrade
             return (
               <div key={vaga.id} className="bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow p-6 flex flex-col items-center justify-center text-center relative">
                 <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-yellow-400 text-white">Exclusiva para Planos Superiores</span>
                 <span className="text-4xl mb-2">⭐</span>
                 <h3 className="font-bold text-yellow-700 text-lg mb-1">Vaga Premium</h3>
                 <p className="text-gray-700 mb-3">Esta vaga é exclusiva para assinantes <b>Premium</b> ou <b>Básico</b>.</p>
                 <button
                   onClick={() => window.location.href = '/monetizacao'}
                   className="px-4 py-2 bg-yellow-400 text-white rounded-lg font-bold hover:bg-yellow-500 transition"
                 >
                   Fazer Upgrade e Acessar
                 </button>
               </div>
             );
           }
           return (
             <div key={vaga.id} className="bg-white rounded-lg shadow hover:shadow-lg transition relative">
               {isPremiumVaga && (
                 <span className={`absolute z-20 top-3 right-3 px-2 py-1 rounded-full text-xs font-bold shadow-md ${podeVerPremium ? 'bg-yellow-400 text-white' : 'bg-yellow-200 text-yellow-800 border border-yellow-300'}`}
                   style={{pointerEvents: 'none', paddingRight: '0.75rem', paddingLeft: '0.75rem'}}>
                   {podeVerPremium ? 'Vaga Premium ⭐' : 'Exclusiva para Planos Superiores'}
                 </span>
               )}
               <div className="p-6" style={isPremiumVaga ? {paddingTop: '2.8rem'} : {}}>
                 {/* Header do Card */}
                 <div className="flex items-start justify-between mb-3">
                   <div className="flex items-center">
                     <span className="text-2xl mr-2">{getCategoriaIcon(vaga.categoria)}</span>
                     <div>
                       <h3 className="font-semibold text-gray-800 text-lg">{vaga.titulo}</h3>
                       <p className="text-sm text-gray-500">{vaga.empresa}</p>
                     </div>
                   </div>
                   <div className="flex flex-col items-end space-y-1">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(vaga.prioridade)}`}> {vaga.prioridade.toUpperCase()} </span>
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModalidadeColor(vaga.modalidade)}`}> {vaga.modalidade} </span>
                   </div>
                 </div>
                 {/* Descrição */}
                 <p className="text-gray-600 text-sm mb-4">{vaga.descricao}</p>
                 {/* Informações */}
                 <div className="space-y-2 mb-4">
                   <div className="flex items-center text-sm text-gray-500">
                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                     {vaga.localizacao}
                   </div>
                   <div className="flex items-center text-sm text-gray-500">
                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                     </svg>
                     {vaga.salario}
                   </div>
                   <div className="flex items-center text-sm text-gray-500">
                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                     </svg>
                     {vaga.tipo} • {vaga.experiencia}
                   </div>
                 </div>
                 {/* Benefícios */}
                 {vaga.beneficios.length > 0 && (
                   <div className="mb-4">
                     <p className="text-xs text-gray-500 mb-1">Benefícios:</p>
                     <div className="flex flex-wrap gap-1">
                       {vaga.beneficios.slice(0, 2).map((beneficio, index) => (
                         <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                           {beneficio}
                         </span>
                       ))}
                       {vaga.beneficios.length > 2 && (
                         <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                           +{vaga.beneficios.length - 2}
                         </span>
                       )}
                     </div>
                   </div>
                 )}
                 {/* Botões */}
                 <div className="flex space-x-2">
                   <Link
                     to={`/vaga/${vaga.id}`}
                     className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition text-center"
                   >
                     Ver Detalhes
                   </Link>
                 </div>
               </div>
             </div>
           );
         })}
      </div>

      {/* Mensagem quando não há resultados */}
      {vagasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhuma vaga encontrada</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou volte mais tarde</p>
        </div>
      )}
    </div>
  )
} 