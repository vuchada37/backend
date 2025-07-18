import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PerfilEmpresa() {
  const { user } = useAuth()
  const { id } = useParams()
  const [editando, setEditando] = useState(false)
  const [formData, setFormData] = useState({
    nomeFantasia: user?.nome || 'Empresa Exemplo',
    razaoSocial: 'Empresa Exemplo Lda',
    nuit: '123456789',
    email: user?.email || 'empresa@email.com',
    telefone: '(258) 84 123 4567',
    endereco: 'Avenida 25 de Setembro, 123 - Maputo',
    descricao: 'Empresa líder no setor de tecnologia, focada em inovação e desenvolvimento de soluções digitais.',
    setor: 'Tecnologia',
    tamanho: '50-100 funcionários',
    website: 'www.empresaexemplo.co.mz',
    // Documentos moçambicanos
    alvara: 'ALV-2024-001',
    registroComercial: 'RC-2024-001',
    inscricaoFiscal: 'IF-2024-001',
    // Informações adicionais
    anoFundacao: '2020',
    capitalSocial: '5000000',
    moedaCapital: 'MT'
  })
  const [showSuccess, setShowSuccess] = useState(false); // Novo estado para toast
  const navigate = useNavigate()

  // Mock de busca por id
  let mockEmpresas = {
    '10': { id: '10', nome: 'TechMoç', email: 'empresa@email.com', tipo: 'empresa', descricao: 'Empresa de tecnologia focada em soluções digitais inovadoras para o mercado moçambicano.', setor: 'Tecnologia', funcionarios: '50-100', localizacao: 'Maputo, Moçambique', fundacao: '2018', website: 'www.techmoc.co.mz' }
  }
  // Se usuário logado for empresa, cria um mock dinâmico para ela
  if (user && user.tipo === 'empresa') {
    mockEmpresas['me'] = {
      id: 'me',
      nome: user.nome || 'Minha Empresa',
      email: user.email,
      tipo: 'empresa',
      descricao: 'Perfil da sua empresa. Edite suas informações aqui.',
      setor: 'Tecnologia',
      funcionarios: 'N/D',
      localizacao: 'Moçambique',
      fundacao: '2023',
      website: 'www.suaempresa.co.mz'
    }
  }
  const empresaExibida = id ? mockEmpresas[id] : (user && user.tipo === 'empresa' ? mockEmpresas['me'] : null);

  // Verifica se o usuário logado é o dono do perfil
  const isDono = user && user.tipo === 'empresa' && empresaExibida && (user.email === empresaExibida.email);

  // Redireciona empresa logada para seu próprio perfil se não houver id
  useEffect(() => {
    if (!id && user && user.tipo === 'empresa') {
      navigate('/perfil-empresa/me', { replace: true })
    }
  }, [id, user, navigate])

  // Sincroniza formData com empresaExibida ao entrar no modo de edição, sem loop infinito
  useEffect(() => {
    if (editando && empresaExibida && isDono) {
      setFormData(current => {
        const novo = {
          nomeFantasia: empresaExibida.nome || '',
          razaoSocial: empresaExibida.razaoSocial || '',
          nuit: empresaExibida.nuit || '',
          email: empresaExibida.email || '',
          telefone: empresaExibida.telefone || '',
          endereco: empresaExibida.endereco || '',
          descricao: empresaExibida.descricao || '',
          setor: empresaExibida.setor || '',
          tamanho: empresaExibida.funcionarios || '',
          website: empresaExibida.website || '',
          alvara: empresaExibida.alvara || '',
          registroComercial: empresaExibida.registroComercial || '',
          inscricaoFiscal: empresaExibida.inscricaoFiscal || '',
          anoFundacao: empresaExibida.fundacao || '',
          capitalSocial: empresaExibida.capitalSocial || '',
          moedaCapital: empresaExibida.moedaCapital || ''
        };
        // Só atualiza se for diferente
        if (JSON.stringify(current) !== JSON.stringify(novo)) return novo;
        return current;
      });
    }
    // eslint-disable-next-line
  }, [editando]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true); // Mostrar toast
    setEditando(false)
    setTimeout(() => setShowSuccess(false), 2500); // Esconder toast após 2.5s
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 pb-24 md:pb-6">
      {/* Toast visual de sucesso */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                ✅ Perfil atualizado com sucesso!
              </p>
              <p className="text-xs mt-1 opacity-90">
                As informações da empresa foram salvas.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setShowSuccess(false)}
                className="text-green-100 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Empresa não encontrada */}
      {id && !empresaExibida && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-center text-sm">
          Empresa não encontrada!<br/>
          <button onClick={() => navigate(-1)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Voltar</button>
        </div>
      )}
      {/* Visualização pública para candidatos/visitantes ou empresas diferentes */}
      {id && empresaExibida && !isDono && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-2">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center mb-5 shadow-lg border-4 border-white">
              <span className="text-5xl text-blue-700 font-extrabold select-none">{empresaExibida.nome.charAt(0)}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-blue-800 mb-1 text-center tracking-tight">{empresaExibida.nome}</h1>
            <p className="text-gray-500 text-center mb-6 text-lg font-medium">{empresaExibida.descricao}</p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-600 text-xl">🏢</span> <span className="font-semibold">Setor:</span> {empresaExibida.setor}</div>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-green-600 text-xl">👥</span> <span className="font-semibold">Funcionários:</span> {empresaExibida.funcionarios}</div>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-purple-600 text-xl">📍</span> <span className="font-semibold">Localização:</span> {empresaExibida.localizacao}</div>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-yellow-600 text-xl">📅</span> <span className="font-semibold">Fundada em:</span> {empresaExibida.fundacao}</div>
              <div className="flex items-center gap-2 text-gray-700 col-span-1 sm:col-span-2"><span className="text-indigo-600 text-xl">🌐</span> <span className="font-semibold">Website:</span> <a href={`https://${empresaExibida.website}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 break-all hover:text-blue-900 transition">{empresaExibida.website}</a></div>
            </div>
            <button onClick={() => navigate(-1)} className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow hover:bg-blue-700 transition w-full sm:w-auto text-lg">Voltar</button>
          </div>
        </div>
      )}
      {/* Visualização do próprio perfil (empresa logada, não editando) */}
      {id && empresaExibida && isDono && !editando && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-2">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center mb-5 shadow-lg border-4 border-white">
              <span className="text-5xl text-blue-700 font-extrabold select-none">{empresaExibida.nome.charAt(0)}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-blue-800 mb-1 text-center tracking-tight">{empresaExibida.nome}</h1>
            <p className="text-gray-500 text-center mb-6 text-lg font-medium">{empresaExibida.descricao}</p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-600 text-xl">🏢</span> <span className="font-semibold">Setor:</span> {empresaExibida.setor}</div>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-green-600 text-xl">👥</span> <span className="font-semibold">Funcionários:</span> {empresaExibida.funcionarios}</div>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-purple-600 text-xl">📍</span> <span className="font-semibold">Localização:</span> {empresaExibida.localizacao}</div>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-yellow-600 text-xl">📅</span> <span className="font-semibold">Fundada em:</span> {empresaExibida.fundacao}</div>
              <div className="flex items-center gap-2 text-gray-700 col-span-1 sm:col-span-2"><span className="text-indigo-600 text-xl">🌐</span> <span className="font-semibold">Website:</span> <a href={`https://${empresaExibida.website}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 break-all hover:text-blue-900 transition">{empresaExibida.website}</a></div>
            </div>
            <button
              onClick={() => setEditando(true)}
              className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow hover:bg-blue-700 transition w-full sm:w-auto text-lg"
            >
              ✏️ Editar Perfil
            </button>
          </div>
        </div>
      )}
      {/* Edição do próprio perfil (empresa logada, editando) */}
      {id && empresaExibida && isDono && editando && (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 max-w-3xl mx-auto w-full border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Nome Fantasia</label>
              <input type="text" name="nomeFantasia" value={formData.nomeFantasia} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Razão Social</label>
              <input type="text" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Nuit</label>
              <input type="text" name="nuit" value={formData.nuit} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Telefone</label>
              <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Endereço</label>
              <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-base font-semibold text-gray-700 mb-2">Descrição</label>
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg resize-none" rows={2} />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Setor</label>
              <input type="text" name="setor" value={formData.setor} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Funcionários</label>
              <input type="text" name="tamanho" value={formData.tamanho} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Website</label>
              <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Alvará</label>
              <input type="text" name="alvara" value={formData.alvara} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Registro Comercial</label>
              <input type="text" name="registroComercial" value={formData.registroComercial} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Inscrição Fiscal</label>
              <input type="text" name="inscricaoFiscal" value={formData.inscricaoFiscal} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Ano Fundação</label>
              <input type="text" name="anoFundacao" value={formData.anoFundacao} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Capital Social</label>
              <input type="text" name="capitalSocial" value={formData.capitalSocial} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-base font-semibold text-gray-700 mb-2">Moeda do Capital</label>
              <input type="text" name="moedaCapital" value={formData.moedaCapital} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button type="submit" className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition w-full md:w-auto">Salvar</button>
          </div>
        </form>
      )}
      {/* Caso não haja id (acesso direto), pode mostrar um aviso ou redirecionar */}
      {!id && (!user || user.tipo !== 'empresa') && (
        <div className="mb-4 p-3 bg-yellow-50 text-yellow-900 rounded-lg text-center text-sm">
          Selecione uma empresa para visualizar o perfil.
        </div>
      )}
    </div>
  )
} 