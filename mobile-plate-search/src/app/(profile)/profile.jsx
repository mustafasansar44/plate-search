import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function ProfileScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Profile' }} />
      <Text>ProfileScreen</Text>
    </View>
  )
}