import { supabase } from "@/lib/supabase";
import { PlateComment } from "@/types/PlateComment";
import { Alert } from "react-native";

const TABLE_NAME = 'plate_comments';

export const plateService = {

  // Get all plates for a specific user
  getPlatesByUser: async (plate_id: string): Promise<PlateComment[]> => {
    const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('plate_id', plate_id)
    if(error) {
      console.error('Error fetching plates:', error);
      Alert.alert('Error', 'Could not fetch plates');
      return []  
    }
    return data ?? []  
  },

  // Create a new plate entry
  createPlate: async (plate_no: string, user_id: string) => {

    const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(
        { "plate_no": plate_no, "user_id": user_id }
    )
    if(error) {
        Alert.alert("Plaka Yorumu Oluşturulurken hata!")
        return
    }
    Alert.alert("Plaka Yorumu Oluşturuldu!")
  },
    

  // TODO: Typesafe tanımla
  findPlateByName: async (plate_no: string) => {
    const { data, error } = await supabase.from(TABLE_NAME).select('*').eq('plate_no', plate_no).single()
    if(error) {
      console.error('Error fetching plate:', error);
      Alert.alert('Error', 'Could not fetch plate');
      return null  
    }
    return data ?? null  
  },

  deletePlate: async (id: string) => {
    const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id)
    if(error) {
      console.error('Error deleting plate:', error);
      Alert.alert('Error', 'Could not delete plate');
      return  
    }
    Alert.alert("Plaka Silindi!")
  }
};