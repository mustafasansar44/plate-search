import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react'

type AuthData = {
    session: Session | null;
    loading: boolean
}
const AuthContext = createContext<AuthData>({
    session: null,
    loading: true
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchSession = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        console.log("session setlendi!")
        setSession(session) 
        setLoading(false)
      }

      fetchSession()
  
      supabase.auth.onAuthStateChange((_event, session) => {
        console.log("onAuthStateChange!")
        setSession(session)
      })
    }, [])
    
    return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)