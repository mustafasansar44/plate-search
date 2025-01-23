import { Plate } from '@/types/Plate';
import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'

export const getPlatesForUser = async (userId: string): Promise<Plate[]> => {
    const { data, error } = await supabase
      .from("plates")
      .select("*")
      .eq("user_id", userId);
  
    if (error) {
      console.log(error);
      Alert.alert(error.message);
      throw new Error("Failed to fetch plates for user"); 
    }
  
    // Type assertion to ensure data is an array of Plate objects
    data.map((plate: Plate) => console.log(plate.created_at))
    return data as Plate[]; 
  };