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

