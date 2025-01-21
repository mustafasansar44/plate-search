import React, { useEffect, useState } from 'react';
import { Redirect, Tabs, useRouter } from 'expo-router';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/providers/AuthProvider';
import { View } from '@/components/Themed';
import { ActivityIndicator } from 'react-native';

export default function AdminLayout() {
  const colorScheme = useColorScheme();

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
