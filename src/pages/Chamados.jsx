import { Link } from 'react-router-dom'

const chamados = [
  {
    id: 1,
    titulo: 'Preciso de eletricista para residência',
    descricao: 'Problema com instalação elétrica em casa, preciso de profissional urgente.',
    area: 'Eletricista',
    local: 'Maputo',
  },
  {
    id: 2,
    titulo: 'Desenvolvedor para site institucional',
    descricao: 'Empresa busca desenvolvedor para criar site simples.',
    area: 'Desenvolvimento Web',
    local: 'Beira',
  },
];

export default function Chamados() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Chamados de Serviço</h2>
        <Link to="/chamados/novo" className="px-4 py-2 text-sm rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition min-w-fit">Criar chamado</Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2">
        {chamados.map(chamado => (
          <li key={chamado.id} className="border rounded-lg p-4 shadow hover:bg-blue-50 transition flex flex-col gap-2">
            <div className="text-lg font-bold text-blue-700">{chamado.titulo}</div>
            <div className="text-gray-600 text-sm">Área: {chamado.area} • {chamado.local}</div>
            <div className="text-gray-700 text-sm mb-2">{chamado.descricao}</div>
            <Link to={`/chamados/${chamado.id}`} className="text-blue-600 hover:underline font-medium self-end">Ver detalhes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 