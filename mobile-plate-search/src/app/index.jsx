import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router';

export default function index() {
    return (
        <Redirect href="/(auth)/login" />
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