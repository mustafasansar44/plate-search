import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

export default function AdminProfileScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch current user's email
    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || '');
      }
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Çıkış Hatası', error.message);
    } else {
      router.replace('/(auth)/login');
    }
  };

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

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => {
            Alert.alert(
              'Çıkış Yap',
              'Çıkış yapmak istediğinizden emin misiniz?',
              [
                { text: 'İptal', style: 'cancel' },
                { text: 'Çıkış Yap', style: 'destructive', onPress: handleLogout }
              ]
            );
          }}
        >
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
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
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#FF4D4D',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});