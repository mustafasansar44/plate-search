import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Plate } from '@/types/Plate';

interface PlateProps {
    plates: Plate[];
}

export const Plates = ({ plates }: PlateProps) => {

const renderItem = ({ item }: { item: Plate }) => (
  <View style={styles.commentContainer}>
    <View style={styles.commentContent}>
      <View style={styles.commentHeader}>
        <Text style={styles.userName}>{item.plate_no || '-'}</Text>
        <Text style={styles.timestamp}>
          {item?.created_at?.toLocaleString()} 
        </Text>
      </View>
      <Text style={styles.commentText}>{item.is_active}</Text>
    </View>
  </View>
);

    return (
        <View style={styles.listSection}>
            <Text style={styles.subHeader}>Son Yorumlar</Text>
            <FlatList
                data={plates}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Hesaba kayıtlı plaka mevcut değil.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listSection: {
        marginBottom: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    commentTouchable: {
        marginBottom: 12,
    },
    commentContainer: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarContainer: {
        marginRight: 16,
        justifyContent: 'center',
    },
    commentContent: {
        flex: 1,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        marginTop: 16,
    },
});

export default Plates;