import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Redirect } from 'expo-router';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  profile: any; // TODO: 
  isAdmin: boolean;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  setLoading: () => { },
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

  const setUserParamStates = (profile: any, currentSession: Session) => {
    setProfile(profile);
    setIsAdmin(profile?.role === 'ADMIN' || false);
    setSession(currentSession);
  }

  const fetchSession = async () => {
    setLoading(true);
    const { data: { session: currentSession }, error } = await supabase.auth.getSession();
    if (!currentSession) return null
    if (error) {
      console.error(error)
      return
    }

    const profileData = await getProfile(currentSession.user.id);
    setUserParamStates(profileData, currentSession);
    setLoading(false);
  };

  useEffect(() => {
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
      if(!profile) return <Redirect href="/(auth)/login" />
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