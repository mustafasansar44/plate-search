import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PlateComment } from '@/types/PlateComment';

interface CommentProps {
  item: PlateComment;
}

const CommentItem = ({ item }: CommentProps) => {
  return (
    <View key={item.id} style={styles.commentContainer}>
      {/* User Avatar or Default Icon */}
      <View style={styles.avatarContainer}>
        <Ionicons 
          name="person-circle" 
          size={50} 
          color="#888" 
        />
      </View>

      {/* Comment Content */}
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.userName}>{item.commentOwnerUserId || 'Anonymous'}</Text>
          <Text style={styles.timestamp}>{item.createdAt.toLocaleString()}</Text>
        </View>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={styles.plateName}>Plaka: {item.plateId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CommentItem;