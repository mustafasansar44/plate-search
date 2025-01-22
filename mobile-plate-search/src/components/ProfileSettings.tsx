import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Logout from './Logout'

export default function ProfileSettings() {
    return (
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
    )
}

const styles = StyleSheet.create({
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
})