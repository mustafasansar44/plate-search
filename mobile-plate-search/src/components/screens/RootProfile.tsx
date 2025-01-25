import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import ProfileHeader from '../ProfileHeader'
import ProfileSettings from '../ProfileSettings'
import ProfileStatistic from '../ProfileStatistic'

export default function RootProfile() {
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <ProfileStatistic />
      <ProfileSettings />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
});