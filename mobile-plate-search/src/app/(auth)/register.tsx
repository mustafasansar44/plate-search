import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useAuth } from '@/providers/AuthProvider'
import { authService } from '@/services/authService'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('sansar2222')
  const { loading, setLoading } = useAuth()

  async function signUpWithEmail() {
    setLoading(true)
    await authService.signUpWithEmail(email, password)
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
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
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