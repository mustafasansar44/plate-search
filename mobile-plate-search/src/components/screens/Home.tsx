import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PlateComment } from '@/types/PlateComment';
import { Stack } from 'expo-router';
import { Comment } from '@/components/Comment';
import PlateSearch from '@/components/PlateSearch';
import { Plates } from '../Plates';
import { PlateProvider } from '@/providers/PlateProvider';

export default function HomeScreen() {

  const [lastThreeComments, setLastThreeComments] = useState<PlateComment[]>([
    { id: "1", created_at: new Date(), updated_at: new Date(), is_active: true, plate_id: "ABC123", comment: "1", comment_owner_user_id: "1" },
    { id: "2", created_at: new Date(), updated_at: new Date(), is_active: true, plate_id: "DEF456", comment: "2", comment_owner_user_id: "1" },
    { id: "3", created_at: new Date(), updated_at: new Date(), is_active: true, plate_id: "GHI789", comment: "3", comment_owner_user_id: "1" },
  ]);
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <PlateSearch />
      <PlateProvider>
        <Plates />
      </PlateProvider>
      <Comment comments={lastThreeComments} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12
  }
});