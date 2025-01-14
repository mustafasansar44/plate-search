import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlateComment } from '@/types/PlateComment';
import { plateCommentsDate } from '@/assets/data/PlateComment';
import { usersData } from '@/assets/data/User';

export default function CommentsScreen() {
  const [comments, setComments] = useState<PlateComment[]>(plateCommentsDate);

  const renderCommentItem = (item: PlateComment) => {
    // Find the user who made the comment
    const commentUser = usersData.find(user => user.id === item.commentOwnerUserId);

    return (
      <View key={item.id} style={styles.commentContainer}>
        {/* User Avatar or Default Icon */}
        <View style={styles.avatarContainer}>
          {commentUser?.avatar ? (
            <Image 
              source={{ uri: commentUser.avatar }} 
              style={styles.avatar} 
            />
          ) : (
            <Ionicons 
              name="person-circle" 
              size={50} 
              color="#888" 
            />
          )}
        </View>

        {/* Comment Content */}
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={styles.userName}>{commentUser?.name || 'Anonymous'}</Text>
            <Text style={styles.timestamp}>{item.createdAt.toLocaleString()}</Text>
          </View>
          <Text style={styles.commentText}>{item.comment}</Text>
          <Text style={styles.plateName}>Plaka: {item.plateId}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.screenTitle}>Yorumlar</Text>
      {comments?.map(renderCommentItem)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  commentContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    color: '#666',
  },
});
