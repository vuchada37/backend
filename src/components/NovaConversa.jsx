import React, { useState, useEffect } from 'react';
import { mensagemService } from '../services/mensagemService';
import Modal from './Modal';

export default function NovaConversa({ isOpen, onClose, onConversaCriada }) {
  const [usuarios, setUsuarios] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && busca.trim()) {
      buscarUsuarios();
    } else if (isOpen) {
      setUsuarios([]);
    }
  }, [busca, isOpen]);

  const buscarUsuarios = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await mensagemService.buscarUsuarios(busca);
      setUsuarios(data);
    } catch (err) {
      setError('Erro ao buscar usuários');
      console.error('Erro ao buscar usuários:', err);
    } finally {
      setLoading(false);
    }
  };

  const iniciarConversa = async (usuario) => {
    try {
      setLoading(true);
      setError('');
      
      await mensagemService.iniciarConversa(usuario.id);
      
      onConversaCriada();
      onClose();
      setBusca('');
      setUsuarios([]);
    } catch (err) {
      setError('Erro ao iniciar conversa');
      console.error('Erro ao iniciar conversa:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
    setError('');
  };

  const handleClose = () => {
    onClose();
    setBusca('');
    setUsuarios([]);
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nova Conversa"
      size="md"
    >
      <div className="space-y-4">
        {/* Campo de busca */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar usuário
          </label>
          <div className="relative">
            <input
              type="text"
              value={busca}
              onChange={handleBuscaChange}
              placeholder="Digite nome ou email..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Digite pelo menos 3 caracteres para buscar
          </p>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-500">Buscando...</span>
          </div>
        )}

        {/* Lista de usuários */}
        {!loading && usuarios.length > 0 && (
          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
            {usuarios.map((usuario) => (
              <div
                key={usuario.id}
                onClick={() => iniciarConversa(usuario)}
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <img
                  src={usuario.foto || 'https://via.placeholder.com/40'}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {usuario.nome}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {usuario.email}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      usuario.tipo === 'empresa' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {usuario.tipo === 'empresa' ? '🏢 Empresa' : '👤 Candidato'}
                    </span>
                    {usuario.online && (
                      <span className="text-xs text-green-600">🟢 Online</span>
                    )}
                  </div>
                </div>
                <div className="text-gray-400">
                  <span className="text-xs">→</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {!loading && busca.trim() && usuarios.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🔍</div>
            <p>Nenhum usuário encontrado</p>
            <p className="text-sm">Tente buscar com outros termos</p>
          </div>
        )}

        {/* Instruções iniciais */}
        {!loading && !busca.trim() && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p>Digite o nome ou email do usuário</p>
            <p className="text-sm">para iniciar uma nova conversa</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
} 