import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PlateComment } from '@/types/PlateComment';
import { plateCommentsDate } from '@/assets/data/PlateComment';
import { Stack, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import CommentItem from '@/components/Comment';

export default function CommentsScreen() {
  const {plate_name} = useLocalSearchParams();
  const [comments, setComments] = useState<PlateComment[]>([]);

  useEffect(() => {
    const filteredComments = plateCommentsDate.filter((comment) => {
       return comment.plateId === plate_name
    });



    setComments(filteredComments);
  }, [plate_name]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Plaka Sorgula' }} />
      <Text style={styles.screenTitle}>Yorumlar - Plaka: {plate_name}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CommentItem item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Bu plaka için henüz yorum yapılmamış</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
