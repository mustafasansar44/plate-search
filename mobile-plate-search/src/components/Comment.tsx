import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlateComment } from '@/types/PlateComment';
import { useRouter } from 'expo-router';

interface CommentProps {
    comments: PlateComment[];
}

export const Comment = ({ comments }: CommentProps) => {
    const router = useRouter();

    const navigateToPlateDetails = (plateId: string) => {
        router.push(`/${plateId}`);
    };

    const renderCommentItem = ({ item }: { item: PlateComment }) => (
        <TouchableOpacity
            key={item.id}
            onPress={() => navigateToPlateDetails(item.plateId)}
            style={styles.commentTouchable}
        >
            <View style={styles.commentContainer}>
                <View style={styles.avatarContainer}>
                    <Ionicons
                        name="person-circle"
                        size={50}
                        color="#888"
                    />
                </View>

                <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                        <Text style={styles.userName}>
                            {item.commentOwnerUserId || 'Anonymous'}
                        </Text>
                        <Text style={styles.timestamp}>
                            {item.createdAt.toLocaleString()}
                        </Text>
                    </View>
                    <Text style={styles.commentText}>
                        {item.comment}
                    </Text>
                    <Text style={styles.plateName}>
                        Plaka: {item.plateId}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.listSection}>
            <Text style={styles.subHeader}>Son Yorumlar</Text>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Henüz yorum yapılmamış</Text>
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
    plateName: {
        fontSize: 12,
        color: '#007BFF',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        marginTop: 16,
    },
});

export default Comment;