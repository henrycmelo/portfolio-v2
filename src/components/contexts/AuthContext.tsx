"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isLoggingIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(()=>{
    const checkAuth = () => {
        if (typeof window !== 'undefined') {
            const authStatus = localStorage.getItem('adminAuthenticated') === 'true';
            setIsAuthenticated(authStatus);
        }
        setIsLoading(false);
    }
    checkAuth();
  }, [])

  const login = async (password: string): Promise<boolean> => {
    setIsLoggingIn(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setIsLoggingIn(false);
      return true;
    } else {  
      setIsLoggingIn(false);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoggingIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};