import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function PlateSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('')

  const validatePlate = (plate: string) => {
    // Remove all whitespaces and convert to uppercase
    const cleanPlate = plate.replace(/\s+/g, '').toUpperCase();
    
    // Regular expression for Turkish license plate format
    // Format: 2 digits, 1-3 letters, 2-4 digits
    const plateRegex = /^[0-9]{2}[A-Z]{1,3}[0-9]{2,4}$/;
    
    if (cleanPlate.trim() === '') {
      setError('Plaka boş bırakılamaz');
      return false;
    }
    
    if (!plateRegex.test(cleanPlate)) {
      setError('Geçerli bir plaka formatı giriniz (Örn: 34ABC123)');
      return false;
    }
    
    // Clear any previous errors
    setError('');
    return true;
  }

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
      {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
      <TouchableOpacity
        onPress={() => {
          const formattedPlate = searchQuery.replace(/\s+/g, '').toUpperCase();
          if (validatePlate(formattedPlate)) {
            router.push(`/${formattedPlate}`);
          }
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