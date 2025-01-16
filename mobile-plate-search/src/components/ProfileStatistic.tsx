import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ProfileStatistic() {
    return (
        < View style={styles.card} >
            <Text style={styles.sectionTitle}>Profil İstatistikleri</Text>
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>500</Text>
                    <Text style={styles.statLabel}>Toplam Plaka</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>200</Text>
                    <Text style={styles.statLabel}>Toplam Yorum</Text>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#333',
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#007BFF',
      marginBottom: 4,
    },
    statLabel: {
      color: '#666',
      fontSize: 12,
    }
  });