import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMonetizacao } from '../context/MonetizacaoContext';

// Funções utilitárias para localStorage
const STORAGE_KEY = 'vagas';
function getVagas() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}
function saveVagas(vagas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vagas));
}

const PublicarVaga = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    titulo: '',
    empresa: '',
    localizacao: '',
    tipoContrato: 'Efetivo',
    salario: '',
    descricao: '',
    requisitos: '',
    beneficios: '',
    nivelExperiencia: 'JUNIOR',
    modalidade: 'PRESENCIAL',
    area: '',
    prazoInscricao: '',
    premium: false // Novo campo
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const isEditando = Boolean(id);
  const { assinatura } = useMonetizacao();
  const isPremiumEmpresa = assinatura?.plano === 'premium' || assinatura?.plano === 'empresarial';

  // Carregar vaga do localStorage se for edição
  useEffect(() => {
    if (isEditando) {
      const vagas = getVagas();
      if (vagas[id]) {
        setFormData(vagas[id]);
      }
    }
  }, [id, isEditando]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // Salvar ou atualizar vaga no localStorage
    const vagas = getVagas();
    let vagaId = id;
    if (isEditando) {
      // Atualizar vaga existente
      vagas[vagaId] = {
        ...formData,
        dataExpiracao: formData.prazoInscricao || formData.dataExpiracao || '',
        dataPublicacao: vagas[vagaId].dataPublicacao || new Date().toISOString().split('T')[0],
        premium: !!formData.premium // Garante boolean
      };
    } else {
      // Criar nova vaga com ID único
      vagaId = Date.now().toString();
      vagas[vagaId] = {
        ...formData,
        dataPublicacao: new Date().toISOString().split('T')[0],
        dataExpiracao: formData.prazoInscricao || '',
        premium: !!formData.premium // Garante boolean
      };
    }
    saveVagas(vagas);
    setIsSubmitting(false);
    setShowToast({ type: 'success', message: isEditando ? 'Vaga editada com sucesso!' : 'Vaga publicada com sucesso!' });
    setTimeout(() => setShowToast(null), 2200);
    setTimeout(() => navigate('/vagas-publicadas'), 2300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📢 Publicar Nova Vaga
            </h1>
            <p className="text-gray-600">
              Preencha os dados da vaga para encontrar o candidato ideal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pb-8">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da Vaga *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Desenvolvedor React Senior"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome da empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização *
                </label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cidade, Estado"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área de Atuação *
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Tecnologia, Marketing, Vendas"
                />
              </div>
            </div>

            {/* Detalhes da Vaga */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Contrato
                </label>
                <select
                  name="tipoContrato"
                  value={formData.tipoContrato}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Efetivo">Efetivo</option>
                  <option value="Prestador">Prestador</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Estagio">Estágio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nível de Experiência
                </label>
                <select
                  name="nivelExperiencia"
                  value={formData.nivelExperiencia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="JUNIOR">Júnior</option>
                  <option value="PLENO">Pleno</option>
                  <option value="SENIOR">Sênior</option>
                  <option value="ESPECIALISTA">Especialista</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Modalidade
                </label>
                <select
                  name="modalidade"
                  value={formData.modalidade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="PRESENCIAL">Presencial</option>
                  <option value="REMOTO">Remoto</option>
                  <option value="HIBRIDO">Híbrido</option>
                </select>
              </div>
            </div>

            {/* Checkbox Vaga Premium */}
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="premium"
                name="premium"
                checked={formData.premium}
                onChange={handleInputChange}
                className="h-5 w-5 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded mr-2"
                disabled={!isPremiumEmpresa}
              />
              <label htmlFor="premium" className="text-sm font-medium text-gray-700 select-none">
                Tornar esta vaga <span className="font-bold text-yellow-600">Premium</span> (apenas candidatos premium poderão se candidatar)
              </label>
              {!isPremiumEmpresa && (
                <span className="ml-2 text-xs text-gray-400" title="Disponível apenas para empresas com plano Premium ou Empresarial.">
                  (Disponível apenas para empresas premium)
                </span>
              )}
            </div>

            {/* Salário e Prazo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salário (opcional)
                </label>
                <input
                  type="text"
                  name="salario"
                  value={formData.salario}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 15.000 - 25.000 MT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo de Inscrição
                </label>
                <input
                  type="date"
                  name="prazoInscricao"
                  value={formData.prazoInscricao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição da Vaga *
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descreva as responsabilidades, atividades e objetivos da vaga..."
              />
            </div>

            {/* Requisitos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requisitos *
              </label>
              <textarea
                name="requisitos"
                value={formData.requisitos}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Liste os requisitos técnicos, formação, experiência necessária..."
              />
            </div>

            {/* Benefícios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefícios (opcional)
              </label>
              <textarea
                name="beneficios"
                value={formData.beneficios}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Liste os benefícios oferecidos: seguro de saúde, subsídio de alimentação, etc..."
              />
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/vagas-publicadas')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </span>
                ) : (
                  '📢 Publicar Vaga'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Toast visual */}
      {showToast && (
        <div className={`fixed bottom-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg text-white ${showToast.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ fontSize: '1rem', maxWidth: '90vw', left: '50%', right: 'auto', transform: 'translateX(-50%)', bottom: '1.5rem', zIndex: 9999 }}
        >
          {showToast.message}
        </div>
      )}
    </div>
  );
};

export default PublicarVaga; 