import React from 'react';
import { View } from 'react-native';
import { Stack} from 'expo-router';
import { CommentDetail } from '@/components/CommentDetail';
import { PlateCommentsProvider } from '@/providers/PlateCommentsProvider';

export default function UserCommentsScreen() {

  return (
    <View>
      <Stack.Screen options={{ title: `Plaka Sorgula:` }} />
      <PlateCommentsProvider>
        <CommentDetail />
      </PlateCommentsProvider>
    </View>
  );
}
