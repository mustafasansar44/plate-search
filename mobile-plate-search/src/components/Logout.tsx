import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase';
import { router, useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert('Çıkış Hatası', error.message);
      } else {
        router.replace('/(auth)/login');
      }
    };


    return (
        <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
                Alert.alert(
                    'Çıkış Yap',
                    'Çıkış yapmak istediğinizden emin misiniz?',
                    [
                        { text: 'İptal', style: 'cancel' },
                        { text: 'Çıkış Yap ()', style: 'destructive', onPress: handleLogout }
                    ]
                );
            }}
        >
            <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})