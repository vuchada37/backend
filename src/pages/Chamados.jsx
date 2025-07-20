import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMonetizacao } from '../context/MonetizacaoContext';
import Modal from '../components/Modal';

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
  // Mock de chamados
  const chamados = [
    { id: 1, assunto: 'Problema no login', descricao: 'Não consigo acessar minha conta pelo site. Tentei recuperar a senha, mas mesmo após redefinir, o erro persiste. O navegador utilizado foi o Chrome no Windows 10. O erro aparece após clicar em "Entrar" na tela inicial.', status: 'aberto', prioridade: assinatura?.plano === 'premium' || assinatura?.plano === 'basico' ? 'prioritario' : 'normal', data: '2024-06-01' },
    { id: 2, assunto: 'Dúvida sobre candidatura', descricao: 'Gostaria de saber se posso me candidatar a mais de uma vaga ao mesmo tempo. Já estou participando de um processo seletivo para Desenvolvedor Frontend e vi uma vaga de Analista de Dados que me interessa.', status: 'fechado', prioridade: 'normal', data: '2024-05-28' },
    { id: 3, assunto: 'Erro ao enviar mensagem', descricao: 'Ao tentar enviar uma mensagem para a empresa "TechMoç" pela página de detalhes da vaga, aparece o erro "Falha ao conectar ao servidor". O problema ocorreu tanto no computador quanto no celular, usando redes diferentes.', status: 'aberto', prioridade: 'prioritario', data: '2024-06-02' },
    { id: 4, assunto: 'Solicitação de exclusão de conta', descricao: 'Quero excluir minha conta e todos os meus dados da plataforma. Meu e-mail de cadastro é usuario@email.com. Solicito confirmação por e-mail após a exclusão.', status: 'aberto', prioridade: 'normal', data: '2024-06-03' },
    { id: 5, assunto: 'Plano não foi atualizado', descricao: 'Realizei o pagamento do plano premium via M-Pesa no dia 03/06/2024, mas minha conta continua como gratuita. O comprovante foi enviado para o suporte. Preciso do acesso aos benefícios do plano premium.', status: 'aberto', prioridade: 'prioritario', data: '2024-06-04' },
  ];
  // Ordenar chamados: prioritários primeiro
  const chamadosOrdenados = [...chamados].sort((a, b) => (b.prioridade === 'prioritario') - (a.prioridade === 'prioritario'));

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
    (chamado.assunto && chamado.assunto.toLowerCase().includes(busca.toLowerCase())) &&
    (isPlanoPago || chamado.prioridade !== 'prioritario')
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
          const isPrioritario = chamado.prioridade === 'prioritario';
          const isPlanoSuperior = assinatura?.plano === 'premium' || assinatura?.plano === 'basico';
          return (
            <div key={chamado.id} className={`p-4 rounded-lg shadow flex flex-col sm:flex-row sm:items-center justify-between ${isPrioritario ? 'border-l-4 border-green-500 bg-green-50' : 'border-l-4 border-gray-200 bg-white'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">{chamado.assunto}</span>
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
        <Modal isOpen={!!detalheChamado} onClose={() => setDetalheChamado(null)} title={`Detalhes do chamado: ${detalheChamado.assunto}`}>
          <div className="space-y-3">
            <div className="text-sm text-gray-700"><b>Assunto:</b> {detalheChamado.assunto}</div>
            <div className="text-sm text-gray-700"><b>Descrição:</b> {detalheChamado.descricao}</div>
            <div className="text-sm text-gray-700"><b>Status:</b> {detalheChamado.status === 'aberto' ? 'Aberto' : 'Fechado'}</div>
            <div className="text-sm text-gray-700"><b>Prioridade:</b> {detalheChamado.prioridade === 'prioritario' ? 'Prioritário' : 'Normal'}</div>
            <div className="text-sm text-gray-700"><b>Data:</b> {detalheChamado.data}</div>
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
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
                onClick={() => {
                  if (!isPlanoPago && respostasGratisUsadas >= limiteRespostasGratis) {
                    setDetalheChamado(null);
                    setShowUpgradeModal(true);
                    return;
                  }
                  setDetalheChamado(null);
                  navigate('/mensagens', { state: { assunto: detalheChamado.assunto, chamadoId: detalheChamado.id } });
                }}
                disabled={!isPlanoPago && respostasGratisUsadas >= limiteRespostasGratis}
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