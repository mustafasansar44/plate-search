import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import HomeScreen from '@/components/screens/Home';
import AllPageLinks from '@/components/AllPageLinks';

export default function AdminHomeScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <AllPageLinks />
      <HomeScreen />
    </View>
  );
}

