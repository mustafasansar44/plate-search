import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import PlateSearch from '@/components/PlateSearch';
import { Plates } from '../Plates';
import { PlateProvider } from '@/providers/PlateProvider';
import LastRandomComments from '../LastRandomComments';

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Anasayfa' }} />
      <PlateSearch />
      <PlateProvider>
        <Plates />
      </PlateProvider>

        <LastRandomComments />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12
  }
});