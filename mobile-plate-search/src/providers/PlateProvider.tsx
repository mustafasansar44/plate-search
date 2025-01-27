import { Plate } from '@/types/Plate';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PlateContextType {
    plates: Plate[];
    addPlate: (plate: Plate) => void;
    changePlates: (plates: Plate[]) => void;
    validatePlate: (plate_no: string | null) => string | null;
}

const PlateContext = createContext<PlateContextType | undefined>(undefined);

export const PlateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [plates, setPlates] = useState<Plate[]>([]);

    const addPlate = (plate: Plate) => {
        setPlates(prevPlates => [...prevPlates, plate]);
    };

    const changePlates = (plates: Plate[]) => {
        if (!plates) return;
        setPlates(plates);
    };

    const validatePlate = (plate_no: string | null) => {
        if (!plate_no || plate_no.trim().length === 0) {
            console.log("Geçersiz plaka. Lütfen plaka bilgisi giriniz.");
            return null;
        }

        const formattedPlate = plate_no.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

        if (!/^[A-Z0-9]{6,8}$/.test(formattedPlate)) {
            console.log("Geçersiz plaka formatı. Lütfen geçerli bir plaka giriniz.");
            return null;
        }

        return formattedPlate;
    }

    return (
        <PlateContext.Provider value={{ plates, addPlate, changePlates, validatePlate }}>
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