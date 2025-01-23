import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';
import { getColorScheme } from '@/routes/routes_config';

export default function UserLayout() {

  const {session} = useAuth();
  const colorScheme = getColorScheme();

  if (!session) {
    return <Redirect href="/(auth)/login" />
  }

  const tabScreenOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].background,
    tabBarInactiveTintColor: 'black',
    headerShown: false,
    tabBarStyle: {
      backgroundColor: Colors[colorScheme ?? 'light'].tint
    }
  };

  const mainScreenOptions = {
    name: "(main)",
    title: 'Anasayfa',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => (
      <Ionicons name="home-outline" size={20} color={color} />
    )
  };

  const profileScreenOptions = {
    name: "(profile)",
    title: 'Profile',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => (
      <Ionicons name="people-outline" size={20} color={color} />
    )
  };

  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen name={mainScreenOptions.name} options={mainScreenOptions} />
      <Tabs.Screen name={profileScreenOptions.name} options={profileScreenOptions} />
    </Tabs>
  );

}
