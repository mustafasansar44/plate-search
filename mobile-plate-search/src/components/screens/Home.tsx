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
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <ProfileStatistic />
      <PlateSearch />
      <Comment comments={lastThreeComments} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12
  }
});