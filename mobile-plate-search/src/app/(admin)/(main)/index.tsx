import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import HomeScreen from '@/components/screens/Home';

export default function AdminHomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <HomeScreen />
    </>
  );
}

