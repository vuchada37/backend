import { useAuth } from '../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import { ModalTemplates, ModalNotificacoes } from '../components/Modal'

export default function MensagensMelhorada() {
  const { user } = useAuth()
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null)
  const [novaMensagem, setNovaMensagem] = useState('')
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
    ]
  }

  // Emojis populares
  const emojis = ['😊', '👍', '👋', '🎉', '💼', '📝', '✅', '❌', '🤝', '💡', '🚀', '⭐', '💪', '🎯', '📞', '📧']

  // Filtrar mensagens apenas por busca
  const mensagensFiltradas = mensagens.filter(msg => {
    const matchBusca = busca === '' || 
                      msg.candidato.toLowerCase().includes(busca.toLowerCase()) ||
                      msg.vaga.toLowerCase().includes(busca.toLowerCase()) ||
                      msg.email.toLowerCase().includes(busca.toLowerCase())
    
    return matchBusca
  })

  const enviarMensagem = () => {
    if (novaMensagem.trim() && mensagemSelecionada) {
      const novaMsg = {
        id: Date.now(),
        remetente: user.tipo === 'empresa' ? 'empresa' : 'candidato',
        texto: novaMensagem,
        data: new Date().toLocaleString('pt-BR'),
        tipo: 'texto',
        lida: false
      }
      
      if (!historicoMensagens[mensagemSelecionada.id]) {
        historicoMensagens[mensagemSelecionada.id] = []
      }
      historicoMensagens[mensagemSelecionada.id].push(novaMsg)
      
      const msgAtualizada = mensagens.find(m => m.id === mensagemSelecionada.id)
      if (msgAtualizada) {
        msgAtualizada.lida = false
        msgAtualizada.ultimaMensagem = novaMensagem
        msgAtualizada.data = new Date().toLocaleDateString('pt-BR')
        msgAtualizada.ultimaAtividade = 'Agora'
      }
      
      setNovaMensagem('')
      setDigitando(false)
      
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

  const simularDigitacao = () => {
    if (mensagemSelecionada) {
      setDigitando(true)
      setTimeout(() => setDigitando(false), 3000)
    }
  }

  useEffect(() => {
    if (mensagemSelecionada) {
      marcarComoLida(mensagemSelecionada.id)
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
    }, 10000)

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header da página */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Mensagens</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Gerencie suas conversas com candidatos</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar conversas..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-8 pr-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm w-32 sm:w-48 lg:w-64"
                />
                <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="p-2 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {/* Container principal com altura responsiva */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6" style={{ height: 'calc(100vh - 200px)' }}>
          {/* Lista de mensagens - escondida quando conversa selecionada */}
          {!mensagemSelecionada && (
            <div className="bg-white rounded-lg shadow order-2 lg:order-1 lg:col-span-1 col-span-full h-full">
              <div className="p-3 sm:p-4 border-b bg-gray-50 flex-shrink-0">
                <h2 className="font-bold text-gray-800 text-sm sm:text-base">
                  Conversas ({mensagensFiltradas.length})
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {mensagensFiltradas.filter(m => !m.lida).length} não lidas
                </p>
              </div>
              <div className="overflow-y-auto h-[calc(100%-80px)] sm:h-[calc(100%-90px)] lg:h-[calc(100%-100px)]">
                {mensagensFiltradas.length > 0 ? (
                  mensagensFiltradas.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setMensagemSelecionada(msg)}
                      className={`p-3 sm:p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        mensagemSelecionada?.id === msg.id ? 'bg-blue-50 border-blue-200' : ''
                      } ${!msg.lida ? 'bg-yellow-50' : ''}`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={msg.foto} 
                            alt={msg.candidato}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                          />
                          {msg.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base">{msg.candidato}</h3>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getPrioridadeColor(msg.prioridade)}`}>
                                {msg.prioridade}
                              </span>
                              <span className="text-xs text-gray-500">{msg.data}</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-1">{msg.vaga}</p>
                          <p className="text-xs sm:text-sm text-gray-700 truncate mb-2">{msg.ultimaMensagem}</p>
                          <div className="flex items-center justify-between">
                            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                              {getStatusText(msg.status)}
                            </span>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className="text-xs text-gray-500">{msg.ultimaAtividade}</span>
                              {!msg.lida && (
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 sm:p-8 text-center text-gray-500">
                    <span className="text-3xl sm:text-4xl mb-4 block">📭</span>
                    <p className="text-sm sm:text-base">Nenhuma conversa encontrada</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Área de chat - ocupa toda a largura quando conversa selecionada */}
          {mensagemSelecionada && (
            <div className={`bg-white rounded-lg shadow flex flex-col order-1 h-full ${
              mensagemSelecionada ? 'lg:col-span-3' : 'lg:col-span-2'
            }`}>
              <>
                {/* Header do chat com botão voltar */}
                <div className="p-3 sm:p-4 border-b bg-gray-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => setMensagemSelecionada(null)}
                        className="lg:hidden p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div className="relative flex-shrink-0">
                        <img 
                          src={mensagemSelecionada.foto} 
                          alt={mensagemSelecionada.candidato}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        {mensagemSelecionada.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">{mensagemSelecionada.candidato}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{mensagemSelecionada.email}</p>
                        <p className="text-xs sm:text-sm text-blue-600 font-medium truncate">{mensagemSelecionada.vaga}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mensagemSelecionada.status)}`}>
                        {getStatusText(mensagemSelecionada.status)}
                      </span>
                      <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        📞
                      </button>
                      <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                        📧
                      </button>
                    </div>
                  </div>
                  {digitando && (
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="truncate">{mensagemSelecionada.candidato} está digitando...</span>
                    </div>
                  )}
                </div>

                {/* Mensagens */}
                <div ref={chatRef} className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50 min-h-0" style={{ maxHeight: 'calc(100vh - 350px)' }}>
                  <div className="space-y-3 sm:space-y-4">
                    {historicoMensagens[mensagemSelecionada.id] ? (
                      historicoMensagens[mensagemSelecionada.id].map((msg) => (
                        <div key={msg.id} className={`flex ${msg.remetente === 'empresa' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-2 sm:p-3 rounded-lg max-w-[85%] sm:max-w-[70%] ${
                            msg.remetente === 'empresa' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border shadow-sm'
                          }`}>
                            {msg.tipo === 'arquivo' ? (
                              <div className="flex items-center gap-2">
                                <span className="text-base sm:text-lg">{getIconeArquivo(msg.arquivo.tipo)}</span>
                                <div className="min-w-0">
                                  <p className="text-xs sm:text-sm font-medium truncate">{msg.arquivo.nome}</p>
                                  <p className={`text-xs ${msg.remetente === 'empresa' ? 'opacity-75' : 'text-gray-500'}`}>
                                    {msg.arquivo.tamanho}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs sm:text-sm">{msg.texto}</p>
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
                      <div className="text-center text-gray-500 py-6 sm:py-8">
                        <span className="text-xl sm:text-2xl mb-2 block">💬</span>
                        <p className="text-sm sm:text-base">Nenhuma mensagem ainda</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Área de anexos */}
                {arquivosAnexados.length > 0 && (
                  <div className="p-2 sm:p-3 border-t bg-gray-50 flex-shrink-0">
                    <div className="flex flex-wrap gap-2">
                      {arquivosAnexados.map((arquivo) => (
                        <div key={arquivo.id} className="flex items-center gap-2 bg-white p-2 rounded-lg border">
                          <span className="text-base sm:text-lg">{getIconeArquivo(arquivo.tipo)}</span>
                          <span className="text-xs sm:text-sm truncate max-w-[150px]">{arquivo.nome}</span>
                          <button
                            onClick={() => removerArquivo(arquivo.id)}
                            className="text-red-500 hover:text-red-700 flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input para nova mensagem */}
                <div className="p-3 sm:p-4 border-t bg-white flex-shrink-0">
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={novaMensagem}
                      onChange={(e) => {
                        setNovaMensagem(e.target.value)
                        simularDigitacao()
                      }}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                    />
                    <button
                      onClick={enviarMensagem}
                      disabled={!novaMensagem.trim()}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm font-medium"
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
                    <div className="mt-2 p-2 sm:p-3 bg-gray-50 rounded-lg border">
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-2">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => adicionarEmoji(emoji)}
                            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg text-base sm:text-lg transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            </div>
          )}
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
    </div>
  )
} 