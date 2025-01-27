import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { usePlateComments } from '@/providers/PlateCommentsProvider';

interface AddPlateCommentProps {
  plateName: string;
  plateId: string | null;
}

export default function AddPlateComment({ plateName, plateId }: AddPlateCommentProps) {
  const [comment, setComment] = useState('');
  const { session } = useAuth()
  const { addPlateComment } = usePlateComments()

  const handleSubmitComment = async () => {

    let { data, error } = await supabase
      .rpc('insert_plate_and_insert_plate_comment', { // plate_id, comment_id
        p_comment: comment,
        p_comment_owner_user_id: session?.user.id,
        p_plate_no: plateName
      })
    if (error) console.error(error)

    if (data && session) {
      const { first_name, last_name, username, phone } = session.user.user_metadata
      const { comment_id, plate_id } = data[0];

      addPlateComment({
        id: comment_id,
        created_at: new Date(),
        plate_id: plate_id,
        comment: comment,
        comment_owner_user_id: session?.user.id,
        profiles: {
          id: session?.user.id,
          first_name: first_name,
          last_name: last_name,
          username: username,
          phone: phone,
        }
      })
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.plateTitle}>Plaka: {plateName}</Text>
      <TextInput
        style={styles.input}
        placeholder="Plaka sahibi hakkında yorumunuz..."
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitComment}
        disabled={comment.trim() === ''}
      >
        <Text style={styles.submitButtonText}>Gönder</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  plateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});