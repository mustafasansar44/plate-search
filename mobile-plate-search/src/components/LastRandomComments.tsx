import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { usePlateComments } from '@/providers/PlateCommentsProvider';
import CustomFlatList from './CustomFlatList';
import { Ionicons } from '@expo/vector-icons';

const DISPLAY_COUNT = 3; // Aynı anda görüntülenecek yorum sayısı
const SWITCH_INTERVAL = 10000; // Geçiş süresi (ms)

export const LastRandomComments = () => {
  const router = useRouter();
  const { randomLastPlateComments, getRandomPlateComments } = usePlateComments();
  const [visibleComments, setVisibleComments] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getRandomPlateComments(20, 0);
  }, []);

  useEffect(() => {
    if (randomLastPlateComments?.length > 0) {
      setVisibleComments(randomLastPlateComments.slice(0, DISPLAY_COUNT));
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex + DISPLAY_COUNT > randomLastPlateComments.length) {
          return 0; // Baştan başla
        }

        setVisibleComments(
          randomLastPlateComments.slice(nextIndex, nextIndex + DISPLAY_COUNT)
        );
        return nextIndex;
      });
    }, SWITCH_INTERVAL);

    return () => clearInterval(interval);
  }, [randomLastPlateComments]);

  const navigateToPlateDetails = (plate_no: string) => {
    router.push(`/${plate_no}`);
  };

  const renderCommentItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.commentTouchable}
      onPress={() => navigateToPlateDetails(item.plate_no)}
    >
      <View style={styles.commentContainer}>
        {/* Sol Taraf */}
        <View style={styles.leftSection}>
          <Ionicons name="arrow-forward-circle-outline" size={24} color="gray" style={styles.commentIcon} />
          <View style={styles.textContainer}>
            <Text style={styles.plateNoText}>{item.plate_no}</Text>
            <Text style={styles.commentText}>{item.plate_comment_comment}</Text>
          </View>
        </View>

        {/* Sağ Taraf */}
        <View style={styles.rightSection}>
          <Text style={styles.createdAtText}>
            {new Date(item.plate_comment_created_at).toLocaleDateString()}
          </Text>
          <Text style={styles.usernameText}>{item.profile_username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listSection}>
      <Text style={styles.subHeader}>Son Gönderilen Yorumlar</Text>

      {visibleComments?.length > 0 ? (
        <CustomFlatList
          data={visibleComments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.plate_comment_id}
          key={visibleComments.map((item) => item.plate_comment_id).join('-')} // Yeni veriler geldiğinde animasyonları tetikle
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
    padding: 8,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
  },
  commentTouchable: {
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
    padding: 8,
    borderRadius: 8, // Köşeleri yuvarlak yap
  },
  commentContainer: {
    flexDirection: 'row', // Yatay düzen
    justifyContent: 'space-between', // Sol ve sağ bölümleri ayır
    alignItems: 'center', // Dikeyde ortala
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  commentIcon: {
    marginRight: 10,
  },
  rightSection: {
    alignItems: 'flex-end', // Sağ tarafı sağa hizala
  },
  plateNoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    fontSize: 12,
    color: '#555',
    marginTop: 4, // plate_no ile arasına boşluk ekle
  },
  createdAtText: {
    fontSize: 10,
    color: '#777',
  },
  usernameText: {
    fontSize: 10,
    color: '#777',
    marginTop: 4, // created_at ile arasına boşluk ekle
  },
});

export default LastRandomComments;