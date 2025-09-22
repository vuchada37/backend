const sequelize = require('../config/database');
const User = require('./User');
const Vaga = require('./Vaga');
const Candidatura = require('./Candidatura');
const Chamado = require('./Chamado');
const RespostaChamado = require('./RespostaChamado');
const Mensagem = require('./Mensagem');
const Conversa = require('./Conversa');

// Associação: Uma empresa (User) tem muitas Vagas
User.hasMany(Vaga, { foreignKey: 'empresaId', as: 'vagas' });
Vaga.belongsTo(User, { foreignKey: 'empresaId', as: 'empresa' });

// Associações de candidatura
Vaga.hasMany(Candidatura, { foreignKey: 'vagaId', as: 'candidaturas' });
Candidatura.belongsTo(Vaga, { foreignKey: 'vagaId', as: 'vaga' });
User.hasMany(Candidatura, { foreignKey: 'usuarioId', as: 'candidaturasUsuario' }); // nome diferente para evitar conflito
Candidatura.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

// Associações de chamados
User.hasMany(Chamado, { foreignKey: 'usuarioId', as: 'chamados' });
Chamado.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

// Associações de respostas de chamados
Chamado.hasMany(RespostaChamado, { foreignKey: 'chamadoId', as: 'respostasList' });
RespostaChamado.belongsTo(Chamado, { foreignKey: 'chamadoId', as: 'chamado' });
User.hasMany(RespostaChamado, { foreignKey: 'usuarioId', as: 'respostasChamados' });
RespostaChamado.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

// Associações de mensagens
User.hasMany(Mensagem, { foreignKey: 'remetenteId', as: 'mensagensEnviadas' });
User.hasMany(Mensagem, { foreignKey: 'destinatarioId', as: 'mensagensRecebidas' });
Mensagem.belongsTo(User, { foreignKey: 'remetenteId', as: 'remetente' });
Mensagem.belongsTo(User, { foreignKey: 'destinatarioId', as: 'destinatario' });

// Associações de conversas
User.hasMany(Conversa, { foreignKey: 'usuario1Id', as: 'conversasComoUsuario1' });
User.hasMany(Conversa, { foreignKey: 'usuario2Id', as: 'conversasComoUsuario2' });
Conversa.belongsTo(User, { foreignKey: 'usuario1Id', as: 'usuario1' });
Conversa.belongsTo(User, { foreignKey: 'usuario2Id', as: 'usuario2' });
Conversa.belongsTo(Vaga, { foreignKey: 'vagaId', as: 'vaga' });

// Associações de mensagens com conversas
Conversa.hasMany(Mensagem, { foreignKey: 'conversaId', sourceKey: 'conversaId', as: 'mensagens' });
Mensagem.belongsTo(Conversa, { foreignKey: 'conversaId', targetKey: 'conversaId', as: 'conversa' });

const syncDb = async () => {
  try {
    console.log('Sincronizando banco de dados (alter=true)...');
    await sequelize.sync({ alter: true });
    console.log('Banco de dados sincronizado com alterações!');
  } catch (alterError) {
    console.warn('Erro na sincronização com alterações:', alterError.message);
    console.log('Tentando sincronização sem alterações...');
    try {
      await sequelize.sync();
      console.log('Banco de dados sincronizado (sem alterações)!');
    } catch (syncError) {
      console.warn('Erro na sincronização sem alterações:', syncError.message);
      console.log('Última tentativa: reset completo do banco (force=true)...');
      try {
        await sequelize.sync({ force: true });
        console.log('Banco de dados resetado com sucesso!');
      } catch (forceError) {
        console.error('Erro crítico ao sincronizar banco:', forceError.message);
        console.error('Stack trace:', forceError.stack);
        process.exit(1);
      }
    }
  }
};

module.exports = { sequelize, User, Vaga, Candidatura, Chamado, RespostaChamado, Mensagem, Conversa, syncDb };