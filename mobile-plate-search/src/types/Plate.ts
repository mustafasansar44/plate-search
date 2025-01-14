import { BaseEntity } from "./BaseEntity";

export interface Plate extends BaseEntity {
    plateNo: string;
    userId: string;
};


// TODO: Gerçekten plaka sahibi mi doğrulamak lazım.
// TODO: Telefonu kaydederken diğer ülkerein kodlarını seçerek önce entity'e kaydedelim. 