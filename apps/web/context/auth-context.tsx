"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  role: string;
  apiKey: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  regenerateApiKey: () => Promise<string>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Simulated API calls
  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const response = await fetch("https://brecipes-fastify.onrender.com/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const loggedInUser: User = await response.json();
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string) {
    setLoading(true);
    try {
      const response = await fetch("https://brecipes-fastify.onrender.com/api/users/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const newUser: User = await response.json();
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  async function regenerateApiKey(): Promise<string> {
    setLoading(true);
    try {
      // // This would be an actual API call
      // // const response = await fetch('/api/apikey/regenerate', {...})
      //
      // // For now, simulate a successful key regeneration
      // const newApiKey = 'new-api-key-' + Math.random().toString(36).substring(2, 10);
      //
      // if (user) {
      //   const updatedUser = { ...user, apiKey: newApiKey };
      //   setUser(updatedUser);
      //   localStorage.setItem('user', JSON.stringify(updatedUser));
      // }
      
      return "newApiKey";
    } catch (error) {
      console.error('API key regeneration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      regenerateApiKey,
      loading 
    }}>
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