import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  profile: any;
  isAdmin: boolean;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  setLoading: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  async function getProfile(id: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    return data;
  }

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          const profileData = await getProfile(currentSession.user.id);
          setProfile(profileData || null);
          setIsAdmin(profileData?.role === 'ADMIN');
          setSession(currentSession);
        } else {
          setProfile(null);
          setIsAdmin(false);
          setSession(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (newSession) {
        const profileData = await getProfile(newSession.user.id);
        setProfile(profileData || null);
        setIsAdmin(profileData?.role === 'ADMIN');
        setSession(newSession);
      } else {
        setProfile(null);
        setIsAdmin(false);
        setSession(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, profile, isAdmin, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};