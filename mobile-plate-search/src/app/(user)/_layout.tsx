import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/providers/AuthProvider';

export default function UserLayout() {

  const {session, isAdmin, loading} = useAuth();
  const colorScheme = useColorScheme();

  if (!session) {
    return <Redirect href="/(auth)/login" />
  }

  const tabScreenOptions = {
    tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    headerShown: false, 
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

