import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  profile: any;
  isAdmin: boolean;
  setLoading: (loading: boolean) => void;
  clearAllAuthData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  setLoading: () => {},
  clearAllAuthData: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      console.log("fetchSession")
      setLoading(true);

      const {data: { session }} = await supabase.auth.getSession();

      if (session) {
        const profileData = await getProfile(session.user.id)
        console.log("PROFILE")
        console.log(profileData)
        setProfile(profileData || null);
        setIsAdmin(profileData.role === 'ADMIN');
      }
      setSession(session);
      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange(async (_event, session) => {
      if(session){
        const profileData = await getProfile(session.user.id)
        setProfile(profileData || null);
        setIsAdmin(profileData.role === 'ADMIN');
      }
      setSession(session);
    });
  }, []);

  async function getProfile(id: string) {
    console.log("id:", id);
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    console.log("data:");
    console.log(data)
    return data
  }

  function clearAllAuthData(){
    setSession(null);
    setLoading(true);
    setProfile(null);
    setIsAdmin(false);
  }

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