import { useParams, Link } from 'react-router-dom'

const vagas = [
  {
    id: 1,
    titulo: 'Desenvolvedor Frontend',
    empresa: 'TechMoç',
    local: 'Maputo',
    tipo: 'Tempo Integral',
    descricao: 'Desenvolva interfaces modernas e responsivas para nossos clientes.',
    requisitos: [
      'Experiência com React',
      'Conhecimento em Tailwind CSS',
      'Boa comunicação',
    ],
    beneficios: [
      'Salário competitivo',
      'Ambiente inovador',
      'Possibilidade de trabalho remoto',
    ],
    publicadaEm: '2024-06-01',
    contato: 'contato@techmoc.co.mz',
    site: 'https://techmoc.co.mz',
  },
  {
    id: 2,
    titulo: 'Designer Gráfico',
    empresa: 'Criativa',
    local: 'Beira',
    tipo: 'Freelancer',
    descricao: 'Crie materiais visuais impactantes para campanhas digitais.',
    requisitos: [
      'Portfólio de design',
      'Domínio do Photoshop e Illustrator',
    ],
    beneficios: [
      'Projetos variados',
      'Pagamento por projeto',
    ],
    publicadaEm: '2024-06-02',
    contato: 'vagas@criativa.co.mz',
    site: 'https://criativa.co.mz',
  },
];

export default function DetalheVaga() {
  const { id } = useParams();
  const vaga = vagas.find(v => v.id === Number(id));

  if (!vaga) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Vaga não encontrada</h2>
        <Link to="/" className="text-blue-600 hover:underline">Voltar para vagas</Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center shadow text-2xl font-bold text-white">
          {vaga.empresa[0]}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-1">{vaga.titulo}</h2>
          <div className="text-blue-700 font-semibold">{vaga.empresa}</div>
          <div className="text-gray-600 text-sm">{vaga.local} • {vaga.tipo}</div>
        </div>
      </div>
      <div className="flex flex-col gap-6 bg-white rounded-lg shadow p-6 mb-6">
        <div>
          <div className="text-xs text-gray-400 mb-2">Publicada em {vaga.publicadaEm}</div>
          <p className="mb-2 text-gray-800">{vaga.descricao}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1 text-blue-700">Requisitos</h3>
          <ul className="list-disc list-inside text-gray-800">
            {vaga.requisitos.map((req, i) => <li key={i}>{req}</li>)}
          </ul>
        </div>
        {vaga.beneficios && (
          <div>
            <h3 className="font-semibold mb-1 text-blue-700">Benefícios</h3>
            <ul className="list-disc list-inside text-gray-800">
              {vaga.beneficios.map((ben, i) => <li key={i}>{ben}</li>)}
            </ul>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <a href={vaga.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Site da empresa</a>
          <span className="text-gray-500 text-xs">|</span>
          <a href={`mailto:${vaga.contato}`} className="text-blue-600 hover:underline text-sm">Contato: {vaga.contato}</a>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Link to="/" className="text-blue-600 hover:underline font-medium">← Voltar para vagas</Link>
        <button className="px-8 py-3 rounded bg-gradient-to-br from-blue-600 to-green-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition">Candidatar-se</button>
      </div>
    </div>
  );
} 