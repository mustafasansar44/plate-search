import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

interface AddPlateCommentProps {
  plateName: string;
}

export default function AddPlateComment({ plateName }: AddPlateCommentProps) {
  const [comment, setComment] = useState('');

  const handleSubmitComment = () => {
    // TODO: Implement comment submission logic
    console.log(`Comment for plate ${plateName}: ${comment}`);
    // You might want to call an API or pass this to a parent component
    setComment(''); // Clear input after submission
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