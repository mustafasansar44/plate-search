import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useAuth } from '@/providers/AuthProvider'
import { signInWithEmail } from '@/services/AuthService'

export default function LoginScreen() {
  const [email, setEmail] = useState('mustafasansar01@gmail.com')
  const [password, setPassword] = useState('sansar2222')
  const { loading, setLoading } = useAuth()

  async function signIn() {
    setLoading(true)
    await signInWithEmail(email, password)
    setLoading(false)
  }

  if (loading) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signIn()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})