import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Plate } from '@/types/Plate';
import AddPlate from './AddPlate';

interface PlateProps {
    plates: Plate[];
}

export const Plates = ({ plates }: PlateProps) => {

    const renderItem = ({ item }: { item: Plate }) => (
        <View style={styles.plateContainer}>
            <View style={styles.plateBlueSection} />
            <View style={styles.plateContent}>
                <Text style={styles.plateNumber}>{item.plate_no || '-'}</Text>
                <View style={styles.plateDetails}>
                    <Text style={styles.plateStatus}>{item.is_active}</Text>
                    <Text style={styles.plateTimestamp}>{item?.created_at?.toLocaleString()}</Text>
                </View>
            </View>
        </View>
    );

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
});

export default Plates;