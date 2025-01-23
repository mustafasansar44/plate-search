import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/providers/AuthProvider';

export default function AdminLayout() {
  const colorScheme = useColorScheme();
  const { session, isAdmin } = useAuth();
  
  if(!session) {
    return <Redirect href={'/(auth)/login'} />;
  }
  if (!isAdmin) {
    return <Redirect href={'/(user)/(main)'} />;
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
    title: 'Home',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => (
      <FontAwesome name="dashboard" size={20} style={{ marginBottom: -3 }} color={color} />
    )
  };

  const profileScreenOptions = {
    name: "(profile)",
    title: 'Profile',
    headerShown: false,
    tabBarIcon: ({ color }: { color: string }) => (
      <AntDesign name="profile" size={24} color={color} />
    )
  };

  return (
    <Tabs screenOptions={tabScreenOptions}>
      <Tabs.Screen name={mainScreenOptions.name} options={mainScreenOptions} />
      <Tabs.Screen name={profileScreenOptions.name} options={profileScreenOptions} />
    </Tabs>
  );
}
