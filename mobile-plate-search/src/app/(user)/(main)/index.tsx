import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import HomeScreen from '@/components/screens/Home';

export default function UserHomeScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <HomeScreen />
    </View>
  );
}