import { supabase } from "@/lib/supabase";
import { Plate } from "@/types/Plate";
import { Alert } from "react-native";

const PLATES_TABLE = 'plates';

export const plateService = {

  // Get all plates for a specific user
  getPlatesByUser: async (userId: string): Promise<Plate[]> => {
    const { data, error } = await supabase.from("plates").select('*').eq('user_id', userId)
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
    .from("plates")
    .insert(
        { "plate_no": plate_no, "user_id": user_id }
    )
    if(error) {
        Alert.alert("Plaka Oluşturulurken hata!")
        return
    }
    Alert.alert("Plaka Oluşturuldu!")
  },
    

  // Get a plate by its ID
  findPlateByName: async (plate_no: string) => {
    const { data, error } = await supabase.from(PLATES_TABLE).select('*').eq('plate_no', plate_no).single()
    if(error) {
      console.error('Error fetching plate:', error);
      Alert.alert('Error', 'Could not fetch plate');
      return null  
    }
    return data ?? null  
  },

  deletePlate: async (id: string) => {
    const { error } = await supabase.from(PLATES_TABLE).delete().eq('id', id)
    if(error) {
      console.error('Error deleting plate:', error);
      Alert.alert('Error', 'Could not delete plate');
      return  
    }
    Alert.alert("Plaka Silindi!")
  }
};


/*

  // Update a plate entry
  updatePlate: (id: string, updates: Partial<Plate>) => 
    supabase.from(PLATES_TABLE)
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single(),

  setPlateActiveStatus: (id: string) => 
    supabase.from(PLATES_TABLE)
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id),

*/