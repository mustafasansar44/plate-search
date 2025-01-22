import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Logout from '@/components/Logout';

export default function AdminProfileScreen() {

  const [userEmail, setUserEmail] = useState('deneme@msn.com');
  
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Profil', 
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle 
      }} />

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#007BFF" />
        </View>
        <Text style={styles.username}>Kullanıcı</Text>
        <Text style={styles.email}>{userEmail}</Text>
        <Text style={styles.memberSince}>Üyelik Tarihi: Ocak 2019</Text>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Ayarlar</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color="#007BFF" />
          <Text style={styles.settingText}>Bildirim Ayarları</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#007BFF" />
          <Text style={styles.settingText}>Gizlilik Politikası</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="document-text-outline" size={24} color="#007BFF" />
          <Text style={styles.settingText}>Kullanım Koşulları</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <Logout />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#007BFF',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
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
  settingsSection: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },

});