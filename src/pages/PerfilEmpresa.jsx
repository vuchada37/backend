import { useAuth } from '../context/AuthContext'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PerfilEmpresa() {
  const { user, updateProfile } = useAuth()
  const { id } = useParams()
  const [editando, setEditando] = useState(false)
  const [sucesso, setSucesso] = useState('')
  const [formData, setFormData] = useState({
    nomeFantasia: user?.nome || '',
    razaoSocial: user?.perfil?.razaoSocial || '',
    nuit: user?.perfil?.nuit || '',
    email: user?.email || '',
    telefone: user?.perfil?.telefone || '',
    endereco: user?.perfil?.endereco || '',
    descricao: user?.perfil?.descricao || '',
    setor: user?.perfil?.setor || '',
    tamanho: user?.perfil?.tamanho || '',
    website: user?.perfil?.website || '',
    cnpj: user?.perfil?.cnpj || '',
    alvara: user?.perfil?.alvara || '',
    registroComercial: user?.perfil?.registroComercial || '',
    inscricaoFiscal: user?.perfil?.inscricaoFiscal || '',
    anoFundacao: user?.perfil?.anoFundacao || '',
    capitalSocial: user?.perfil?.capitalSocial || '',
    moedaCapital: user?.perfil?.moedaCapital || 'MT',
    logo: user?.perfil?.logo || '',
  })
  const navigate = useNavigate()

  // Atualizar formData quando user mudar
  useEffect(() => {
    if (user && user.tipo === 'empresa') {
      setFormData({
        nomeFantasia: user.nome || '',
        razaoSocial: user.perfil?.razaoSocial || '',
        nuit: user.perfil?.nuit || '',
        email: user.email || '',
        telefone: user.perfil?.telefone || '',
        endereco: user.perfil?.endereco || '',
        descricao: user.perfil?.descricao || '',
        setor: user.perfil?.setor || '',
        tamanho: user.perfil?.tamanho || '',
        website: user.perfil?.website || '',
        cnpj: user.perfil?.cnpj || '',
        alvara: user.perfil?.alvara || '',
        registroComercial: user.perfil?.registroComercial || '',
        inscricaoFiscal: user.perfil?.inscricaoFiscal || '',
        anoFundacao: user.perfil?.anoFundacao || '',
        capitalSocial: user.perfil?.capitalSocial || '',
        moedaCapital: user.perfil?.moedaCapital || 'MT',
        logo: user.perfil?.logo || '',
      })
    }
  }, [user])

  // Se não estiver logado como empresa, mostrar acesso restrito
  if (!user || user.tipo !== 'empresa') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg text-center px-4">Acesso restrito. Faça login como empresa para visualizar o perfil.</div>
      </div>
    )
  }

  // Card de perfil da empresa
  const renderCard = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-blue-100">
        <div className="relative mb-5">
          {formData.logo || user.perfil?.logo ? (
            <img
              src={formData.logo || user.perfil.logo}
              alt="Logo da empresa"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-5xl text-blue-700 font-extrabold select-none">
                {(formData.nomeFantasia || user.nome || 'E').split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
              </span>
            </div>
          )}
              <button
            onClick={() => setEditando(true)}
            className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
            title="Trocar logo"
              >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4zM7 17h.01M7 17a4 4 0 005.657 0M7 17a4 4 0 010-5.657M7 17H5a2 2 0 01-2-2v-2a2 2 0 012-2h2m0 0a4 4 0 015.657 0m0 0a4 4 0 010 5.657" /></svg>
              </button>
        </div>
        <h1 className="text-3xl font-extrabold text-blue-800 mb-1 text-center tracking-tight">{formData.nomeFantasia || user.nome || 'Empresa'}</h1>
        <p className="text-gray-500 text-center mb-6 text-lg font-medium">{formData.descricao || 'Perfil da sua empresa. Edite suas informações aqui.'}</p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-700"><span className="text-blue-600 text-xl">🏢</span> <span className="font-semibold">Setor:</span> {formData.setor || 'N/D'}</div>
          <div className="flex items-center gap-2 text-gray-700"><span className="text-green-600 text-xl">👥</span> <span className="font-semibold">Funcionários:</span> {formData.tamanho || 'N/D'}</div>
          <div className="flex items-center gap-2 text-gray-700"><span className="text-purple-600 text-xl">📍</span> <span className="font-semibold">Localização:</span> {formData.endereco || 'N/D'}</div>
          <div className="flex items-center gap-2 text-gray-700"><span className="text-yellow-600 text-xl">📅</span> <span className="font-semibold">Fundada em:</span> {formData.anoFundacao || 'N/D'}</div>
          <div className="flex items-center gap-2 text-gray-700 col-span-1 sm:col-span-2"><span className="text-indigo-600 text-xl">🌐</span> <span className="font-semibold">Website:</span> <a href={`https://${formData.website || 'www.suaempresa.co.mz'}`} target="_blank" rel="noopener noreferrer" className="underline text-blue-700 break-all hover:text-blue-900 transition">{formData.website || 'www.suaempresa.co.mz'}</a></div>
            </div>
            <button
              onClick={() => setEditando(true)}
              className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow hover:bg-blue-700 transition w-full sm:w-auto text-lg"
            >
              ✏️ Editar Perfil
            </button>
          </div>
        </div>
  )

  // Adicionar upload de logo/foto no formulário de edição
  const fileInputRef = useRef();
  const [logoFileName, setLogoFileName] = useState('');

  function handleLogoChange(e) {
    const file = e.target.files[0];
    if (file) {
      setLogoFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData({ ...formData, logo: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // Formulário de edição
  const renderForm = () => (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 max-w-3xl mx-auto w-full border border-blue-100">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-3 flex flex-col items-center gap-2">
          {formData.logo ? (
            <img
              src={formData.logo}
              alt="Logo da empresa"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-5xl text-blue-700 font-extrabold select-none">
                {(formData.nomeFantasia || user.nome || 'E').split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleLogoChange}
            className="hidden"
          />
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition text-sm"
            >
              {formData.logo ? 'Trocar logo' : 'Carregar logo'}
            </button>
            {formData.logo && (
              <button
                type="button"
                onClick={() => { setFormData({ ...formData, logo: '' }); setLogoFileName(''); }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition text-sm"
              >
                Remover
              </button>
            )}
          </div>
          {logoFileName && (
            <div className="text-xs text-gray-500 mt-1">{logoFileName}</div>
          )}
        </div>
      </div>
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
          <select name="moedaCapital" value={formData.moedaCapital} onChange={handleChange} className="w-full p-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg">
            <option value="MT">Meticais (MT)</option>
            <option value="USD">Dólares (USD)</option>
            <option value="EUR">Euros (EUR)</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition text-lg"
        >
          Salvar Alterações
        </button>
        <button
          type="button"
          onClick={() => setEditando(false)}
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-400 transition text-lg"
        >
          Cancelar
        </button>
      </div>
    </form>
  )

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? '',
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    try {
      // Salvar todos os campos do formData no perfil da empresa
      updateProfile({ ...formData })
      setSucesso('Perfil da empresa atualizado com sucesso!')
      setEditando(false)
      setTimeout(() => setSucesso(''), 3000)
    } catch (error) {
      alert('Erro ao atualizar perfil da empresa. Tente novamente.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 pb-24 md:pb-6">
      {sucesso && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-100" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                ✅ {sucesso}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setSucesso('')}
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
      {/* Card ou formulário de edição */}
      {!editando ? renderCard() : renderForm()}
    </div>
  )
} 