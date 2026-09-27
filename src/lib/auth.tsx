import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

export const ADMIN_EMAIL = 'samiakram583@gmail.com';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial active session check from Supabase Auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Realtime auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = Boolean(
    user && user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const normalizedEmail = email.trim().toLowerCase();
      
      // Enforce admin email authorization
      if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
        return {
          success: false,
          error: `Access restricted. Only the designated website owner (${ADMIN_EMAIL}) may log into this administration portal.`,
        };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Invalid email or password. Please verify your Supabase credentials.',
        };
      }

      if (!data.user || data.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Unauthorized account. Access denied.',
        };
      }

      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Authentication failed. Please check your network connection.',
      };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
