

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."bune"() RETURNS TABLE("id" "uuid", "plate_no" "text", "user_id" "uuid", "plate_comment_id" "uuid", "plate_comment_created_at" timestamp with time zone, "plate_comment_updated_at" timestamp with time zone, "plate_comment_is_active" boolean, "plate_comment_plate_id" "uuid", "plate_comment_comment" "text", "plate_comment_comment_owner_user_id" "uuid", "profile_id" "uuid", "profile_first_name" "text", "profile_last_name" "text", "profile_username" "text", "profile_phone" "text")
    LANGUAGE "plpgsql"
    AS $$BEGIN
    RETURN QUERY
    SELECT
        p.id as id, 
        p.plate_no as plate_no, 
        p.user_id as user_id,
        pc.id as plate_comment_id,
        pc.created_at as plate_comment_created_at,
        pc.updated_at as plate_comment_updated_at,
        pc.is_active as plate_comment_is_active,
        pc.plate_id as plate_comment_plate_id,
        pc.comment as plate_comment_comment,
        pc.comment_owner_user_id as plate_comment_comment_owner_user_id,
        pro.id as profile_id,
        pro.first_name as profile_first_name,
        pro.last_name as profile_last_name,
        pro.username as profile_username,
        pro.phone as profile_phone
    FROM plates p
    INNER JOIN plate_comments pc ON p.id = pc.plate_id
    INNER JOIN profiles pro ON pro.id = pc.comment_owner_user_id;
END;$$;


ALTER FUNCTION "public"."bune"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_plate_comments_with_plate_and_profile"("p_plate_no" "text", "p_limit_count" integer DEFAULT 10, "p_offset_count" integer DEFAULT 0) RETURNS TABLE("plate_id" "uuid", "plate_no" "text", "user_id" "uuid", "comment_id" "uuid", "created_at" timestamp with time zone, "updated_at" timestamp with time zone, "is_active" boolean, "plate_id_fk" "uuid", "comment" "text", "comment_owner_user_id" "uuid", "profile_id" "uuid", "first_name" "text", "last_name" "text", "username" "text", "phone" "text")
    LANGUAGE "plpgsql"
    AS $$BEGIN
    RETURN QUERY
    SELECT 
        p.id, 
        p.plate_no, 
        p.user_id,
        pc.id,
        pc.created_at,
        pc.updated_at,
        pc.is_active,
        pc.plate_id,
        pc.comment,
        pc.comment_owner_user_id,
        pro.id,
        pro.first_name,
        pro.last_name,
        pro.username,
        pro.phone
    FROM plates p
    LEFT JOIN plate_comments pc ON pc.plate_id = p.id
    LEFT JOIN profiles pro ON pro.id = pc.comment_owner_user_id
    WHERE p.plate_no = p_plate_no
    LIMIT p_limit_count OFFSET p_offset_count;
END;$$;


ALTER FUNCTION "public"."get_plate_comments_with_plate_and_profile"("p_plate_no" "text", "p_limit_count" integer, "p_offset_count" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_random_plate_comments_with_plate_and_profile"("p_limit" integer, "p_offset" integer) RETURNS TABLE("id" "uuid", "plate_no" "text", "user_id" "uuid", "plate_comment_id" "uuid", "plate_comment_created_at" timestamp with time zone, "plate_comment_updated_at" timestamp with time zone, "plate_comment_is_active" boolean, "plate_comment_plate_id" "uuid", "plate_comment_comment" "text", "plate_comment_comment_owner_user_id" "uuid", "profile_id" "uuid", "profile_first_name" "text", "profile_last_name" "text", "profile_username" "text", "profile_phone" "text")
    LANGUAGE "plpgsql"
    AS $$BEGIN
    RETURN QUERY
    SELECT
        p.id as id, 
        p.plate_no as plate_no, 
        p.user_id as user_id,
        pc.id as plate_comment_id,
        pc.created_at as plate_comment_created_at,
        pc.updated_at as plate_comment_updated_at,
        pc.is_active as plate_comment_is_active,
        pc.plate_id as plate_comment_plate_id,
        pc.comment as plate_comment_comment,
        pc.comment_owner_user_id as plate_comment_comment_owner_user_id,
        pro.id as profile_id,
        pro.first_name as profile_first_name,
        pro.last_name as profile_last_name,
        pro.username as profile_username,
        pro.phone as profile_phone
    FROM plates p
    INNER JOIN plate_comments pc ON p.id = pc.plate_id
    INNER JOIN profiles pro ON pro.id = pc.comment_owner_user_id
    LIMIT p_limit OFFSET p_offset;
END;$$;


ALTER FUNCTION "public"."get_random_plate_comments_with_plate_and_profile"("p_limit" integer, "p_offset" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles 
  (
    id, 
    avatar_url,
    username,
    first_name,
    last_name,
    tcno,
    phone_code,
    phone
  )
  values 
  (
    new.id, 
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'tcno',
    new.raw_user_meta_data->>'phone_code',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."if_exist_update_otherwise_insert_plate"("p_plate_no" "text", "p_user_id" "uuid") RETURNS TABLE("plate_id" "uuid", "plate_no" "text", "user_id" "uuid", "is_active" boolean, "updated_at" timestamp without time zone)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    existing_plate_id UUID;
BEGIN
    -- Plakanın mevcut olup olmadığını kontrol et
    SELECT plates.id
    INTO existing_plate_id
    FROM plates
    WHERE plates.plate_no = p_plate_no; -- Burada plates.plate_no açıkça belirtiliyor

    IF existing_plate_id IS NOT NULL THEN
        -- Eğer plaka mevcutsa, user_id'yi ve updated_at'i güncelle
        UPDATE plates
        SET user_id = p_user_id,
            updated_at = NOW()
        WHERE id = existing_plate_id;

        -- Güncellenen kaydı döndür
        RETURN QUERY 
        SELECT plates.id, plates.plate_no, plates.user_id, plates.is_active, plates.updated_at::timestamp
        FROM plates
        WHERE plates.id = existing_plate_id;
    ELSE
        -- Eğer plaka mevcut değilse, yeni bir plaka oluştur
        INSERT INTO plates (plate_no, user_id, is_active, created_at, updated_at)
        VALUES (p_plate_no, p_user_id, TRUE, NOW(), NOW())
        RETURNING id INTO existing_plate_id;

        -- Eklenen kaydı döndür
        RETURN QUERY 
        SELECT plates.id, plates.plate_no, plates.user_id, plates.is_active, plates.updated_at::timestamp
        FROM plates
        WHERE plates.id = existing_plate_id;
    END IF;
END;
$$;


ALTER FUNCTION "public"."if_exist_update_otherwise_insert_plate"("p_plate_no" "text", "p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."insert_plate_and_insert_plate_comment"("p_comment" "text", "p_plate_no" "text", "p_comment_owner_user_id" "uuid") RETURNS TABLE("plate_id" "uuid", "comment_id" "uuid")
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    plate_id UUID;
    comment_id UUID;
BEGIN
    -- Plate var mı kontrol et
    SELECT id INTO plate_id
    FROM plates
    WHERE plate_no = p_plate_no
    LIMIT 1;

    -- Eğer plate bulunamazsa, yeni plate ekle
    IF NOT FOUND THEN
        INSERT INTO plates (plate_no)
        VALUES (p_plate_no)
        RETURNING id INTO plate_id;
    END IF;

    -- Plate comment ekle
    INSERT INTO plate_comments (comment, plate_id, comment_owner_user_id)
    VALUES (p_comment, plate_id, p_comment_owner_user_id)
    RETURNING id INTO comment_id;

    -- Plate ve comment id'lerini döndür
    RETURN QUERY SELECT plate_id, comment_id;
END;
$$;


ALTER FUNCTION "public"."insert_plate_and_insert_plate_comment"("p_comment" "text", "p_plate_no" "text", "p_comment_owner_user_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."existing_plate_id" (
    "id" "uuid"
);


ALTER TABLE "public"."existing_plate_id" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."plate_comments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true,
    "plate_id" "uuid",
    "comment" "text",
    "comment_owner_user_id" "uuid"
);


ALTER TABLE "public"."plate_comments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."plates" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_active" boolean DEFAULT true,
    "plate_no" "text" NOT NULL,
    "user_id" "uuid",
    "image" "text"
);


ALTER TABLE "public"."plates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "first_name" "text",
    "last_name" "text",
    "tcno" "text",
    "phone_code" "text",
    "phone" "text",
    "avatar_url" "text",
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."plate_comments"
    ADD CONSTRAINT "plate_comments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."plates"
    ADD CONSTRAINT "plates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."plates"
    ADD CONSTRAINT "unique_plate_no" UNIQUE ("plate_no");



ALTER TABLE ONLY "public"."plate_comments"
    ADD CONSTRAINT "plate_comments_comment_owner_user_id_fkey" FOREIGN KEY ("comment_owner_user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE SET DEFAULT;



ALTER TABLE ONLY "public"."plate_comments"
    ADD CONSTRAINT "plate_comments_plate_id_fkey" FOREIGN KEY ("plate_id") REFERENCES "public"."plates"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."plates"
    ADD CONSTRAINT "plates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."plates" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "users can see plates" ON "public"."plates" TO "authenticated" USING (true);





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";




















































































































































































GRANT ALL ON FUNCTION "public"."bune"() TO "anon";
GRANT ALL ON FUNCTION "public"."bune"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."bune"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_plate_comments_with_plate_and_profile"("p_plate_no" "text", "p_limit_count" integer, "p_offset_count" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_plate_comments_with_plate_and_profile"("p_plate_no" "text", "p_limit_count" integer, "p_offset_count" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_plate_comments_with_plate_and_profile"("p_plate_no" "text", "p_limit_count" integer, "p_offset_count" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_random_plate_comments_with_plate_and_profile"("p_limit" integer, "p_offset" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."get_random_plate_comments_with_plate_and_profile"("p_limit" integer, "p_offset" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_random_plate_comments_with_plate_and_profile"("p_limit" integer, "p_offset" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."if_exist_update_otherwise_insert_plate"("p_plate_no" "text", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."if_exist_update_otherwise_insert_plate"("p_plate_no" "text", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."if_exist_update_otherwise_insert_plate"("p_plate_no" "text", "p_user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."insert_plate_and_insert_plate_comment"("p_comment" "text", "p_plate_no" "text", "p_comment_owner_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."insert_plate_and_insert_plate_comment"("p_comment" "text", "p_plate_no" "text", "p_comment_owner_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_plate_and_insert_plate_comment"("p_comment" "text", "p_plate_no" "text", "p_comment_owner_user_id" "uuid") TO "service_role";


















GRANT ALL ON TABLE "public"."existing_plate_id" TO "anon";
GRANT ALL ON TABLE "public"."existing_plate_id" TO "authenticated";
GRANT ALL ON TABLE "public"."existing_plate_id" TO "service_role";



GRANT ALL ON TABLE "public"."plate_comments" TO "anon";
GRANT ALL ON TABLE "public"."plate_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."plate_comments" TO "service_role";



GRANT ALL ON TABLE "public"."plates" TO "anon";
GRANT ALL ON TABLE "public"."plates" TO "authenticated";
GRANT ALL ON TABLE "public"."plates" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
