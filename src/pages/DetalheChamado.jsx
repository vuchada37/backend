import { useParams, Link } from 'react-router-dom'

const chamados = [
  {
    id: 1,
    titulo: 'Preciso de eletricista para residência',
    descricao: 'Problema com instalação elétrica em casa, preciso de profissional urgente.',
    area: 'Eletricista',
    local: 'Maputo',
    detalhes: 'A instalação elétrica da minha casa está apresentando falhas e quedas de energia. Preciso de um eletricista experiente para identificar e resolver o problema o quanto antes.',
  },
  {
    id: 2,
    titulo: 'Desenvolvedor para site institucional',
    descricao: 'Empresa busca desenvolvedor para criar site simples.',
    area: 'Desenvolvimento Web',
    local: 'Beira',
    detalhes: 'Nossa empresa precisa de um site institucional com até 5 páginas, formulário de contato e integração com redes sociais. Preferência para profissionais com portfólio.',
  },
];

export default function DetalheChamado() {
  const { id } = useParams();
  const chamado = chamados.find(c => c.id === Number(id));

  if (!chamado) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Chamado não encontrado</h2>
        <Link to="/chamados" className="text-blue-600 hover:underline">Voltar para chamados</Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">{chamado.titulo}</h2>
      <div className="text-blue-700 font-semibold mb-1">Área: {chamado.area}</div>
      <div className="text-gray-600 text-sm mb-4">Local: {chamado.local}</div>
      <p className="mb-6 text-gray-800">{chamado.detalhes}</p>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Link to="/chamados" className="text-blue-600 hover:underline font-medium">← Voltar para chamados</Link>
        <button className="px-8 py-3 rounded bg-gradient-to-br from-blue-600 to-green-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition">Responder chamado</button>
      </div>
    </div>
  );
} 