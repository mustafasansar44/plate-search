import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PlateComment } from '@/types/PlateComment';
import { plateCommentsData } from '@/assets/data/PlateComment';
import { Stack, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import CommentItem, { Comment } from '@/components/Comment';

export default function CommentsScreen() {
  const {plate_name} = useLocalSearchParams();
  const [comments, setComments] = useState<PlateComment[]>([]);

  useEffect(() => {
    setComments(filterPlate());
  }, [plate_name]);


  const filterPlate = () => {
    return plateCommentsData.filter((comment) => {
      return comment.plateId === plate_name
   });
  }

  return (
    <View>
      <Stack.Screen options={{ title: `Plaka Sorgula ${plate_name}` }} />
      <Comment comments={comments} />
    </View>
  );
}

