import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Modal from '../components/Modal'

export default function Perfil() {
  const { user } = useAuth()
  const { id } = useParams()
  const [secaoAtiva, setSecaoAtiva] = useState('pessoal')
  const [editando, setEditando] = useState(false)
  const [formData, setFormData] = useState({
    // Informações pessoais
    nome: user?.nome || 'João Silva',
    email: user?.email || 'joao@email.com',
    telefone: '(258) 84 123 4567',
    dataNascimento: '1990-05-15',
    endereco: 'Avenida 25 de Setembro, 123 - Maputo',
    
    // Informações profissionais
    formacao: 'Engenharia Informática',
    instituicao: 'Universidade Eduardo Mondlane',
    experiencia: '3 anos',
    habilidades: 'React, JavaScript, TypeScript, Node.js, Python',
    resumo: 'Desenvolvedor apaixonado por criar soluções inovadoras e interfaces intuitivas.',
    
    // Redes sociais
    linkedin: 'linkedin.com/in/joaosilva',
    github: 'github.com/joaosilva',
    portfolio: 'joaosilva.dev',
    behance: 'behance.net/joaosilva',
    instagram: '@joaosilva.dev',
    twitter: '@joaosilva_dev',
    
    // Preferências
    tipoTrabalho: 'remoto',
    faixaSalarial: '15000-25000',
    localizacaoPreferida: 'Maputo',
    disponibilidade: 'imediata',
    
    // Currículo
    curriculo: 'joao_silva_cv.pdf',
    
    // Privacidade
    perfilPublico: true,
    mostrarTelefone: false,
    mostrarEndereco: false,
    
    // Notificações
    alertasVagas: true,
    frequenciaAlertas: 'diario',
    vagasInteresse: ['desenvolvedor', 'frontend', 'react']
  })

  // Dados mockados para certificações
  const [certificacoes, setCertificacoes] = useState([
    { id: 1, nome: 'React Developer', instituicao: 'Meta', data: '2023-06-15', link: 'https://example.com' },
    { id: 2, nome: 'JavaScript ES6+', instituicao: 'Udemy', data: '2023-03-20', link: 'https://example.com' }
  ])

  // Dados mockados para idiomas
  const [idiomas, setIdiomas] = useState([
    { id: 1, idioma: 'Português', nivel: 'nativo' },
    { id: 2, idioma: 'Inglês', nivel: 'avançado' },
    { id: 3, idioma: 'Espanhol', nivel: 'intermediário' }
  ])

  // Dados mockados para projetos
  const [projetos, setProjetos] = useState([
    { 
      id: 1, 
      nome: 'E-commerce React', 
      descricao: 'Plataforma completa de e-commerce com React e Node.js',
      tecnologias: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/joaosilva/ecommerce',
      imagem: 'https://via.placeholder.com/300x200'
    },
    { 
      id: 2, 
      nome: 'App de Finanças', 
      descricao: 'Aplicativo para controle de finanças pessoais',
      tecnologias: ['React Native', 'Firebase'],
      link: 'https://github.com/joaosilva/financas',
      imagem: 'https://via.placeholder.com/300x200'
    }
  ])

  // Dados mockados para estatísticas
  const [estatisticas] = useState({
    candidaturas: { total: 8, esteMes: 3, aprovadas: 2 },
    entrevistas: { total: 3, agendadas: 1, realizadas: 2 },
    vagasSalvas: 5,
    visualizacoes: 12
  })

  // Mock de busca por id
  const mockUsuarios = {
    '1': { nome: 'João Silva', email: 'joao@email.com', tipo: 'candidato' },
    '2': { nome: 'Maria Santos', email: 'maria@email.com', tipo: 'candidato' },
    '3': { nome: 'Pedro Costa', email: 'pedro@email.com', tipo: 'candidato' }
  }
  const usuarioExibido = id ? mockUsuarios[id] : null;

  // Estados para modais de adição
  const [modalCert, setModalCert] = useState(false)
  const [modalIdioma, setModalIdioma] = useState(false)
  const [modalProjeto, setModalProjeto] = useState(false)

  // Estados dos formulários
  const [novaCert, setNovaCert] = useState({ nome: '', instituicao: '', data: '', link: '', arquivo: null, arquivoUrl: '' })
  const [novoIdioma, setNovoIdioma] = useState({ idioma: '', nivel: 'básico' })
  const [novoProjeto, setNovoProjeto] = useState({ nome: '', descricao: '', tecnologias: '', link: '', imagem: '', imagemFile: null, imagemUrl: '' })

  // Funções para adicionar
  const adicionarCertificacao = () => {
    setCertificacoes(prev => [
      ...prev,
      { id: Date.now(), ...novaCert, arquivo: novaCert.arquivoUrl || '' }
    ])
    setNovaCert({ nome: '', instituicao: '', data: '', link: '', arquivo: null, arquivoUrl: '' })
    setModalCert(false)
  }
  const adicionarIdioma = () => {
    setIdiomas(prev => [
      ...prev,
      { id: Date.now(), ...novoIdioma }
    ])
    setNovoIdioma({ idioma: '', nivel: 'básico' })
    setModalIdioma(false)
  }
  const adicionarProjeto = () => {
    setProjetos(prev => [
      ...prev,
      { id: Date.now(), ...novoProjeto, tecnologias: novoProjeto.tecnologias.split(',').map(t => t.trim()), imagem: novoProjeto.imagemUrl || novoProjeto.imagem }
    ])
    setNovoProjeto({ nome: '', descricao: '', tecnologias: '', link: '', imagem: '', imagemFile: null, imagemUrl: '' })
    setModalProjeto(false)
  }

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      alert(`Currículo "${file.name}" enviado com sucesso! (Funcionalidade mockada)`)
    }
  }

  // Se não houver usuário logado, mostrar mensagem de acesso restrito
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-lg text-center px-4">Você precisa estar logado para acessar o perfil.</div>
      </div>
    )
  }

  const renderSecaoPessoal = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Informações Pessoais</h2>
        <button
          onClick={() => setEditando(!editando)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          {editando ? 'Cancelar' : 'Editar'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              disabled={!editando}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              disabled={!editando}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {editando && (
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => setEditando(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  )

  const renderSecaoProfissional = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Informações Profissionais</h2>
        <button
          onClick={() => setEditando(!editando)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          {editando ? 'Cancelar' : 'Editar'}
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Formação</label>
            <input
              type="text"
              name="formacao"
              value={formData.formacao}
              onChange={handleChange}
              disabled={!editando}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instituição</label>
            <input
              type="text"
              name="instituicao"
              value={formData.instituicao}
              onChange={handleChange}
              disabled={!editando}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experiência</label>
            <input
              type="text"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              disabled={!editando}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Habilidades</label>
          <input
            type="text"
            name="habilidades"
            value={formData.habilidades}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Ex: React, JavaScript, TypeScript, Node.js"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resumo Profissional</label>
          <textarea
            name="resumo"
            value={formData.resumo}
            onChange={handleChange}
            disabled={!editando}
            rows={4}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  )

  const renderSecaoCurriculo = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Currículo</h2>
        <button
          onClick={() => document.getElementById('curriculo-upload').click()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Atualizar Currículo
        </button>
      </div>
      
      <input
        id="curriculo-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-600 mb-2">Currículo atual: {formData.curriculo}</p>
        <div className="flex gap-2 justify-center">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm">
            Visualizar
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
            Baixar
          </button>
        </div>
      </div>
    </div>
  )

  const renderSecaoRedesSociais = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Redes Sociais</h2>
        <button
          onClick={() => setEditando(!editando)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          {editando ? 'Cancelar' : 'Editar'}
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfólio</label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Behance</label>
          <input
            type="url"
            name="behance"
            value={formData.behance}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Twitter/X</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  )

  const renderSecaoPreferencias = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Preferências de Trabalho</h2>
        <button
          onClick={() => setEditando(!editando)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          {editando ? 'Cancelar' : 'Editar'}
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Trabalho</label>
          <select
            name="tipoTrabalho"
            value={formData.tipoTrabalho}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="remoto">Remoto</option>
            <option value="hibrido">Híbrido</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>
        {/* Campo de faixa salarial removido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Localização Preferida</label>
          <input
            type="text"
            name="localizacaoPreferida"
            value={formData.localizacaoPreferida}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidade</label>
          <select
            name="disponibilidade"
            value={formData.disponibilidade}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="imediata">Imediata</option>
            <option value="15dias">15 dias</option>
            <option value="30dias">30 dias</option>
            <option value="60dias">60 dias</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderSecaoCertificacoes = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Certificações</h2>
        <button
          onClick={() => setModalCert(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Adicionar
        </button>
      </div>
      {/* Modal de adicionar certificação */}
      <Modal isOpen={modalCert} onClose={() => setModalCert(false)} title="Adicionar Certificação">
        <div className="space-y-3">
          <input type="text" placeholder="Nome da Certificação" value={novaCert.nome} onChange={e => setNovaCert(v => ({...v, nome: e.target.value}))} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Instituição" value={novaCert.instituicao} onChange={e => setNovaCert(v => ({...v, instituicao: e.target.value}))} className="w-full p-2 border rounded" />
          <input type="url" placeholder="Link (opcional)" value={novaCert.link} onChange={e => setNovaCert(v => ({...v, link: e.target.value}))} className="w-full p-2 border rounded" />
          <div>
            <label className="block text-sm mb-1">Anexar Certificado (PDF/JPG/PNG)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setNovaCert(v => ({...v, arquivo: file, arquivoUrl: url}))
              }
            }} />
            {novaCert.arquivoUrl && (
              <div className="mt-1 text-xs text-green-700">Arquivo selecionado: {novaCert.arquivo?.name || 'visualizar'} <a href={novaCert.arquivoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">Ver</a></div>
            )}
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setModalCert(false)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
            <button onClick={adicionarCertificacao} className="px-4 py-2 bg-blue-600 text-white rounded">Adicionar</button>
          </div>
        </div>
      </Modal>
      <div className="space-y-4">
        {certificacoes.map((cert) => (
          <div key={cert.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{cert.nome}</h3>
                <p className="text-sm text-gray-600">{cert.instituicao}</p>
                {cert.link && <a href={cert.link} className="text-blue-600 underline text-xs" target="_blank" rel="noopener noreferrer">Ver certificado</a>}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">
                  Verificar
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition">
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSecaoIdiomas = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Idiomas</h2>
        <button
          onClick={() => setModalIdioma(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Adicionar
        </button>
      </div>
      {/* Modal de adicionar idioma */}
      <Modal isOpen={modalIdioma} onClose={() => setModalIdioma(false)} title="Adicionar Idioma">
        <div className="space-y-3">
          <input type="text" placeholder="Idioma" value={novoIdioma.idioma} onChange={e => setNovoIdioma(v => ({...v, idioma: e.target.value}))} className="w-full p-2 border rounded" />
          <select value={novoIdioma.nivel} onChange={e => setNovoIdioma(v => ({...v, nivel: e.target.value}))} className="w-full p-2 border rounded">
            <option value="básico">Básico</option>
            <option value="intermediário">Intermediário</option>
            <option value="avançado">Avançado</option>
            <option value="nativo">Nativo</option>
          </select>
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setModalIdioma(false)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
            <button onClick={adicionarIdioma} className="px-4 py-2 bg-blue-600 text-white rounded">Adicionar</button>
          </div>
        </div>
      </Modal>
      <div className="space-y-4">
        {idiomas.map((idioma) => (
          <div key={idioma.id} className="flex justify-between items-center border rounded-lg p-4">
            <div>
              <h3 className="font-semibold text-gray-800">{idioma.idioma}</h3>
              <p className="text-sm text-gray-600 capitalize">{idioma.nivel}</p>
            </div>
            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition">
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSecaoProjetos = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Projetos</h2>
        <button
          onClick={() => setModalProjeto(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Adicionar
        </button>
      </div>
      {/* Modal de adicionar projeto */}
      <Modal isOpen={modalProjeto} onClose={() => setModalProjeto(false)} title="Adicionar Projeto">
        <div className="space-y-3">
          <input type="text" placeholder="Nome do Projeto" value={novoProjeto.nome} onChange={e => setNovoProjeto(v => ({...v, nome: e.target.value}))} className="w-full p-2 border rounded" />
          <textarea placeholder="Descrição" value={novoProjeto.descricao} onChange={e => setNovoProjeto(v => ({...v, descricao: e.target.value}))} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Tecnologias (separadas por vírgula)" value={novoProjeto.tecnologias} onChange={e => setNovoProjeto(v => ({...v, tecnologias: e.target.value}))} className="w-full p-2 border rounded" />
          <input type="url" placeholder="Link do Projeto" value={novoProjeto.link} onChange={e => setNovoProjeto(v => ({...v, link: e.target.value}))} className="w-full p-2 border rounded" />
          <div>
            <label className="block text-sm mb-1">Imagem do Projeto (JPG/PNG)</label>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={e => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setNovoProjeto(v => ({...v, imagemFile: file, imagemUrl: url}))
              }
            }} />
            {novoProjeto.imagemUrl && (
              <div className="mt-1 text-xs text-green-700">Imagem selecionada: {novoProjeto.imagemFile?.name || 'visualizar'} <a href={novoProjeto.imagemUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-2">Ver</a></div>
            )}
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setModalProjeto(false)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
            <button onClick={adicionarProjeto} className="px-4 py-2 bg-blue-600 text-white rounded">Adicionar</button>
          </div>
        </div>
      </Modal>
      <div className="grid md:grid-cols-2 gap-6">
        {projetos.map((projeto) => (
          <div key={projeto.id} className="border rounded-lg overflow-hidden">
            <img src={projeto.imagem} alt={projeto.nome} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{projeto.nome}</h3>
              <p className="text-sm text-gray-600 mb-3">{projeto.descricao}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {projeto.tecnologias.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">
                  Ver Projeto
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition">
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSecaoEstatisticas = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Estatísticas</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{estatisticas.candidaturas.total}</div>
          <div className="text-sm text-gray-600">Candidaturas</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{estatisticas.entrevistas.total}</div>
          <div className="text-sm text-gray-600">Entrevistas</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{estatisticas.vagasSalvas}</div>
          <div className="text-sm text-gray-600">Vagas Salvas</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{estatisticas.visualizacoes}</div>
          <div className="text-sm text-gray-600">Visualizações</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Candidaturas este mês</span>
          <span className="font-semibold">{estatisticas.candidaturas.esteMes}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Candidaturas aprovadas</span>
          <span className="font-semibold text-green-600">{estatisticas.candidaturas.aprovadas}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Entrevistas agendadas</span>
          <span className="font-semibold text-blue-600">{estatisticas.entrevistas.agendadas}</span>
        </div>
      </div>
    </div>
  )

  const renderSecaoNotificacoes = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Notificações</h2>
        <button
          onClick={() => setEditando(!editando)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          {editando ? 'Cancelar' : 'Editar'}
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Alertas de vagas</h3>
            <p className="text-sm text-gray-600">Receber notificações de novas vagas</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.alertasVagas}
              onChange={(e) => setFormData({...formData, alertasVagas: e.target.checked})}
              disabled={!editando}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frequência de alertas</label>
          <select
            name="frequenciaAlertas"
            value={formData.frequenciaAlertas}
            onChange={handleChange}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="diario">Diário</option>
            <option value="semanal">Semanal</option>
            <option value="quinzenal">Quinzenal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Palavras-chave de interesse</label>
          <input
            type="text"
            name="vagasInteresse"
            value={formData.vagasInteresse.join(', ')}
            onChange={(e) => setFormData({...formData, vagasInteresse: e.target.value.split(', ')})}
            disabled={!editando}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Ex: desenvolvedor, frontend, react"
          />
        </div>
      </div>
    </div>
  )

  const renderSecaoPrivacidade = () => (
    <div className="bg-white rounded-lg shadow p-2 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Privacidade</h2>
        <button
          onClick={() => setEditando(!editando)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
        >
          {editando ? 'Cancelar' : 'Editar'}
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Perfil público</h3>
            <p className="text-sm text-gray-600">Permitir que empresas vejam seu perfil</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.perfilPublico}
              onChange={(e) => setFormData({...formData, perfilPublico: e.target.checked})}
              disabled={!editando}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Mostrar telefone</h3>
            <p className="text-sm text-gray-600">Exibir telefone no perfil público</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.mostrarTelefone}
              onChange={(e) => setFormData({...formData, mostrarTelefone: e.target.checked})}
              disabled={!editando}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Mostrar endereço</h3>
            <p className="text-sm text-gray-600">Exibir endereço no perfil público</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.mostrarEndereco}
              onChange={(e) => setFormData({...formData, mostrarEndereco: e.target.checked})}
              disabled={!editando}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl w-full mx-auto min-h-screen py-8 px-4 pb-32 overflow-x-hidden">
      {id && usuarioExibido && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 rounded text-center">
          <strong>Perfil de outro usuário:</strong><br/>
          Nome: {usuarioExibido.nome}<br/>
          Email: {usuarioExibido.email}<br/>
          Tipo: {usuarioExibido.tipo}
        </div>
      )}
      {id && !usuarioExibido && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-center">
          Usuário não encontrado!
        </div>
      )}
      {/* Foto de perfil */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nome)}&background=0D8ABC&color=fff`}
            alt="Foto de perfil"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow"
          />
          <button
            onClick={() => alert('Funcionalidade de trocar foto em breve!')}
            className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition"
            title="Trocar foto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4zM7 17h.01M7 17a4 4 0 005.657 0M7 17a4 4 0 010-5.657M7 17H5a2 2 0 01-2-2v-2a2 2 0 012-2h2m0 0a4 4 0 015.657 0m0 0a4 4 0 010 5.657" /></svg>
          </button>
        </div>
        <div className="mt-2 text-lg font-semibold text-blue-700">{formData.nome}</div>
        <div className="text-gray-500 text-sm">{formData.email}</div>
      </div>

      {/* Botões de navegação */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSecaoAtiva('pessoal')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'pessoal' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pessoal
        </button>
        <button
          onClick={() => setSecaoAtiva('profissional')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'profissional' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Profissional
        </button>
        <button
          onClick={() => setSecaoAtiva('curriculo')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'curriculo' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Currículo
        </button>
        <button
          onClick={() => setSecaoAtiva('redes')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'redes' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Redes Sociais
        </button>
        <button
          onClick={() => setSecaoAtiva('preferencias')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'preferencias' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Preferências
        </button>
        <button
          onClick={() => setSecaoAtiva('certificacoes')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'certificacoes' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Certificações
        </button>
        <button
          onClick={() => setSecaoAtiva('idiomas')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'idiomas' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Idiomas
        </button>
        <button
          onClick={() => setSecaoAtiva('projetos')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'projetos' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Projetos
        </button>
        <button
          onClick={() => setSecaoAtiva('estatisticas')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'estatisticas' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Estatísticas
        </button>
        <button
          onClick={() => setSecaoAtiva('notificacoes')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'notificacoes' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Notificações
        </button>
        <button
          onClick={() => setSecaoAtiva('privacidade')}
          className={`px-4 py-2 rounded-lg transition ${
            secaoAtiva === 'privacidade' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Privacidade
        </button>
      </div>

      {/* Conteúdo da seção ativa */}
      <div className="space-y-6">
        {secaoAtiva === 'pessoal' && renderSecaoPessoal()}
        {secaoAtiva === 'profissional' && renderSecaoProfissional()}
        {secaoAtiva === 'curriculo' && renderSecaoCurriculo()}
        {secaoAtiva === 'redes' && renderSecaoRedesSociais()}
        {secaoAtiva === 'preferencias' && renderSecaoPreferencias()}
        {secaoAtiva === 'certificacoes' && renderSecaoCertificacoes()}
        {secaoAtiva === 'idiomas' && renderSecaoIdiomas()}
        {secaoAtiva === 'projetos' && renderSecaoProjetos()}
        {secaoAtiva === 'estatisticas' && renderSecaoEstatisticas()}
        {secaoAtiva === 'notificacoes' && renderSecaoNotificacoes()}
        {secaoAtiva === 'privacidade' && renderSecaoPrivacidade()}
      </div>
    </div>
  )
} 