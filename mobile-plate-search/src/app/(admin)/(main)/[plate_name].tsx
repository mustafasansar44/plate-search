import React, { useState } from 'react';
import { View } from 'react-native';
import { PlateComment } from '@/types/PlateComment';
import { Stack, useLocalSearchParams } from 'expo-router';
import { CommentDetail } from '@/components/CommentDetail';

export default function AdminCommentsScreen() {
  const { plate_name } = useLocalSearchParams();
  const [comments, setComments] = useState<PlateComment[]>([]);

  return (
    <View>
      <Stack.Screen options={{ title: `Plaka Sorgula: ${plate_name}` }} />
      <CommentDetail comments={comments} plate={plate_name as string} />
    </View>
  );
}

