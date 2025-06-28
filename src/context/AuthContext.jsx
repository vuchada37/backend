import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('nevu_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function login({ email, nome, tipo }) {
    const mockUser = { email, nome, tipo };
    setUser(mockUser);
    localStorage.setItem('nevu_user', JSON.stringify(mockUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('nevu_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 