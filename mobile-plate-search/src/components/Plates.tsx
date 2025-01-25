import React, { useState, useEffect } from 'react';
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
import { plateService } from '@/services/plateService';

interface PlateProps {
    plates: Plate[];
}

export const Plates = ({ plates }: PlateProps) => {

    const [selectedPlateId, setSelectedPlateId] = useState<string | null>(null);

    const renderItem = ({ item }: { item: Plate }) => {
        const isSelected = selectedPlateId === item.id;

        const handlePlatePress = () => {
            setSelectedPlateId(prevId => prevId === item.id ? null : item.id);
        };

        const handleDelete = () => {
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
                            plateService.deletePlate(selectedPlateId)
                            setSelectedPlateId(null);
                        }
                    }
                ],
                { cancelable: false }
            );
        };

        return (
            <TouchableOpacity 
                style={styles.plateContainer} 
                onPress={handlePlatePress}
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
                    <View style={styles.deleteConfirmation}>
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={styles.deleteText}>Silmek ister misiniz?</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={styles.listSection}>
                <Text style={styles.subHeader}>Hesaba Kayıtlı Plakalar</Text>
                <FlatList
                    data={plates}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
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
    plateHeader: {
        position: 'absolute',
        top: -8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 4,
        zIndex: 1,
    },
    plateHeaderText: {
        fontSize: 8,
        color: '#333',
        fontWeight: 'bold',
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
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        paddingHorizontal: 15,
    },
    deleteText: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default Plates;