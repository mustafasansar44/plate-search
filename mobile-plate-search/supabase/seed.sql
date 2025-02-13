DO $$
DECLARE
    i INT;
    user_id UUID;
    plate_count INT;
    plate_id UUID;
    j INT;
    comment_count INT;
    k INT;
    comment_id UUID;
BEGIN
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    FOR i IN 1..9 LOOP
        user_id := uuid_generate_v4();
        
        -- auth.users tablosuna insert
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            user_id,
            'authenticated',
            'authenticated',
            'user' || i || '@gmail.com',
            crypt('password' || i, gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            NOW(),
            '{"provider": "email", "providers": ["email"]}',
            '{}'
        );
        
        -- public.profiles tablosuna insert veya update
        INSERT INTO public.profiles 
        (
            id,
            username,
            first_name, 
            last_name, 
            tcno, 
            phone_code, 
            phone
        ) VALUES (
            user_id,
            'user' || i,
            'firstname' || i,
            'lastname' || i,
            '2424242422' || i,
            '+90',
            '123456789' || i
        )
        ON CONFLICT (id) DO UPDATE 
        SET 
            username = EXCLUDED.username,
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            tcno = EXCLUDED.tcno,
            phone_code = EXCLUDED.phone_code,
            phone = EXCLUDED.phone;
        
        -- user5 ve sonrasında, rastgele plaka ekleme
        IF i >= 5 THEN
            plate_count := floor(random() * 4)::int;  -- 0 ile 3 arasında rastgele plaka sayısı
            FOR j IN 1..plate_count LOOP
                plate_id := uuid_generate_v4();
                INSERT INTO plates (
                    id,
                    updated_at,
                    created_at,
                    is_active,
                    plate_no,
                    user_id,
                    image
                ) VALUES (
                    plate_id,
                    NOW(),
                    NOW(),
                    TRUE,
                    '34ABC' || i || j,
                    user_id,
                    NULL  -- veya uygun bir image değeri
                );
                
                -- Her plaka için 0 ile 60 arasında rastgele yorum ekleme
                comment_count := floor(random() * 61)::int;  -- 0 ile 60 arasında
                FOR k IN 1..comment_count LOOP
                    comment_id := uuid_generate_v4();
                    INSERT INTO plate_comments (
                        id,
                        updated_at,
                        created_at,
                        is_active,
                        plate_id,
                        comment,
                        comment_owner_user_id
                    ) VALUES (
                        comment_id,
                        NOW(),
                        NOW(),
                        TRUE,
                        plate_id,
                        'Comment ' || k || ' for plate ' || j || ' of user ' || i,
                        user_id  -- yorum sahibini, örneğin kullanıcıyı atıyoruz
                    );
                END LOOP;
            END LOOP;
        END IF;
    END LOOP;
END $$;
