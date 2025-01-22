import React from 'react';
import { Stack } from 'expo-router';
import RootProfile from '@/components/screens/RootProfile';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {

  return (
    <>
      <Stack.Screen options={{ title: 'Profil', headerStyle: styles.header, headerTitleStyle: styles.headerTitle }} />
      <RootProfile />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007BFF',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});