import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import AddPlateComment from './AddPlateComment';
import { usePlateComments } from '@/providers/PlateCommentsProvider';
import { useAuth } from '@/providers/AuthProvider';
import { EditCommentModal } from './EditCommentModal';

export const CommentDetail = () => {
  const { plate_no } = useLocalSearchParams();
  const { plateComments, changePlateComments, removePlateComment, updatePlateComment } = usePlateComments();
  const { session } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState<{ id: string; comment: string } | null>(null);

  useEffect(() => {
    findPlateComments(plate_no as string);
  }, []);

  const findPlateComments = async (plate_no: string) => {
    changePlateComments(plate_no);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleEditComment = (id: string, comment: string) => {
    setSelectedComment({ id, comment });
    setIsModalVisible(true);
  };

  const handleSaveComment = async (updatedComment: string) => {
    if (selectedComment) {
      await updatePlateComment(selectedComment.id, updatedComment);
      setIsModalVisible(false);
    }
  };

  const renderCommentItem = ({ item }: { item: any }) => {
    const isAdmin = session?.user?.role === 'ADMIN';
    const isCommentOwner = item.comment_owner_user_id === session?.user?.id;
    const showActions = isAdmin || isCommentOwner;

    return (
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
          {showActions && (
            <View style={styles.adminActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditComment(item.id, item.comment)}
              >
                <Ionicons name="create-outline" size={20} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => removePlateComment(item?.id)}
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
  };

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
      <AddPlateComment />

      {/* Edit Comment Modal */}
      <EditCommentModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveComment}
        initialComment={selectedComment?.comment || ''}
      />
    </View>
  );
};

// Styles kısmı aynı kalacak

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
    emptyText: {
        textAlign: 'center',
        color: '#6c757d',
        padding: 16,
        fontSize: 14,
    },
});