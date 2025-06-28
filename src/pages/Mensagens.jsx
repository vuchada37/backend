import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Mensagens() {
  const { user } = useAuth()
  const [mensagemSelecionada, setMensagemSelecionada] = useState(null)
  const [novaMensagem, setNovaMensagem] = useState('')

  // Mock de mensagens
  const mensagens = [
    {
      id: 1,
      candidato: 'João Silva',
      email: 'joao@email.com',
      vaga: 'Desenvolvedor Frontend',
      data: '2024-01-15',
      ultimaMensagem: 'Olá! Gostaria de saber mais sobre a vaga...',
      lida: false
    },
    {
      id: 2,
      candidato: 'Maria Santos',
      email: 'maria@email.com',
      vaga: 'Designer UX/UI',
      data: '2024-01-14',
      ultimaMensagem: 'Obrigada pelo retorno! Quando posso agendar uma entrevista?',
      lida: true
    },
    {
      id: 3,
      candidato: 'Pedro Costa',
      email: 'pedro@email.com',
      vaga: 'Desenvolvedor Backend',
      data: '2024-01-13',
      ultimaMensagem: 'Tenho interesse na vaga. Posso enviar meu portfólio?',
      lida: true
    }
  ]

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      alert('Mensagem enviada! (Funcionalidade mockada)')
      setNovaMensagem('')
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-8 px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4 sm:mb-6">Mensagens e Contatos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-[calc(100vh-200px)] sm:h-[600px]">
        {/* Lista de mensagens */}
        <div className="bg-white rounded-lg shadow order-2 lg:order-1">
          <div className="p-3 sm:p-4 border-b">
            <h2 className="font-bold text-gray-800 text-sm sm:text-base">Conversas ({mensagens.length})</h2>
          </div>
          <div className="overflow-y-auto h-[300px] sm:h-[500px]">
            {mensagens.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setMensagemSelecionada(msg)}
                className={`p-3 sm:p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  mensagemSelecionada?.id === msg.id ? 'bg-blue-50 border-blue-200' : ''
                } ${!msg.lida ? 'bg-yellow-50' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{msg.candidato}</h3>
                  <span className="text-xs text-gray-500">{msg.data}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{msg.vaga}</p>
                <p className="text-xs sm:text-sm text-gray-700 truncate">{msg.ultimaMensagem}</p>
                {!msg.lida && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Área de chat */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col order-1 lg:order-2">
          {mensagemSelecionada ? (
            <>
              {/* Header do chat */}
              <div className="p-3 sm:p-4 border-b bg-gray-50">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">{mensagemSelecionada.candidato}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{mensagemSelecionada.email}</p>
                <p className="text-xs sm:text-sm text-blue-600">{mensagemSelecionada.vaga}</p>
              </div>

              {/* Mensagens */}
              <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white p-2 sm:p-3 rounded-lg max-w-[80%] sm:max-w-xs">
                      <p className="text-xs sm:text-sm">Olá! Obrigada pelo interesse na vaga. Podemos agendar uma entrevista?</p>
                      <p className="text-xs opacity-75 mt-1">Hoje, 14:30</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-200 p-2 sm:p-3 rounded-lg max-w-[80%] sm:max-w-xs">
                      <p className="text-xs sm:text-sm">{mensagemSelecionada.ultimaMensagem}</p>
                      <p className="text-xs opacity-75 mt-1">Hoje, 15:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input para nova mensagem */}
              <div className="p-3 sm:p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  />
                  <button
                    onClick={enviarMensagem}
                    className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl mb-4 block">💬</span>
                <p className="text-sm sm:text-base">Selecione uma conversa para começar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 