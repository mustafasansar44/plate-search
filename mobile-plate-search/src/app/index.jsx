import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';


export default function index() {
    return (
        <View>
            <View>
                <Link href="/(admin)" style={styles.customButton}>
                    <Text>Go to admin screen!</Text>
                </Link>
            </View>
            <View>
                <Link href="/(user)" style={styles.customButton}>
                    <Text>Go to user screen!</Text>
                </Link>
            </View>
        </View>
    )
}

styles = StyleSheet.create({
    customButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
})