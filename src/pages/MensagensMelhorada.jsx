import { useAuth } from '../context/AuthContext'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

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
  const listaConversasRef = useRef(null) // ADICIONADO
  const [showMenu, setShowMenu] = useState(false)
  const [showNovaConversa, setShowNovaConversa] = useState(false)
  const [usuariosDisponiveis, setUsuariosDisponiveis] = useState([])
  const [buscaUsuario, setBuscaUsuario] = useState('')
  const navigate = useNavigate()

  // Mock de mensagens mais realista
  const [mensagens, setMensagens] = useState([
    // Candidatos
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
    // Empresas
    {
      id: 10,
      candidato: 'Empresa XPTO',
      empresa: 'Empresa XPTO',
      email: 'contato@xpto.com',
      telefone: '+55 11 99999-9999',
      vaga: 'Vaga para Dev',
      data: '2024-01-20',
      ultimaMensagem: 'Olá, temos interesse no seu perfil!',
      lida: false,
      status: 'ativo',
      tipo: 'empresa',
      online: true,
      ultimaAtividade: 'Agora',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      prioridade: 'alta'
    },
    {
      id: 11,
      candidato: 'Neotrix',
      empresa: 'Neotrix',
      email: 'neotrixtecnologias37@gmail.com',
      telefone: '872664074',
      vaga: 'Parceria em tecnologia',
      data: '2024-01-22',
      ultimaMensagem: 'Tecnologias ao seu alcance!',
      lida: false,
      status: 'ativo',
      tipo: 'empresa',
      online: true,
      ultimaAtividade: 'Agora',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      prioridade: 'alta',
      localizacao: 'Gurue, Moçambique',
      slogan: 'Tecnologias ao seu alcance'
    },
    // Chamado (suporte)
    {
      id: 20,
      candidato: 'Suporte Nevú',
      empresa: 'Nevú',
      email: 'suporte@nevu.com',
      telefone: '',
      vaga: 'Suporte',
      data: '2024-01-22',
      ultimaMensagem: 'Seu chamado foi recebido!',
      lida: true,
      status: 'ativo',
      tipo: 'chamado',
      online: false,
      ultimaAtividade: 'Há 1h',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      prioridade: 'media'
    },
  ])

  // Mock de histórico de mensagens mais realista
  const [historicoMensagens, setHistoricoMensagens] = useState({
    1: [
      { id: 1, remetente: 'candidato', texto: 'Olá! Gostaria de saber mais sobre a vaga de Desenvolvedor Frontend', data: '2024-01-15 14:30', tipo: 'texto', lida: true },
      { id: 2, remetente: 'empresa', texto: 'Olá João! Obrigada pelo interesse. A vaga é para trabalhar com React e TypeScript. Tem experiência com essas tecnologias?', data: '2024-01-15 15:00', tipo: 'texto', lida: true },
      { id: 3, remetente: 'candidato', texto: 'Sim, tenho 3 anos de experiência com React e 1 ano com TypeScript. Posso enviar meu portfólio?', data: '2024-01-15 15:30', tipo: 'texto', lida: false },
      { id: 4, remetente: 'candidato', texto: 'portfolio-joao-silva.pdf', data: '2024-01-15 15:35', tipo: 'arquivo', arquivo: { nome: 'portfolio-joao-silva.pdf', tamanho: '2.5 MB', tipo: 'pdf' }, lida: false }
    ],
    2: [
      { id: 1, remetente: 'candidato', texto: 'Olá, gostaria de saber mais sobre a vaga de Designer.', data: '2024-01-14 10:00', tipo: 'texto', lida: true },
      { id: 2, remetente: 'empresa', texto: 'Olá Maria! A vaga é para UI/UX com foco em mobile. Tem interesse?', data: '2024-01-14 10:10', tipo: 'texto', lida: true },
      { id: 3, remetente: 'candidato', texto: 'Sim, tenho interesse! Quando posso agendar uma entrevista?', data: '2024-01-14 10:15', tipo: 'texto', lida: false }
    ],
    10: [
      { id: 1, remetente: 'empresa', texto: 'Olá! Vimos seu perfil e achamos interessante para nossa vaga.', data: '2024-01-20 09:00', tipo: 'texto', lida: true },
      { id: 2, remetente: 'candidato', texto: 'Obrigado! Gostaria de saber mais sobre a empresa XPTO.', data: '2024-01-20 09:05', tipo: 'texto', lida: true },
      { id: 3, remetente: 'empresa', texto: 'Claro! Somos referência em tecnologia e inovação.', data: '2024-01-20 09:10', tipo: 'texto', lida: false }
    ],
    11: [
      { id: 1, remetente: 'empresa', texto: 'Bem-vindo à Neotrix! Tecnologias ao seu alcance.', data: '2024-01-22 08:00', tipo: 'texto', lida: true },
      { id: 2, remetente: 'candidato', texto: 'Olá Neotrix! Gostaria de saber mais sobre seus serviços.', data: '2024-01-22 08:05', tipo: 'texto', lida: true },
      { id: 3, remetente: 'empresa', texto: 'Atuamos em Moçambique com soluções inovadoras. Podemos marcar uma reunião?', data: '2024-01-22 08:10', tipo: 'texto', lida: false }
    ],
    20: [
      { id: 1, remetente: 'chamado', texto: 'Olá, preciso de suporte com minha conta.', data: '2024-01-22 07:00', tipo: 'texto', lida: true },
      { id: 2, remetente: 'empresa', texto: 'Olá! Seu chamado foi recebido. Em breve entraremos em contato.', data: '2024-01-22 07:05', tipo: 'texto', lida: true }
    ]
  });

  // Emojis populares
  const emojis = ['😊', '👍', '👋', '🎉', '💼', '📝', '✅', '❌', '🤝', '💡', '🚀', '⭐', '💪', '🎯', '📞', '📧']

  // Templates de mensagem
  const templates = [
    {
      titulo: 'Saudação',
      texto: 'Olá! Como posso ajudá-lo hoje?'
    },
    {
      titulo: 'Agradecimento',
      texto: 'Obrigado pelo seu interesse!'
    },
    {
      titulo: 'Agendamento',
      texto: 'Gostaria de agendar uma entrevista?'
    },
    {
      titulo: 'Informações',
      texto: 'Posso fornecer mais informações sobre a vaga.'
    }
  ]

  // Mock de usuários disponíveis para conversa
  const usuariosMock = [
    {
      id: 101,
      nome: 'Ana Silva',
      email: 'ana.silva@email.com',
      tipo: 'candidato',
      profissao: 'Desenvolvedora Full Stack',
      localizacao: 'Maputo, Moçambique',
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      online: true,
      ultimaAtividade: 'Agora',
      disponivel: true
    },
    {
      id: 102,
      nome: 'Carlos Mendes',
      email: 'carlos.mendes@email.com',
      tipo: 'candidato',
      profissao: 'Designer UX/UI',
      localizacao: 'Beira, Moçambique',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      online: false,
      ultimaAtividade: 'Há 2 horas',
      disponivel: true
    },
    {
      id: 103,
      nome: 'TechSolutions Ltda',
      email: 'contato@techsolutions.co.mz',
      tipo: 'empresa',
      setor: 'Tecnologia',
      localizacao: 'Maputo, Moçambique',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      online: true,
      ultimaAtividade: 'Agora',
      disponivel: true,
      vagasAtivas: 3
    },
    {
      id: 104,
      nome: 'Digital Innovations',
      email: 'info@digitalinnovations.co.mz',
      tipo: 'empresa',
      setor: 'Inovação Digital',
      localizacao: 'Nampula, Moçambique',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      online: false,
      ultimaAtividade: 'Há 1 dia',
      disponivel: true,
      vagasAtivas: 1
    },
    {
      id: 105,
      nome: 'Maria Costa',
      email: 'maria.costa@email.com',
      tipo: 'candidato',
      profissao: 'Analista de Dados',
      localizacao: 'Quelimane, Moçambique',
      foto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      online: true,
      ultimaAtividade: 'Agora',
      disponivel: true
    }
  ]

  // Filtrar mensagens conforme tipo de usuário logado
  const mensagensFiltradas = mensagens.filter(msg => {
    // Filtrar por tipo de usuário
    let tipoValido = true
    if (user?.tipo === 'empresa') {
      tipoValido = msg.tipo === 'candidato' || (msg.tipo === 'empresa' && msg.empresa !== user.nome)
    } else if (user?.tipo === 'candidato') {
      tipoValido = msg.tipo === 'empresa' || msg.tipo === 'chamado'
    }
    
    // Filtrar por busca
    const matchBusca = busca === '' || 
                      msg.candidato.toLowerCase().includes(busca.toLowerCase()) ||
                      msg.vaga.toLowerCase().includes(busca.toLowerCase()) ||
                      msg.email.toLowerCase().includes(busca.toLowerCase())
    
    return tipoValido && matchBusca
  })

  // Garantir que a lista de conversas sempre comece no topo ao montar ou ao filtrar
  useEffect(() => {
    if (listaConversasRef.current) {
      listaConversasRef.current.scrollTop = 0;
    }
  }, [mensagensFiltradas.length]);

  // Filtrar usuários disponíveis para conversa
  const usuariosFiltrados = usuariosMock.filter(usuario => {
    // Não mostrar o próprio usuário
    if (usuario.email === user?.email) return false
    
    // Filtrar por busca
    const matchBusca = buscaUsuario === '' || 
                      usuario.nome.toLowerCase().includes(buscaUsuario.toLowerCase()) ||
                      usuario.email.toLowerCase().includes(buscaUsuario.toLowerCase()) ||
                      (usuario.profissao && usuario.profissao.toLowerCase().includes(buscaUsuario.toLowerCase())) ||
                      (usuario.setor && usuario.setor.toLowerCase().includes(buscaUsuario.toLowerCase()))
    
    return matchBusca && usuario.disponivel
  })

  const enviarMensagem = useCallback(() => {
    console.log('Tentando enviar mensagem:', novaMensagem, 'Mensagem selecionada:', mensagemSelecionada)
    if (novaMensagem.trim() && mensagemSelecionada) {
      const novaMsg = {
        id: Date.now(),
        remetente: user.tipo === 'empresa' ? 'empresa' : 'candidato',
        texto: novaMensagem,
        data: new Date().toLocaleString('pt-BR'),
        tipo: 'texto',
        lida: false
      }
      
      setHistoricoMensagens(prev => {
        const prevMsgs = prev[mensagemSelecionada.id] || [];
        return {
          ...prev,
          [mensagemSelecionada.id]: [...prevMsgs, novaMsg]
        };
      });
      
      // Atualizar o estado das mensagens
      setMensagens(prevMensagens => 
        prevMensagens.map(msg => 
          msg.id === mensagemSelecionada.id 
            ? {
                ...msg,
                lida: false,
                ultimaMensagem: novaMensagem,
                data: new Date().toLocaleDateString('pt-BR'),
                ultimaAtividade: 'Agora'
              }
            : msg
        )
      )
      
      setNovaMensagem('')
      setDigitando(false)
      
      // Manter o foco no input
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
      }, 100)
    }
  }, [novaMensagem, mensagemSelecionada, user.tipo])

  const marcarComoLida = (msgId) => {
    setMensagens(prevMensagens => 
      prevMensagens.map(msg => 
        msg.id === msgId ? { ...msg, lida: true } : msg
      )
    )
  }

  const selecionarTemplate = (texto) => {
    setNovaMensagem(texto)
  }

  const adicionarEmoji = (emoji) => {
    setNovaMensagem(prev => prev + emoji)
    setShowEmojis(false)
    inputRef.current?.focus()
  }

  const anexarArquivo = useCallback(() => {
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
  }, [])

  const removerArquivo = (id) => {
    setArquivosAnexados(prev => prev.filter(arq => arq.id !== id))
  }

  const simularDigitacao = () => {
    if (mensagemSelecionada) {
      setDigitando(true)
      setTimeout(() => setDigitando(false), 3000)
    }
  }

  const iniciarNovaConversa = (usuario) => {
    // Criar uma nova conversa com o usuário selecionado
    const novaConversa = {
      id: Date.now(),
      candidato: usuario.nome,
      empresa: usuario.nome,
      email: usuario.email,
      telefone: '',
      vaga: usuario.tipo === 'candidato' ? usuario.profissao : `${usuario.setor} - ${usuario.vagasAtivas} vagas ativas`,
      data: new Date().toISOString().split('T')[0],
      ultimaMensagem: 'Nova conversa iniciada',
      lida: false,
      status: 'ativo',
      tipo: usuario.tipo,
      online: usuario.online,
      ultimaAtividade: usuario.ultimaAtividade,
      foto: usuario.foto,
      prioridade: 'media'
    }

    // Adicionar à lista de mensagens
    setMensagens(prevMensagens => [novaConversa, ...prevMensagens])
    
    // Inicializar histórico vazio
    setHistoricoMensagens(prev => ({
      ...prev,
      [novaConversa.id]: []
    }));
    
    // Selecionar a nova conversa
    setMensagemSelecionada(novaConversa)
    setShowNovaConversa(false)
    setBuscaUsuario('')
  }

  useEffect(() => {
    if (mensagemSelecionada) {
      marcarComoLida(mensagemSelecionada.id)
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }, [mensagemSelecionada])

  // Foco no input ao enviar mensagem
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [novaMensagem])

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

  useEffect(() => {
    if (!isMobile) {
      // No desktop, ao entrar, desce a página
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      // No mobile, sobe para o topo
    window.scrollTo(0, 0);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile && mensagemSelecionada) {
      window.scrollTo(0, 0);
    }
  }, [mensagemSelecionada, isMobile]);

  // Função para renderizar o header do chat
  function ChatHeader() {
    if (!mensagemSelecionada) return null
    const mobile = isMobile;
    return (
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4 border-b bg-white sticky top-0 z-10 shadow-sm">
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
          <img src={mensagemSelecionada.foto} alt={mensagemSelecionada.candidato} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-blue-100" />
          <div className="min-w-0">
            <div className="font-semibold text-gray-800 truncate text-base lg:text-lg">{mensagemSelecionada.candidato}</div>
            <div className="text-xs lg:text-sm text-gray-500 truncate">{mensagemSelecionada.vaga}</div>
            <div className="text-xs lg:text-sm text-green-600 font-medium">
              {mensagemSelecionada.online ? 'Online' : `Última atividade: ${mensagemSelecionada.ultimaAtividade}`}
            </div>
          </div>
        </div>
        {/* Ícones de ação */}
        <div className="flex items-center gap-2 ml-2 relative">
          <button
            className="p-2 rounded-full hover:bg-blue-50 transition"
            title="Mais opções"
            onClick={e => { e.stopPropagation(); setShowMenu(v => !v); }}
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="1.5"/>
              <circle cx="19" cy="12" r="1.5"/>
              <circle cx="5" cy="12" r="1.5"/>
            </svg>
          </button>
          {showMenu && (
            <div className={`absolute right-0 w-48 bg-white border rounded-lg shadow-lg z-50 animate-fade-in`} style={mobile ? {marginTop: 72} : {marginTop: 8}}>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => {
                setShowMenu(false);
                if (!mensagemSelecionada?.id) {
                  alert('Perfil não encontrado!');
                  return;
                }
                if (mensagemSelecionada?.tipo === 'empresa') {
                  navigate(`/perfil-empresa/${mensagemSelecionada.id}`);
                } else {
                  navigate(`/perfil/${mensagemSelecionada.id}`);
                }
              }}>Ver perfil</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setShowMenu(false); alert('Silenciar conversa'); }}>Silenciar conversa</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setShowMenu(false); alert('Apagar conversa'); }}>Apagar conversa</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => { setShowMenu(false); alert('Bloquear usuário'); }}>Bloquear usuário</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Função para renderizar balões de mensagem
  function ChatBaloes() {
    if (!mensagemSelecionada) return null
    const msgs = historicoMensagens[mensagemSelecionada.id] || []
    return (
      <div className="p-4 lg:p-6" ref={chatRef} onClick={() => inputRef.current && inputRef.current.focus()}>
        {msgs.length === 0 && (
          <div className="text-center text-gray-400 py-4">Nenhuma mensagem ainda</div>
        )}
        {msgs.map((msg, idx) => (
          <div key={msg.id || idx} className={`mb-2 flex ${msg.remetente === (user.tipo === 'empresa' ? 'empresa' : 'candidato') ? 'justify-end' : 'justify-start'}`} >
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-2xl shadow text-sm lg:text-base relative
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
    
    const handleInputChange = useCallback((e) => {
      setNovaMensagem(e.target.value)
    }, [])
    
    const handleKeyDown = useCallback((e) => {
      if (e.key === 'Enter' && novaMensagem.trim()) {
        enviarMensagem()
      }
    }, [novaMensagem, enviarMensagem])
    
    const handleFocus = useCallback(() => {
      setDigitando(true)
    }, [])
    
    const handleBlur = useCallback(() => {
      setDigitando(false)
    }, [])
    
    const handleEmojiClick = useCallback(() => {
      setShowEmojis(!showEmojis)
    }, [showEmojis])
    
    return (
      <div className={`${isMobile ? 'fixed bottom-16 left-0 right-0 z-50' : 'sticky bottom-0 z-20'} border-t bg-white flex items-center gap-2 lg:gap-3 shadow-md px-2 sm:px-4 py-2`} style={{boxShadow: '0 2px 12px #0001', marginBottom: isMobile ? 12 : 20}}>
        <button onClick={handleEmojiClick} aria-label="Abrir emojis" className="p-2 rounded-full hover:bg-blue-50 transition text-xl flex-shrink-0">
          {/* SVG emoji */}
          <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
        </button>
        <input
          ref={inputRef}
          type="text"
          value={novaMensagem}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma mensagem..."
          className="flex-1 px-4 py-2 rounded-full border text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          style={{
            border: novaMensagem.trim() ? '1px solid #3b82f6' : '1px solid #d1d5db',
            boxShadow: novaMensagem.trim() ? '0 0 0 2px #3b82f6' : 'none'
          }}
          aria-label="Digite uma mensagem"
        />
        <button onClick={anexarArquivo} aria-label="Anexar arquivo" className="p-2 rounded-full hover:bg-blue-50 transition text-xl flex-shrink-0">
          {/* SVG clipe */}
          <svg width="22" height="22" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.44 11.05l-9.19 9.19a5 5 0 01-7.07-7.07l9.19-9.19a3 3 0 114.24 4.24l-9.2 9.19a1 1 0 01-1.41-1.41l9.2-9.19"/></svg>
        </button>
        <button
          onClick={enviarMensagem}
          aria-label="Enviar mensagem"
          className={`p-2 sm:p-3 lg:p-4 rounded-full font-semibold transition-all duration-200 shadow-md flex-shrink-0 ${
            novaMensagem.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 shadow-none'
          }`}
          style={{marginRight: isMobile ? 8 : 24}}
          disabled={!novaMensagem.trim()}
          title={novaMensagem.trim() ? 'Enviar mensagem' : 'Digite uma mensagem para enviar'}
        >
          {/* SVG avião */}
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    )
  }

  // Fecha o menu ao clicar fora
  useEffect(() => {
    if (!showMenu) return;
    function handleClick(e) {
      setShowMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  // Renderização condicional
  return (
    <div className="relative bg-gray-50 h-screen overflow-hidden">
      {/* Header fixo principal */}
      <header className={`fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 flex items-center justify-between px-4 ${isMobile ? 'py-0' : 'py-4'} shadow-sm`}>
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
      {!isMobile && <div className="h-20" />}

      {/* Layout responsivo: split view no desktop, troca no mobile */}
      <div className="max-w-7xl mx-auto flex bg-transparent" style={{ height: isMobile ? 'calc(100vh - 64px)' : 'calc(100vh - 80px)' }}>
        {/* Lista de conversas */}
        {(!isMobile || !mensagemSelecionada) && (
          <div
            ref={listaConversasRef}
            className={`w-full md:w-1/4 lg:w-1/3 xl:w-1/4 border-r bg-gray-50 px-2 sm:px-0 ${isMobile ? 'overflow-y-auto pb-16' : 'rounded-l-xl pt-4 overflow-y-auto'}`}
            style={{
              height: isMobile ? 'calc(100vh - 64px)' : '100%', // altura fixa para garantir scroll do container
              maxHeight: isMobile ? 'calc(100vh - 64px)' : '100%',
              overflowY: 'auto',
              ...((isMobile) ? {paddingTop: 0, marginTop: '-8px'} : {})
            }}
          >
            {mensagensFiltradas.length === 0 && (
              <div className="text-center text-gray-400 py-8">Nenhuma conversa encontrada</div>
            )}
            <ul className="space-y-2 lg:space-y-3" style={isMobile ? {paddingTop:0, marginTop:0} : {}}>
              {mensagensFiltradas.map((msg, idx) => (
                <li
                  key={msg.id}
                  className={`group bg-white rounded-xl shadow flex items-center gap-3 px-4 py-3 lg:px-6 lg:py-4 cursor-pointer transition hover:shadow-lg border border-transparent hover:border-blue-200 ${mensagemSelecionada?.id === msg.id ? 'ring-2 ring-blue-400' : ''}`}
                  style={isMobile && idx === 0 ? {marginTop: '4px', paddingTop: '8px'} : {}} // garantir espaço no topo
                  onClick={() => { setMensagemSelecionada(msg); marcarComoLida(msg.id); }}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0 min-w-[48px] min-h-[48px] lg:min-w-[56px] lg:min-h-[56px]">
                    <img
                      src={msg.foto}
                      alt={msg.candidato}
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-blue-100 block"
                      style={{objectFit: 'cover', display: 'block'}}
                    />
                    {/* Status online */}
                    {msg.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 border-2 border-white rounded-full" />
                    )}
                  </div>
                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 truncate lg:text-base">{msg.candidato}</span>
                      {/* Badge prioridade */}
                      {msg.prioridade === 'alta' && <span className="ml-1 px-2 py-0.5 rounded-full text-xs lg:text-sm bg-red-100 text-red-700 font-bold">Alta</span>}
                      {msg.prioridade === 'media' && <span className="ml-1 px-2 py-0.5 rounded-full text-xs lg:text-sm bg-yellow-100 text-yellow-700 font-bold">Média</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`truncate text-sm lg:text-base ${msg.lida ? 'text-gray-500' : 'text-blue-700 font-medium'}`}>{msg.ultimaMensagem}</span>
                      {/* Badge não lida */}
                      {!msg.lida && <span className="ml-1 w-2 h-2 lg:w-3 lg:h-3 bg-blue-600 rounded-full inline-block" />}
                    </div>
                  </div>
                  {/* Horário */}
                  <div className="flex flex-col items-end min-w-[56px] lg:min-w-[64px]">
                    <span className="text-xs lg:text-sm text-gray-400">{msg.ultimaAtividade}</span>
                    {/* Ícone de erro se necessário */}
                    {msg.status === 'erro' && (
                      <span title="Erro ao enviar" className="text-red-500 text-lg lg:text-xl">!</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Área do chat */}
        {((!isMobile && mensagemSelecionada) || (isMobile && mensagemSelecionada)) ? (
          <div className={`flex-1 flex flex-col bg-white rounded-r-xl shadow-lg ${isMobile ? 'fixed inset-0 z-40 pt-16' : 'h-full'}`} style={{minWidth:0}}>
            {/* Header do chat melhorado */}
            <ChatHeader />
            {/* Balões de mensagem melhorados */}
            <div className={`flex-1 ${isMobile ? 'overflow-y-auto pb-28' : 'overflow-y-auto'}`} ref={chatRef}>
              <ChatBaloes />
            </div>
            {/* Campo de digitação melhorado */}
            <ChatInput />
          </div>
        ) : (
          // Desktop: área do chat vazia
          !isMobile && (
            <div className="flex-1 flex items-center justify-center bg-white rounded-r-xl">
              <div className="text-gray-400 text-lg lg:text-xl">Selecione uma conversa para começar</div>
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
          onClick={() => setShowNovaConversa(true)}
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

      {/* Modal de Nova Conversa */}
      {showNovaConversa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header do modal */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Nova Conversa</h3>
              <button 
                onClick={() => setShowNovaConversa(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Campo de busca */}
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar usuários..."
                  value={buscaUsuario}
                  onChange={(e) => setBuscaUsuario(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Lista de usuários */}
            <div className="overflow-y-auto max-h-96">
              {usuariosFiltrados.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {buscaUsuario ? 'Nenhum usuário encontrado' : 'Nenhum usuário disponível'}
                </div>
              ) : (
                <div className="p-2">
                  {usuariosFiltrados.map((usuario) => (
                    <div
                      key={usuario.id}
                      onClick={() => iniciarNovaConversa(usuario)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={usuario.foto}
                          alt={usuario.nome}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                        />
                        {usuario.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                        )}
                      </div>

                      {/* Informações */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800 truncate">{usuario.nome}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            usuario.tipo === 'candidato' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {usuario.tipo === 'candidato' ? 'Candidato' : 'Empresa'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 truncate">
                          {usuario.tipo === 'candidato' ? usuario.profissao : usuario.setor}
                        </div>
                        <div className="text-xs text-gray-500 truncate">{usuario.localizacao}</div>
                      </div>

                      {/* Status */}
                      <div className="text-right">
                        <div className="text-xs text-gray-400">{usuario.ultimaAtividade}</div>
                        {usuario.tipo === 'empresa' && usuario.vagasAtivas && (
                          <div className="text-xs text-blue-600 font-medium">{usuario.vagasAtivas} vagas</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 