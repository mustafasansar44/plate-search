import { BaseEntity } from "./BaseEntity";

export interface PlateComment extends BaseEntity {
    plateId: string;
    comment: string;
    commentOwnerUserId: string;
};