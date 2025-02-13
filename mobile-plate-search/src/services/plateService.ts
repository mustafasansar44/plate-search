import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import { select } from "@/services/BaseService";
import { Plate } from "@/types/Plate";

const PLATES_TABLE = "plates";

export const getPlatesByUserInDb = async (userId: string): Promise<Plate[]> => {
  const filters = { user_id: userId }; // Filtreleme kriteri
  const range = 9; // TODO: Düzelt
  const offset = 0;

  const plates = await select(PLATES_TABLE, '*', filters, false, range, offset); // BaseService'deki select'i kullanıyoruz
  if (!plates) {
    Alert.alert('Error', 'Could not fetch plates');
    return [];
  }
  return plates;
}

export const createPlate = async (plate_no: string, user_id: string) => {
  let { data, error } = await supabase
    .rpc('if_exist_update_otherwise_insert_plate', {
      p_plate_no: plate_no,
      p_user_id: user_id
    }).single()

  if (error) {
    Alert.alert("Hata", "Bu plaka başka bir kullanıcıya tanımlı.")
    return;
  }
  return data ?? null
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
  let { data, error } = await supabase
  .rpc('delete_plate_if_dont_have_plate_comment', {
    p_plate_id: id
  })
if (error){
  console.error(error)
  return
}
console.warn("Plaka Silindi")
Alert.alert("Plaka Silindi!")
}

export const findPlateWithCommentsAndProfile = async (plate_no: string, limit: number, offset: number): Promise<any | null> => {

  let { data, error } = await supabase
    .rpc('get_plate_comments_with_plate_and_profile', {
      p_limit_count: limit,
      p_offset_count: offset,
      p_plate_no: plate_no
    })
  if (error) console.error(error)
  return data
}

export const getRandomPlateCommentsInDB = async (limit: number, offset: number): Promise<any | null> => {
  let { data, error } = await supabase
    .rpc('get_random_plate_comments_with_plate_and_profile', {
      p_limit: limit,
      p_offset: offset
    })
  if (error) console.error(error)
  return data
}


export const insertPlateComment = async (comment: string, user_id: string, plate_no: string) => {
  let { data, error } = await supabase
    .rpc('insert_plate_and_insert_plate_comment', { // plate_id, comment_id
      p_comment: comment,
      p_comment_owner_user_id: user_id,
      p_plate_no: plate_no
    })

  if (error) console.error(error)
  return data;
}