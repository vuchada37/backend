import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import { useAuth } from '../context/AuthContext'

export default function DetalheChamado() {
  const { id } = useParams()
  const [modalProposta, setModalProposta] = useState(false)
  const [proposta, setProposta] = useState('')
  const { user } = useAuth(); // Pega usuário logado
  const [favorito, setFavorito] = useState(false);
  const [showToast, setShowToast] = useState(null); // { type, message }
  const [modalReportar, setModalReportar] = useState(false);
  const [motivoReport, setMotivoReport] = useState('');

  // Mock de detalhes do chamado
  const chamado = {
    id: parseInt(id),
    titulo: 'Manutenção de Computador',
    descricao: 'Computador não liga e faz barulho estranho. Já tentei ligar em outras tomadas mas não funciona. O computador é um Dell Inspiron de 2020. Preciso urgente pois uso para trabalho.',
    categoria: 'tecnologia',
    status: 'aberto',
    localizacao: 'Maputo, Bairro Central',
    orcamento: '500-1000 MT',
    dataCriacao: '2024-01-15',
    cliente: 'João Silva',
    telefone: '(11) 99999-9999',
    email: 'joao@email.com',
    prioridade: 'alta',
    prazo: '2024-01-20',
    imagens: ['/mock/computer1.jpg', '/mock/computer2.jpg'],
    requisitos: [
      'Experiência com manutenção de computadores',
      'Disponibilidade para ir ao local',
      'Garantia do serviço'
    ],
    propostas: [
      {
        id: 1,
        profissional: 'Carlos Tech',
        valor: '800 MT',
        prazo: '2 dias',
        descricao: 'Vou diagnosticar e resolver o problema. Garantia de 30 dias.',
        avaliacao: 4.8,
        data: '2024-01-16'
      },
      {
        id: 2,
        profissional: 'Tech Solutions',
        valor: '600 MT',
        prazo: '1 dia',
        descricao: 'Especialista em Dell. Posso ir hoje mesmo.',
        avaliacao: 4.5,
        data: '2024-01-16'
      }
    ]
  }

  // Verifica se o usuário logado é o dono do chamado
  const isDono = user && user.email === chamado.email;

  // Checar favorito no localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoritosChamados') || '[]');
    setFavorito(favs.includes(id));
  }, [id]);

  // Função Favoritar
  const handleFavoritar = () => {
    if (!user) {
      setShowToast({ type: 'error', message: 'Faça login para favoritar chamados.' });
      setTimeout(() => setShowToast(null), 2200);
      return;
    }
    let favs = JSON.parse(localStorage.getItem('favoritosChamados') || '[]');
    if (favorito) {
      favs = favs.filter(cid => cid !== id);
      setShowToast({ type: 'info', message: 'Removido dos favoritos.' });
    } else {
      favs.push(id);
      setShowToast({ type: 'success', message: 'Adicionado aos favoritos!' });
    }
    localStorage.setItem('favoritosChamados', JSON.stringify(favs));
    setFavorito(!favorito);
    setTimeout(() => setShowToast(null), 1800);
  };

  // Função para enviar proposta
  const enviarProposta = () => {
    setShowToast({ type: 'success', message: 'Proposta enviada com sucesso!' });
    setModalProposta(false);
    setProposta('');
    setTimeout(() => setShowToast(null), 2200);
  }

  // Função Compartilhar robusta
  const handleCompartilhar = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: chamado.titulo, url });
        // Só mostra toast se realmente compartilhar
        setShowToast({ type: 'success', message: 'Chamado compartilhado!' });
        setTimeout(() => setShowToast(null), 2200);
      } catch (err) {
        if (err && err.name === 'AbortError') {
          setShowToast({ type: 'info', message: 'Compartilhamento cancelado.' });
        } else {
          setShowToast({ type: 'error', message: 'Não foi possível compartilhar.' });
        }
        setTimeout(() => setShowToast(null), 2200);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setShowToast({ type: 'success', message: 'Link copiado para área de transferência!' });
      } catch (err) {
        setShowToast({ type: 'error', message: 'Erro ao copiar o link. Copie manualmente.' });
      }
      setTimeout(() => setShowToast(null), 2200);
    } else {
      setShowToast({ type: 'info', message: 'Não foi possível compartilhar.' });
      setTimeout(() => setShowToast(null), 2200);
    }
  };

  // Função Reportar
  const handleReportar = () => {
    setModalReportar(true);
  };
  const enviarReport = () => {
    setModalReportar(false);
    setShowToast({ type: 'success', message: 'Chamado reportado! Obrigado pelo feedback.' });
    setMotivoReport('');
    setTimeout(() => setShowToast(null), 2200);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aberto': return 'bg-green-100 text-green-800'
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800'
      case 'concluido': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
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

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 pb-20 md:pb-6">
      {/* Header */}
      <div className="mb-6">
        <Link to="/chamados" className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar aos Chamados
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{chamado.titulo}</h1>
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(chamado.status)}`}>
            {chamado.status.toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPrioridadeColor(chamado.prioridade)}`}>
            {chamado.prioridade.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {getCategoriaIcon(chamado.categoria)} {chamado.categoria.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Informações principais */}
        <div className="lg:col-span-2 space-y-6">
          {/* Descrição */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Descrição</h2>
            <p className="text-gray-600 leading-relaxed">{chamado.descricao}</p>
          </div>

          {/* Requisitos */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Requisitos</h2>
            <ul className="space-y-2">
              {chamado.requisitos.map((req, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Propostas */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Propostas ({chamado.propostas.length})</h2>
              <button
                onClick={() => setModalProposta(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Fazer Proposta
              </button>
            </div>
            
            <div className="space-y-4">
              {chamado.propostas.map(proposta => (
                <div key={proposta.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{proposta.profissional}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        {proposta.avaliacao} ({proposta.avaliacao * 20} avaliações)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{proposta.valor}</div>
                      <div className="text-sm text-gray-500">Prazo: {proposta.prazo}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{proposta.descricao}</p>
                  <div className="flex space-x-2">
                    {isDono && (
                      <>
                        <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                          Aceitar
                        </button>
                        <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition">
                          Mensagem
                        </button>
                      </>
                    )}
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition" onClick={() => navigate('/em-producao')}>
                      Ver Perfil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Informações do cliente */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Cliente</h2>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-800">{chamado.cliente}</div>
                <div className="text-sm text-gray-500">{chamado.email}</div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {chamado.telefone}
              </div>
            </div>
          </div>

          {/* Detalhes do chamado */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalhes</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Localização:</span>
                <span className="font-medium">{chamado.localizacao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Orçamento:</span>
                <span className="font-medium text-green-600">{chamado.orcamento}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prazo:</span>
                <span className="font-medium">{new Date(chamado.prazo).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Criado em:</span>
                <span className="font-medium">{new Date(chamado.dataCriacao).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ações</h2>
            <div className="space-y-3">
              <button onClick={handleFavoritar} className={`w-full px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition ${favorito ? 'bg-yellow-100 text-yellow-800 border border-yellow-400' : 'bg-gray-600 text-white hover:bg-gray-700'}`}> 
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorito ? 'Remover dos Favoritos' : 'Favoritar'}
              </button>
              <button onClick={handleCompartilhar} className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Compartilhar
              </button>
              <button onClick={handleReportar} className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Reportar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Proposta */}
      <Modal
        isOpen={modalProposta}
        onClose={() => setModalProposta(false)}
        title="Fazer Proposta"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valor da Proposta</label>
            <input
              type="text"
              placeholder="Ex: 800 MT"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prazo de Entrega</label>
            <input
              type="text"
              placeholder="Ex: 2 dias"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição da Proposta</label>
            <textarea
              value={proposta}
              onChange={(e) => setProposta(e.target.value)}
              placeholder="Descreva como você vai resolver o problema..."
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={enviarProposta}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Enviar Proposta
            </button>
            <button
              onClick={() => setModalProposta(false)}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      {/* Toast visual */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg text-white ${showToast.type === 'success' ? 'bg-green-500' : showToast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{
            fontSize: '1rem',
            maxWidth: '90vw',
            width: 'auto',
            padding: '0.75rem 1.25rem',
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
            bottom: '1.5rem',
            zIndex: 9999,
          }}
        >
          {showToast.message}
          <style>{`
            @media (max-width: 640px) {
              .toast-mobile-compact {
                font-size: 0.95rem !important;
                max-width: 95vw !important;
                padding: 0.5rem 0.75rem !important;
                left: 50% !important;
                right: auto !important;
                transform: translateX(-50%) !important;
                bottom: 1rem !important;
              }
            }
          `}</style>
        </div>
      )}
      {/* Modal Reportar */}
      {modalReportar && (
        <Modal isOpen={modalReportar} onClose={() => setModalReportar(false)} title="Reportar Chamado" size="sm">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Motivo do reporte</label>
            <textarea value={motivoReport} onChange={e => setMotivoReport(e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Descreva o motivo..." />
            <button onClick={enviarReport} className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Enviar Reporte</button>
          </div>
        </Modal>
      )}
    </div>
  )
} 