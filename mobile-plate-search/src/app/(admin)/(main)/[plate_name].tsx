import React, { useState } from 'react';
import { View } from 'react-native';
import { PlateComment } from '@/types/PlateComment';
import { Stack } from 'expo-router';
import { CommentDetail } from '@/components/CommentDetail';

export default function AdminCommentsScreen() {
  
  const [comments, setComments] = useState<PlateComment[]>([]);

  return (
    <View>
      <Stack.Screen options={{ title: `Plaka Sorgula ` }} />
      <CommentDetail comments={comments} />
    </View>
  );
}

