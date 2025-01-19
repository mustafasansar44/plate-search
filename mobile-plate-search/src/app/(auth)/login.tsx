import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import Auth from '@/components/Auth';
import { useRouter, useSegments } from 'expo-router';

export default function LoginScreen() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const segments = useSegments();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      console.log("Initial session setlendi!", session)

      if (session) {
        // If session exists, redirect to home or profile
        router.replace(`${segments[0]}/(main)`)
      }
    }

    fetchSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      console.log("Auth state changed, session:", session)

      if (session) {
        // Redirect on successful login
        router.replace(`${segments[0]}/(main)`)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLoginSuccess = (newSession: Session) => {
    setSession(newSession)
    console.log("Login successful, session set:", newSession)
    router.replace('(user)/(profile)/profile')
  }

  return (
    <View>
      <Auth onLoginSuccess={handleLoginSuccess} />
      {session && session.user && (
        <View>
          <Text>Logged in as: {session.user.email}</Text>
          <Text>User ID: {session.user.id}</Text>
        </View>
      )}
    </View>
  )
}