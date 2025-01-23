import { BaseEntity } from "./BaseEntity";

export interface Plate extends BaseEntity {
    plate_no: string;
    user_id: string;
    image?: string; // TODO: Burayı düzelt
};






