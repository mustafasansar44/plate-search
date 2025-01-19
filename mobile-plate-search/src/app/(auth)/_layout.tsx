import { Tabs } from 'expo-router'
import React from 'react'

export default function UserLoginLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="login" options={{ title: "Login" }} />
        <Tabs.Screen name="register" options={{ title: "Register" }} />
    </Tabs>
  )
}