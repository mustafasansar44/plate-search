import React from 'react'
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function UserLayout() {
    return (
        <>
            <StatusBar 
                barStyle="dark-content" 
            />
            <Stack/>
        </>
    );
}