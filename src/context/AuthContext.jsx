import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Funções utilitárias para localStorage
const USERS_KEY = 'nevu_users';
const COMPANIES_KEY = 'nevu_companies';
const CURRENT_USER_KEY = 'nevu_current_user';

function getUsers() {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : {};
}

function getCompanies() {
  const data = localStorage.getItem(COMPANIES_KEY);
  return data ? JSON.parse(data) : {};
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveCompanies(companies) {
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
}

// Função utilitária para adicionar meses corretamente
function addMonths(date, months) {
  const d = new Date(date);
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) {
    d.setDate(0);
  }
  return d;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  // Função para cadastrar usuário
  function register({ nome, email, senha, tipo }) {
    if (tipo === 'usuario') {
      const users = getUsers();
      
      // Verificar se email já existe
      if (users[email]) {
        throw new Error('Este email já está cadastrado.');
      }

      const newUser = {
        id: Date.now().toString(),
        nome,
        email,
        senha, // Em produção, deve ser criptografada
        tipo: 'usuario',
        dataCadastro: new Date().toISOString(),
        perfil: {
          foto: null,
          telefone: '',
          endereco: '',
          bio: '',
          experiencia: '',
          formacao: '',
          habilidades: [],
          curriculo: null
        },
        assinatura: {
          plano: 'gratuito',
          nome: 'Gratuito',
          preco: 0,
          status: 'ativa'
        }
      };

      users[email] = newUser;
      saveUsers(users);
      return newUser;
    } else {
      const companies = getCompanies();
      
      // Verificar se email já existe
      if (companies[email]) {
        throw new Error('Este email já está cadastrado.');
      }

      const newCompany = {
        id: Date.now().toString(),
        nome,
        email,
        senha, // Em produção, deve ser criptografada
        tipo: 'empresa',
        dataCadastro: new Date().toISOString(),
        perfil: {
          logo: null,
          telefone: '',
          endereco: '',
          cnpj: '',
          descricao: '',
          setor: '',
          tamanho: '',
          website: ''
        },
        assinatura: {
          plano: 'gratuito',
          nome: 'Gratuito',
          preco: 0,
          status: 'ativa'
        }
      };

      companies[email] = newCompany;
      saveCompanies(companies);
      return newCompany;
    }
  }

  // Função para fazer login
  function login({ email, senha, tipo }) {
    if (tipo === 'usuario') {
      const users = getUsers();
      const user = users[email];
      
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }
      
      if (user.senha !== senha) {
        throw new Error('Senha incorreta.');
      }

      // Remover senha do objeto antes de salvar na sessão
      const { senha: _, ...userWithoutPassword } = user;
      // Garante assinatura default se não existir
      if (!userWithoutPassword.assinatura) {
        userWithoutPassword.assinatura = { plano: 'gratuito', nome: 'Gratuito', preco: 0 };
      }
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } else {
      const companies = getCompanies();
      const company = companies[email];
      
      if (!company) {
        throw new Error('Empresa não encontrada.');
      }
      
      if (company.senha !== senha) {
        throw new Error('Senha incorreta.');
      }

      // Remover senha do objeto antes de salvar na sessão
      const { senha: _, ...companyWithoutPassword } = company;
      // Garante assinatura default se não existir
      if (!companyWithoutPassword.assinatura) {
        companyWithoutPassword.assinatura = { plano: 'gratuito', nome: 'Gratuito', preco: 0 };
      }
      setUser(companyWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(companyWithoutPassword));
      return companyWithoutPassword;
    }
  }

  // Função para atualizar perfil
  function updateProfile(updates) {
    if (!user) return;

    if (user.tipo === 'usuario') {
      const users = getUsers();
      const updatedUser = { ...users[user.email], perfil: { ...users[user.email].perfil, ...updates } };
      users[user.email] = updatedUser;
      saveUsers(users);
      
      // Atualizar usuário atual
      const { senha: _, ...userWithoutPassword } = updatedUser;
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    } else {
      const companies = getCompanies();
      const updatedCompany = { ...companies[user.email], perfil: { ...companies[user.email].perfil, ...updates } };
      companies[user.email] = updatedCompany;
      saveCompanies(companies);
      
      // Atualizar empresa atual
      const { senha: _, ...companyWithoutPassword } = updatedCompany;
      setUser(companyWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(companyWithoutPassword));
    }
  }

  // Função para upgrade de plano (empresa)
  function upgradePlano(novoPlano) {
    if (!user) return;
    if (user.tipo === 'empresa') {
      
      const companies = getCompanies();
      const empresa = companies[user.email];
      if (!empresa.assinatura) empresa.assinatura = {};
      const hoje = new Date();
      let proximo;
      if (novoPlano.id === 'empresarial') {
        proximo = addMonths(hoje, 2);
      } else {
        proximo = addMonths(hoje, 1);
      }
      empresa.assinatura.plano = novoPlano.id;
      empresa.assinatura.nome = novoPlano.nome;
      empresa.assinatura.preco = novoPlano.preco;
      empresa.assinatura.status = 'ativa';
      empresa.assinatura.dataInicio = hoje.toISOString();
      empresa.assinatura.proximoPagamento = proximo.toISOString();
      // Outros campos do plano, se desejar
      companies[user.email] = empresa;
      saveCompanies(companies);
      // Atualiza usuário logado
      const updatedUser = { ...user, assinatura: { ...empresa.assinatura } };
      setUser(updatedUser);
      localStorage.setItem('nevu_current_user', JSON.stringify(updatedUser));
    }
    // (Opcional: implementar para candidatos também)
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      login, 
      logout, 
      register, 
      updateProfile,
      isAuthenticated: !!user,
      loading,
      upgradePlano, // exporta função
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 