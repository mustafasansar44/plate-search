import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '@/providers/AuthProvider';
import { plateService } from '@/services/plateService';

export default function AddPlate() {
    const [isAddPlateModalVisible, setIsAddPlateModalVisible] = useState(false);
    const [newPlate, setNewPlate] = useState('');
    const { session, profile, isAdmin } = useAuth()

    const handleAddPlate = async () => {
        // Validate plate format (you might want to add more robust validation)
        if (newPlate.trim() === '') {
          Alert.alert('Hata', 'Lütfen geçerli bir plaka girin.');
          return;
        }
        await plateService.createPlate(newPlate, session?.user.id)

        // Reset modal and state
        setNewPlate('');
        setIsAddPlateModalVisible(false);
      };

    return (
        <>
            <TouchableOpacity
                style={styles.addPlateButton}
                onPress={() => setIsAddPlateModalVisible(true)}
            >
                <Text style={styles.addPlateButtonText}>Plakamı Ekle</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isAddPlateModalVisible}
                onRequestClose={() => setIsAddPlateModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>Yeni Plaka Ekle</Text>
                            <TouchableOpacity 
                                style={styles.infoButton} 
                                onPress={() => Alert.alert(
                                    'Bilgilendirme', 
                                    'Plakayı ekledikten sonra başka kullanıcılar bu plakaya yorum yapabilir. Yorumlar size bildirim olarak gelecektir.'
                                )}
                            >
                                <Ionicons name="information-circle-outline" size={24} color="#007bff" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.plateInput}
                            placeholder="Plaka Giriniz"
                            value={newPlate}
                            onChangeText={setNewPlate}
                            autoCapitalize="characters"
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setIsAddPlateModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>İptal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleAddPlate}
                            >
                                <Text style={styles.modalButtonText}>Ekle</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      padding: 12
    },
    addPlateButton: {
      backgroundColor: '#ffff00',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginBottom: 10,
    },
    addPlateButtonText: {
      color: 'black',
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      position: 'relative',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    plateInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      width: '45%',
      alignItems: 'center',
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    infoButton: {
      position: 'absolute',
      right: 0,
      padding: 5,
    },
  });