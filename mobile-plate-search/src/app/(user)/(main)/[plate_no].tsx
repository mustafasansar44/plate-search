import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import { CommentDetail } from '@/components/CommentDetail';
import { PlateCommentsProvider } from '@/providers/PlateCommentsProvider';

export default function UserCommentsScreen() {

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Plaka Sorgula:` }} />
      <PlateCommentsProvider>
        <CommentDetail />
      </PlateCommentsProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
