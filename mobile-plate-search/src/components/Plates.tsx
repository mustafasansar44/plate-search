import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import { Plate } from '@/types/Plate';
import AddPlate from './AddPlate';
import { usePlates } from '@/providers/PlateProvider';
import { router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export const Plates = () => {
    const [selectedPlateId, setSelectedPlateId] = useState<string | null>(null);
    const { plates, removePlate, getPlatesByUser } = usePlates();
    const { session } = useAuth();

    useEffect(() => {
        getPlatesByUser(session?.user.id);
    }, []);

    // Reset selected plate when plates change
    useEffect(() => {
        setSelectedPlateId(null);
    }, [plates]);

    const handlePlatePress = useCallback((id: string) => {
        setSelectedPlateId(prevId => prevId === id ? null : id);
    }, []);

    const handleDelete = useCallback((id: string) => {
        Alert.alert(
            'Plaka Silme',
            'Plakayı silmek istediğinizden emin misiniz?',
            [
                {
                    text: 'İptal',
                    style: 'cancel',
                    onPress: () => setSelectedPlateId(null)
                },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: () => {
                        removePlate(id);
                        setSelectedPlateId(null);
                    }
                }
            ],
            { cancelable: false }
        );
    }, [removePlate]);

    const renderItem = useCallback(({ item }: { item: Plate }) => {
        const isSelected = selectedPlateId === item.id;

        return (
            <TouchableOpacity
                style={styles.plateContainer}
                onPress={() => handlePlatePress(item.id)}
            >
                <View style={styles.plateBlueSection} />
                <View style={styles.plateContent}>
                    <Text style={styles.plateNumber}>{item.plate_no || '-'}</Text>
                    <View style={styles.plateDetails}>
                        <Text style={styles.plateStatus}>{item.is_active}</Text>
                        <Text style={styles.plateTimestamp}>{item?.created_at?.toLocaleString()}</Text>
                    </View>
                </View>

                {isSelected && (
                    <>
                        <View style={styles.deleteConfirmation}>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={styles.deleteText}>Plakayı Sil</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.commentConfirmation}>
                            <TouchableOpacity onPress={() => router.push(`/${item.plate_no}`)}>
                                <Text style={styles.deleteText}>Yorumlar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </TouchableOpacity>
        );
    }, [selectedPlateId, handlePlatePress, handleDelete]);

    return (
        <>
            <View style={styles.listSection}>
                <Text style={styles.subHeader}>Hesaba Kayıtlı Plakalar</Text>
                <FlatList
                    data={plates}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.plate_no}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Hesaba kayıtlı plaka mevcut değil.</Text>
                    }
                />
                <View style={styles.addPlateSection}>
                    <AddPlate />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    addPlateSection: {
        paddingTop: 16
    },
    listSection: {
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    plateContainer: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 4,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        position: 'relative',
    },
    plateBlueSection: {
        width: '10%',
        backgroundColor: 'blue',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    },
    plateContent: {
        flex: 1,
        marginLeft: 8,
    },
    plateNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 2,
        textAlign: 'center',
        marginVertical: 4,
        fontFamily: 'monospace',
    },
    plateDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
        marginTop: 4,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 4,
    },
    plateStatus: {
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
    },
    plateTimestamp: {
        fontSize: 10,
        color: '#888',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        marginTop: 16,
    },
    deleteConfirmation: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: '#7CB342',
        paddingHorizontal: 15,
    },
    commentConfirmation: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        backgroundColor: '#F8E856',
        paddingHorizontal: 15,
    },
    deleteText: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default Plates;