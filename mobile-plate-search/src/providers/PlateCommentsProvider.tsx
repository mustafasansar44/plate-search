import { deletePlateComment, deletePlateCommentInDB, updatePlateComment, updatePlateCommentInDB } from '@/services/PlateCommentService';
import { findPlateWithCommentsAndProfile } from '@/services/PlateService';
import { PlateCommentDetails } from '@/types/dtos/PlateCommentDetails';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';


interface PlateCommentsContextType {
  plateComments: PlateCommentDetails[];
  addPlateComment: (plateComment: PlateCommentDetails) => void;
  changePlateComments: (plate_no: string) => void;
  removePlateComment: (id: string) => void;
  updatePlateComment: (id: string, updatedComment: string) => void;
}

const PlateCommentsContext = createContext<PlateCommentsContextType | undefined>(undefined);

export const PlateCommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plateComments, setPlateComments] = useState<PlateCommentDetails[]>([]);

  const addPlateComment = (plateComment: PlateCommentDetails) => {
    setPlateComments(prevComments => [...prevComments, plateComment]);
  };

  const changePlateComments = async (plate_no: string) => {
    const data = await findPlateWithCommentsAndProfile(plate_no);
    if (!data.plate_comments) return;
    setPlateComments(data?.plate_comments);
  };

  const removePlateComment = async (id: string) => {
    await deletePlateCommentInDB(id)
    setPlateComments(prevComments => prevComments.filter(comment => comment.id !== id));
  }

  const updatePlateComment = async (id: string, updatedComment: string) => {
    await updatePlateCommentInDB(id, updatedComment);
    
    setPlateComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id ? { ...comment, comment: updatedComment } : comment
      )
    );

    Alert.alert("Plaka Yorumu Başarıyla Güncellendi!");
  };



  return (
    <PlateCommentsContext.Provider value={{ plateComments, addPlateComment, changePlateComments, removePlateComment, updatePlateComment }}>
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