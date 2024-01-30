import { SupabaseClient, createClient } from "@supabase/supabase-js";
import doten from "dotenv";
doten.config();
const { SUPABASE_KEY, SUPABASE_PROJECT_URL } = process.env;
let client: SupabaseClient;
if (SUPABASE_KEY !== undefined && SUPABASE_PROJECT_URL !== undefined) {
  client = createClient(SUPABASE_PROJECT_URL, SUPABASE_KEY);
}

export { client };
