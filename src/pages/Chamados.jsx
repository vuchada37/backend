import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMonetizacao } from '../context/MonetizacaoContext';
import Modal from '../components/Modal';

// Funções utilitárias para localStorage
const CHAMADOS_KEY = 'nevu_chamados';
function getChamados() {
  const data = localStorage.getItem(CHAMADOS_KEY);
  if (data) return JSON.parse(data);
  // Mock inicial completo, se não houver nada salvo
  const mock = [
    {
      id: 1,
      titulo: 'Problema no login',
      descricao: 'Não consigo acessar minha conta, aparece erro de senha incorreta mesmo digitando corretamente.',
      categoria: 'tecnologia',
      localizacao: 'Maputo, Centro',
      orcamento: '500 MT',
      prazo: '2024-06-10',
      prioridade: 'alta',
      requisitos: ['Experiência com sistemas web', 'Suporte remoto'],
      telefone: '82 123 4567',
      email: 'cliente1@email.com',
      status: 'aberto',
      data: '2024-06-01',
      respostas: []
    },
    {
      id: 2,
      titulo: 'Dúvida sobre candidatura',
      descricao: 'Gostaria de saber se posso me candidatar a mais de uma vaga ao mesmo tempo.',
      categoria: 'educacao',
      localizacao: 'Beira',
      orcamento: '',
      prazo: '',
      prioridade: 'baixa',
      requisitos: [],
      telefone: '84 222 3333',
      email: 'cliente2@email.com',
      status: 'fechado',
      data: '2024-05-28',
      respostas: []
    },
    {
      id: 3,
      titulo: 'Erro ao enviar mensagem',
      descricao: 'Ao tentar enviar mensagem para uma empresa, aparece erro de conexão.',
      categoria: 'tecnologia',
      localizacao: 'Nampula',
      orcamento: '300 MT',
      prazo: '2024-06-12',
      prioridade: 'media',
      requisitos: ['Conhecimento em redes'],
      telefone: '86 555 6666',
      email: 'cliente3@email.com',
      status: 'aberto',
      data: '2024-06-02',
      respostas: []
    }
  ];
  localStorage.setItem(CHAMADOS_KEY, JSON.stringify(mock));
  return mock;
}
function saveChamados(chamados) {
  localStorage.setItem(CHAMADOS_KEY, JSON.stringify(chamados));
}

export default function Chamados() {
  const { assinatura } = useMonetizacao();
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [busca, setBusca] = useState('')
  const [respostas, setRespostas] = useState({}); // { chamadoId: [resposta1, resposta2, ...] }
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);
  const [respostaTexto, setRespostaTexto] = useState('');
  const [detalheChamado, setDetalheChamado] = useState(null);
  // Definir limite de respostas para plano gratuito
  const limiteRespostasGratis = 2;
  const respostasGratisUsadas = Object.values(respostas).reduce((acc, arr) => acc + arr.length, 0);
  const isPlanoPago = assinatura?.plano === 'premium' || assinatura?.plano === 'basico';
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const navigate = useNavigate();
  const [toast, setToast] = useState(null); // { msg: string, chamado: object }
  // Remover o carregamento do localStorage para evitar conflito
  // const [chamados, setChamados] = useState([]);
  // useEffect(() => {
  //   setChamados(getChamados());
  // }, []);

  // Lista de chamados mockados (completa)
  const chamados = [
    {
      id: 1,
      titulo: 'Problema no login',
      descricao: 'Não consigo acessar minha conta, aparece erro de senha incorreta mesmo digitando corretamente.',
      categoria: 'tecnologia',
      localizacao: 'Maputo, Centro',
      orcamento: '500 MT',
      prazo: '2024-06-10',
      prioridade: 'alta',
      requisitos: ['Experiência com sistemas web', 'Suporte remoto'],
      telefone: '82 123 4567',
      email: 'cliente1@email.com',
      status: 'aberto',
      data: '2024-06-01',
      respostas: []
    },
    {
      id: 2,
      titulo: 'Dúvida sobre candidatura',
      descricao: 'Gostaria de saber se posso me candidatar a mais de uma vaga ao mesmo tempo.',
      categoria: 'educacao',
      localizacao: 'Beira',
      orcamento: '',
      prazo: '',
      prioridade: 'baixa',
      requisitos: [],
      telefone: '84 222 3333',
      email: 'cliente2@email.com',
      status: 'fechado',
      data: '2024-05-28',
      respostas: []
    },
    {
      id: 3,
      titulo: 'Erro ao enviar mensagem',
      descricao: 'Ao tentar enviar mensagem para uma empresa, aparece erro de conexão.',
      categoria: 'tecnologia',
      localizacao: 'Nampula',
      orcamento: '300 MT',
      prazo: '2024-06-12',
      prioridade: 'media',
      requisitos: ['Conhecimento em redes'],
      telefone: '86 555 6666',
      email: 'cliente3@email.com',
      status: 'aberto',
      data: '2024-06-02',
      respostas: []
    },
    {
      id: 4,
      titulo: 'Solicitação de exclusão de conta',
      descricao: 'Quero excluir minha conta e todos os meus dados da plataforma.',
      categoria: 'outros',
      localizacao: 'Quelimane',
      orcamento: '',
      prazo: '',
      prioridade: 'baixa',
      requisitos: [],
      telefone: '87 111 2222',
      email: 'cliente4@email.com',
      status: 'aberto',
      data: '2024-06-03',
      respostas: []
    },
    {
      id: 5,
      titulo: 'Plano não foi atualizado',
      descricao: 'Realizei o pagamento do plano premium, mas minha conta continua como gratuita.',
      categoria: 'tecnologia',
      localizacao: 'Maputo',
      orcamento: '',
      prazo: '',
      prioridade: 'alta',
      requisitos: ['Experiência com pagamentos online'],
      telefone: '82 999 8888',
      email: 'cliente5@email.com',
      status: 'aberto',
      data: '2024-06-04',
      respostas: []
    }
  ];

  // Ordenar chamados: prioritários primeiro
  const chamadosOrdenados = [...chamados].sort((a, b) => {
    // Prioridade "alta" = prioritário para planos pagos
    const aPrioritario = a.prioridade === 'alta';
    const bPrioritario = b.prioridade === 'alta';
    return (bPrioritario - aPrioritario);
  });

  const categorias = [
    { id: 'todas', nome: 'Todas as Categorias' },
    { id: 'tecnologia', nome: 'Tecnologia' },
    { id: 'domestico', nome: 'Doméstico' },
    { id: 'design', nome: 'Design' },
    { id: 'educacao', nome: 'Educação' },
    { id: 'manutencao', nome: 'Manutenção' },
    { id: 'fotografia', nome: 'Fotografia' }
  ]

  const statusOptions = [
    { id: 'todos', nome: 'Todos os Status' },
    { id: 'aberto', nome: 'Aberto' },
    { id: 'em_andamento', nome: 'Em Andamento' },
    { id: 'concluido', nome: 'Concluído' }
  ]

  // Filtro de busca seguro + filtro de prioridade por plano
  const chamadosFiltrados = chamadosOrdenados.filter(chamado =>
    (chamado.titulo && chamado.titulo.toLowerCase().includes(busca.toLowerCase())) &&
    (isPlanoPago || chamado.prioridade !== 'alta')
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'aberto': return 'bg-green-100 text-green-800'
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800'
      case 'concluido': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'aberto': return 'Aberto'
      case 'em_andamento': return 'Em Andamento'
      case 'concluido': return 'Concluído'
      default: return status
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

  const getCategoriaIcon = (categoria) => {
    switch (categoria) {
      case 'tecnologia': return '💻'
      case 'domestico': return '🏠'
      case 'design': return '🎨'
      case 'educacao': return '📚'
      case 'manutencao': return '🔧'
      case 'fotografia': return '📷'
      default: return '📋'
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Chamados de Serviço</h1>
        <p className="text-gray-600">Encontre serviços ou ofereça seus talentos</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              placeholder="Buscar por título, descrição ou localização..."
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {chamadosFiltrados.length} chamado(s) encontrado(s)
        </div>
      </div>

      {/* Botão Novo Chamado */}
      <div className="mb-6">
        <Link
          to="/novo-chamado"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Chamado
        </Link>
      </div>

      {/* Lista de Chamados */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chamadosFiltrados.map(chamado => {
          const isPrioritario = chamado.prioridade === 'alta';
          const isPlanoSuperior = assinatura?.plano === 'premium' || assinatura?.plano === 'basico';
          return (
            <div key={chamado.id} className={`p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between ${isPrioritario ? 'border-l-4 border-green-500 bg-green-50' : 'border-l-4 border-gray-200 bg-white'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">{chamado.titulo}</span>
                  {isPrioritario && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500 text-white ml-2">Prioritário</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mb-2">Aberto em {chamado.data}</div>
                {/* Histórico de respostas */}
                {respostas[chamado.id] && respostas[chamado.id].length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-gray-600 font-semibold mb-1">Respostas:</div>
                    <ul className="space-y-1">
                      {respostas[chamado.id].map((resp, idx) => (
                        <li key={idx} className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-800">{resp}</li>
                      ))}
                    </ul>
                </div>
                )}
              </div>
              <div className="mt-2 sm:mt-0 flex flex-col gap-2 items-end min-w-[120px]">
                <span className={`text-xs font-semibold mb-2 ${chamado.status === 'aberto' ? 'text-green-700' : 'text-gray-500'}`}>{chamado.status === 'aberto' ? 'Aberto' : 'Fechado'}</span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-xs border border-gray-300"
                    onClick={() => setDetalheChamado(chamado)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Remover modal de resposta e toast */}

      {/* Mensagem quando não há resultados */}
      {chamadosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum chamado encontrado</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou criar um novo chamado</p>
        </div>
      )}
      {/* Modal de detalhes do chamado */}
      {detalheChamado && (
        <Modal isOpen={!!detalheChamado} onClose={() => setDetalheChamado(null)} title={null}>
          <div className="space-y-4">
            {/* Topo: Ícone e categoria */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">
                {getCategoriaIcon && getCategoriaIcon(detalheChamado.categoria)}
              </span>
              <div>
                <h2 className="text-2xl font-bold text-blue-800 leading-tight">{detalheChamado.titulo}</h2>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {/* Badge categoria */}
                  {detalheChamado.categoria && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                      {detalheChamado.categoria.charAt(0).toUpperCase() + detalheChamado.categoria.slice(1)}
                    </span>
                  )}
                  {/* Badge prioridade */}
                  {detalheChamado.prioridade && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      detalheChamado.prioridade === 'alta' ? 'bg-red-100 text-red-700 border border-red-200' :
                      detalheChamado.prioridade === 'media' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      Prioridade: {detalheChamado.prioridade.charAt(0).toUpperCase() + detalheChamado.prioridade.slice(1)}
                    </span>
                  )}
                  {/* Badge status */}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    detalheChamado.status === 'aberto' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {detalheChamado.status === 'aberto' ? 'Aberto' : 'Fechado'}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid de informações principais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Localização</div>
                <div className="font-semibold text-gray-800">{detalheChamado.localizacao || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Orçamento</div>
                <div className="font-semibold text-gray-800">{detalheChamado.orcamento || '-'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Prazo</div>
                <div className="font-semibold text-gray-800">{detalheChamado.prazo || '-'}</div>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <div className="text-xs text-gray-500 mb-1">Descrição</div>
              <div className="bg-white rounded-lg p-3 border text-gray-700 text-sm">{detalheChamado.descricao}</div>
            </div>

            {/* Requisitos */}
            {detalheChamado.requisitos && detalheChamado.requisitos.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-600 text-lg">✔️</span>
                  <span className="text-xs text-gray-500">Requisitos do Profissional</span>
                </div>
                <ul className="list-disc ml-6 text-sm text-gray-800 space-y-1">
                  {detalheChamado.requisitos.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contato */}
            <div className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.28a2 2 0 011.7 1l1.09 2.18a2 2 0 01-.45 2.45l-1.27 1.02a11.05 11.05 0 005.52 5.52l1.02-1.27a2 2 0 012.45-.45l2.18 1.09a2 2 0 011 1.7V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V9a2 2 0 012-2z" /></svg>
                <span className="font-medium text-gray-700 text-sm">{detalheChamado.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm2 0a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                <span className="font-medium text-gray-700 text-sm">{detalheChamado.email}</span>
              </div>
            </div>

            {/* Data de abertura */}
            <div className="text-xs text-gray-500">Data de abertura: <span className="font-semibold text-gray-700">{detalheChamado.data}</span></div>

            {/* Histórico de respostas */}
            {respostas[detalheChamado.id] && respostas[detalheChamado.id].length > 0 && (
              <div>
                <div className="text-xs text-gray-600 font-semibold mb-1">Respostas:</div>
                <ul className="space-y-1">
                  {respostas[detalheChamado.id].map((resp, idx) => (
                    <li key={idx} className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-800">{resp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Botão de ação */}
            <div className="flex justify-end mt-4">
              <button
                className={`px-6 py-2 rounded-lg font-bold shadow text-base transition 
                  ${isPlanoPago ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                onClick={() => {
                  if (!isPlanoPago) {
                    setDetalheChamado(null);
                    setShowUpgradeModal(true);
                    return;
                  }
                  setDetalheChamado(null);
                  navigate('/mensagens', { state: { assunto: detalheChamado.titulo || detalheChamado.assunto, chamadoId: detalheChamado.id } });
                }}
                disabled={!isPlanoPago}
                title={!isPlanoPago ? 'Recurso exclusivo para planos pagos' : ''}
              >
                Enviar Mensagem
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* Modal de convite para upgrade */}
      {showUpgradeModal && (
        <Modal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} title="Recurso exclusivo para planos pagos">
          <div className="space-y-4">
            <p className="text-blue-700 font-semibold">Responda chamados e tenha suporte prioritário com um plano <b>Básico</b> ou <b>Premium</b>.</p>
            <div className="flex gap-4 justify-end">
              <button onClick={() => setShowUpgradeModal(false)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
              <button onClick={() => { setShowUpgradeModal(false); navigate('/monetizacao'); }} className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition">Ver Planos</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
} 