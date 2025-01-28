import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";

const PLATES_TABLE = 'plate_comments';

export const deletePlateCommentInDB = async (id: string) => {
    const { error } = await supabase.from(PLATES_TABLE).delete().eq('id', id)
    if (error) {
      console.error('Error deleting plate comment:', error);
      Alert.alert('Error', 'Could not delete plate comment');
      return
    }
    Alert.alert("Plaka Yorumu Silindi!")
}


export const updatePlateCommentInDB = async (id: string, updatedComment: string) => {
    const { error } = await supabase
        .from(PLATES_TABLE)
        .update({ comment: updatedComment })
        .eq('id', id)

    if (error) {
        console.error('Error updating plate comment:', error);
        Alert.alert('Error', 'Could not update plate comment');
        return;
    }

    Alert.alert("Plaka Yorumu Güncellendi!");
};