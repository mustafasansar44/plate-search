import { UserRegisterDto } from '@/types/dtos/UserRegisterDto'
import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'

export const authService = {
  async signInWithEmail(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) {
        Alert.alert(error.message)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      Alert.alert('An unexpected error occurred')
      return { success: false, error }
    }
  },
  async registerUser(user: UserRegisterDto) {
    console.log("SA")
    console.log(user)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    })
    console.log(error)

  }
  
}