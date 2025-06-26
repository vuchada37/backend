import { Link } from 'react-router-dom'

export default function Vagas() {
  // Vagas mockadas
  const vagas = [
    { 
      id: 1, 
      titulo: 'Desenvolvedor Frontend', 
      local: 'Maputo', 
      empresa: 'TechMoç', 
      tipo: 'Tempo Integral',
      descricao: 'Desenvolva interfaces modernas e responsivas para nossos clientes.'
    },
    { 
      id: 2, 
      titulo: 'Designer Gráfico', 
      local: 'Beira', 
      empresa: 'Criativa', 
      tipo: 'Freelancer',
      descricao: 'Crie materiais visuais impactantes para campanhas digitais.'
    },
    { 
      id: 3, 
      titulo: 'Analista de Marketing', 
      local: 'Nampula', 
      empresa: 'DigitalMoç', 
      tipo: 'Tempo Integral',
      descricao: 'Gerencie campanhas de marketing digital e redes sociais.'
    },
    { 
      id: 4, 
      titulo: 'Contador', 
      local: 'Maputo', 
      empresa: 'ContaFácil', 
      tipo: 'Tempo Integral',
      descricao: 'Responsável pela contabilidade e relatórios financeiros.'
    },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vagas Disponíveis</h1>
        <p className="text-gray-600">Encontre a oportunidade perfeita para sua carreira</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vagas.map(vaga => (
          <div key={vaga.id} className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition">
            <Link to={`/vaga/${vaga.id}`} className="text-xl font-bold text-blue-700 hover:underline mb-2 block">
              {vaga.titulo}
            </Link>
            <div className="text-gray-600 mb-2">{vaga.empresa} • {vaga.local}</div>
            <div className="text-sm text-gray-500 mb-3">{vaga.tipo}</div>
            <p className="text-gray-700 text-sm mb-4">{vaga.descricao}</p>
            <Link 
              to={`/vaga/${vaga.id}`} 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 