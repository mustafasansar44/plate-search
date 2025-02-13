import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { useAuth } from '@/providers/AuthProvider'
import { Redirect } from 'expo-router'
import { supabase } from '@/lib/supabase'

export default function LoginScreen() {
  const [email, setEmail] = useState('user1@gmail.com')
  const [password, setPassword] = useState('password1')
  const { setLoading } = useAuth()

  async function signIn() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error){
      Alert.alert("Hata", "Böyle bir hesap bulunamadı. Email ve şifrenizi kontrol ediniz.", [{text: "Tamam"}])
    }
    else {
      console.warn("Giriş Yapıldı.")
      return <Redirect href="/(user)/(main)" />
    }
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
          label="Şifre"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Giriş Yap" onPress={() => signIn()} />
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