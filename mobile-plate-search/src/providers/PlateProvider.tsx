import { plate_regex } from '@/constants/validationRules';
import { createPlate, deletePlate } from '@/services/PlateService';
import { Plate } from '@/types/Plate';
import { validatePathConfig } from '@react-navigation/native';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

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
        if(plates.length >= 3){
            Alert.alert('Hata', 'Maksimum 3 plakaya sahip olabilirsin.');
            return;
        }
        // TODO: createPlate'den dönen veri direkt formatPlate gibi olmalı!
        const plate = await createPlate(formattedPlate, user_id)
        const updatedPlate = { ...plate, id: plate.plate_id };

        console.log([updatedPlate, ...plates])
        if(plate != null){
            setPlates(prevPlates => [updatedPlate, ...prevPlates]);
        }
    };

    const changePlates = (plates: Plate[]) => {
        if (!plates) return;
        setPlates(plates);
    };

    const validatePlate = (plate_no: string | null) => {
        if (!plate_no || plate_no.trim().length === 0) return null;
    
        const formattedPlate = plate_no.replace(/\s+/g, '').toUpperCase();
    
        if (!plate_regex.tr.test(formattedPlate)) {
            console.warn("Plaka Formatı Hatalı");
            Alert.alert('Hata', 'Plaka formatı hatalı');
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