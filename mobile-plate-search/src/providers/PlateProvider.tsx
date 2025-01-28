import { createPlate, deletePlate } from '@/services/PlateService';
import { Plate } from '@/types/Plate';
import { validatePathConfig } from '@react-navigation/native';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PlateContextType {
    plates: Plate[];
    addPlate: (newPlate: string, user_id: string) => void;
    changePlates: (plates: Plate[]) => void;
    validatePlate: (plate_no: string | null) => string | null;
    removePlate: (plateId: string) => void;
}

const PlateContext = createContext<PlateContextType | undefined>(undefined);

export const PlateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [plates, setPlates] = useState<Plate[]>([]);

    const addPlate = async (newPlate: string, user_id: string) => {

        const formattedPlate = validatePlate(newPlate);
        if(formattedPlate === null) return;

        const plate = await createPlate(formattedPlate, user_id)
        setPlates(prevPlates => [...prevPlates, plate]);
    };

    const changePlates = (plates: Plate[]) => {
        if (!plates) return;
        setPlates(plates);
    };

    const validatePlate = (plate_no: string | null) => {
        if (!plate_no || plate_no.trim().length === 0) return null;
    
        const formattedPlate = plate_no.replace(/\s+/g, '').toUpperCase();
    
        const tr_plate_valid_regex = /^(0[1-9]|[1-7][0-9]|81)[A-Z]{1,3}\d{1,4}$/;

        if (!tr_plate_valid_regex.test(formattedPlate)) {
            console.warn("Plaka Formatı Hatalı");
            return null;
        }
    
        return formattedPlate;
    };

    const removePlate = async (id: string) => {
        await deletePlate(id)
        setPlates(prevPlates => prevPlates.filter(plate => plate.id !== id));
    }

    return (
        <PlateContext.Provider value={{ plates, addPlate, changePlates, validatePlate, removePlate }}>
            {children}
        </PlateContext.Provider>
    );
};

export const usePlates = () => {
    const context = useContext(PlateContext);
    if (context === undefined) {
        throw new Error('usePlates must be used within a PlateProvider');
    }
    return context;
};