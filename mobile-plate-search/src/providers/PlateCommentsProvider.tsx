import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlateComment } from '@/types/PlateComment';

interface PlateCommentDetails {
    id: string;
    created_at: Date;
    plate_id: string;
    comment: string;
    comment_owner_user_id: string;
    profiles: {
        id: string;
        first_name: string;
        last_name: string;
        username: string;
        phone: string;
    }
}

interface PlateCommentsContextType {
  plateComments: PlateComment[];
  addPlateComment: (plateComment: PlateCommentDetails) => void;
  setPlateComments: (plateComments: PlateComment[]) => void;
}

const PlateCommentsContext = createContext<PlateCommentsContextType | undefined>(undefined);

export const PlateCommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [plateComments, setPlateComments] = useState<PlateComment[]>([]);

  const addPlateComment = (plateComment: PlateComment) => {
    setPlateComments(prevComments => [...prevComments, plateComment]);
  };

  return (
    <PlateCommentsContext.Provider value={{ plateComments, addPlateComment, setPlateComments }}>
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