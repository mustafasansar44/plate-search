export interface PlateCommentDetails {
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


export interface GetPlateComments {
    comment: string;
    comment_id: string;
    comment_owner_user_id: string;
    created_at: Date;
    first_name: string;
    is_active: boolean;
    last_name: string;
    phone: string;
    plate_id: string;
    plate_id_fk: string;
    plate_no: string;
    profile_id: string;
    updated_at: string;
    user_id: string;
    username: string;
}

