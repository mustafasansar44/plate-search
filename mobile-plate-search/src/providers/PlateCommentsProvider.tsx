import { PlateCommentDetails } from '@/types/dtos/PlateCommentDetails';
import React, { createContext, useContext, useState, useEffect } from 'react';


interface PlateCommentsContextType {
  plateComments: PlateCommentDetails[];
  addPlateComment: (plateComment: PlateCommentDetails) => void;
  changePlateComments: (plateComments: PlateCommentDetails[]) => void;
}

const PlateCommentsContext = createContext<PlateCommentsContextType | undefined>(undefined);

export const PlateCommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plateComments, setPlateComments] = useState<PlateCommentDetails[]>([]);

  const addPlateComment = (plateComment: PlateCommentDetails) => {
    setPlateComments(prevComments => [...prevComments, plateComment]);
  };

  const changePlateComments = (plateComments: PlateCommentDetails[]) => {
    if(!plateComments) return;
    setPlateComments(plateComments);
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