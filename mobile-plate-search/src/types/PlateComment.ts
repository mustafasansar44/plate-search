import { BaseEntity } from "./BaseEntity";

export interface PlateComment extends BaseEntity {
    plate_id: string;
    comment: string;
    comment_owner_user_id: string;
};