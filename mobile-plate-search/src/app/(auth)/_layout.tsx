import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider'
import { getColorScheme } from '@/routes/routes_config';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router'
import React from 'react'

export default function UserLoginLayout() {
  const { session, isAdmin } = useAuth();
  const colorScheme = getColorScheme();

  if (session && !isAdmin) {
    return <Redirect href={'/(user)/(main)'} />;
  }
  if (isAdmin) {
    return <Redirect href={'/(admin)/(main)'} />;
  }


  const tabScreenOptions = {
    tabBarActiveTintColor: Colors[colorScheme].background,
    tabBarInactiveTintColor: 'black',
    tabBarStyle: {
      backgroundColor: Colors[colorScheme].tint
    }
  };

  const loginScreenOptions = {
    name: "login",
    title: 'Giriş Yap',
    tabBarIcon: ({ color }: { color: string }) => (
      <Ionicons name="log-in-outline" size={24} color={color} />
    )
  };

  const registerScreenOptions = {
    name: "register",
    title: 'Kaydol',
    tabBarIcon: ({ color }: { color: string }) => (
      <Ionicons name="person-add-outline" size={24} color={color} />
    )
  };
  
  return (
    <Tabs screenOptions={tabScreenOptions}>
        <Tabs.Screen name={loginScreenOptions.name} options={loginScreenOptions} />
        <Tabs.Screen name={registerScreenOptions.name} options={registerScreenOptions} />
    </Tabs>
  )
}