import { findPlateWithCommentsAndProfile } from '@/services/PlateService';
import { PlateCommentDetails } from '@/types/dtos/PlateCommentDetails';
import React, { createContext, useContext, useState, useEffect } from 'react';


interface PlateCommentsContextType {
  plateComments: PlateCommentDetails[];
  addPlateComment: (plateComment: PlateCommentDetails) => void;
  changePlateComments: (plate_no: string) => void;
}

const PlateCommentsContext = createContext<PlateCommentsContextType | undefined>(undefined);

export const PlateCommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plateComments, setPlateComments] = useState<PlateCommentDetails[]>([]);

  const addPlateComment = (plateComment: PlateCommentDetails) => {
    setPlateComments(prevComments => [...prevComments, plateComment]);
  };
  
  const changePlateComments = async (plate_no: string) => {
    const data = await findPlateWithCommentsAndProfile(plate_no);
    const plateId = data?.id
    
    console.log(data)

    if(!data.plateComments) return;
    // setPlateComments(data?.plate_comments);
  };

  return (
    <PlateCommentsContext.Provider value={{ plateComments, addPlateComment, changePlateComments }}>
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