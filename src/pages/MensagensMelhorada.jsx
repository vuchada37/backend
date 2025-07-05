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

  // Responsividade: detectar se é mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Função para renderizar o header do chat
  function ChatHeader() {
    if (!mensagemSelecionada) return null
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10 shadow-sm">
        {/* Botão voltar no mobile */}
        {isMobile && (
          <button onClick={() => setMensagemSelecionada(null)} className="mr-2 p-2 rounded-full hover:bg-blue-50 transition">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {/* Avatar e nome */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img src={mensagemSelecionada.foto} alt={mensagemSelecionada.candidato} className="w-12 h-12 rounded-full object-cover border-2 border-blue-100" />
          <div className="min-w-0">
            <div className="font-semibold text-gray-800 truncate text-base">{mensagemSelecionada.candidato}</div>
            <div className="text-xs text-gray-500 truncate">{mensagemSelecionada.vaga}</div>
            <div className="text-xs text-green-600 font-medium">{mensagemSelecionada.online ? 'Online' : `Última atividade: ${mensagemSelecionada.ultimaAtividade}`}</div>
          </div>
        </div>
        {/* Ícones de ação */}
        <div className="flex items-center gap-2 ml-2">
          <button className="p-2 rounded-full hover:bg-blue-50 transition" title="Ligar"><svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l7 7-7 7M22 12H3" /></svg></button>
          <button className="p-2 rounded-full hover:bg-blue-50 transition" title="Adicionar"><svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
          <button className="p-2 rounded-full hover:bg-blue-50 transition" title="Mais opções"><svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg></button>
        </div>
      </div>
    )
  }

  // Função para renderizar balões de mensagem
  function ChatBaloes() {
    if (!mensagemSelecionada) return null
    const msgs = historicoMensagens[mensagemSelecionada.id] || []
    return (
      <div className="p-4" ref={chatRef}>
        {msgs.length === 0 && (
          <div className="text-center text-gray-400 py-4">Nenhuma mensagem ainda</div>
        )}
        {msgs.map((msg, idx) => (
          <div key={msg.id || idx} className={`mb-2 flex ${msg.remetente === (user.tipo === 'empresa' ? 'empresa' : 'candidato') ? 'justify-end' : 'justify-start'}`} >
            <div className={`max-w-xs sm:max-w-md px-4 py-2 rounded-2xl shadow text-sm relative
              ${msg.remetente === (user.tipo === 'empresa' ? 'empresa' : 'candidato') ? 'bg-blue-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'}`}
            >
              {msg.tipo === 'texto' ? msg.texto : (
                <a href="#" className="underline flex items-center gap-2">
                  <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01" /></svg>
                  {msg.texto}
                </a>
              )}
              {/* Status de envio */}
              <div className="flex items-center gap-1 mt-1 text-xs">
                <span className="text-gray-300">{msg.data}</span>
                {msg.lida && <span className="text-green-400">✓✓</span>}
                {!msg.lida && <span className="text-gray-400">✓</span>}
                {msg.status === 'erro' && <span className="text-red-500">!</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Função para renderizar o campo de digitação
  function ChatInput() {
    if (!mensagemSelecionada) return null
    return (
      <div className={`${isMobile ? 'fixed bottom-16 left-0 right-0 z-50' : 'sticky bottom-0 z-20'} border-t p-3 bg-white flex items-center gap-2 shadow-md`}>
        <button onClick={() => setShowEmojis(!showEmojis)} className="p-2 rounded-full hover:bg-blue-50 transition text-xl">😊</button>
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-50"
          placeholder="Digite uma mensagem..."
          value={novaMensagem}
          onChange={e => setNovaMensagem(e.target.value)}
          onFocus={() => setDigitando(true)}
          onBlur={() => setDigitando(false)}
          onKeyDown={e => e.key === 'Enter' && enviarMensagem()}
        />
        <button onClick={anexarArquivo} className="p-2 rounded-full hover:bg-blue-50 transition text-xl">📎</button>
        <button
          onClick={enviarMensagem}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full font-semibold transition shadow-md"
          disabled={!novaMensagem.trim()}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4-4v8" /></svg>
        </button>
      </div>
    )
  }

  // Renderização condicional
  return (
    <div className="relative bg-gray-50">
      {/* Header fixo principal */}
      <header className={`fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 flex items-center justify-between px-4 ${isMobile ? 'py-0' : 'py-3'} shadow-sm`}>
        {/* Botão voltar no mobile quando chat não está aberto */}
        {isMobile && mensagemSelecionada && (
          <button onClick={() => setMensagemSelecionada(null)} className="mr-2 p-2 rounded-full hover:bg-blue-50 transition">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <span className="text-xl font-bold text-blue-700 mx-auto">Mensagens</span>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-blue-50 transition">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </header>
      {!isMobile && <div className="h-16" />}

      {/* Layout responsivo: split view no desktop, troca no mobile */}
      <div className="max-w-5xl mx-auto flex bg-transparent">
        {/* Lista de conversas */}
        {(!isMobile || !mensagemSelecionada) && (
          <div className={`w-full md:w-1/3 md:max-w-xs border-r bg-gray-50 px-2 sm:px-0 ${isMobile ? 'overflow-y-auto pb-16' : 'rounded-l-xl pt-4'}`} style={isMobile ? {paddingTop: 0, marginTop: '-8px'} : {}}>
            {mensagensFiltradas.length === 0 && (
              <div className="text-center text-gray-400 py-8">Nenhuma conversa encontrada</div>
            )}
            <ul className="space-y-2" style={isMobile ? {paddingTop:0, marginTop:0} : {}}>
              {mensagensFiltradas.map((msg, idx) => (
                <li
                  key={msg.id}
                  className={`group bg-white rounded-xl shadow flex items-center gap-3 px-4 py-3 cursor-pointer transition hover:shadow-lg border border-transparent hover:border-blue-200 ${mensagemSelecionada?.id === msg.id ? 'ring-2 ring-blue-400' : ''}`}
                  style={isMobile && idx === 0 ? {marginTop:0, paddingTop:0} : {}}
                  onClick={() => { setMensagemSelecionada(msg); marcarComoLida(msg.id); }}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={msg.foto}
                      alt={msg.candidato}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    {/* Status online */}
                    {msg.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                    )}
                  </div>
                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 truncate">{msg.candidato}</span>
                      {/* Badge prioridade */}
                      {msg.prioridade === 'alta' && <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 font-bold">Alta</span>}
                      {msg.prioridade === 'media' && <span className="ml-1 px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700 font-bold">Média</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`truncate text-sm ${msg.lida ? 'text-gray-500' : 'text-blue-700 font-medium'}`}>{msg.ultimaMensagem}</span>
                      {/* Badge não lida */}
                      {!msg.lida && <span className="ml-1 w-2 h-2 bg-blue-600 rounded-full inline-block" />}
                    </div>
                  </div>
                  {/* Horário */}
                  <div className="flex flex-col items-end min-w-[56px]">
                    <span className="text-xs text-gray-400">{msg.ultimaAtividade}</span>
                    {/* Ícone de erro se necessário */}
                    {msg.status === 'erro' && (
                      <span title="Erro ao enviar" className="text-red-500 text-lg">!</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Área do chat */}
        {((!isMobile && mensagemSelecionada) || (isMobile && mensagemSelecionada)) ? (
          <div className={`flex-1 flex flex-col bg-white rounded-r-xl shadow-lg ${isMobile ? 'fixed inset-0 z-40 pt-16' : ''}`} style={{minWidth:0}}>
            {/* Header do chat melhorado */}
            <ChatHeader />
            {/* Balões de mensagem melhorados */}
            <div className={`flex-1 ${isMobile ? 'overflow-y-auto pb-28' : ''}`} ref={chatRef}>
              <ChatBaloes />
            </div>
            {/* Campo de digitação melhorado */}
            <ChatInput />
          </div>
        ) : (
          // Desktop: área do chat vazia
          !isMobile && (
            <div className="flex-1 flex items-center justify-center bg-white rounded-r-xl">
              <div className="text-gray-400 text-lg">Selecione uma conversa para começar</div>
            </div>
          )
        )}
      </div>

      {/* Botão flutuante para nova conversa */}
      {!mensagemSelecionada && (
        <button
          className="fixed right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition"
          style={{bottom: isMobile ? '5rem' : '2rem'}}
          title="Nova conversa"
          onClick={() => alert('Funcionalidade de nova conversa em breve!')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4-4v8" />
          </svg>
          <span className="hidden sm:inline">Nova conversa</span>
        </button>
      )}

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