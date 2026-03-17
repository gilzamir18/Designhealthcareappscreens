import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  // Dados de cadastro
  nomeCompleto: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  
  // Dados de triagem
  dataNascimento?: string;
  sexoBiologico?: 'Masculino' | 'Feminino';
  peso?: number;
  altura?: number;
  condicoesSaude?: string[];
  usaMedicamentos?: 'Sim' | 'Não';
  nivelAtividade?: string;
}

interface UserContextType {
  userData: UserData | null;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('spl_user_data');
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const updateUserData = (data: Partial<UserData>) => {
    const newData = { ...userData, ...data } as UserData;
    setUserData(newData);
    localStorage.setItem('spl_user_data', JSON.stringify(newData));
  };

  const clearUserData = () => {
    setUserData(null);
    localStorage.removeItem('spl_user_data');
  };

  const isAuthenticated = !!userData?.email;

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
