import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { plateCommentsData } from '@/assets/data/PlateComment';
import { PlateComment } from '@/types/PlateComment';
import { Stack } from 'expo-router';
import { Comment } from '@/components/Comment';
import ProfileStatistic from '@/components/ProfileStatistic';
import PlateSearch from '@/components/PlateSearch';

export default function HomeScreen() {
  const [lastThreeComments, setLastThreeComments] = useState<PlateComment[]>([]);

  useEffect(() => {
    getLastComments();
  }, []);

  const getLastComments = () => {
    const sortedComments = [...plateCommentsData].sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
    setLastThreeComments(sortedComments.slice(0, 3));
  };

  return (
    <View>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <ProfileStatistic />
      <PlateSearch />
      <Comment comments={lastThreeComments} />
    </View>
  )
}

/*

  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingTop: 16,
  },

*/
const styles = StyleSheet.create({
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