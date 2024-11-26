import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useStores } from './StoreContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'seller';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { sellers } = useStores();

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated login - In a real app, this would make an API call
    if (email === 'admin@phonestore.com' && password === 'admin123') {
      setUser({
        id: 0,
        name: 'Admin',
        email: 'admin@phonestore.com',
        role: 'admin'
      });
      return true;
    }

    // Check if it's a seller
    const seller = sellers.find(s => s.email === email);
    if (seller && password === 'seller123') { // In real app, use proper password verification
      setUser({
        id: seller.id,
        name: seller.name,
        email: seller.email,
        role: 'seller'
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}