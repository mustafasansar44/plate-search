import React, { useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { usePlateComments } from '@/providers/PlateCommentsProvider';
import { GetRandomPlateComment } from '@/types/dtos/PlateCommentDetails';

export const LastRandomComments = () => {

    const router = useRouter();
    const { randomLastPlateComments, getRandomPlateComments } = usePlateComments();

    useEffect(() => {
        getRandomPlateComments(20, 0);
    }, []);

    const navigateToPlateDetails = (plateId: string) => {
        router.push(`/${plateId}`);
    };

    const renderCommentItem = ({ item }: { item: GetRandomPlateComment }) => (
        <TouchableOpacity
            style={styles.commentTouchable}
            onPress={() => navigateToPlateDetails(item.plate_comment_plate_id)}
        >
            <View style={styles.commentContainer}>
                <View style={styles.commentContent}>
                    <View style={styles.plateSection}>
                        <Text style={styles.plateName}>{item.plate_no}</Text>
                        <Text style={styles.commentDate}>
                            {new Date(item.plate_comment_created_at).toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.commentFooter}>
                        <Text style={styles.commentText}>
                            {item.plate_comment_comment.length > 100
                                ? `${item.plate_comment_comment.slice(0, 100)}...`
                                : item.plate_comment_comment
                            }
                        </Text>
                        <Text style={styles.commentOwner}>
                            {item.profile_first_name} {item.profile_last_name}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.listSection}>
            <View style={styles.headerContainer}>
                <Text style={styles.subHeader}>Son Gönderilen Yorumlar</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>Tümünü Gör</Text>
                </TouchableOpacity>
            </View>

            {randomLastPlateComments.length > 0 ? (
                <FlatList
                    data={randomLastPlateComments}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.plate_comment_id}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Henüz yorum bulunmamaktadır.</Text>
                </View>
            )}
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
        maxHeight: 300,  
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
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    commentContainer: {
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentContent: {
        flex: 1,
    },
    plateSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    plateName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    commentDate: {
        fontSize: 10,
        color: '#888',
    },
    commentFooter: {
        marginTop: 2,
    },
    commentText: {
        fontSize: 12,
        color: '#555',
        marginBottom: 4,
    },
    commentOwner: {
        fontSize: 11,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'right',
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

export default LastRandomComments;