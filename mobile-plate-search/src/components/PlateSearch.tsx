import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PlateSearch() {
  const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.searchSection}>
            <Text style={styles.subHeader}>Plaka Sorgula</Text>
            <View style={styles.searchInputContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    placeholder="Plaka numarasını girin (örn: 34 ABC 123)"
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.textInput}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    const formattedPlate = searchQuery.replace(/\s+/g, '').toUpperCase();
                    router.push(`/${formattedPlate}`);
                }}
                style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Plaka Sorgula</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    searchSection: {
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#007BFF',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})