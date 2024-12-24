import { createClient } from "@supabase/supabase-js";


export const supabase= createClient(
    "YOUR-LINK",
    "YOUR-API"
)