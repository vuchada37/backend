import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function PerfilEmpresa() {
  const { user } = useAuth()
  const { id } = useParams()
  const [editando, setEditando] = useState(false)
  const [formData, setFormData] = useState({
    nomeFantasia: user?.nome || 'Empresa Exemplo',
    razaoSocial: 'Empresa Exemplo Ltda',
    cnpj: '12.345.678/0001-99',
    email: user?.email || 'empresa@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Empresas, 123 - São Paulo, SP',
    descricao: 'Empresa líder no setor de tecnologia, focada em inovação e desenvolvimento de soluções digitais.',
    setor: 'Tecnologia',
    tamanho: '50-100 funcionários',
    website: 'www.empresaexemplo.com.br'
  })
  const navigate = useNavigate()

  // Mock de busca por id
  const mockEmpresas = {
    '10': { nome: 'Empresa XPTO', email: 'contato@xpto.com', tipo: 'empresa' }
  }
  const empresaExibida = id ? mockEmpresas[id] : null;

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Perfil atualizado com sucesso! (Funcionalidade mockada)')
    setEditando(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 pb-24 md:pb-6">
      {id && empresaExibida && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-lg text-center text-sm">
          <strong>Perfil de outra empresa:</strong><br/>
          Nome: {empresaExibida.nome}<br/>
          Email: {empresaExibida.email}<br/>
          Tipo: {empresaExibida.tipo}
        </div>
      )}
      {id && !empresaExibida && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-center text-sm">
          Empresa não encontrada!
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">Perfil da Empresa</h1>
        <button
          onClick={() => setEditando(!editando)}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {editando ? '❌ Cancelar' : '✏️ Editar Perfil'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Informações principais */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Informações da Empresa</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Fantasia *
                  </label>
                  <input
                    type="text"
                    name="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Razão Social
                  </label>
                  <input
                    type="text"
                    name="razaoSocial"
                    value={formData.razaoSocial}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CNPJ
                  </label>
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  disabled={!editando}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Setor
                  </label>
                  <select
                    name="setor"
                    value={formData.setor}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Educação">Educação</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Varejo">Varejo</option>
                    <option value="Indústria">Indústria</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamanho da Empresa
                  </label>
                  <select
                    name="tamanho"
                    value={formData.tamanho}
                    onChange={handleChange}
                    disabled={!editando}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="1-10 funcionários">1-10 funcionários</option>
                    <option value="11-50 funcionários">11-50 funcionários</option>
                    <option value="50-100 funcionários">50-100 funcionários</option>
                    <option value="100-500 funcionários">100-500 funcionários</option>
                    <option value="500+ funcionários">500+ funcionários</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Empresa
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  disabled={!editando}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
                />
              </div>

              {editando && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    💾 Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditando(false)}
                    className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                  >
                    ❌ Cancelar
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo da empresa */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Logo da Empresa</h3>
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
              {editando && (
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                  📁 Alterar Logo
                </button>
              )}
            </div>
          </div>

          {/* Estatísticas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Estatísticas</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vagas publicadas</span>
                <span className="font-semibold text-blue-600">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Candidaturas recebidas</span>
                <span className="font-semibold text-green-600">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vagas ativas</span>
                <span className="font-semibold text-orange-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Visualizações</span>
                <span className="font-semibold text-purple-600">45</span>
              </div>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/publicar-vaga')}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                📢 Publicar Nova Vaga
              </button>
              <button
                onClick={() => navigate('/vagas-publicadas')}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                📋 Ver Vagas Publicadas
              </button>
              <button
                onClick={() => navigate('/candidaturas')}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
              >
                👥 Ver Candidaturas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 