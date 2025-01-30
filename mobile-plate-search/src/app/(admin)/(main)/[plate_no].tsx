import React from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { CommentDetail } from '@/components/CommentDetail';

export default function AdminCommentsScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: `Plaka Sorgula` }} />
        <CommentDetail />
    </View>
  );
}

