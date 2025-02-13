drop function if exists "public"."if_exist_update_otherwise_insert_plate"(p_plate_no text, p_user_id uuid);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.test_function(n integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN n * 2;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.if_exist_update_otherwise_insert_plate(p_plate_no text, p_user_id uuid)
 RETURNS TABLE(id uuid, plate_no text, user_id uuid, is_active boolean, updated_at timestamp with time zone, created_at timestamp with time zone)
 LANGUAGE plpgsql
AS $function$DECLARE
    existing_plate_id UUID;
    existing_user_id UUID;
BEGIN
    -- Plakanın mevcut olup olmadığını kontrol et
    SELECT p.id, p.user_id
    INTO existing_plate_id, existing_user_id
    FROM plates p
    WHERE p.plate_no = p_plate_no
    LIMIT 1;

    -- Plaka bir user'a tanımlı.
    IF existing_plate_id IS NOT NULL AND existing_user_id IS NOT NULL THEN
        RAISE EXCEPTION 'Bu plaka zaten bir kullanıcıda tanımlı!';
    END IF;

    -- Plaka Ekli ama user_id tanımlı değil (plakada sadece yorumlar var.)
    IF existing_plate_id IS NOT NULL AND existing_user_id IS NULL THEN
        UPDATE plates p SET user_id = p_user_id where p.plate_no = p_plate_no;
        RETURN QUERY SELECT p.id, p.plate_no, p.user_id, p.is_active, p.updated_at, p.created_at FROM plates p WHERE p.id = existing_plate_id;
    END IF;

    -- Plaka mevcut değil.
    IF existing_plate_id IS NULL THEN
        -- Plaka Oluştur
        INSERT INTO plates (plate_no, user_id, is_active, created_at, updated_at)
        VALUES (p_plate_no, p_user_id, TRUE, NOW(), NOW())
        RETURNING plates.id INTO existing_plate_id;

        -- Eklenen kaydı döndür
        RETURN QUERY SELECT p.id, p.plate_no, p.user_id, p.is_active, p.updated_at, p.created_at FROM plates p WHERE p.id = existing_plate_id;
    END IF;
END;$function$
;


