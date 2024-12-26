import { createClient } from "@supabase/supabase-js";

export const supabase= createClient(
    "https://ysuzgtfwzcmdxfgefkfc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzdXpndGZ3emNtZHhmZ2Vma2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzM1NDEsImV4cCI6MjA1MDIwOTU0MX0.xlqht4tneP65Xkv2uWyUFrfmkN5sZhfGspY_GqKUqdk"
)