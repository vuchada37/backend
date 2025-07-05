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
    <div className="min-h-screen bg-gray-50">
      {/* Header fixo no topo */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {mensagemSelecionada && (
                <button
                  onClick={() => setMensagemSelecionada(null)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {mensagemSelecionada ? mensagemSelecionada.candidato : 'Mensagens'}
                </h1>
                <p className="text-sm text-gray-500">
                  {mensagemSelecionada ? mensagemSelecionada.vaga : `${mensagensFiltradas.length} conversas`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!mensagemSelecionada && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-32 sm:w-40 px-3 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              )}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="h-[calc(100dvh-80px)] flex flex-col">
        {/* Lista de conversas */}
        {!mensagemSelecionada && (
          <div className="flex-1 overflow-y-auto bg-white">
            {mensagensFiltradas.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {mensagensFiltradas.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setMensagemSelecionada(msg)}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-100"
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        src={msg.foto} 
                        alt={msg.candidato}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {msg.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {!msg.lida && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-white font-medium">
                            {Math.min(99, Math.floor(Math.random() * 10) + 1)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{msg.candidato}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{msg.data}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-1">{msg.vaga}</p>
                      <p className={`text-sm truncate ${!msg.lida ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                        {msg.ultimaMensagem}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                        {getStatusText(msg.status)}
                      </span>
                      <span className="text-xs text-gray-400">{msg.ultimaAtividade}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma conversa</h3>
                <p className="text-gray-500">Você ainda não tem conversas ativas</p>
              </div>
            )}
          </div>
        )}

        {/* Chat */}
        {mensagemSelecionada && (
          <div className="flex-1 flex flex-col bg-gray-50 min-h-0">
            {/* Status do usuário */}
            <div className="bg-white border-b px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="relative">
                <img 
                  src={mensagemSelecionada.foto} 
                  alt={mensagemSelecionada.candidato}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {mensagemSelecionada.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{mensagemSelecionada.candidato}</h3>
                <p className="text-sm text-gray-500">{mensagemSelecionada.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(mensagemSelecionada.status)}`}>
                  {getStatusText(mensagemSelecionada.status)}
                </span>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  📞
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4" style={{paddingBottom: '92px'}}>
              {historicoMensagens[mensagemSelecionada.id] ? (
                historicoMensagens[mensagemSelecionada.id].map((msg) => (
                  <div key={msg.id} className={`flex ${msg.remetente === 'empresa' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.remetente === 'empresa' ? 'order-2' : 'order-1'}`}>
                      <div className={`px-4 py-2 rounded-2xl ${
                        msg.remetente === 'empresa' 
                          ? 'bg-blue-500 text-white rounded-br-md' 
                          : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                      }`}>
                        {msg.tipo === 'arquivo' ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getIconeArquivo(msg.arquivo.tipo)}</span>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{msg.arquivo.nome}</p>
                              <p className={`text-xs ${msg.remetente === 'empresa' ? 'opacity-75' : 'text-gray-500'}`}>
                                {msg.arquivo.tamanho}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{msg.texto}</p>
                        )}
                      </div>
                      <div className={`flex items-center gap-2 mt-1 px-1 ${
                        msg.remetente === 'empresa' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs text-gray-400">{msg.data}</span>
                        {msg.remetente === 'empresa' && (
                          <span className="text-xs text-gray-400">
                            {msg.lida ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl">💬</span>
                  </div>
                  <p className="text-gray-500 text-sm">Nenhuma mensagem ainda</p>
                  <p className="text-gray-400 text-xs mt-1">Inicie uma conversa</p>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="bg-white border-t p-4 flex-shrink-0 sticky bottom-0 z-10">
              {arquivosAnexados.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {arquivosAnexados.map((arquivo) => (
                    <div key={arquivo.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                      <span className="text-sm">{getIconeArquivo(arquivo.tipo)}</span>
                      <span className="text-xs truncate max-w-[120px]">{arquivo.nome}</span>
                      <button
                        onClick={() => removerArquivo(arquivo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-end gap-3">
                <div className="flex-1 bg-gray-50 rounded-full px-4 py-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => {
                      setNovaMensagem(e.target.value)
                      simularDigitacao()
                    }}
                    placeholder="Digite uma mensagem..."
                    className="w-full bg-transparent border-none outline-none text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={anexarArquivo}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    📎
                  </button>
                  <button 
                    onClick={() => setShowEmojis(!showEmojis)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    😊
                  </button>
                  <button 
                    onClick={() => setShowTemplates(true)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    📋
                  </button>
                  <button
                    onClick={enviarMensagem}
                    disabled={!novaMensagem.trim()}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {showEmojis && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji, index) => (
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
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal de templates */}
      {showTemplates && (
        <Modal
          title="Templates de Mensagem"
          onClose={() => setShowTemplates(false)}
        >
          <div className="space-y-3">
            {templates.map((template, index) => (
              <button
                key={index}
                onClick={() => {
                  setNovaMensagem(template.texto)
                  setShowTemplates(false)
                }}
                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-900 mb-1">{template.titulo}</h4>
                <p className="text-sm text-gray-600">{template.texto}</p>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal de notificações */}
      {showNotificacoes && (
        <Modal
          title="Notificações"
          onClose={() => setShowNotificacoes(false)}
        >
          <div className="space-y-3">
            {notificacoes.map((notif, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">{notif.titulo}</h4>
                <p className="text-sm text-gray-600">{notif.mensagem}</p>
                <span className="text-xs text-gray-400 mt-2 block">{notif.tempo}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
} 