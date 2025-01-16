import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { platesData } from '@/assets/data/Plate';
import { plateCommentsDate } from '@/assets/data/PlateComment';
import { Plate } from '@/types/Plate';
import { PlateComment } from '@/types/PlateComment';
import { Link, Stack, useRouter } from 'expo-router';
import CommentItem from '@/components/Comment';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const [plates, setPlates] = useState<Plate[]>([...platesData]);
  const [plateComments, setPlateComments] = useState<PlateComment[]>([]);
  const [lastThreeComments, setLastThreeComments] = useState<PlateComment[]>([]);

  useEffect(() => {
    // Similar to ngOnInit, initialize the last three comments
    const initializeComments = () => {
      const sortedComments = [...plateCommentsDate].sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      );
      setLastThreeComments(sortedComments.slice(0, 3));
      setPlateComments(sortedComments);
    };

    initializeComments();
  }, []); // Empty dependency array means this runs once on component mount

  const navigateToPlateDetails = (plateId: string) => {
    const formattedPlate = plateId.replace(/\s+/g, '').toUpperCase();
    router.push(`/${formattedPlate}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: 'Anasayfa' }} />

      {/* Profile Statistics Section */}
      <View style={styles.card}>
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
      </View>

      {/* Plate Search Section */}
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

      {/* Last 3 Comments Section */}
      <View style={styles.listSection}>
        <Text style={styles.subHeader}>Son Yorumlar</Text>
        {lastThreeComments.map((comment) => (
          <TouchableOpacity 
            key={comment.id} 
            onPress={() => navigateToPlateDetails(comment.plateId)}
          >
            <CommentItem item={comment} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
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
  },
  searchSection: {
    marginBottom: 16,
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
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
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
  listSection: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemContent: {
    flex: 1,
    marginRight: 10,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  listItemUser: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});