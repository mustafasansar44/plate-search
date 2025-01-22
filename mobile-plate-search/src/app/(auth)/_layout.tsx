import { useAuth } from '@/providers/AuthProvider'
import { Redirect, Tabs, useRouter } from 'expo-router'
import React from 'react'

export default function UserLoginLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />;
  }

  return (
    <Tabs>
        <Tabs.Screen name="login" options={{ title: "Login" }} />
        <Tabs.Screen name="register" options={{ title: "Register" }} />
    </Tabs>
  )
}