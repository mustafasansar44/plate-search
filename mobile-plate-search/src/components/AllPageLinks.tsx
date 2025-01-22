import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function AllPageLinks() {
    return (
        <View>
            <Link href="/" asChild><Text style={styles.listItemx}>Home</Text></Link>
            <Link href="/(user)/(main)" asChild><Text style={styles.listItemx}>User Main</Text></Link>
            <Link href="/(user)/(main)/16dns232" asChild><Text style={styles.listItemx}>User Plate Name</Text></Link>
            <Link href="/(admin)/(main)" asChild><Text style={styles.listItemx}>Admin Main</Text></Link>
            <Link href="/(admin)/(main)/16dns232" asChild><Text style={styles.listItemx}>Admin Plate Name</Text></Link>
            <Link href="/(auth)" asChild><Text style={styles.listItemx}>Auth</Text></Link>
            <Link href="/(auth)/login" asChild><Text style={styles.listItemx}>Auth Login</Text></Link>
        </View>
    )
}

const styles = StyleSheet.create({
    listItemx: {
      padding: 12,
      backgroundColor: '#000',
      color: 'white',
    },
  });