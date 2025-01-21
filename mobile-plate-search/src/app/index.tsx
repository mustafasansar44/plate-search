import { ActivityIndicator, Text } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { View } from '@/components/Themed';

export default function index() {
    return (
        <View>
            <Text>
                Index Sayfası
                <Link href="/(admin)/(main)"><Text>Admin Index</Text></Link>
                <Link href="/(auth)"><Text>Auth Index</Text></Link>
                <Link href="/(user)/(main)"><Text>User Index</Text></Link>
            </Text>
        </View>
    )

}

/*

    const { session, loading } = useAuth()
    
    if (loading) {
        console.log("index - ActivityIndicator")
        return (
            <ActivityIndicator />
        )
    }

    return (
        <Redirect href={session ? '/(user)/(main)' : '/(auth)/login'} />
    )  

*/