import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/providers/AuthProvider'

export default function ProfileHeader() {
  const { session, profile, isAdmin } = useAuth()
  const user = session?.user

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={100} color="#007BFF" />
      </View>
      <Text style={styles.username}>{profile?.first_name + " " + profile?.last_name || 'User'}</Text>
      <Text style={styles.email}>{user?.email || 'No email'}</Text>
      <Text style={[styles.memberSince, { fontWeight: 'bold' }]}>
        Üyelik Tarihi:
        {user?.created_at ? (() => {
          const date = new Date(user.created_at);
          return (
            <View style={styles.membershipDate}>
              <View style={styles.membershipDateColumn}>
                <Text style={styles.membershipDateHeader}>Gün</Text>
                <Text style={styles.membershipDateText}>{date.getDate().toString().padStart(2, '0')}</Text>
              </View>
              <View style={styles.membershipDateColumn}>
                <Text style={styles.membershipDateHeader}>Ay</Text>
                <Text style={styles.membershipDateText}>{(date.getMonth() + 1).toString().padStart(2, '0')}</Text>
              </View>
              <View style={styles.membershipDateColumn}>
                <Text style={styles.membershipDateHeader}>Yıl</Text>
                <Text style={styles.membershipDateText}>{date.getFullYear()}</Text>
              </View>
            </View>
          );
        })() : 'Bilinmiyor'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  membershipDate: {
    flexDirection: 'row', 
    backgroundColor: '#f0f0f0', 
    borderRadius: 6, 
    padding: 8, 
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5
  },
  membershipDateColumn: {
    alignItems: 'center', 
    flex: 1
  },
  membershipDateHeader: {
    color: '#888', 
    fontSize: 10, 
    marginBottom: 3
  },
  membershipDateText: {
    fontSize: 14, 
    fontWeight: 'bold'
  },
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