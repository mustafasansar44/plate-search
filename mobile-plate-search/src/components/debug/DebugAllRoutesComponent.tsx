import React from 'react'
import { View } from '../Themed'
import { Text } from 'react-native'
import { Link } from 'expo-router'


export default function DebugAllRoutesComponent() {
  return (
    <View className="flex-1 p-4 bg-gray-100 space-y-4">
      <Text className="text-2xl font-bold text-center mb-4 text-blue-600">All Routes</Text>
      <View className="space-y-3">
        {[
          { href: "/(auth)/login", label: "Login" },
          { href: "/(auth)/register", label: "Register" },
          { href: "/(user)/(main)", label: "User Index" },
          { href: "/(user)/(main)/16dns232", label: "User Plate Search" },
          { href: "/(user)/(profile)/profile", label: "User Profile" },
          { href: "/", label: "Index" }
        ].map((route, index) => (
          <Link 
            key={index} 
            href={route.href} 
            className="bg-white p-3 rounded-lg shadow-md border border-gray-200 hover:bg-blue-50 transition-colors"
          >
            <Text className="text-center text-blue-700 font-semibold">{route.label}</Text>
          </Link>
        ))}
      </View>
    </View>
  )
}
