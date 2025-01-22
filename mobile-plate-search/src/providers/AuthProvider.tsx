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

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('session alınıyor. (supabase.auth.getSession())', session);
      setSession(session);
      

      if(session){
        //FETCH PROFİLE
        const {data} = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
        setIsAdmin(data?.role === 'ADMIN');
        setProfile(data || null);
      }

      setLoading(false);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session güncelleniyor. (supabase.auth.onAuthStateChange())', session);
      setSession(session);
      setLoading(false);
    });

    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Burada mesela isAdmin: isAdmin ama iki tarafında ismi aynı olduğu için isAdmin yazdık.
  // Birinci isAdmin değeri authProvider.isAdmin iken ikinci isAdmin değeri useState.isAdmin
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