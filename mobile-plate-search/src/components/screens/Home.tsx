import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { PlateComment } from '@/types/PlateComment';
import { Stack } from 'expo-router';
import { Comment } from '@/components/Comment';
import PlateSearch from '@/components/PlateSearch';
import { Plates } from '../Plates';
import { useAuth } from '@/providers/AuthProvider';
import { Plate } from '@/types/Plate';
import AddPlate from '../AddPlate';
import { plateService } from '@/services/plateService';

export default function HomeScreen() {
  const { session, profile, isAdmin } = useAuth()
  
  const [lastThreeComments, setLastThreeComments] = useState<PlateComment[]>([
    {id: "1", created_at: new Date(), updated_at: new Date(), is_active: true,plate_id: "ABC123",comment: "1", comment_owner_user_id: "1"},
    {id: "2", created_at: new Date(), updated_at: new Date(), is_active: true,plate_id: "DEF456",comment: "2", comment_owner_user_id: "1"},
    {id: "3", created_at: new Date(), updated_at: new Date(), is_active: true,plate_id: "GHI789",comment: "3", comment_owner_user_id: "1"},
  ]);
  const [plates, setPlates] = useState<Plate[]>([]);


  useEffect(() => {
    getLastComments();
    getPlatesByUser(session.user.id)

  }, []);

  const getPlatesByUser = async (user_id: string) => {
    const plates: Plate[] = await plateService.getPlatesByUser(user_id)
    setPlates(plates)
  }

  const getLastComments = () => {
    /*
        const sortedComments = [...plateCommentsData].sort((a, b) => 
      b.created_at.getTime() - a.created_at.getTime()
    );
    setLastThreeComments(sortedComments.slice(0, 3));
    
    */
  };



  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <PlateSearch />
      <Plates plates={plates} />
      <Comment comments={lastThreeComments} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12
  }
});