'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCurrentUser } from '@/data/mockData';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  membershipTier: string;
  walletBalance: number;
  avatar: string;
  tripsCompleted: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(mockCurrentUser);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('tripnova_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        localStorage.setItem('tripnova_user', JSON.stringify(mockCurrentUser));
      }
    } catch {
      // ignore storage error
    }
    setIsInitialized(true);
  }, []);

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      ...mockCurrentUser,
      email,
      name: name || email.split('@')[0].replace('.', ' '),
    };
    setUser(newUser);
    try {
      localStorage.setItem('tripnova_user', JSON.stringify(newUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('tripnova_user');
    } catch {}
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const nextUser = { ...user, ...updated };
    setUser(nextUser);
    try {
      localStorage.setItem('tripnova_user', JSON.stringify(nextUser));
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
