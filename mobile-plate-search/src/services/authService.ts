import { UserRegisterDto } from '@/types/dtos/UserRegisterDto'
import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'

export const signInWithEmail = async (email: string, password: string) => {
  try {
    console.log("1.sa");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message)
      return { success: false, error }
    }
    return { success: true, data }
  } catch (err) {
    console.error("Hata oluştu: ", err);
  }



  
}

export const registerUser = async (user: UserRegisterDto) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  })
}