import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { select } from "@/services/BaseService";
import { Plate } from "@/types/Plate";

const PLATES_TABLE = 'plates';

export const getPlatesByUser = async (userId: string) : Promise<Plate[]> => {
  const filters = { user_id: userId }; // Filtreleme kriteri
  const plates = await select(PLATES_TABLE, '*', filters); // BaseService'deki select'i kullanıyoruz
  if (!plates) {
    Alert.alert('Error', 'Could not fetch plates');
    return [];
  }
  return plates;
}

export const createPlate = async (plate_no: string, user_id: string) => {
  const { data, error } = await supabase
    .from("plates")
    .insert(
      { "plate_no": plate_no, "user_id": user_id }
    )
  if (error) {
    Alert.alert("Plaka Oluşturulurken hata!")
    return
  }
  Alert.alert("Plaka Oluşturuldu!")
}

export const findPlateByName = async (plate_no: string) => {
  const { data, error } = await supabase.from(PLATES_TABLE).select('*').eq('plate_no', plate_no).single()
  if (error) {
    console.error('Error fetching plate:', error);
    Alert.alert('Error', 'Could not fetch plate');
    return null
  }
  return data ?? null
}

export const deletePlate = async (id: string) => {
  const { error } = await supabase.from(PLATES_TABLE).delete().eq('id', id)
  if (error) {
    console.error('Error deleting plate:', error);
    Alert.alert('Error', 'Could not delete plate');
    return
  }
  Alert.alert("Plaka Silindi!")
}

export const findPlateWithCommentsAndProfile = async (plate_no: string): Promise<any | null> => {
  const query = `
          id,
          plate_no,
          user_id,
          plate_comments (
            id,
            created_at,
            updated_at,
            is_active,
            plate_id,
            comment,
            comment_owner_user_id,
            profiles (
                id,
                first_name,
                last_name,
                username,
                phone
            )
          )
        `
  const { data, error } = await supabase
    .from(PLATES_TABLE)
    .select(query)
    .eq('plate_no', plate_no)
    .single();

  if (error) {
    if (error.details == "The result contains 0 rows") {
      console.log("Veri yok.")
      return null
    }

    console.error('Error fetching plate comments:', error);
    return null
  }

  return data

}