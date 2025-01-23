import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
    Image
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
            onPress={() => navigateToPlateDetails(item.plate_id)}
            style={styles.commentTouchable}
        >
            <View style={styles.commentContainer}>
                <View style={styles.commentContent}>
                    <View style={styles.plateSection}>
                        <Ionicons name="car-outline" size={14} color="#007BFF" />
                        <Text style={styles.plateName}>
                            {' '}{item.plate_id}
                        </Text>
                    </View>
                    <Text style={styles.commentText} numberOfLines={1}>
                        {item.comment}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.listSection}>
            <View style={styles.headerContainer}>
                <Text style={styles.subHeader}>Son Yorumlar</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>Tümünü Gör</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="chatbox-outline" size={50} color="#CCC" />
                        <Text style={styles.emptyText}>Henüz yorum yapılmamış</Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listSection: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    subHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAllText: {
        color: '#007BFF',
        fontSize: 10,
    },
    commentTouchable: {
        marginBottom: 4,
    },
    commentContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 6,
        padding: 8,
        alignItems: 'center',
        height: 40,
    },
    commentContent: {
        flex: 1,
        justifyContent: 'center',
    },
    plateSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    plateName: {
        fontSize: 12,
        color: '#007BFF',
        fontWeight: 'bold',
    },
    commentText: {
        fontSize: 10,
        color: '#555',
        lineHeight: 12,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },
});

export default Comment;