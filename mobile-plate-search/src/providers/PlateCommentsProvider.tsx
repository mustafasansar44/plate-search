import { deletePlateCommentInDB, updatePlateCommentInDB } from '@/services/PlateCommentService';
import { findPlateWithCommentsAndProfile, getRandomPlateCommentsInDB, insertPlateComment } from '@/services/PlateService';
import { GetPlateComments, GetRandomPlateComment, PlateCommentDetails } from '@/types/dtos/PlateCommentDetails';
import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';


interface PlateCommentsContextType {
  randomLastPlateComments: GetRandomPlateComment[];
  plateComments: GetPlateComments[];
  addPlateComment: (comment: string, session: Session, plate_no: string) => void;
  changePlateComments: (plate_no: string, range: number, page: number) => void;
  removePlateComment: (id: string) => void;
  updatePlateComment: (id: string, updatedComment: string) => void;
  getRandomPlateComments: (limit: number, offset: number) => void;
  hasMoreComments: boolean;
}

const PlateCommentsContext = createContext<PlateCommentsContextType | undefined>(undefined);

export const PlateCommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plateComments, setPlateComments] = useState<GetPlateComments[]>([]);
  const [randomLastPlateComments, setRandomLastPlateComments] = useState<GetRandomPlateComment[]>([]);
  const [hasMoreComments, setHasMoreComments] = useState(true);

  const addPlateComment = async (comment: string, session: Session, plate_no: string) => {
    // TODO: Sonra düzelt. Session parametre almamalı!
    const data = await insertPlateComment(comment, session?.user?.id, plate_no)

    if (data && session?.user?.id) {
      const { first_name, last_name, username, phone } = session.user.user_metadata
      const { comment_id, plate_id } = data[0];

      const plateComment = {
        comment: comment,
        comment_id: comment_id,
        comment_owner_user_id: session?.user.id,
        created_at: new Date(),
        first_name: first_name,
        is_active: true,
        last_name: last_name,
        phone: phone,
        plate_id: plate_id,
        plate_id_fk: plate_id, // plate_id_fk ile plate_id aynı mı belirgin değil, varsayılan eşitlik verildi
        plate_no: plate_no,
        profile_id: session?.user.id,
        updated_at: new Date().toISOString(),
        user_id: session?.user.id,
        username: username
      };
      
      setPlateComments(prevComments => [...prevComments, plateComment]);
    }
  };

  const changePlateComments = async (plate_no: string, limit: number = 10, offset: number = 0) => {
    if (!hasMoreComments) return;
    const data = await findPlateWithCommentsAndProfile(plate_no, limit, offset);
    
    // todo: Burayı düzelt
    if(data.length == 1 && !(data[0].first_name || data[0].last_name || data[0].username || data[0].phone)){
      setPlateComments([]);
      return
    }


    // If no new comments are returned, set hasMoreComments to false
    if (data.length === 0) {
      setHasMoreComments(false);
      return;
    }

    if (plateComments.length <= limit) {
      setPlateComments(data);
    } else {
      setPlateComments((prevComments) => [...prevComments, ...data]);
    }
  };

  const getRandomPlateComments = async (limit: number = 20, offset: number = 0) => {
    const data = await getRandomPlateCommentsInDB(limit, offset);
    setRandomLastPlateComments(data);
  };

  const removePlateComment = async (id: string) => {
    await deletePlateCommentInDB(id)
    setPlateComments(prevComments => prevComments.filter(comment => comment.comment_id !== id));
  }

  const updatePlateComment = async (id: string, updatedComment: string) => {
    await updatePlateCommentInDB(id, updatedComment);

    setPlateComments(prevComments =>
      prevComments.map(comment =>
        comment.comment_id === id ? { ...comment, comment: updatedComment } : comment
      )
    );

    Alert.alert("Plaka Yorumu Başarıyla Güncellendi!");
  };



  return (
    <PlateCommentsContext.Provider value={{ 
      plateComments, addPlateComment, changePlateComments, removePlateComment, updatePlateComment, 
      randomLastPlateComments, getRandomPlateComments, hasMoreComments 
    }}>
      {children}
    </PlateCommentsContext.Provider>
  );
};

export const usePlateComments = () => {
  const context = useContext(PlateCommentsContext);
  if (context === undefined) {
    throw new Error('usePlateComments must be used within a PlateCommentsProvider');
  }
  return context;
};