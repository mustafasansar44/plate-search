import { supabase } from "@/lib/supabase";

export const select = async (tableName: string, query = '*', filters = {}, single = false) => {
    let queryBuilder = supabase.from(tableName).select(query);

    // Filter'lar
    for (const [key, value] of Object.entries(filters)) {
        queryBuilder = queryBuilder.eq(key, value);
    }

    // Query Single Mi ?
    const { data: result, error } = single ? await queryBuilder.single() : await queryBuilder;

    if (error) {
        if (error.details == "The result contains 0 rows") {
            console.log("Veri bulunamadı!")
            return setReturnValue(single)
        }

        console.error('Error fetching data from Supabase:', error.message);
        return setReturnValue(single);
    }
    return result;
}

const setReturnValue = (single: boolean) => {
    if(single){
        return null
    }
    return []
}
