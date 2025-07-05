import { useAuth } from '../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import { ModalTemplates, ModalNotificacoes } from '../components/Modal'

export default function Mensagens() {
  const { user } = useAuth()
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null)
  const [novaMensagem, setNovaMensagem] = useState('')
  const [filtro, setFiltro] = useState('todas')
  const [busca, setBusca] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)
  const [showNotificacoes, setShowNotificacoes] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)
  const [digitando, setDigitando] = useState(false)
  const [arquivosAnexados, setArquivosAnexados] = useState([])
  const [notificacoes, setNotificacoes] = useState([])
  const chatRef = useRef(null)
  const inputRef = useRef(null)

  // Mock de mensagens mais realista
  const mensagens = [
    {
      id: 1,
      candidato: 'João Silva',
      empresa: 'TechCorp',
      email: 'joao@email.com',
      telefone: '+258 84 123 4567',
      vaga: 'Desenvolvedor Frontend',
      data: '2024-01-15',
      ultimaMensagem: 'Olá! Gostaria de saber mais sobre a vaga...',
      lida: false,
      status: 'ativo',
      tipo: 'candidato',
      online: true,
      ultimaAtividade: 'Agora',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      prioridade: 'alta'
    },
    {
      id: 2,
      candidato: 'Maria Santos',
      empresa: 'DesignStudio',
      email: 'maria@email.com',
      telefone: '+258 85 987 6543',
      vaga: 'Designer UX/UI',
      data: '2024-01-14',
      ultimaMensagem: 'Obrigada pelo retorno! Quando posso agendar uma entrevista?',
      lida: true,
      status: 'ativo',
      tipo: 'candidato',
      online: false,
      ultimaAtividade: 'Há 5 min',
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      prioridade: 'media'
    },
    {
      id: 3,
      candidato: 'Pedro Costa',
      empresa: 'DataTech',
      email: 'pedro@email.com',
      telefone: '+258 86 555 1234',
      vaga: 'Desenvolvedor Backend',
      data: '2024-01-13',
      ultimaMensagem: 'Tenho interesse na vaga. Posso enviar meu portfólio?',
      lida: true,
      status: 'ativo',
      tipo: 'candidato',
      online: true,
      ultimaAtividade: 'Agora',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      prioridade: 'baixa'
    },
    {
      id: 4,
      candidato: 'Ana Oliveira',
      empresa: 'InnovateLab',
      email: 'ana@email.com',
      telefone: '+258 87 777 8888',
      vaga: 'Product Manager',
      data: '2024-01-12',
      ultimaMensagem: 'Recebi o feedback da entrevista. Obrigada pela oportunidade!',
      lida: false,
      status: 'finalizado',
      tipo: 'candidato',
      online: false,
      ultimaAtividade: 'Há 2 horas',
      foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      prioridade: 'media'
    },
    {
      id: 5,
      candidato: 'Carlos Mendes',
      empresa: 'StartupXYZ',
      email: 'carlos@email.com',
      telefone: '+258 88 999 0000',
      vaga: 'DevOps Engineer',
      data: '2024-01-11',
      ultimaMensagem: 'Aceitei a proposta! Estou ansioso para começar.',
      lida: true,
      status: 'contratado',
      tipo: 'candidato',
      online: false,
      ultimaAtividade: 'Há 1 dia',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      prioridade: 'alta'
    }
  ]

  // Mock de histórico de mensagens mais realista
  const historicoMensagens = {
    1: [
      { 
        id: 1, 
        remetente: 'candidato', 
        texto: 'Olá! Gostaria de saber mais sobre a vaga de Desenvolvedor Frontend', 
        data: '2024-01-15 14:30',
        tipo: 'texto',
        lida: true
      },
      { 
        id: 2, 
        remetente: 'empresa', 
        texto: 'Olá João! Obrigada pelo interesse. A vaga é para trabalhar com React e TypeScript. Tem experiência com essas tecnologias?', 
        data: '2024-01-15 15:00',
        tipo: 'texto',
        lida: true
      },
      { 
        id: 3, 
        remetente: 'candidato', 
        texto: 'Sim, tenho 3 anos de experiência com React e 1 ano com TypeScript. Posso enviar meu portfólio?', 
        data: '2024-01-15 15:30',
        tipo: 'texto',
        lida: false
      },
      {
        id: 4,
        remetente: 'candidato',
        texto: 'portfolio-joao-silva.pdf',
        data: '2024-01-15 15:35',
        tipo: 'arquivo',
        arquivo: {
          nome: 'portfolio-joao-silva.pdf',
          tamanho: '2.5 MB',
          tipo: 'pdf'
        },
        lida: false
      }
    ],
    2: [
      { 
        id: 1, 
        remetente: 'candidato', 
        texto: 'Oi! Vi a vaga de Designer UX/UI e fiquei muito interessada', 
        data: '2024-01-14 10:00',
        tipo: 'texto',
        lida: true
      },
      { 
        id: 2, 
        remetente: 'empresa', 
        texto: 'Olá Maria! Que ótimo! Pode me contar um pouco sobre sua experiência?', 
        data: '2024-01-14 11:00',
        tipo: 'texto',
        lida: true
      },
      { 
        id: 3, 
        remetente: 'candidato', 
        texto: 'Tenho 5 anos de experiência em design de produtos digitais. Trabalhei em startups e agências', 
        data: '2024-01-14 12:00',
        tipo: 'texto',
        lida: true
      },
      { 
        id: 4, 
        remetente: 'empresa', 
        texto: 'Perfeito! Gostaria de agendar uma entrevista para amanhã às 14h?', 
        data: '2024-01-14 13:00',
        tipo: 'texto',
        lida: true
      },
      { 
        id: 5, 
        remetente: 'candidato', 
        texto: 'Obrigada pelo retorno! Quando posso agendar uma entrevista?', 
        data: '2024-01-14 14:00',
        tipo: 'texto',
        lida: false
      }
    ]
  }

  // Emojis populares organizados por categoria
  const emojis = {
    expressoes: ['😊', '😄', '😍', '🤔', '😅', '😉', '😎', '😴'],
    gestos: ['👍', '👋', '🤝', '👏', '🙏', '💪', '🎯', '🚀'],
    objetos: ['💼', '📝', '📞', '📧', '💻', '📱', '🎨', '📊'],
    simbolos: ['✅', '❌', '⭐', '💡', '🎉', '🔥', '💯', '✨']
  }

  // Filtrar mensagens
  const mensagensFiltradas = mensagens.filter(msg => {
    const matchFiltro = filtro === 'todas' || 
                       (filtro === 'nao-lidas' && !msg.lida) ||
                       (filtro === 'ativas' && msg.status === 'ativo') ||
                       (filtro === 'finalizadas' && msg.status === 'finalizado') ||
                       (filtro === 'contratados' && msg.status === 'contratado') ||
                       (filtro === 'online' && msg.online)
    
    const matchBusca = busca === '' || 
                      msg.candidato.toLowerCase().includes(busca.toLowerCase()) ||
                      msg.vaga.toLowerCase().includes(busca.toLowerCase()) ||
                      msg.email.toLowerCase().includes(busca.toLowerCase())
    
    return matchFiltro && matchBusca
  })

  const enviarMensagem = () => {
    if (novaMensagem.trim() && mensagemSelecionada) {
      // Simular envio de mensagem
      const novaMsg = {
        id: Date.now(),
        remetente: user.tipo === 'empresa' ? 'empresa' : 'candidato',
        texto: novaMensagem,
        data: new Date().toLocaleString('pt-BR'),
        tipo: 'texto',
        lida: false
      }
      
      // Atualizar histórico
      if (!historicoMensagens[mensagemSelecionada.id]) {
        historicoMensagens[mensagemSelecionada.id] = []
      }
      historicoMensagens[mensagemSelecionada.id].push(novaMsg)
      
      // Marcar como não lida para o outro usuário
      const msgAtualizada = mensagens.find(m => m.id === mensagemSelecionada.id)
      if (msgAtualizada) {
        msgAtualizada.lida = false
        msgAtualizada.ultimaMensagem = novaMensagem
        msgAtualizada.data = new Date().toLocaleDateString('pt-BR')
        msgAtualizada.ultimaAtividade = 'Agora'
      }
      
      setNovaMensagem('')
      setDigitando(false)
      
      // Scroll para baixo
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
      }, 100)
    }
  }

  const marcarComoLida = (msgId) => {
    const msg = mensagens.find(m => m.id === msgId)
    if (msg) {
      msg.lida = true
    }
  }

  const selecionarTemplate = (texto) => {
    setNovaMensagem(texto)
  }

  const adicionarEmoji = (emoji) => {
    setNovaMensagem(prev => prev + emoji)
    setShowEmojis(false)
    inputRef.current?.focus()
  }

  const anexarArquivo = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.doc,.docx,.jpg,.png,.zip'
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from(e.target.files)
      files.forEach(file => {
        const arquivo = {
          id: Date.now() + Math.random(),
          nome: file.name,
          tamanho: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          tipo: file.name.split('.').pop(),
          arquivo: file
        }
        setArquivosAnexados(prev => [...prev, arquivo])
      })
    }
    input.click()
  }

  const removerArquivo = (id) => {
    setArquivosAnexados(prev => prev.filter(arq => arq.id !== id))
  }

  const enviarComAnexos = () => {
    if ((novaMensagem.trim() || arquivosAnexados.length > 0) && mensagemSelecionada) {
      // Enviar mensagem de texto
      if (novaMensagem.trim()) {
        enviarMensagem()
      }
      
      // Enviar arquivos
      arquivosAnexados.forEach(arquivo => {
        const novaMsg = {
          id: Date.now() + Math.random(),
          remetente: user.tipo === 'empresa' ? 'empresa' : 'candidato',
          texto: arquivo.nome,
          data: new Date().toLocaleString('pt-BR'),
          tipo: 'arquivo',
          arquivo: {
            nome: arquivo.nome,
            tamanho: arquivo.tamanho,
            tipo: arquivo.tipo
          },
          lida: false
        }
        
        if (!historicoMensagens[mensagemSelecionada.id]) {
          historicoMensagens[mensagemSelecionada.id] = []
        }
        historicoMensagens[mensagemSelecionada.id].push(novaMsg)
      })
      
      setArquivosAnexados([])
    }
  }

  const simularDigitacao = () => {
    if (mensagemSelecionada) {
      setDigitando(true)
      setTimeout(() => setDigitando(false), 3000)
    }
  }

  useEffect(() => {
    if (mensagemSelecionada) {
      marcarComoLida(mensagemSelecionada.id)
      // Scroll para baixo
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
      }, 100)
    }
  }, [mensagemSelecionada])

  // Simular notificações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const mensagensNaoLidas = mensagens.filter(m => !m.lida)
      if (mensagensNaoLidas.length > 0) {
        const novaNotificacao = {
          id: Date.now(),
          titulo: 'Nova mensagem',
          mensagem: `${mensagensNaoLidas[0].candidato} enviou uma mensagem`,
          tempo: 'Agora'
        }
        setNotificacoes(prev => [novaNotificacao, ...prev.slice(0, 4)])
      }
    }, 10000) // A cada 10 segundos

    return () => clearInterval(interval)
  }, [mensagens])

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800'
      case 'finalizado': return 'bg-gray-100 text-gray-800'
      case 'contratado': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'ativo': return 'Ativo'
      case 'finalizado': return 'Finalizado'
      case 'contratado': return 'Contratado'
      default: return 'Desconhecido'
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

  const getIconeArquivo = (tipo) => {
    switch (tipo) {
      case 'pdf': return '📄'
      case 'doc':
      case 'docx': return '📝'
      case 'jpg':
      case 'png': return '🖼️'
      case 'zip': return '📦'
      default: return '📎'
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-8 px-4">
      {/* Header com notificações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
            Mensagens e Contatos
          </h1>
          {notificacoes.length > 0 && (
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificacoes.length}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Buscar conversas..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="todas">Todas as conversas</option>
            <option value="nao-lidas">Não lidas</option>
            <option value="ativas">Ativas</option>
            <option value="finalizadas">Finalizadas</option>
            <option value="contratados">Contratados</option>
            <option value="online">Online agora</option>
          </select>
          <button
            onClick={() => setShowNotificacoes(true)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            ⚙️ Configurações
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[calc(100vh-250px)] sm:h-[700px]">
        {/* Lista de mensagens */}
        <div className="bg-white rounded-lg shadow order-2 lg:order-1">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-bold text-gray-800">
              Conversas ({mensagensFiltradas.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {mensagensFiltradas.filter(m => !m.lida).length} não lidas
            </p>
          </div>
          <div className="overflow-y-auto h-[400px] sm:h-[600px]">
            {mensagensFiltradas.length > 0 ? (
              mensagensFiltradas.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setMensagemSelecionada(msg)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    mensagemSelecionada?.id === msg.id ? 'bg-blue-50 border-blue-200' : ''
                  } ${!msg.lida ? 'bg-yellow-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img 
                        src={msg.foto} 
                        alt={msg.candidato}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {msg.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">{msg.candidato}</h3>
                        <div className="flex items-center gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(msg.prioridade)}`}>
                            {msg.prioridade}
                          </span>
                          <span className="text-xs text-gray-500">{msg.data}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{msg.vaga}</p>
                      <p className="text-sm text-gray-700 truncate mb-2">{msg.ultimaMensagem}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                          {getStatusText(msg.status)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{msg.ultimaAtividade}</span>
                          {!msg.lida && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <span className="text-4xl mb-4 block">📭</span>
                <p>Nenhuma conversa encontrada</p>
              </div>
            )}
          </div>
        </div>

        {/* Área de chat */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col order-1 lg:order-2">
          {mensagemSelecionada ? (
            <>
              {/* Header do chat */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={mensagemSelecionada.foto} 
                        alt={mensagemSelecionada.candidato}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {mensagemSelecionada.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{mensagemSelecionada.candidato}</h3>
                      <p className="text-sm text-gray-600">{mensagemSelecionada.email}</p>
                      <p className="text-sm text-blue-600 font-medium">{mensagemSelecionada.vaga}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mensagemSelecionada.status)}`}>
                      {getStatusText(mensagemSelecionada.status)}
                    </span>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      📞
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      📧
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      ⭐
                    </button>
                  </div>
                </div>
                {digitando && (
                  <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span>{mensagemSelecionada.candidato} está digitando...</span>
                  </div>
                )}
              </div>

              {/* Mensagens */}
              <div ref={chatRef} className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {historicoMensagens[mensagemSelecionada.id] ? (
                    historicoMensagens[mensagemSelecionada.id].map((msg) => (
                      <div key={msg.id} className={`flex ${msg.remetente === 'empresa' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-[70%] ${
                          msg.remetente === 'empresa' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white border shadow-sm'
                        }`}>
                          {msg.tipo === 'arquivo' ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{getIconeArquivo(msg.arquivo.tipo)}</span>
                              <div>
                                <p className="text-sm font-medium">{msg.arquivo.nome}</p>
                                <p className={`text-xs ${msg.remetente === 'empresa' ? 'opacity-75' : 'text-gray-500'}`}>
                                  {msg.arquivo.tamanho}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm">{msg.texto}</p>
                          )}
                          <div className={`flex items-center justify-between mt-1 ${
                            msg.remetente === 'empresa' ? 'text-white' : 'text-gray-500'
                          }`}>
                            <p className="text-xs opacity-75">{msg.data}</p>
                            {msg.remetente === 'empresa' && (
                              <span className="text-xs">
                                {msg.lida ? '✓✓' : '✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <span className="text-2xl mb-2 block">💬</span>
                      <p>Nenhuma mensagem ainda</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Área de anexos */}
              {arquivosAnexados.length > 0 && (
                <div className="p-3 border-t bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {arquivosAnexados.map((arquivo) => (
                      <div key={arquivo.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border">
                        <span className="text-lg">{getIconeArquivo(arquivo.tipo)}</span>
                        <span className="text-sm">{arquivo.nome}</span>
                        <button
                          onClick={() => removerArquivo(arquivo.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input para nova mensagem */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => {
                      setNovaMensagem(e.target.value)
                      simularDigitacao()
                    }}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && enviarComAnexos()}
                  />
                  <button
                    onClick={enviarComAnexos}
                    disabled={!novaMensagem.trim() && arquivosAnexados.length === 0}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    Enviar
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={anexarArquivo}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    📎 Anexar
                  </button>
                  <button 
                    onClick={() => setShowEmojis(!showEmojis)}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    😊 Emoji
                  </button>
                  <button 
                    onClick={() => setShowTemplates(true)}
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    📋 Templates
                  </button>
                </div>
                
                {/* Seletor de emojis */}
                {showEmojis && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg border">
                    {Object.entries(emojis).map(([categoria, emojiList]) => (
                      <div key={categoria} className="mb-3">
                        <h4 className="text-xs font-medium text-gray-600 mb-2 capitalize">{categoria}</h4>
                        <div className="grid grid-cols-8 gap-2">
                          {emojiList.map((emoji, index) => (
                            <button
                              key={index}
                              onClick={() => adicionarEmoji(emoji)}
                              className="p-2 hover:bg-gray-200 rounded-lg text-lg transition-colors"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <span className="text-6xl mb-6 block">💬</span>
                <h3 className="text-xl font-semibold mb-2">Selecione uma conversa</h3>
                <p className="text-sm">Escolha uma conversa da lista para começar a trocar mensagens</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">💬</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-bold">{mensagens.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-yellow-600 text-xl">📬</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Não lidas</p>
              <p className="text-lg font-bold">{mensagens.filter(m => !m.lida).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">🟢</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Online</p>
              <p className="text-lg font-bold">{mensagens.filter(m => m.online).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-purple-600 text-xl">🎉</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Contratados</p>
              <p className="text-lg font-bold">{mensagens.filter(m => m.status === 'contratado').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      <ModalTemplates 
        isOpen={showTemplates} 
        onClose={() => setShowTemplates(false)}
        onSelectTemplate={selecionarTemplate}
      />
      
      <ModalNotificacoes 
        isOpen={showNotificacoes} 
        onClose={() => setShowNotificacoes(false)}
      />
    </div>
  )
} 