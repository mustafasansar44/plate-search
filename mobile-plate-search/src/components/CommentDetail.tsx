import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import { PlateComment } from '@/types/PlateComment';
import AddPlateComment from './AddPlateComment';

interface CommentDetailProps {
    comments: PlateComment[];
    plate: string;
}

export const CommentDetail = ({ comments, plate }: CommentDetailProps) => {
    const segment = useSegments();

    const renderCommentItem = ({ item }: { item: PlateComment }) => (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>
                        {item.commentOwnerUserId || 'Anonymous'}
                    </Text>
                    <Text style={styles.timestamp}>
                        {item.createdAt.toLocaleString()}
                    </Text>
                </View>
                {segment[0] === '(admin)' && (
                    <View style={styles.adminActions}>
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => console.log(`Edit comment ${item.id}`)}
                        >
                            <Ionicons name="create-outline" size={20} color="#007bff" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => console.log(`Delete comment ${item.id}`)}
                        >
                            <Ionicons name="trash-outline" size={20} color="#dc3545" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Text style={styles.commentText}>
                {item.comment}
            </Text>
            <Text style={styles.plateInfo}>
                Plaka: {item.plateId}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Yorumlar</Text>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Henüz yorum yapılmamış</Text>
                }
                contentContainerStyle={styles.listContainer}
            />
            <AddPlateComment plateName={plate} />
        </View>
    );
};

const styles = StyleSheet.create({
    /*
        container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    
    */
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    listContainer: {
        paddingBottom: 16,
    },
    commentContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    userInfoContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#212529',
    },
    timestamp: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 4,
    },
    adminActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 12,
    },
    commentText: {
        fontSize: 14,
        color: '#343a40',
        lineHeight: 20,
    },
    plateInfo: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 8,
    },
    emptyText: {
        textAlign: 'center',
        color: '#6c757d',
        padding: 16,
        fontSize: 14,
    },
});