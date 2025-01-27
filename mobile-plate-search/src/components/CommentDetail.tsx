import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import AddPlateComment from './AddPlateComment';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { usePlateComments } from '@/providers/PlateCommentsProvider';
import { findPlateWithCommentsAndProfile } from '@/services/PlateService';

interface CommentDetailProps {
    comments: any[];
    plate: string;
}

export const CommentDetail = ({ comments, plate }: CommentDetailProps) => {
    const segment = useSegments();

    const { plateComments, addPlateComment, changePlateComments } = usePlateComments()
    const [plateId, setPlateId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        findPlateComments(plate)
    }, [])

    const findPlateComments = async (plate_no: string) => {
        setIsLoading(true)
        const data = await findPlateWithCommentsAndProfile(plate_no);
        setPlateId(data?.id)
        changePlateComments(data?.plate_comments)
        setIsLoading(false)
      }
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const renderCommentItem = ({ item }: { item: any }) => (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userName}>
                        {item?.profiles?.first_name + " " + item?.profiles?.last_name || 'Anonymous'}
                    </Text>
                    <Text style={styles.timestamp}>
                        {formatDate(item?.created_at)}
                    </Text>
                </View>
                {segment[0] === '(admin)' && (
                    <View style={styles.adminActions}>
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => console.log(`Edit comment ${item?.id}`)}
                        >
                            <Ionicons name="create-outline" size={20} color="#007bff" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => console.log(`Delete comment ${item?.id}`)}
                        >
                            <Ionicons name="trash-outline" size={20} color="#dc3545" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Text style={styles.commentText}>
                {item?.comment}
            </Text>
        </View>
    );

    if(isLoading){
        return (
            <View>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        )
    }else{
        return (
            <View>
                <Text style={styles.headerTitle}>Yorumlar</Text>
                
                <FlatList
                    data={plateComments}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Henüz yorum yapılmamış</Text>
                    }
                    contentContainerStyle={styles.listContainer}
                />
                <AddPlateComment plateName={plate} plateId={plateId} />
            </View>
        );
    }
};


/*



*/




const styles = StyleSheet.create({

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