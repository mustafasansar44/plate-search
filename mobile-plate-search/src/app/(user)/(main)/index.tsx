import React from 'react';
import { Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import HomeScreen from '@/components/screens/Home';

export default function UserHomeScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <Link href="/">
          <Text>
            Home
          </Text>
        </Link>

        <Link href="/(user)/(main)">
          <Text>
            User Main
          </Text>
        </Link>

        <Link href="/(user)/(main)/16dns232">
          <Text>
            User Plate Name
          </Text>
        </Link>

        <Link href="/(admin)/(main)">
          <Text>
            Admin Main
          </Text>
        </Link>

        <Link href="/(admin)/(main)/16dns232">
          <Text>
            Admin Main
          </Text>
        </Link>
      <HomeScreen />
    </View>
  );
}