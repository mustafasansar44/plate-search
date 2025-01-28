import { createPlate, deletePlate } from '@/services/PlateService';
import { Plate } from '@/types/Plate';
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
        const plate = await createPlate(newPlate, user_id)
        setPlates(prevPlates => [...prevPlates, plate]);
    };

    const changePlates = (plates: Plate[]) => {
        if (!plates) return;
        setPlates(plates);
    };

    const validatePlate = (plate_no: string | null) => {
        if (!plate_no || plate_no.trim().length === 0) {
            console.warn("Geçersiz plaka. Lütfen plaka bilgisi giriniz.");
            return null;
        }

        const formattedPlate = plate_no.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

        if (!/^[A-Z0-9]{6,8}$/.test(formattedPlate)) {
            console.warn("Geçersiz plaka formatı. Lütfen geçerli bir plaka giriniz.");
            return null;
        }

        return formattedPlate;
    }

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