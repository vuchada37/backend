import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const MonetizacaoContext = createContext()

export const useMonetizacao = () => {
  const context = useContext(MonetizacaoContext)
  if (!context) {
    throw new Error('useMonetizacao deve ser usado dentro de um MonetizacaoProvider')
  }
  return context
}

export const MonetizacaoProvider = ({ children }) => {
  const { user } = useAuth()
  const [assinatura, setAssinatura] = useState(null)
  const [comissoes, setComissoes] = useState([])
  const [loading, setLoading] = useState(true)

  // Planos disponíveis
  const planos = {
    gratuito: {
      id: 'gratuito',
      nome: 'Gratuito',
      preco: 0,
      limiteVagas: 3,
      limiteMensagens: 50,
      comissao: 0
    },
    basico: {
      id: 'basico',
      nome: 'Básico',
      preco: 2500,
      limiteVagas: 10,
      limiteMensagens: -1,
      comissao: 0.05
    },
    premium: {
      id: 'premium',
      nome: 'Premium',
      preco: 4500,
      limiteVagas: -1,
      limiteMensagens: -1,
      comissao: 0.03
    },
    empresarial: {
      id: 'empresarial',
      nome: 'Empresarial',
      preco: 8500,
      limiteVagas: -1,
      limiteMensagens: -1,
      comissao: 0.02
    }
  }

  // Adicionar definição de planos para candidatos
  const planosCandidato = {
    gratuito: {
      id: 'gratuito',
      nome: 'Gratuito',
      preco: 0,
      limiteCandidaturas: 5,
      limiteMensagens: 10,
      destaque: false
    },
    basico: {
      id: 'basico',
      nome: 'Básico',
      preco: 500,
      limiteCandidaturas: 20,
      limiteMensagens: 50,
      destaque: true
    },
    premium: {
      id: 'premium',
      nome: 'Premium',
      preco: 1500,
      limiteCandidaturas: -1,
      limiteMensagens: -1,
      destaque: true
    }
  }

  // Mock de dados da assinatura
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        if (user.tipo === 'empresa') {
          setAssinatura({
            plano: 'basico',
            nome: 'Básico',
            preco: 2500,
            dataInicio: '2024-01-01',
            proximoPagamento: '2024-02-01',
            status: 'ativa',
            vagasUsadas: 3,
            mensagensUsadas: 45
          })
        } else {
          setAssinatura({
            plano: 'gratuito',
            nome: 'Gratuito',
            preco: 0,
            dataInicio: '2024-01-01',
            proximoPagamento: '2024-02-01',
            status: 'ativa',
            candidaturasUsadas: 2,
            mensagensUsadas: 3,
            destaque: false
          })
        }
        setLoading(false)
      }, 1000)
    }
  }, [user])

  // Verificar se o usuário pode publicar mais vagas
  const podePublicarVaga = () => {
    if (!assinatura) return false
    const plano = planos[assinatura.plano]
    if (plano.limiteVagas === -1) return true
    return assinatura.vagasUsadas < plano.limiteVagas
  }

  // Verificar se o usuário pode enviar mais mensagens
  const podeEnviarMensagem = () => {
    if (!assinatura) return false
    const plano = planos[assinatura.plano]
    if (plano.limiteMensagens === -1) return true
    return assinatura.mensagensUsadas < plano.limiteMensagens
  }

  // Adicionar funções para candidatos
  const podeCandidatar = () => {
    if (!assinatura || user?.tipo !== 'usuario') return false
    const plano = planosCandidato[assinatura.plano]
    if (plano.limiteCandidaturas === -1) return true
    return assinatura.candidaturasUsadas < plano.limiteCandidaturas
  }
  const podeEnviarMensagemCandidato = () => {
    if (!assinatura || user?.tipo !== 'usuario') return false
    const plano = planosCandidato[assinatura.plano]
    if (plano.limiteMensagens === -1) return true
    return assinatura.mensagensUsadas < plano.limiteMensagens
  }
  const fazerUpgradeCandidato = async (novoPlano) => {
    try {
      setAssinatura(prev => ({
        ...prev,
        plano: novoPlano,
        nome: planosCandidato[novoPlano].nome,
        preco: planosCandidato[novoPlano].preco
      }))
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Calcular comissão por contratação
  const calcularComissao = (salario) => {
    if (!assinatura) return 0
    const plano = planos[assinatura.plano]
    return salario * plano.comissao
  }

  // Atualizar uso de vagas
  const incrementarVagasUsadas = () => {
    setAssinatura(prev => ({
      ...prev,
      vagasUsadas: prev.vagasUsadas + 1
    }))
  }

  // Atualizar uso de mensagens
  const incrementarMensagensUsadas = () => {
    setAssinatura(prev => ({
      ...prev,
      mensagensUsadas: prev.mensagensUsadas + 1
    }))
  }

  // Fazer upgrade do plano
  const fazerUpgrade = async (novoPlano) => {
    try {
      // Aqui seria feita a integração com gateway de pagamento
      console.log('Fazendo upgrade para:', novoPlano)
      
      setAssinatura(prev => ({
        ...prev,
        plano: novoPlano,
        nome: planos[novoPlano].nome,
        preco: planos[novoPlano].preco
      }))
      
      return { success: true }
    } catch (error) {
      console.error('Erro ao fazer upgrade:', error)
      return { success: false, error: error.message }
    }
  }

  // Cancelar assinatura
  const cancelarAssinatura = async () => {
    try {
      console.log('Cancelando assinatura')
      
      setAssinatura(prev => ({
        ...prev,
        status: 'cancelada'
      }))
      
      return { success: true }
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error)
      return { success: false, error: error.message }
    }
  }

  // Adicionar comissão
  const adicionarComissao = (comissao) => {
    setComissoes(prev => [comissao, ...prev])
  }

  // Obter estatísticas de comissões
  const getEstatisticasComissoes = () => {
    const totalGanho = comissoes.reduce((acc, c) => acc + c.valor, 0)
    const totalContratacoes = comissoes.length
    const mediaComissao = totalContratacoes > 0 ? totalGanho / totalContratacoes : 0

    return {
      totalGanho,
      totalContratacoes,
      mediaComissao
    }
  }

  const value = {
    assinatura,
    comissoes,
    planos,
    loading,
    podePublicarVaga,
    podeEnviarMensagem,
    calcularComissao,
    incrementarVagasUsadas,
    incrementarMensagensUsadas,
    fazerUpgrade,
    cancelarAssinatura,
    adicionarComissao,
    getEstatisticasComissoes,
    podeCandidatar,
    podeEnviarMensagemCandidato,
    fazerUpgradeCandidato,
    planosCandidato
  }

  return (
    <MonetizacaoContext.Provider value={value}>
      {children}
    </MonetizacaoContext.Provider>
  )
} 