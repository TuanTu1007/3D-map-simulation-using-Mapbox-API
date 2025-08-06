import { createClient } from "@supabase/supabase-js";

export const supabase= createClient(
    process.env.your_api_supabase,
    process.env.your_key
)