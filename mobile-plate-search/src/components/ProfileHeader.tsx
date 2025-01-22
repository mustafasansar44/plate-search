import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function ProfileHeader() {
  return (
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#007BFF" />
        </View>
        <Text style={styles.username}>Kullanıcı</Text>
        <Text style={styles.email}>deneme@msn.com</Text>
        <Text style={styles.memberSince}>Üyelik Tarihi: Ocak 2019</Text>
      </View>
  )
}

const styles = StyleSheet.create({
    profileHeader: {
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 30,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      avatarContainer: {
        marginBottom: 16,
      },
      username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
      },
      email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
      },
      memberSince: {
        fontSize: 14,
        color: '#888',
      },
})