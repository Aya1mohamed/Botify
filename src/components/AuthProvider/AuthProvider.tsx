"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/tokens';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    username: string;
  };
  login: (access: string, refresh: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if the token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<{ exp: number; sub: string; username: string }>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  };

  // Extract user info from the token
  const getUserFromToken = (token: string) => {
    try {
      const decoded = jwtDecode<{ exp: number; sub: string; username: string }>(token);
      return {
        id: decoded.sub,
        username: decoded.username
      };
    } catch {
      return null;
    }
  };

  // Set up authentication by checking localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      
      if (token && !isTokenExpired(token)) {
        setIsAuthenticated(true);
        setUser(getUserFromToken(token));
      } else {
        // If token is expired, clean up
        if (token) {
          localStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
        }
        
        setIsAuthenticated(false);
        setUser(null);

        // Redirect to login if not on a public path
        const publicPaths = ['/auth/Login', '/auth/Signup'];
        if (!publicPaths.some(path => pathname.startsWith(path))) {
          router.push(`/auth/Login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Login function to store tokens and set authenticated state
  const login = (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN, access);
    localStorage.setItem(REFRESH_TOKEN, refresh);
    setIsAuthenticated(true);
    setUser(getUserFromToken(access));
  };

  // Logout function to clear tokens and authentication state
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsAuthenticated(false);
    setUser(null);
    router.push('/auth/Login');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 