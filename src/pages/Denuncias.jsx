import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Denuncias() {
  const [tipo, setTipo] = useState('empresa');
  const [descricao, setDescricao] = useState('');
  const [anexo, setAnexo] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui você pode salvar a denúncia no localStorage ou enviar para backend futuramente
    setSucesso(true);
    setTimeout(() => {
      setSucesso(false);
      navigate(-1);
    }, 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Denunciar</h1>
        {sucesso ? (
          <div className="text-green-700 bg-green-100 border border-green-300 rounded p-4 text-center font-semibold animate__animated animate__fadeIn">
            Denúncia enviada com sucesso! Obrigado por ajudar a manter a plataforma segura.
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de denúncia</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full p-3 border rounded-lg">
              <option value="empresa">Empresa</option>
              <option value="candidato">Candidato</option>
              <option value="vaga">Vaga</option>
              <option value="mensagem">Mensagem</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required rows={4} className="w-full p-3 border rounded-lg" placeholder="Descreva o motivo da denúncia..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Anexar evidência (opcional)</label>
            <input type="file" accept="image/*,.pdf,.doc,.docx" onChange={e => setAnexo(e.target.files[0])} className="w-full" />
            {anexo && <div className="text-xs text-gray-500 mt-1">Arquivo selecionado: {anexo.name}</div>}
          </div>
          <button type="submit" className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition">Enviar denúncia</button>
        </form>
        )}
      </div>
    </div>
  );
} 