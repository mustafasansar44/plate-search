import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider';
import { usePlateComments } from '@/providers/PlateCommentsProvider';
import { useLocalSearchParams } from 'expo-router';
import { insertPlateComment } from '@/services/PlateService';


export default function AddPlateComment() {
  const [comment, setComment] = useState('');

  // Input Parameter TextInput
  const maxLength = 500;
  const remainingCharacters = maxLength - comment.length;

  const { session } = useAuth()
  const { addPlateComment } = usePlateComments()
  const { plate_no } = useLocalSearchParams<{ plate_no: string }>();

  const handleSubmitComment = async () => {
    if(session){
      addPlateComment(comment, session, plate_no)
      setComment("")
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.plateTitle}>Plaka: {plate_no}</Text>
      <TextInput
        style={styles.input}
        placeholder="Plaka sahibi hakkında yorumunuz..."
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
        maxLength={maxLength}
      />
      <Text style={styles.counterText}>
        {remainingCharacters} / {maxLength} karakter kaldı.
      </Text>
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
    height: '100%',
  },
  plateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
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
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    
  }
});