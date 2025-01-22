import React from 'react';
import { Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import HomeScreen from '@/components/screens/Home';
import AllPageLinks from '@/components/AllPageLinks';

export default function UserHomeScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <AllPageLinks />
      <HomeScreen />
    </View>
  );
}