set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_plate_if_dont_have_plate_comment(p_plate_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    comment_count int;
BEGIN
    -- Plate'e ait yorum sayısını hesapla.
    SELECT COUNT(*) INTO comment_count
    FROM plate_comments
    WHERE plate_id = p_plate_id;
    
    IF comment_count = 0 THEN
        -- Yorum yoksa plate kaydını sil.
        DELETE FROM plates
        WHERE id = p_plate_id;
    ELSE
        -- Yorum varsa, user_id'yi null yap.
        UPDATE plates
        SET user_id = NULL
        WHERE id = p_plate_id;
    END IF;
END;
$function$
;


