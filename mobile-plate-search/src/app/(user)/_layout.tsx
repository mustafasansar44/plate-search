import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/providers/AuthProvider';

export default function UserLayout() {

  const {session} = useAuth();
  const colorScheme = useColorScheme();

  if (!session) {
    return <Redirect href="/(auth)/login" />
  }

  
  const tabScreenOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderTopWidth: 0.5,
      borderTopColor: Colors[colorScheme ?? 'light'].tabIconDefault,
    },
  };

  const mainScreenOptions = {
    name: "(main)",
    title: 'Anasayfa',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => (
      <Ionicons name="home-outline" size={20} />
    )
  };

  const profileScreenOptions = {
    name: "(profile)",
    title: 'Profile',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => (
      <Ionicons name="people-outline" size={20} />
    )
  };

  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen name={mainScreenOptions.name} options={mainScreenOptions} />
      <Tabs.Screen name={profileScreenOptions.name} options={profileScreenOptions} />
    </Tabs>
  );

}
